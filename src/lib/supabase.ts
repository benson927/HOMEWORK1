import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sajltlbdungwftgxczaz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-api-key-here';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
