import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const { shippingDetails, cartItems, total } = await req.json();
        const tran_id = uuidv4(); // Generate unique transaction ID

        // 1. Create Order in Supabase with status 'pending'
        const supabase = getSupabaseAdmin();
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                tran_id,
                total,
                status: 'pending',
                shipping_details: shippingDetails,
                email: shippingDetails.email
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Insert Order Items
        const orderItems = cartItems.map((item: any) => ({
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
            price: item.price
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        // 3. Initialize SSLCommerz
        // Note: In production, use SSLCommerz Node SDK or direct API call
        // For Sandbox purposes:
        const paymentData = {
            store_id: process.env.SSLCOMMERZ_STORE_ID,
            store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,
            total_amount: total,
            currency: 'BDT',
            tran_id: tran_id,
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success`,
            fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/fail`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/cancel`,
            cus_name: shippingDetails.name,
            cus_email: shippingDetails.email,
            cus_phone: shippingDetails.phone,
            shipping_method: 'Courier',
            product_name: 'Veloryc Products',
            product_category: 'Skincare',
            product_profile: 'general'
        };

        // Mocking the SSLCommerz redirect for now until credentials are provided
        // In a real scenario, you'd fetch the GatewayPageURL from SSLCommerz API
        const isSandbox = true;
        const gatewayUrl = isSandbox
            ? `https://sandbox.sslcommerz.com/gwprocess/v4/api.php`
            : `https://securepay.sslcommerz.com/gwprocess/v4/api.php`;

        return NextResponse.json({
            success: true,
            message: 'Order created',
            tran_id,
            // In real impl, return the redirect URL from SSLCommerz fetch
            mockGatewayUrl: '/checkout/pending'
        });

    } catch (error: any) {
        console.error('Payment Init Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
