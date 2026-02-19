'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './VariantSelector.module.css';

const VARIANTS = [
    { slug: 'vitamin-c', name: 'Vitamin C', color: '#FB923C', label: 'Brightening' },
    { slug: 'hyaluronic', name: 'Hyaluronic', color: '#7DD3FC', label: 'Hydration' },
    { slug: 'niacinamide', name: 'Niacinamide', color: '#A7F3D0', label: 'Clarifying' },
    { slug: 'retinol', name: 'Retinol', color: '#F472B6', label: 'Anti-Aging' }
];

// Map slug to product URL slug (assuming specific mapping or just direct)
// In my data.ts, slugs are 'vitamin-c-serum', 'hyaluronic-serum'. 
// I should align the selector to match the actual product slugs.

const PRODUCT_MAP = [
    { id: 'vitamin-c', urlSlug: 'vitamin-c-serum', color: 'var(--color-accent-c)', label: 'Vitamin C' },
    { id: 'hyaluronic', urlSlug: 'hyaluronic-serum', color: 'var(--color-accent-ha)', label: 'Hyaluronic' },
    // Adding placeholders for others if they exist in data, or I'll stick to the 2 I created.
];

export default function VariantSelector({ currentSlug }: { currentSlug: string }) {
    return (
        <div className={styles.container}>
            <p className={styles.label}>Select Variance:</p>
            <div className={styles.options}>
                {PRODUCT_MAP.map((variant) => (
                    <Link
                        key={variant.id}
                        href={`/product/${variant.urlSlug}`}
                        className={`${styles.option} ${currentSlug === variant.urlSlug ? styles.active : ''}`}
                        style={{ '--variant-color': variant.color } as React.CSSProperties}
                    >
                        <span className={styles.swatch}></span>
                        <span className={styles.name}>{variant.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
