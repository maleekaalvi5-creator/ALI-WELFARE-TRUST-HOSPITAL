// api/content.ts - Fixed - Loop Breaker + Save Fix
import type { NextApiRequest, NextApiResponse } from 'next';

let cachedContent: any = null;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // null ki jagah {} bhejo - loop khatam
    return res.status(200).json(cachedContent || {});
  }

  if (req.method === 'POST') {
    cachedContent = req.body;
    // Turant success - Saving 1 sec me
    return res.status(200).json({ success: true, saved: true });
  }

  return res.status(200).json(cachedContent || {});
}
