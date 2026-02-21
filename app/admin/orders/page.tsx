'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import styles from '../page.module.css';
import Link from 'next/link';

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });
        setOrders(data || []);
        setLoading(false);
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', id);

        if (!error) {
            setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
        }
    };

    if (loading) return <div className={styles.content}>Loading Orders...</div>;

    return (
        <div className={styles.adminContainer}>
            <aside className={styles.sidebar}>
                <Link href="/" className={styles.sidebarBrand}>VELORYC</Link>
                <nav className={styles.nav}>
                    <Link href="/admin" className={styles.navLink}>Dashboard</Link>
                    <Link href="/admin/products" className={styles.navLink}>Products & Stock</Link>
                    <Link href="/admin/orders" className={`${styles.navLink} ${styles.active}`}>Orders</Link>
                    <Link href="/profile" className={styles.navLink}>Settings</Link>
                </nav>
            </aside>

            <main className={styles.content}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Orders</h1>
                    <p className={styles.subtitle}>Complete history of transactions and customer details.</p>
                </header>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>
                                        <div style={{ fontWeight: 500 }}>{order.tran_id.slice(0, 8)}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>ID: {order.id.slice(0, 8)}</div>
                                    </td>
                                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <div>{order.shipping_details?.name || 'Guest'}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-secondary)' }}>{order.email}</div>
                                    </td>
                                    <td style={{ fontWeight: 600 }}>৳{Number(order.total).toLocaleString()}</td>
                                    <td>
                                        <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            style={{ padding: '6px', borderRadius: '4px', border: '1px solid var(--navbar-border)', background: 'var(--background)' }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="paid">Paid/Valid</option>
                                            <option value="failed">Failed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
