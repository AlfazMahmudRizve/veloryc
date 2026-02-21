'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import styles from './status.module.css';

function SuccessContent() {
    const searchParams = useSearchParams();
    const tran_id = searchParams.get('tran_id');
    const clearCart = useCartStore((state) => state.items.length > 0); // Logic to clear cart could be here or automated

    useEffect(() => {
        // Clear cart on successful checkout
        // useCartStore.getState().items = []; // This is a bit hacky, better use a reset if available
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.iconWrapper}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            </div>
            <h1 className={styles.title}>Order Confirmed!</h1>
            <p className={styles.message}>
                Thank you for your purchase. Your order <span className={styles.orderId}>#{tran_id?.slice(0, 8)}</span> has been received successfully.
                <br /><br />
                We've auto-created an account for you using your email. Check your inbox for account details and order tracking.
            </p>
            <div className={styles.btnGroup}>
                <Link href="/shop" className="btn btn-primary">Continue Shopping</Link>
                <Link href="/" className="btn btn-outline">Back to Home</Link>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <main className={styles.main}>
            <Suspense fallback={<div>Loading...</div>}>
                <SuccessContent />
            </Suspense>
        </main>
    );
}
