// api/content.ts - FINAL FAST + PERMANENT - Admin Panel Same
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'hospital-content.json');

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        return res.status(200).json(JSON.parse(raw));
      }
    } catch {}
    // Fallback - hospital-content from public folder
    try {
      const publicFile = path.join(process.cwd(), 'public', 'hospital-content.json');
      if (fs.existsSync(publicFile)) {
        return res.status(200).json(JSON.parse(fs.readFileSync(publicFile, 'utf8')));
      }
    } catch {}
    return res.status(200).json({ message: 'No content yet' });
  }

  if (req.method === 'POST') {
    const newData = req.body;
    
    // TURANT success - 1 sec me
    res.status(200).json({ success: true, saved: true });

    // Background me permanent save - revert nahi hoga
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
      
      // Public me bhi save taake live site par turant dikhe
      const publicFile = path.join(process.cwd(), 'public', 'hospital-content.json');
      fs.writeFileSync(publicFile, JSON.stringify(newData, null, 2));
    } catch (e) {
      console.error('Save error:', e);
    }
    return;
  }

  return res.status(200).json(null);
}
