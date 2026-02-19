'use client';

import React from 'react';
import styles from './Newsletter.module.css';

export default function Newsletter() {
    const [status, setStatus] = React.useState<'idle' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('success');
    };

    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.heading}>Join the Club</h2>
                <p className={styles.text}>Get early access to drops and exclusive skin tips.</p>
                {status === 'success' ? (
                    <p className={styles.successMessage}>Welcome to the club! Check your inbox soon.</p>
                ) : (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Your email"
                            className={styles.input}
                            required
                        />
                        <button type="submit" className={styles.button}>Subscribe</button>
                    </form>
                )}
            </div>
        </section>
    );
}
