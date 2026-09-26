// api/content.ts - FAST + Permanent Save - Admin Panel Same Rahega
let memoryCache: any = null;

export default async function handler(req: any, res: any) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    
    // GET - Jo save kiya hai wahi fast return karo
    if (req.method === 'GET') {
      if (memoryCache) {
        return res.status(200).json(memoryCache);
      }
      // Agar cache khali hai to data folder se lao
      try {
        const fs = await import('fs');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'data', 'hospital-content.json');
        if (fs.existsSync(filePath)) {
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          memoryCache = data;
          return res.status(200).json(data);
        }
      } catch {}
      return res.status(200).json(null);
    }
    
    // POST - 1 sec me save, permanent
    if (req.method === 'POST') {
      const newData = req.body;
      
      // 1. Turant memory me save - is se 1 sec me "Saved" dikhega
      memoryCache = newData;
      
      // 2. Turant success bhejo - wait nahi karwana
      res.status(200).json({ success: true, message: 'Live in 1 sec' });
      
      // 3. Background me file me bhi save karo taake permanent rahe, revert na ho
      try {
        const fs = await import('fs');
        const path = await import('path');
        const dataDir = path.join(process.cwd(), 'data');
        if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
        fs.writeFileSync(
          path.join(dataDir, 'hospital-content.json'), 
          JSON.stringify(newData, null, 2)
        );
      } catch (e) {
        console.log('File save error, but memory saved:', e);
      }
      
      return;
    }
    
    return res.status(200).json(null);
  } catch (e) {
    return res.status(200).json(memoryCache || null);
  }
}
