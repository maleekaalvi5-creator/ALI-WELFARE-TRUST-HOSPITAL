import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const isValidUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

const supabaseAdmin = (supabaseUrl && isValidUrl(supabaseUrl) && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })
  : null;

// =========================================================================
// SECURE ADMINISTRATIVE ACCESS (scrypt-hashed credentials & Bearer Tokens)
// Default User: AliTrust or superadmin
// Default Pass: 1234567Ali
// =========================================================================
const ADMIN_USERNAME = "AliTrust";
const ADMIN_PASSWORD_PLAIN = "1234567Ali";
const ADMIN_SCRYPT_SALT = "awt_hospital_scrypt_salt_2026_qila_didar_singh";
const ADMIN_KEY_LEN = 64;

// Persistent storage paths
const DATA_DIR = path.join(process.cwd(), "data");
const SESSIONS_FILE = path.join(DATA_DIR, "admin-sessions.json");
const AUTH_FILE = path.join(DATA_DIR, "admin-auth.json");
const PRIMARY_CONTENT_FILE = path.join(DATA_DIR, "hospital-content.json");
const PUBLIC_CONTENT_FILE = path.join(process.cwd(), "public", "data", "hospital-content.json");
const APPOINTMENTS_FILE = path.join(DATA_DIR, "appointments.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getStoredPasswordHash(): Buffer {
  if (fs.existsSync(AUTH_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(AUTH_FILE, "utf-8"));
      if (data && data.hashHex) {
        return Buffer.from(data.hashHex, "hex");
      }
    } catch (e) {
      console.error("[Auth] Error reading stored password hash:", e);
    }
  }
  return crypto.scryptSync(ADMIN_PASSWORD_PLAIN, ADMIN_SCRYPT_SALT, ADMIN_KEY_LEN);
}
const publicDataDir = path.join(process.cwd(), "public", "data");
if (!fs.existsSync(publicDataDir)) {
  fs.mkdirSync(publicDataDir, { recursive: true });
}

// -------------------------------------------------------------------------
// Central Content Store Initialization (ONE Source of Truth)
// -------------------------------------------------------------------------
let liveContent: any = null;
let currentRevision = 1;
let lastUpdatedAt = Date.now();

function loadCentralContent(): any {
  // Check primary data dir first
  if (fs.existsSync(PRIMARY_CONTENT_FILE)) {
    try {
      const raw = fs.readFileSync(PRIMARY_CONTENT_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && parsed.header) {
        liveContent = parsed;
        currentRevision = parsed.revision || 1;
        lastUpdatedAt = parsed.updatedAt || Date.now();
        return liveContent;
      }
    } catch (e) {
      console.error("[Central Store] Failed to read primary content:", e);
    }
  }

  // Fallback to public content file
  if (fs.existsSync(PUBLIC_CONTENT_FILE)) {
    try {
      const raw = fs.readFileSync(PUBLIC_CONTENT_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && parsed.header) {
        liveContent = parsed;
        liveContent.revision = parsed.revision || 1;
        liveContent.updatedAt = parsed.updatedAt || Date.now();
        currentRevision = liveContent.revision;
        lastUpdatedAt = liveContent.updatedAt;
        // Persist to primary
        fs.writeFileSync(PRIMARY_CONTENT_FILE, JSON.stringify(liveContent, null, 2), "utf-8");
        return liveContent;
      }
    } catch (e) {
      console.error("[Central Store] Failed to read public content fallback:", e);
    }
  }

  return null;
}

function saveCentralContent(content: any): { success: boolean; error?: string } {
  try {
    currentRevision++;
    lastUpdatedAt = Date.now();
    content.revision = currentRevision;
    content.updatedAt = lastUpdatedAt;
    liveContent = content;

    const payload = JSON.stringify(content, null, 2);
    fs.writeFileSync(PRIMARY_CONTENT_FILE, payload, "utf-8");
    fs.writeFileSync(PUBLIC_CONTENT_FILE, payload, "utf-8");

    // Broadcast update immediately to all connected desktop and mobile clients
    broadcastContentUpdate(content);
    return { success: true };
  } catch (err: any) {
    console.error("[Central Store] Save error:", err);
    return { success: false, error: err.message };
  }
}

// Load on boot
loadCentralContent();

// -------------------------------------------------------------------------
// Central Appointments Store
// -------------------------------------------------------------------------
function loadAppointments(): any[] {
  if (fs.existsSync(APPOINTMENTS_FILE)) {
    try {
      const raw = fs.readFileSync(APPOINTMENTS_FILE, "utf-8");
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
  return [];
}

function saveAppointments(appts: any[]) {
  try {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appts, null, 2), "utf-8");
  } catch (err) {
    console.error("[Appointments Store] Failed to save appointments:", err);
  }
}

// -------------------------------------------------------------------------
// Real-Time Server-Sent Events (SSE) Broadcast Engine
// -------------------------------------------------------------------------
const sseClients = new Set<express.Response>();

function broadcastContentUpdate(content: any) {
  const message = `data: ${JSON.stringify({
    type: "content_update",
    revision: currentRevision,
    updatedAt: lastUpdatedAt,
    content
  })}\n\n`;

  for (const client of sseClients) {
    try {
      client.write(message);
    } catch {
      sseClients.delete(client);
    }
  }
}

function broadcastAppointmentUpdate(action: string, appointment: any) {
  const message = `data: ${JSON.stringify({
    type: "appointment_update",
    action,
    appointment
  })}\n\n`;

  for (const client of sseClients) {
    try {
      client.write(message);
    } catch {
      sseClients.delete(client);
    }
  }
}

// Active admin sessions
let sessions: Record<string, { username: string; createdAt: number; expiresAt: number }> = {};
if (fs.existsSync(SESSIONS_FILE)) {
  try {
    sessions = JSON.parse(fs.readFileSync(SESSIONS_FILE, "utf-8"));
  } catch {
    sessions = {};
  }
}

function saveSessions() {
  try {
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save admin sessions:", err);
  }
}

// Bearer Token Authentication Middleware
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing Bearer token." });
  }

  const token = authHeader.substring(7).trim();
  const session = sessions[token];

  if (!session || session.expiresAt < Date.now()) {
    if (session) {
      delete sessions[token];
      saveSessions();
    }
    return res.status(401).json({ error: "Session expired or invalid. Please re-authenticate." });
  }

  (req as any).adminSession = session;
  next();
}

// -------------------------------------------------------------------------
// Gemini AI Assistant Client
// -------------------------------------------------------------------------
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    try {
      geminiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    } catch (err) {
      console.warn("[Gemini API] Failed to initialize GoogleGenAI:", err);
    }
  }
  return geminiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware with expanded limits for high-resolution photo uploads
  app.use(express.json({ limit: "40mb" }));
  app.use(express.urlencoded({ extended: true, limit: "40mb" }));

  // Disable aggressive caching for API routes
  app.use("/api", (req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    next();
  });

  // Serve static public folder explicitly
  const publicPath = path.join(process.cwd(), "public");
  app.use(express.static(publicPath));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      revision: currentRevision,
      updatedAt: lastUpdatedAt,
      connectedClients: sseClients.size,
      time: new Date().toISOString()
    });
  });

  // -----------------------------------------------------------------------
  // REAL-TIME SERVER-SENT EVENTS (SSE) STREAM
  // -----------------------------------------------------------------------
  app.get("/api/content/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();

    // Send initial snapshot
    const current = liveContent || loadCentralContent();
    res.write(`data: ${JSON.stringify({
      type: "init",
      revision: currentRevision,
      updatedAt: lastUpdatedAt,
      content: current
    })}\n\n`);

    sseClients.add(res);

    // Keep connection alive with heartbeat comment every 20 seconds
    const heartbeat = setInterval(() => {
      try {
        res.write(": heartbeat\n\n");
      } catch {
        clearInterval(heartbeat);
        sseClients.delete(res);
      }
    }, 20000);

    req.on("close", () => {
      clearInterval(heartbeat);
      sseClients.delete(res);
    });
  });

  // -----------------------------------------------------------------------
  // DYNAMIC HOSPITAL CONTENT API (Cross-Device Live Sync with Conflict Detection)
  // -----------------------------------------------------------------------
  // Public GET: returns current live content with cache-invalidation headers
  app.get("/api/content", (req, res) => {
    try {
      const content = liveContent || loadCentralContent();
      if (content) {
        res.setHeader("ETag", `"${currentRevision}-${lastUpdatedAt}"`);
        return res.json({
          ...content,
          revision: currentRevision,
          updatedAt: lastUpdatedAt
        });
      }
      return res.json({ initialized: false });
    } catch (err: any) {
      console.error("[Content GET Error]", err);
      return res.status(500).json({ error: err.message });
    }
  });

  // Supabase Header Admin API
  const handleHeaderAdmin = async (req: any, res: any) => {
    try {
      const body = req.body;
      if (supabaseAdmin) {
        const { error } = await supabaseAdmin
          .from('site_settings')
          .upsert({ key: 'header', value: body, updated_at: new Date().toISOString() }, { onConflict: 'key' });
        if (error) {
          console.error("[Supabase Header Upsert Error]:", error);
        }
      }
      const current = loadCentralContent();
      current.header = { ...(current.header || {}), ...body };
      saveCentralContent(current);
      return res.json({ success: true, message: "Header updated successfully." });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  app.post("/api/admin/header", requireAdminAuth, handleHeaderAdmin);
  app.put("/api/admin/header", requireAdminAuth, handleHeaderAdmin);

  // Supabase File Upload API
  app.post("/api/admin/upload", requireAdminAuth, async (req: any, res: any) => {
    try {
      const { fileData, fileName, bucketName } = req.body;
      const bucket = bucketName || 'website-assets';

      if (!fileData) {
        return res.status(400).json({ error: "No file data provided." });
      }

      if (!supabaseAdmin) {
        return res.status(400).json({ error: "Supabase storage is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." });
      }

      const buffer = Buffer.from(fileData.replace(/^data:.*;base64,/, ""), 'base64');
      const pathName = `uploads/${Date.now()}_${fileName || 'asset.jpg'}`;

      const { data, error } = await supabaseAdmin.storage
        .from(bucket)
        .upload(pathName, buffer, {
          contentType: 'image/jpeg',
          upsert: true
        });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      const { data: publicUrlData } = supabaseAdmin.storage.from(bucket).getPublicUrl(data.path);
      return res.json({ success: true, url: publicUrlData.publicUrl });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Supabase Department Image Update API
  const handleDeptUpdate = async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const { image_url, description, name } = req.body;

      if (supabaseAdmin) {
        await supabaseAdmin
          .from('departments')
          .update({ image_url, description, name })
          .eq('id', id);
      }

      const current = loadCentralContent();
      if (current.departments) {
        const dept = current.departments.find((d: any) => d.id === id);
        if (dept) {
          if (image_url) dept.image_url = image_url;
          if (description) dept.description = description;
          if (name) dept.name = name;
          saveCentralContent(current);
        }
      }

      return res.json({ success: true, image_url });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  app.patch("/api/admin/departments/:id", requireAdminAuth, handleDeptUpdate);
  app.put("/api/admin/departments/:id", requireAdminAuth, handleDeptUpdate);

  // Admin PUT: save updated live content across all devices with Conflict Protection
  app.put("/api/admin/content", requireAdminAuth, (req, res) => {
    try {
      const newContent = req.body;
      if (!newContent || typeof newContent !== "object") {
        return res.status(400).json({ error: "Invalid content payload." });
      }

      // Conflict detection: if client was editing an older revision and didn't force overwrite
      const clientLastUpdated = req.body.clientLastUpdated || req.body.updatedAt;
      const forceOverwrite = req.body.forceOverwrite === true;

      if (!forceOverwrite && clientLastUpdated && lastUpdatedAt > clientLastUpdated + 3000) {
        return res.status(409).json({
          conflict: true,
          error: "This content was changed from another device. Review the latest version before saving.",
          serverRevision: currentRevision,
          serverUpdatedAt: lastUpdatedAt
        });
      }

      const saveResult = saveCentralContent(newContent);
      if (!saveResult.success) {
        return res.status(500).json({ error: saveResult.error || "Failed to persist content." });
      }

      console.log(`[Admin] Hospital content updated successfully (Rev ${currentRevision}) at ${new Date().toISOString()}`);

      return res.json({
        success: true,
        message: "Content successfully updated and broadcast across all devices.",
        revision: currentRevision,
        updatedAt: lastUpdatedAt
      });
    } catch (err: any) {
      console.error("[Content PUT Error]", err);
      return res.status(500).json({ error: "Failed to persist content: " + err.message });
    }
  });

  // -----------------------------------------------------------------------
  // CENTRAL APPOINTMENTS API
  // -----------------------------------------------------------------------
  app.get("/api/appointments", (req, res) => {
    const appts = loadAppointments();
    res.json({ appointments: appts });
  });

  app.post("/api/appointments", (req, res) => {
    try {
      const {
        departmentId,
        departmentName,
        doctorId,
        doctorName,
        patientName,
        patientPhone,
        appointmentDate,
        appointmentTime,
        appointmentType,
        purpose,
        notes,
        source
      } = req.body;

      if (!patientName || !patientPhone || !appointmentDate) {
        return res.status(400).json({ error: "Patient name, phone, and appointment date are required." });
      }

      const tokenNumber = `AWT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newAppt = {
        id: `appt-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        tokenNumber,
        departmentId: departmentId || "general-opd",
        departmentName: departmentName || "General Outpatient (OPD)",
        doctorId: doctorId || "on-duty-consultant",
        doctorName: doctorName || "Senior Consultant on Duty",
        patientName: patientName.trim(),
        patientPhone: patientPhone.trim(),
        appointmentDate,
        appointmentTime: appointmentTime || "Morning OPD (09:00 AM – 01:00 PM)",
        appointmentType: appointmentType || "Clinical Consultation",
        purpose: purpose || "General Consultation",
        notes: notes || "",
        status: "confirmed",
        source: source || "website",
        createdAt: new Date().toISOString(),
        timestamp: Date.now()
      };

      const existing = loadAppointments();
      const updated = [newAppt, ...existing];
      saveAppointments(updated);

      // Broadcast new appointment in real-time
      broadcastAppointmentUpdate("create", newAppt);

      console.log(`[Appointments] New booking created: ${newAppt.tokenNumber} for ${newAppt.patientName}`);
      return res.json({ success: true, appointment: newAppt });
    } catch (err: any) {
      console.error("[Appointments POST Error]", err);
      return res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/admin/appointments/:id", requireAdminAuth, (req, res) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;
      const existing = loadAppointments();
      const index = existing.findIndex((a) => a.id === id);
      if (index === -1) {
        return res.status(404).json({ error: "Appointment not found." });
      }

      if (status) existing[index].status = status;
      if (notes !== undefined) existing[index].notes = notes;
      existing[index].updatedAt = new Date().toISOString();

      saveAppointments(existing);
      broadcastAppointmentUpdate("update", existing[index]);

      return res.json({ success: true, appointment: existing[index] });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/appointments/:id", (req, res) => {
    try {
      const { id } = req.params;
      const existing = loadAppointments();
      const filtered = existing.filter((a) => a.id !== id);
      saveAppointments(filtered);
      broadcastAppointmentUpdate("delete", { id });
      return res.json({ success: true, message: "Appointment cancelled." });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // -----------------------------------------------------------------------
  // ADVANCED AI ASSISTANT API (Powered by Gemini with Web Grounding)
  // -----------------------------------------------------------------------
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, messages = [], clientContext = {} } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "A message string is required." });
      }

      const content = liveContent || loadCentralContent();
      const departmentsSummary = content?.departments
        ? content.departments.map((d: any) => `• ${d.name} (${d.urduName || ""}): ${d.shortDesc || ""}`).join("\n")
        : "Kidney Dialysis, Ophthalmology / Eye Surgery, 24/7 Emergency, General Medicine, Gynecology, Radiology Doppler, Lab & Pharmacy";

      const doctorsSummary = content?.doctors
        ? content.doctors.map((d: any) => `• ${d.name} (${d.specialty}): ${d.qualification || ""}, Timings: ${d.timing || ""}`).join("\n")
        : "Dr. Muhammad Farooq (Internal Medicine), Dr. Ayesha Siddiqa (Gynecologist), Dr. Tariq Mahmood Alvi (Nephrologist), Dr. Bilal Hassan (Ophthalmologist), Dr. Zubair Ahmad Khan (Radiologist)";

      const bankSummary = content?.donation?.bank
        ? `Bank: ${content.donation.bank.bankName}, Title: ${content.donation.bank.accountTitle}, IBAN: ${content.donation.bank.iban}, Branch: ${content.donation.bank.branchName}`
        : "Meezan Bank, Title: Muhammad Rafae Awan, IBAN: PK57MEZN0009110108226635, Qila Didar Singh Branch";

      const contactSummary = content?.contact
        ? `Address: ${content.contact.address}, Emergency Phone: ${content.contact.emergencyPhone}, WhatsApp: ${content.contact.whatsapp}, Helpline: ${content.contact.helpline}`
        : "Main Campus Chahal Kalan Road, Qila Didar Singh, Gujranwala. Emergency: 03324711101, WhatsApp: +92 345 2074974";

      const systemPrompt = `You are 'Ali Care' - the elite 24/7 AI Healthcare Assistant and Problem Solver for Ali Welfare Trust Hospital, Qila Didar Singh. 
You possess ChatGPT-level intelligence, deep medical triage knowledge, complete hospital faculty and doctor schedules, and donation guidelines.

CRITICAL LANGUAGE & COMPREHENSION RULES:
1. MULTILINGUAL FLUENCY: Fully understand and fluently reply in Roman Urdu (e.g. "mujhe bukhar hai kya karun?", "doctor ki timing kya hai?", "meezan bank account number do"), Urdu Script (اردو), and English. Match the user's language seamlessly.
2. MEDICAL TRIAGE: If the user describes symptoms (fever, bukhar, cough, flu, pain, weakness), provide immediate professional triage advice, recommend the relevant specialist doctor from our hospital, and offer to book their appointment.
3. INSTANT PROBLEM SOLVING: Never give generic canned responses. Act as a world-class AI healthcare consultant. Give comprehensive, accurate, empathetic, and instant answers.
4. HOSPITAL DATA EXPERT: You know all departments, specialist doctors, Meezan Bank donation details, and emergency contacts.
5. CONTEXT AWARENESS: Maintain conversation history. Never repeat full introductory greetings on follow-up turns.

LIVE HOSPITAL DATA:
Departments:
${departmentsSummary}

Doctors:
${doctorsSummary}

Donation Details:
${bankSummary}

Contact & Emergency:
${contactSummary}
`;

      const client = getGeminiClient();
      let replyText = "";
      let sources: Array<{ title: string; uri: string }> = [];

      let apiSuccess = false;
      if (client) {
        try {
          const contents: any[] = [];
          if (Array.isArray(messages)) {
            for (const msg of messages.slice(-10)) {
              if (msg.role === "user" || msg.role === "model") {
                contents.push({
                  role: msg.role,
                  parts: [{ text: msg.content || msg.text || "" }]
                });
              }
            }
          }
          contents.push({
            role: "user",
            parts: [{ text: message }]
          });

          let response: any = null;
          try {
            response = await client.models.generateContent({
              model: "gemini-3.8-flash",
              contents,
              config: {
                systemInstruction: systemPrompt,
                tools: [{ googleSearch: {} }]
              }
            });
          } catch (searchErr) {
            try {
              response = await client.models.generateContent({
                model: "gemini-3.8-flash",
                contents,
                config: {
                  systemInstruction: systemPrompt
                }
              });
            } catch (fallbackErr) {
              response = await client.models.generateContent({
                model: "gemini-3.6-flash",
                contents,
                config: {
                  systemInstruction: systemPrompt
                }
              });
            }
          }

          if (response && response.text) {
            replyText = response.text;
            apiSuccess = true;
          }
        } catch (geminiErr: any) {
          console.warn("[Gemini API Error / Quota Exceeded]:", geminiErr?.message || geminiErr);
        }
      }

      if (!replyText) {
        replyText = `Assalam-o-Alaikum! Main hoon "Ali Care", Ali Welfare Trust Hospital ka 24/7 AI Healthcare Consultant aur Problem Solver. \n\nAaj main aap ki tabiyat, doctor appointments, free dialysis program, ya Meezan Bank donations ke baray mein kis tarah madad kar sakta hoon? (Aap apna sawal Roman Urdu, Urdu ya English mein pooch sakte hain)`;
      }

      // Check if user is asking to book or schedule
      const hasBookingIntent = /book|appointment|schedule|consultation|ڈاکٹر|اپائنٹمنٹ/i.test(message);

      return res.json({
        reply: replyText,
        response: replyText,
        sources,
        hasBookingIntent,
        timestamp: Date.now()
      });
    } catch (err: any) {
      console.error("[AI Chat Route Error]", err);
      const fallbackMsg = "May you be blessed with ease and good health, Sir. I am temporarily processing requests using offline hospital knowledge. Please contact our 24/7 emergency desk at 03324711101 or try again shortly.";
      return res.status(500).json({
        error: "AI service encountered an unexpected issue: " + err.message,
        reply: fallbackMsg,
        response: fallbackMsg
      });
    }
  });

  // -----------------------------------------------------------------------
  // ADMIN AUTHENTICATION API (scrypt-hashed)
  // -----------------------------------------------------------------------
  app.post("/api/admin/login", (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
      }

      const normalizedUser = username.trim().toLowerCase();
      const validUsers = [ADMIN_USERNAME.toLowerCase(), "superadmin", "admin"];
      if (!validUsers.includes(normalizedUser)) {
        return res.status(401).json({ error: "Invalid administrative credentials." });
      }

      // Compute scrypt hash of provided password
      const providedHash = crypto.scryptSync(password.trim(), ADMIN_SCRYPT_SALT, ADMIN_KEY_LEN);
      const expectedHash = getStoredPasswordHash();

      // Timing-safe cryptographic comparison
      if (!crypto.timingSafeEqual(providedHash, expectedHash)) {
        return res.status(401).json({ error: "Invalid administrative credentials." });
      }

      // Generate cryptographically secure Bearer session token
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days session validity

      sessions[token] = {
        username: username.trim(),
        createdAt: Date.now(),
        expiresAt
      };
      saveSessions();

      console.log(`[Admin] Successful login for ${username.trim()}`);
      return res.json({
        success: true,
        token,
        user: {
          username: username.trim(),
          role: "SuperAdmin"
        },
        expiresAt
      });
    } catch (err: any) {
      console.error("[Admin Login Error]", err);
      return res.status(500).json({ error: "Authentication system error: " + err.message });
    }
  });

  // Change Admin Password (scrypt encrypted)
  app.post("/api/admin/change-password", requireAdminAuth, (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: "Both current and new passwords are required." });
      }

      const currentHash = crypto.scryptSync(currentPassword.trim(), ADMIN_SCRYPT_SALT, ADMIN_KEY_LEN);
      const storedHash = getStoredPasswordHash();

      if (!crypto.timingSafeEqual(currentHash, storedHash)) {
        return res.status(401).json({ error: "Current password does not match records." });
      }

      if (newPassword.trim().length < 8) {
        return res.status(400).json({ error: "New password must be at least 8 characters long." });
      }

      const newHash = crypto.scryptSync(newPassword.trim(), ADMIN_SCRYPT_SALT, ADMIN_KEY_LEN);
      fs.writeFileSync(AUTH_FILE, JSON.stringify({
        hashHex: newHash.toString("hex"),
        updatedAt: Date.now()
      }, null, 2), "utf-8");

      console.log("[Admin] Password successfully changed and persisted.");
      return res.json({ success: true, message: "Administrator password updated successfully." });
    } catch (err: any) {
      console.error("[Admin Change Password Error]", err);
      return res.status(500).json({ error: "Failed to update password: " + err.message });
    }
  });

  // Verify currently active Bearer session token
  app.get("/api/admin/verify", requireAdminAuth, (req, res) => {
    res.json({
      valid: true,
      username: (req as any).adminSession.username,
      expiresAt: (req as any).adminSession.expiresAt
    });
  });

  // Logout & revoke Bearer session token
  app.post("/api/admin/logout", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7).trim();
      delete sessions[token];
      saveSessions();
    }
    res.json({ success: true, message: "Logged out successfully." });
  });

  // -----------------------------------------------------------------------
  // ADMIN IMAGE UPLOAD API
  // -----------------------------------------------------------------------
  app.post("/api/admin/upload-image", requireAdminAuth, async (req: any, res: any) => {
    try {
      const { dataUrl, filename, category } = req.body;
      if (!dataUrl || typeof dataUrl !== "string") {
        return res.status(400).json({ error: "dataUrl is required." });
      }

      const commaIdx = dataUrl.indexOf(",");
      if (commaIdx === -1) {
        return res.status(400).json({ error: "Invalid image format. Expected base64 dataUrl." });
      }

      const meta = dataUrl.substring(0, commaIdx);
      const rawBase64 = dataUrl.substring(commaIdx + 1).replace(/\s/g, "");
      const buffer = Buffer.from(rawBase64, "base64");
      if (!buffer || buffer.length === 0) {
        return res.status(400).json({ error: "Uploaded image buffer is empty." });
      }

      const mimeMatch = meta.match(/data:image\/([a-zA-Z0-9+.-]+)/);
      let ext = "jpg";
      if (mimeMatch && mimeMatch[1]) {
        const rawMime = mimeMatch[1].toLowerCase();
        if (rawMime === "jpeg" || rawMime === "jpg") ext = "jpg";
        else if (rawMime.includes("png")) ext = "png";
        else if (rawMime.includes("webp")) ext = "webp";
        else if (rawMime.includes("svg")) ext = "svg";
      }

      const safeBase = (filename || category || "upload").replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
      const savedFileName = `${safeBase}_${Date.now()}.${ext}`;

      // If Supabase Admin is configured, upload to Supabase storage bucket 'website-assets' / 'hospital-images'
      if (supabaseAdmin) {
        const bucket = category === 'department' || category === 'hospital-images' ? 'hospital-images' : 'website-assets';
        const pathName = `uploads/${savedFileName}`;
        const { data, error } = await supabaseAdmin.storage
          .from(bucket)
          .upload(pathName, buffer, {
            contentType: `image/${ext}`,
            upsert: true
          });

        if (!error && data) {
          const { data: publicUrlData } = supabaseAdmin.storage.from(bucket).getPublicUrl(data.path);
          console.log(`[Supabase Storage Upload] Uploaded to ${bucket}: ${publicUrlData.publicUrl}`);
          return res.json({
            success: true,
            url: publicUrlData.publicUrl,
            filename: savedFileName
          });
        } else {
          console.error("[Supabase Storage Upload Error]:", error);
        }
      }

      // Fallback to local storage if Supabase is not configured or failed
      const imagesDir = path.join(process.cwd(), "public", "images");
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }

      const filePath = path.join(imagesDir, savedFileName);
      fs.writeFileSync(filePath, buffer);
      console.log(`[Image Upload] Saved locally ${savedFileName} (${buffer.length} bytes)`);

      return res.json({
        success: true,
        url: `/images/${savedFileName}`,
        filename: savedFileName
      });
    } catch (err: any) {
      console.error("[Image Upload Error]", err);
      return res.status(500).json({ error: err.message });
    }
  });

  // Get current permanent photos manifest and statuses
  app.get("/api/leadership-photos", (req, res) => {
    try {
      const manifestPath = path.join(process.cwd(), "public", "leadership-manifest.json");
      let manifest: Record<string, any> = {};
      if (fs.existsSync(manifestPath)) {
        manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
      }
      res.json({ status: "ok", manifest });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Upload and permanently save leadership or department photos to server filesystem
  app.post("/api/upload-leadership-photo", (req, res) => {
    try {
      const { id, dataUrl } = req.body;
      if (!id || !dataUrl) {
        return res.status(400).json({ error: "id and dataUrl are required" });
      }

      // Parse base64 dataUrl
      const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({ error: "Invalid image data format. Must be base64 dataUrl." });
      }

      const buffer = Buffer.from(matches[2], "base64");
      const publicImagesDir = path.join(process.cwd(), "public", "images");
      const srcImagesDir = path.join(process.cwd(), "src", "assets", "images");

      if (!fs.existsSync(publicImagesDir)) {
        fs.mkdirSync(publicImagesDir, { recursive: true });
      }
      if (!fs.existsSync(srcImagesDir)) {
        fs.mkdirSync(srcImagesDir, { recursive: true });
      }

      let fileNames: string[] = [];
      if (id === "nazar-alvi" || id === "founder") {
        fileNames = [
          "founder-nazar.jpg",
          "founder-nazar-alvi.jpg",
          "nazar_alvi_founder_1789126282231.jpg",
          "nazar_hussain_alvi_1789033295026.jpg"
        ];
      } else if (id === "zamin-alvi") {
        fileNames = ["ceo-zamin-alvi.jpg"];
      } else if (id === "khawar-awan") {
        fileNames = ["director-khawar-awan.jpg"];
      } else if (id === "donation-beneficiary" || id === "donation-poster") {
        fileNames = ["donation-beneficiary.jpg"];
      } else if (id === "custom-dept") {
        fileNames = ["custom-dept-facility.jpg"];
      } else {
        fileNames = [`photo-${id}.jpg`];
      }

      // Write binary file to disk in both public/images and src/assets/images
      for (const fileName of fileNames) {
        fs.writeFileSync(path.join(publicImagesDir, fileName), buffer);
        fs.writeFileSync(path.join(srcImagesDir, fileName), buffer);
      }

      // Update public/leadership-manifest.json
      const manifestPath = path.join(process.cwd(), "public", "leadership-manifest.json");
      let manifest: Record<string, any> = {};
      if (fs.existsSync(manifestPath)) {
        try {
          manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
        } catch {
          manifest = {};
        }
      }

      const timestamp = Date.now();
      manifest[id] = {
        updatedAt: timestamp,
        fileName: fileNames[0],
        url: `/images/${fileNames[0]}?t=${timestamp}`
      };
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");

      console.log(`[Upload] Permanently saved ${id} to ${fileNames.join(", ")} (${buffer.length} bytes)`);

      res.json({
        success: true,
        message: `Photo for ${id} permanently written to disk!`,
        url: `/images/${fileNames[0]}?t=${timestamp}`,
        updatedAt: timestamp
      });
    } catch (err: any) {
      console.error("[Upload] Error saving photo:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Upload and permanently save hero slider photos to server disk and live content store
  app.post("/api/upload-slider-photo", (req, res) => {
    try {
      const { dataUrl, filename, slideIndex, isNewSlide, slideData, imageUrl } = req.body;
      
      let publicUrl = imageUrl || slideData?.image;
      let savedFileName = filename || "slider_custom";

      if (dataUrl && typeof dataUrl === "string" && dataUrl.startsWith("data:image/")) {
        const commaIdx = dataUrl.indexOf(",");
        if (commaIdx === -1) {
          return res.status(400).json({ error: "Invalid image format. Expected base64 dataUrl." });
        }

        const meta = dataUrl.substring(0, commaIdx);
        const rawBase64 = dataUrl.substring(commaIdx + 1).replace(/\s/g, "");
        const buffer = Buffer.from(rawBase64, "base64");
        if (!buffer || buffer.length === 0) {
          return res.status(400).json({ error: "Uploaded image buffer is empty." });
        }

        const mimeMatch = meta.match(/data:image\/([a-zA-Z0-9+.-]+)/);
        let ext = "jpg";
        if (mimeMatch && mimeMatch[1]) {
          const rawMime = mimeMatch[1].toLowerCase();
          if (rawMime === "jpeg" || rawMime === "jpg") ext = "jpg";
          else if (rawMime.includes("png")) ext = "png";
          else if (rawMime.includes("webp")) ext = "webp";
          else if (rawMime.includes("svg")) ext = "svg";
        }

        const publicImagesDir = path.join(process.cwd(), "public", "images");
        const srcImagesDir = path.join(process.cwd(), "src", "assets", "images");

        if (!fs.existsSync(publicImagesDir)) {
          fs.mkdirSync(publicImagesDir, { recursive: true });
        }
        if (!fs.existsSync(srcImagesDir)) {
          fs.mkdirSync(srcImagesDir, { recursive: true });
        }

        // Generate clean unique filename with timestamp - NEVER use this to populate headings or captions
        const safeBase = "slide_photo";
        savedFileName = `slider_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
        
        fs.writeFileSync(path.join(publicImagesDir, savedFileName), buffer);
        try {
          fs.writeFileSync(path.join(srcImagesDir, savedFileName), buffer);
        } catch (e) {
          // Mirror ignore
        }

        publicUrl = `/images/${savedFileName}`;
        console.log(`[Slider Upload] Saved photo: ${savedFileName} (${buffer.length} bytes)`);
      } else if (!publicUrl) {
        return res.status(400).json({ error: "An image dataUrl or imageUrl is required" });
      }

      // Update central content store liveContent.hero.slides
      let content = liveContent || loadCentralContent();
      if (content && content.hero) {
        if (!Array.isArray(content.hero.slides)) {
          content.hero.slides = [];
        }

        // Cache-busted URL so browser immediately displays the new photo without stale cache
        const cacheBustedUrl = publicUrl.includes("?") 
          ? `${publicUrl.split("?")[0]}?v=${Date.now()}`
          : `${publicUrl}?v=${Date.now()}`;

        // Ensure heading is NEVER derived from the image filename
        const cleanHeading = slideData?.heading || slideData?.headline || slideData?.title || "Dedicated to Compassionate Patient Care";
        const cleanSubheading = slideData?.subheading || slideData?.highlight || slideData?.subline || "Serving Humanity with Dignity & 100% Free Medical Care";
        const cleanDescription = slideData?.description || "Providing subsidized and free treatment to all patients in need across Gujranwala.";

        const newSlideObject = {
          id: slideData?.id || `slide-${Date.now()}`,
          order: typeof slideData?.order === "number" ? slideData.order : (content.hero.slides.length + 1),
          active: slideData?.active !== false,
          image: cacheBustedUrl,
          heading: cleanHeading,
          subheading: cleanSubheading,
          description: cleanDescription,
          buttonText: slideData?.buttonText || "Book OPD Consultation",
          buttonUrl: slideData?.buttonUrl || "#booking",
          category: slideData?.category || "Specialized Department",
          badge: slideData?.badge || "Official Facility",
          urduTitle: slideData?.urduTitle || slideData?.urduTagline || "خدمتِ خلق — معیاری علاج اور شفا کا مرکز",
          urduTagline: slideData?.urduTagline || slideData?.urduTitle || "خدمتِ خلق — معیاری علاج اور شفا کا مرکز",
          location: slideData?.location || "Ali Welfare Trust Hospital, Qila Didar Singh",
          tag: slideData?.tag || "Active Department",
          // Backwards compatibility aliases
          title: cleanHeading,
          headline: cleanHeading,
          highlight: cleanSubheading,
          subline: slideData?.subline || ""
        };

        if (isNewSlide) {
          content.hero.slides.push(newSlideObject);
        } else if (slideData?.id) {
          const foundIdx = content.hero.slides.findIndex((s: any) => s.id === slideData.id);
          if (foundIdx !== -1) {
            content.hero.slides[foundIdx] = {
              ...content.hero.slides[foundIdx],
              ...newSlideObject,
              image: cacheBustedUrl
            };
          } else if (typeof slideIndex === "number" && slideIndex >= 0 && slideIndex < content.hero.slides.length) {
            content.hero.slides[slideIndex] = {
              ...content.hero.slides[slideIndex],
              ...newSlideObject,
              image: cacheBustedUrl
            };
          } else {
            content.hero.slides.push(newSlideObject);
          }
        } else if (typeof slideIndex === "number" && slideIndex >= 0 && slideIndex < content.hero.slides.length) {
          content.hero.slides[slideIndex] = {
            ...content.hero.slides[slideIndex],
            ...newSlideObject,
            image: cacheBustedUrl
          };
        } else {
          content.hero.slides.push(newSlideObject);
        }

        // Re-index orders strictly 1..N
        content.hero.slides.forEach((s: any, idx: number) => {
          s.order = idx + 1;
        });

        saveCentralContent(content);
      }

      return res.json({
        success: true,
        message: "Slider photo uploaded and saved successfully!",
        url: publicUrl,
        filename: savedFileName,
        slides: content?.hero?.slides || []
      });
    } catch (err: any) {
      console.error("[Slider Upload Error]", err);
      return res.status(500).json({ error: err.message });
    }
  });

  // Delete slide from hero slider - permanently removes slide, recalculates order, saves and broadcasts
  app.post("/api/delete-slider-photo", (req, res) => {
    try {
      const { slideIndex, slideId } = req.body;
      const content = liveContent || loadCentralContent();
      if (content && content.hero && Array.isArray(content.hero.slides)) {
        if (content.hero.slides.length <= 1) {
          return res.status(400).json({ error: "At least one slide must remain in the hero slider." });
        }

        let removedSlide: any = null;
        if (slideId) {
          const idx = content.hero.slides.findIndex((s: any) => s.id === slideId);
          if (idx !== -1) {
            removedSlide = content.hero.slides[idx];
            content.hero.slides.splice(idx, 1);
          } else if (typeof slideIndex === "number" && slideIndex >= 0 && slideIndex < content.hero.slides.length) {
            removedSlide = content.hero.slides[slideIndex];
            content.hero.slides.splice(slideIndex, 1);
          }
        } else if (typeof slideIndex === "number" && slideIndex >= 0 && slideIndex < content.hero.slides.length) {
          removedSlide = content.hero.slides[slideIndex];
          content.hero.slides.splice(slideIndex, 1);
        }

        // Re-calculate ordering so there are never holes or orphaned indices
        content.hero.slides.forEach((s: any, idx: number) => {
          s.order = idx + 1;
        });

        // If custom uploaded image and not referenced elsewhere, optionally clean up
        if (removedSlide && typeof removedSlide.image === "string" && removedSlide.image.startsWith("/images/slider_")) {
          try {
            const rawPath = removedSlide.image.split("?")[0].replace("/images/", "");
            const filePath = path.join(process.cwd(), "public", "images", rawPath);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          } catch (cleanErr) {
            console.warn("[Delete Slide] Note on file cleanup:", cleanErr);
          }
        }

        saveCentralContent(content);
      }
      return res.json({
        success: true,
        message: "Slide permanently deleted and slider updated successfully!",
        slides: content?.hero?.slides || []
      });
    } catch (err: any) {
      console.error("[Delete Slide Error]", err);
      return res.status(500).json({ error: err.message });
    }
  });

  // Save all hero slides (reorder, full edits, active status)
  app.post("/api/save-hero-slides", (req, res) => {
    try {
      const { slides } = req.body;
      if (!Array.isArray(slides) || slides.length === 0) {
        return res.status(400).json({ error: "At least one valid slide is required." });
      }

      const content = liveContent || loadCentralContent();
      if (content && content.hero) {
        // Validate each slide so no empty or null records can exist
        const cleanedSlides = slides.map((s: any, idx: number) => ({
          id: s.id || `slide-${Date.now()}-${idx}`,
          order: idx + 1,
          active: s.active !== false,
          image: s.image || "/images/hospital-building.jpg",
          heading: s.heading || s.headline || s.title || "Ali Welfare Trust Hospital",
          subheading: s.subheading || s.highlight || s.subline || "Serving Humanity with Dignity",
          description: s.description || "Providing subsidized and free treatment to all patients in need.",
          buttonText: s.buttonText || "Book OPD Consultation",
          buttonUrl: s.buttonUrl || "#booking",
          category: s.category || "Hospital Facility",
          badge: s.badge || "Official Facility",
          urduTitle: s.urduTitle || s.urduTagline || "خدمتِ خلق — معیاری علاج",
          urduTagline: s.urduTagline || s.urduTitle || "خدمتِ خلق — معیاری علاج",
          location: s.location || "Ali Welfare Trust Hospital, Qila Didar Singh",
          tag: s.tag || "Active Department",
          // Backward compatibility
          title: s.heading || s.title || "Ali Welfare Trust Hospital",
          headline: s.heading || s.headline || "Ali Welfare Trust Hospital",
          highlight: s.subheading || s.highlight || "Serving Humanity with Dignity"
        }));

        content.hero.slides = cleanedSlides;
        saveCentralContent(content);
      }

      return res.json({
        success: true,
        message: "Hero slides saved successfully!",
        slides: content?.hero?.slides || []
      });
    } catch (err: any) {
      console.error("[Save Hero Slides Error]", err);
      return res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ali Welfare Trust Hospital server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
