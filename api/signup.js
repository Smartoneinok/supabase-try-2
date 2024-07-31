import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://xjufokryrjfeviokdskr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdWZva3J5cmpmZXZpb2tkc2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5NDAxMzAsImV4cCI6MjAzNzUxNjEzMH0.fW653bdqqlDxInRD7nUFqjc0v_Vc6ak8Mo_ny906xI4"
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    res.status(200).json({ user: data.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
