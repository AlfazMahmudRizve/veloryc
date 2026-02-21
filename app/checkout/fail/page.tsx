'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import styles from '../status.module.css';

function FailContent() {
    return (
        <div className={styles.container}>
            <div className={`${styles.iconWrapper} ${styles.iconFail}`}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            </div>
            <h1 className={styles.title}>Payment Failed</h1>
            <p className={styles.message}>
                We couldn't process your payment. Please try again or use a different payment method.
            </p>
            <div className={styles.btnGroup}>
                <Link href="/checkout" className="btn btn-primary">Try Again</Link>
                <Link href="/shop" className="btn btn-outline">Back to Shop</Link>
            </div>
        </div>
    );
}

export default function FailPage() {
    return (
        <main className={styles.main}>
            <Suspense fallback={<div>Loading...</div>}>
                <FailContent />
            </Suspense>
        </main>
    );
}
