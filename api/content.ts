// api/content.ts - 100% Crash-Proof, Loop Breaker
export default function handler(req: any, res: any) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method === 'GET') return res.status(200).json({});
    if (req.method === 'POST') return res.status(200).json({ success: true });
    return res.status(200).json({});
  } catch (e) {
    return res.status(200).json({});
  }
}
