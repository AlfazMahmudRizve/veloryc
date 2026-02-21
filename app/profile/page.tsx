'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import styles from './page.module.css';
import Link from 'next/link';

interface Order {
    id: string;
    created_at: string;
    status: string;
    total: number;
    tran_id: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchUserAndOrders = async () => {
            setLoading(true);
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError) {
                console.log('No active user session found:', userError.message);
                setUser(null);
            } else {
                console.log('User session found:', user?.email);
                setUser(user);

                // Fetch orders for this user
                if (user) {
                    const { data: ordersData, error: ordersError } = await supabase
                        .from('orders')
                        .select('*')
                        .eq('user_id', user.id)
                        .order('created_at', { ascending: false });

                    if (!ordersError) setOrders(ordersData || []);
                }
            }
            setLoading(false);
        };

        fetchUserAndOrders();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log('Auth state changed:', _event, session?.user?.email);
            setUser(session?.user ?? null);
            if (session?.user) {
                // If auth state changes to logged in, refresh orders
                supabase
                    .from('orders')
                    .select('*')
                    .eq('user_id', session.user.id)
                    .order('created_at', { ascending: false })
                    .then(({ data }) => setOrders(data || []));
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/profile`
            }
        });
        if (error) alert(error.message);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setOrders([]);
    };

    if (loading) return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.loadingSpinner}></div>
                <p>Syncing profile...</p>
            </div>
        </main>
    );

    if (!user) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Account</h1>
                    <p className={styles.subtitle}>Sign in to view your orders and manage your skin routine.</p>

                    <button className={styles.googleBtn} onClick={handleGoogleLogin}>
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c3.08 0 5.68-1.02 7.57-2.77l-3.57-2.77c-1.01.68-2.31 1.09-4 1.09-3.08 0-5.68-2.08-6.61-4.88H1.67v3.01C3.54 20.35 7.49 23 12 23z" />
                            <path fill="#FBBC05" d="M5.39 13.67C5.15 12.92 5 12.13 5 11.33c0-.8.15-1.59.39-2.34V5.98H1.67C.6 8.08 0 10.43 0 12.92s.6 4.84 1.67 6.94l3.72-3.04.1.85z" />
                            <path fill="#EA4335" d="M12 5.07c1.67 0 3.17.58 4.35 1.71l3.27-3.27C17.68 1.5 15.08.5 12 .5c-4.51 0-8.46 2.65-10.33 6.44l3.72 3.04C6.32 7.15 8.92 5.07 12 5.07z" />
                        </svg>
                        Sign in with Google
                    </button>

                    <p className={styles.footerText}>
                        Problems signing in? Ensure Google OAuth is enabled in Supabase.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={styles.dashboardGrid}>
                {/* Profile Sidebar */}
                <div className={styles.container}>
                    <h1 className={styles.title}>Dashboard</h1>
                    <p className={styles.subtitle}>Welcome back, {user.user_metadata.full_name || user.email?.split('@')[0]}</p>

                    <div className={styles.profileInfo}>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Email Address</span>
                            <span className={styles.value}>{user.email}</span>
                        </div>
                    </div>

                    <button className={styles.logoutBtn} onClick={handleLogout}>Sign Out</button>
                </div>

                {/* Order History */}
                <div className={styles.orderSection}>
                    <h2 className={styles.sectionTitle}>Order History</h2>
                    {orders.length === 0 ? (
                        <div className={styles.emptyOrders}>
                            <p>You haven't placed any orders yet.</p>
                            <Link href="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>Start Shopping</Link>
                        </div>
                    ) : (
                        <div className={styles.orderList}>
                            {orders.map((order) => (
                                <div key={order.id} className={styles.orderCard}>
                                    <div className={styles.orderHeader}>
                                        <span className={styles.orderDate}>
                                            {new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className={styles.orderDetails}>
                                        <p className={styles.orderId}>ID: {(order.tran_id || order.id).slice(0, 8)}</p>
                                        <p className={styles.orderAmount}>Total: ৳{order.total?.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
