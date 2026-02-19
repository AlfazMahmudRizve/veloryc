'use client';

import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/store';
import { Product } from '@/lib/data';
import styles from './StickyATC.module.css';

export default function StickyATC({ product }: { product: Product }) {
    const [isVisible, setIsVisible] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

    useEffect(() => {
        const handleScroll = () => {
            const mainAtc = document.getElementById('main-atc');
            if (mainAtc) {
                const rect = mainAtc.getBoundingClientRect();
                // Show if main ATC is scrolled out of view (top is negative and bottom is less than header height)
                if (rect.bottom < 80) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className={styles.bar}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <span className={styles.name}>{product.name}</span>
                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        slug: product.slug
                    })}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
