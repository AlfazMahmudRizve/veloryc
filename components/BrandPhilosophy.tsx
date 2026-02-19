'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BrandPhilosophy.module.css';

export default function BrandPhilosophy() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <span className={styles.label}>Our Philosophy</span>
                    <h2 className={styles.heading}>Less is More.</h2>
                    <p className={styles.text}>
                        We believe that skincare shouldn't be complicated. By focusing on
                        clinical concentrations of single active ingredients, we empower you
                        to build a routine that targets your specific needs—without the fillers,
                        fragrances, or fluff.
                    </p>
                    <Link href="/about" className="btn btn-primary">Read Our Story</Link>
                </div>
                <div className={styles.imageWrapper}>
                    <Image
                        src="https://images.unsplash.com/photo-1556228720-1957be9b9406?auto=format&fit=crop&w=800&q=80"
                        alt="Veloryc Minimalist Philosophy"
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            </div>
        </section>
    );
}
