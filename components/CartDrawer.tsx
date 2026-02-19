'use client';

import React from 'react';
import styles from './CartDrawer.module.css';
import { useCartStore } from '@/lib/store';
import Image from 'next/image';

function CartItems() {
    const items = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);

    if (items.length === 0) {
        return <p>Your cart is currently empty.</p>;
    }

    return (
        <div style={{ width: '100%' }}>
            {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', textAlign: 'left' }}>
                    <div>
                        <p style={{ fontWeight: 600 }}>{item.name}</p>
                        <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Quantity: {item.quantity}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p>৳ {(item.price * item.quantity).toLocaleString()}</p>
                        <button onClick={() => removeItem(item.id)} style={{ fontSize: '0.7rem', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}>Remove</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function CartTotal() {
    const total = useCartStore((state) => state.total);
    return <span>৳ {total.toLocaleString()}</span>;
}

export default function CartDrawer() {
    const { isOpen, closeCart } = useCartStore();

    return (
        <>
            <div
                className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
                onClick={closeCart}
            />
            <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Your Cart</h2>
                    <button onClick={closeCart} className={styles.closeBtn} aria-label="Close cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className={styles.content}>
                    <CartItems />
                </div>

                <div className={styles.footer}>
                    <div className={styles.subtotal}>
                        <span>Subtotal</span>
                        <CartTotal />
                    </div>
                    <button className={styles.checkoutBtn}>Checkout</button>
                </div>
            </div >
        </>
    );
}
