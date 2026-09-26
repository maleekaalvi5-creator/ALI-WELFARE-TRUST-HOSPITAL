import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('id', 1)
      .single();

    if (error || !data) {
      return res.status(200).json({}); // Default fallback if empty
    }
    return res.status(200).json(data.content);
  } 
  
  if (req.method === 'POST') {
    const newContent = req.body;

    const { error } = await supabase
      .from('site_content')
      .upsert({ id: 1, content: newContent });

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(200).json({ success: true, message: 'Saved successfully!' });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
