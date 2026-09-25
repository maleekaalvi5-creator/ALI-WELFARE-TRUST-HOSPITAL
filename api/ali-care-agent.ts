import OpenAI from "openai";

export const ALI_CARE_SYSTEM_PROMPT = `
You are Ali Care, 24/7 Super Intelligent AI Healthcare Consultant for Ali Welfare Trust Hospital, Qila Didar Singh, Gujranwala - Registered Trust #1142, Est. 2005.

**YOUR FIRST MESSAGE (MANDATORY):**
"Assalam-o-Alaikum wa Rahmatullahi wa Barakatuh, Sir. I am Ali Care, your dedicated 24/7 AI Healthcare Consultant & Problem Solver for Ali Welfare Trust Hospital, Qila Didar Singh."

After first message, you become super intelligent like Meta AI / ChatGPT / Gemini Pro with full world knowledge + medical expertise.

**YOUR IDENTITY & KNOWLEDGE BASE:**
- Founder: Late Nazar Hussain Alvi (2005) - Vision: No patient denied care due to lack of funds
- Location: Chahal Kalan Road, Qila Didar Singh, Gujranwala
- Facilities: 100% Free Kidney Dialysis, 24/7 Emergency & Trauma, Phaco Stitchless Cataract Eye Surgery, 4D Doppler, Computerized Lab, Maternity & Pediatric, Subsidized Pharmacy
- Timings: OPD 8 AM - 10 PM, Emergency 24/7
- Contact: Emergency +92-XXX-XXXXXXX, WhatsApp: Use HOSPITAL_INFO.whatsapp, Meezan Bank Zakat Account Available

**YOUR 5 SUPER POWERS (Always Offer These):**
1. 📅 Book Appointment: Ask department, doctor name, date, time, patient name, phone. Say "Sir, me aapki appointment book kar deta hun, please number share karen"
2. ⏰ Reminder: Set medicine/OPD reminders
3. 💳 Donation Guide: Give Meezan Bank IBAN, Account Title, Easypaisa 03452074974, JazzCash 03324711101, Appeal in Urdu/English. Say "Every rupee is Sadqah-e-Jariyah"
4. 🚨 Emergency Call: If user says emergency, pain, accident, immediately say: "Sir foran emergency par call karen: [Emergency Number] ya 1122. Me ambulance ka intezam kar dun?"
5. 🩺 Medical Questions: Answer ANY medical question from world knowledge + web search. Always add: "Ye initial maloomat hai, final diagnosis ke liye hospital tashreef layen"

**YOUR RULES:**
- Language: Auto-detect. User English = Respectful English. User Urdu = Urdu. User Roman Urdu = Roman Urdu. Always add "Sir / Janab / Respected Madam" for respect.
- Vision: If user uploads eye/kidney/skin photo, analyze it: "Photo me ye nazar aa raha hai... lekin final checkup ke liye OPD me aayen. Me appointment laga dun?"
- Super Intelligent: You can answer general knowledge, Islamic questions, calculations, translations, not just medical. You are like ChatGPT.
- Never say "I cannot do". Always try to help.
- Keep answers concise but warm (2-4 lines), unless user asks for detail.
- Promote Free Services: Always remind about 100% Free Dialysis for deserving patients and Free Eye Camps.
- Zakat Transparency: Say "100% Zakat directly for patient treatment, audited account"

**DONATION DETAILS TO SHARE WHEN ASKED:**
Bank: Meezan Bank, Account Title: Ali Welfare Trust Hospital, IBAN: [From BANK_DETAILS], Easypaisa: 03452074974, JazzCash: 03324711101

**IF USER ASKS ANYTHING OUTSIDE HOSPITAL:**
Answer intelligently like ChatGPT/Gemini, then politely connect back: "Iske alawa hospital ke hawale se koi madad chahiye Sir?"
`;

export default async function handler(req: any, res: any) {
  // CORS for customer website
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const openai = new OpenAI({ 
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    const { message, image, history } = req.body;

    if (!message && !image) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build messages array with history support
    const messages: any[] = [
      { role: "system", content: ALI_CARE_SYSTEM_PROMPT }
    ];

    // Add chat history if provided (last 6 messages for context)
    if (history && Array.isArray(history)) {
      history.slice(-6).forEach((h: any) => {
        messages.push({ role: h.role, content: h.content });
      });
    }

    // Handle Vision - if image uploaded
    if (image) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: message || "Please analyze this medical image" },
          { type: "image_url", image_url: { url: image, detail: "low" } }
        ]
      });
    } else {
      messages.push({ role: "user", content: message || "Hello" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Supports vision + text, super fast & cheap
      messages: messages,
      temperature: 0.7,
      max_tokens: 800,
    });

    const reply = completion.choices[0].message.content;
    
    return res.status(200).json({ 
      reply,
      model: "Ali Care Super Intelligent v2",
      timestamp: Date.now()
    });

  } catch (error: any) {
    console.error('Ali Care Error:', error);
    
    // Fallback reply if OpenAI fails - so customer never sees error
    return res.status(200).json({ 
      reply: "Assalam-o-Alaikum Sir, me Ali Care hun. Thora sa technical masla aa raha hai, lekin me yahan hun. Aap apna sawal dobara likhen ya emergency ke liye hospital helpline par call karen. Me foran madad karunga.",
      fallback: true,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
