'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';

interface Stats {
    totalRevenue: number;
    totalOrders: number;
    lowStockCount: number;
    activeUsers: number;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<Stats>({ totalRevenue: 0, totalOrders: 0, lowStockCount: 0, activeUsers: 0 });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/profile');
                return;
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('is_admin')
                .eq('id', user.id)
                .single();

            if (!profile?.is_admin) {
                router.push('/profile');
                return;
            }

            fetchDashboardData();
        };

        checkAdmin();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);

        // 1. Fetch Stats
        const { data: orders } = await supabase.from('orders').select('total, status');
        const { data: products } = await supabase.from('products').select('stock, name');

        const totalRevenue = orders?.filter(o => o.status === 'paid' || o.status === 'VALID').reduce((acc, curr) => acc + Number(curr.total), 0) || 0;
        const totalOrders = orders?.length || 0;
        const lowStockProducts = products?.filter(p => p.stock < 10) || [];

        setStats({
            totalRevenue,
            totalOrders,
            lowStockCount: lowStockProducts.length,
            activeUsers: 0 // Placeholder
        });

        // 2. Recent Orders
        const { data: recent } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);
        setRecentOrders(recent || []);

        setLowStockProducts(lowStockProducts);
        setLoading(false);
    };

    if (loading) return <div className={styles.content}>Loading Admin Engine...</div>;

    return (
        <div className={styles.adminContainer}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <Link href="/" className={styles.sidebarBrand}>VELORYC</Link>
                <nav className={styles.nav}>
                    <Link href="/admin" className={`${styles.navLink} ${styles.active}`}>Dashboard</Link>
                    <Link href="/admin/products" className={styles.navLink}>Products & Stock</Link>
                    <Link href="/admin/orders" className={styles.navLink}>Orders</Link>
                    <Link href="/profile" className={styles.navLink}>Settings</Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={styles.content}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Engine Overview</h1>
                    <p className={styles.subtitle}>Real-time analytics for your skincare empire.</p>
                </header>

                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    <div className={styles.card}>
                        <div className={styles.cardLabel}>Total Revenue</div>
                        <div className={styles.cardValue}>৳{stats.totalRevenue.toLocaleString()}</div>
                        <div className={`${styles.cardTrend} ${styles.up}`}>+12% from last month</div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardLabel}>Total Orders</div>
                        <div className={styles.cardValue}>{stats.totalOrders}</div>
                        <div className={`${styles.cardTrend} ${styles.up}`}>+5 new today</div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardLabel}>Stock Alerts</div>
                        <div className={styles.cardValue} style={{ color: stats.lowStockCount > 0 ? '#ef4444' : 'inherit' }}>
                            {stats.lowStockCount}
                        </div>
                        <div className={styles.cardTrend}>Products below 10 units</div>
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Recent Orders</h2>
                        <Link href="/admin/orders" className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>View All</Link>
                    </div>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Customer</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map(order => (
                                    <tr key={order.id}>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td>{order.email}</td>
                                        <td>৳{Number(order.total).toLocaleString()}</td>
                                        <td>
                                            <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {stats.lowStockCount > 0 && (
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Inventory Alerts</h2>
                        <div className={styles.tableContainer} style={{ marginTop: '20px' }}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Current Stock</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lowStockProducts.map(p => (
                                        <tr key={p.name}>
                                            <td>{p.name}</td>
                                            <td style={{ color: '#ef4444', fontWeight: 600 }}>{p.stock} units</td>
                                            <td>
                                                <Link href="/admin/products" style={{ color: 'var(--color-accent-ret)', textDecoration: 'underline' }}>
                                                    Refill
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
