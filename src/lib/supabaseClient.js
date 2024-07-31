import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://xjufokryrjfeviokdskr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdWZva3J5cmpmZXZpb2tkc2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5NDAxMzAsImV4cCI6MjAzNzUxNjEzMH0.fW653bdqqlDxInRD7nUFqjc0v_Vc6ak8Mo_ny906xI4";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

