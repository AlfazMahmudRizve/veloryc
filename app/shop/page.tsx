import React from 'react';
import { PRODUCTS, mapDbToProduct } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';
import { getSupabaseAdmin } from '@/lib/supabase';

export default async function ShopPage() {
    let productsArray = Object.values(PRODUCTS);

    try {
        const supabase = getSupabaseAdmin();
        const { data } = await supabase.from('products').select('*').order('name');

        if (data && data.length > 0) {
            productsArray = data.map(mapDbToProduct);
        }
    } catch (err) {
        console.error('Error fetching dynamic products:', err);
    }

    return (
        <main className={styles.main}>
            <div className={`container ${styles.container}`}>
                <header className={styles.header}>
                    <h1 className={styles.title}>The Collection</h1>
                    <p className={styles.subtitle}>
                        High-performance formulas designed for specific skin concerns.
                        Minimalist ingredients, maximalist results.
                    </p>
                </header>

                <div className={styles.grid}>
                    {productsArray.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            accentClass={product.variance === 'vitamin-c' ? 'accentC' : product.variance === 'hyaluronic' ? 'accentHa' : product.variance === 'niacinamide' ? 'accentNia' : undefined}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
