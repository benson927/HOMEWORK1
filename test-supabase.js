import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sajltlbdungwftgxczaz.supabase.co';
const supabaseAnonKey = 'your-api-key-here'; // If they haven't set it in .env, this will fail
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.from('stocks').select('*');
  console.log("Data:", data, "Error:", error);
}

test();
