import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create client only if credentials are available
// Otherwise provide a mock that gracefully handles missing config
let supabase;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase credentials not configured. Contact form will not save data to database.');
  // Provide a mock client that prevents crashes
  supabase = {
    from: () => ({
      insert: async () => {
        console.warn('Supabase not configured. Data not saved.');
        return { error: { message: 'Supabase not configured' } };
      }
    })
  };
}

export { supabase };
