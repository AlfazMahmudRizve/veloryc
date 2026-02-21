import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const paymentData = Object.fromEntries(formData.entries());

        const { tran_id, status, amount, bank_tran_id } = paymentData;

        if (status !== 'VALID') {
            return NextResponse.json({ success: false, message: 'Payment not valid' }, { status: 400 });
        }

        const supabase = getSupabaseAdmin();

        // 1. Fetch Order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .update({ status: 'paid', bank_tran_id })
            .eq('tran_id', tran_id)
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Seamless Account Creation Logic
        const userEmail = order.email;

        // Check if user already exists in our profiles table (easier than listing all auth users)
        const { data: existingProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', userEmail)
            .single();

        let finalUserId = existingProfile?.id;

        if (!finalUserId) {
            // Create New User via Admin API (Silent creation)
            const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
                email: userEmail,
                email_confirm: true, // Auto-confirm the email
                user_metadata: {
                    full_name: order.shipping_details.name,
                    phone: order.shipping_details.phone
                }
            });

            if (createError) throw createError;
            finalUserId = newUser.user.id;

            // Create Profile
            await supabase.from('profiles').insert({
                id: finalUserId,
                email: userEmail,
                full_name: order.shipping_details.name,
                phone: order.shipping_details.phone,
                address: order.shipping_details.address
            });
        }


        // 3. Associate Order with User
        await supabase
            .from('orders')
            .update({ user_id: finalUserId })
            .eq('id', order.id);

        // 4. Final Redirect to Success Page
        // Use a 303 Redirect for POST responses
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?tran_id=${tran_id}`, 303);

    } catch (error: any) {
        console.error('Payment Success Handler Error:', error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/fail`, 303);
    }
}
