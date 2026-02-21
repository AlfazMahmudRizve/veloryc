import React from 'react';
import { PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

export default function ShopPage() {
    const productsArray = Object.values(PRODUCTS);

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
