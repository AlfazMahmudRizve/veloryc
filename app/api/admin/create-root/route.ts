import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET() {
    try {
        const supabase = getSupabaseAdmin();
        const email = 'admin@veloryc.com';
        const password = 'VelorycAdmin2026!';

        // 1. Create the user in Auth with confirmed email
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { is_admin: true }
        });

        if (authError) throw authError;

        // 2. Ensure profile exists and is admin
        const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
                id: authData.user.id,
                email: email,
                full_name: 'Veloryc Admin',
                is_admin: true
            }, { onConflict: 'id' });

        if (profileError) throw profileError;

        return NextResponse.json({
            success: true,
            message: 'Admin user created successfully',
            email: email,
            password: password
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
