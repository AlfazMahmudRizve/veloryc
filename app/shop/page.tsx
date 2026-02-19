'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/data';
import styles from './page.module.css';

export default function ShopPage() {
    return (
        <main className={styles.main}>
            <div className="container">
                <header className={styles.header}>
                    <h1 className={styles.title}>All Serums</h1>
                    <p className={styles.subtitle}>Targeted treatments for every skin concern.</p>
                </header>

                <div className={styles.grid}>
                    {Object.values(PRODUCTS).map((product) => (
                        <Link href={`/product/${product.slug}`} key={product.id} className={styles.card}>
                            <div className={`${styles.imageWrapper} ${styles[product.variance]}`}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.productName}>{product.name}</h3>
                                <p className={styles.productPrice}>৳ {product.price.toLocaleString()}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
