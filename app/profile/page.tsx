'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import styles from './page.module.css';
import Link from 'next/link';

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        fetchUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
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
    };

    if (loading) return (
        <main className={styles.main}>
            <div className={styles.container}>
                <p>Loading profile...</p>
            </div>
        </main>
    );

    if (!user) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Join Veloryc</h1>
                    <p className={styles.subtitle}>Log in to track your orders and personalized skin routine.</p>

                    <button className={styles.googleBtn} onClick={handleGoogleLogin}>
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c3.08 0 5.68-1.02 7.57-2.77l-3.57-2.77c-1.01.68-2.31 1.09-4 1.09-3.08 0-5.68-2.08-6.61-4.88H1.67v3.01C3.54 20.35 7.49 23 12 23z" />
                            <path fill="#FBBC05" d="M5.39 13.67C5.15 12.92 5 12.13 5 11.33c0-.8.15-1.59.39-2.34V5.98H1.67C.6 8.08 0 10.43 0 12.92s.6 4.84 1.67 6.94l3.72-3.04.1.85z" />
                            <path fill="#EA4335" d="M12 5.07c1.67 0 3.17.58 4.35 1.71l3.27-3.27C17.68 1.5 15.08.5 12 .5c-4.51 0-8.46 2.65-10.33 6.44l3.72 3.04C6.32 7.15 8.92 5.07 12 5.07z" />
                        </svg>
                        Continue with Google
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Welcome, {user.user_metadata.full_name || 'Skinner'}</h1>
                <p className={styles.subtitle}>Manage your account and view your collection.</p>

                <div className={styles.profileInfo}>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Email</span>
                        <span className={styles.value}>{user.email}</span>
                    </div>
                    {/* Add more profile fields here from profiles table if needed */}
                </div>

                <div className={styles.btnGroup} style={{ marginTop: '40px' }}>
                    <Link href="/shop" className="btn btn-primary" style={{ width: '100%' }}>Shop More</Link>
                </div>

                <button className={styles.logoutBtn} onClick={handleLogout}>Log Out</button>
            </div>
        </main>
    );
}
