import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { PRODUCTS } from '@/lib/data';

export async function GET() {
    try {
        const supabase = getSupabaseAdmin();
        const productsArray = Object.values(PRODUCTS).map(p => ({
            name: p.name,
            slug: p.slug,
            description: p.description,
            price: p.price,
            category: p.variance,
            stock: 50, // Initial stock
            image_url: p.image,
            ingredients: p.activeIngredients,
            accent_class: p.variance
        }));

        const { data, error } = await supabase
            .from('products')
            .upsert(productsArray, { onConflict: 'slug' })
            .select();

        if (error) throw error;

        return NextResponse.json({ success: true, count: data.length, products: data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
