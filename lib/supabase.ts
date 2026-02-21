import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase environment variables are missing! Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your .env.local file in the veloryc directory.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


// Admin client for restricted operations like auto-creating users after payment
export const getSupabaseAdmin = () => {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
};
