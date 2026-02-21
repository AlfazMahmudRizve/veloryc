'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/lib/store';
import styles from './page.module.css';
import Link from 'next/link';

export default function CheckoutPage() {
    const { items, total } = useCartStore();
    const [isLoading, setIsLoading] = useState(false);

    if (items.length === 0) {
        return (
            <main className={styles.main}>
                <div className="container" style={{ textAlign: 'center', padding: '120px 24px' }}>
                    <h2 className={styles.sectionTitle}>Your cart is empty</h2>
                    <p style={{ marginBottom: '32px', color: 'var(--color-secondary)' }}>Add some serums to your collection to proceed.</p>
                    <Link href="/shop" className="btn btn-primary">Go to Shop</Link>
                </div>
            </main>
        );
    }

    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/payment/init', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    shippingDetails,
                    cartItems: items,
                    total
                })
            });

            const data = await response.json();

            if (data.success) {
                // In a real app with SSLCommerz keys: window.location.href = data.GatewayPageURL;

                // For testing/simulation (since we lack SSLCommerz keys/production env):
                // We automatically simulate the success callback to ensure the Auto-Account logic runs
                const formData = new FormData();
                formData.append('tran_id', data.tran_id);
                formData.append('status', 'VALID');
                formData.append('amount', total.toString());
                formData.append('bank_tran_id', 'AUTO-SIM-' + Date.now());

                const successResponse = await fetch('/api/payment/success', {
                    method: 'POST',
                    body: formData
                });

                if (successResponse.redirected) {
                    window.location.href = successResponse.url;
                } else {
                    window.location.href = `/checkout/success?tran_id=${data.tran_id}`;
                }
            } else {
                alert('Failed to initialize order: ' + data.error);
            }
        } catch (err) {
            console.error(err);
            alert('Check console for errors.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.checkoutBody}>
                    <h1 className={styles.sectionTitle}>Shipping Details</h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Full Name</label>
                            <input
                                name="name"
                                type="text"
                                className={styles.input}
                                placeholder="Enter your full name"
                                value={shippingDetails.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email Address</label>
                            <input
                                name="email"
                                type="email"
                                className={styles.input}
                                placeholder="example@domain.com"
                                value={shippingDetails.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Phone Number</label>
                            <input
                                name="phone"
                                type="tel"
                                className={styles.input}
                                placeholder="+880 1XXX-XXXXXX"
                                value={shippingDetails.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Delivery Address</label>
                            <textarea
                                name="address"
                                className={styles.input}
                                placeholder="House number, street name, area..."
                                style={{ minHeight: '120px', resize: 'vertical' }}
                                value={shippingDetails.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.placeOrderBtn} disabled={isLoading}>
                            {isLoading ? 'Processing...' : 'Proceed to Payment'}
                        </button>
                    </form>
                </div>

                <div className={styles.summary}>
                    <h2 className={styles.sectionTitle}>Order Summary</h2>
                    <div className={styles.summaryList}>
                        {items.map(item => (
                            <div key={item.id} className={styles.summaryItem}>
                                <span>{item.name} (x{item.quantity})</span>
                                <span>৳ {(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.summaryTotal}>
                        <span>Total Due</span>
                        <span>৳ {total.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
