import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('id', 1)
        .single();

      if (error || !data) {
        return res.status(200).json({});
      }
      return res.status(200).json(data.content || {});
    } catch (err) {
      return res.status(200).json({});
    }
  } 
  
  if (req.method === 'POST') {
    try {
      const newContent = req.body;

      const { error } = await supabase
        .from('site_content')
        .upsert({ id: 1, content: newContent });

      if (error) {
        return res.status(500).json({ success: false, error: error.message });
      }

      return res.status(200).json({ success: true, message: 'Saved successfully!' });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
