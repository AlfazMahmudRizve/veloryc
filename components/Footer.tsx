'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.grid}>
                    <div className={styles.brandColumn}>
                        <Link href="/" className={styles.logo}>veloryc.</Link>
                        <p className={styles.tagline}>Science-backed minimalism for your best skin.</p>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.heading}>Shop</h4>
                        <ul className={styles.list}>
                            <li><Link href="/shop" className={styles.link}>All Serums</Link></li>
                            <li><Link href="/product/vitamin-c-serum" className={styles.link}>Vitamin C</Link></li>
                            <li><Link href="/product/hyaluronic-serum" className={styles.link}>Hyaluronic</Link></li>
                            <li><Link href="/product/niacinamide-serum" className={styles.link}>Niacinamide</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.heading}>Support</h4>
                        <ul className={styles.list}>
                            <li><Link href="/faq" className={styles.link}>FAQ</Link></li>
                            <li><Link href="/shipping" className={styles.link}>Shipping & Returns</Link></li>
                            <li><Link href="/contact" className={styles.link}>Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.heading}>Social</h4>
                        <ul className={styles.list}>
                            <li><a href="#" className={styles.link}>Instagram</a></li>
                            <li><a href="#" className={styles.link}>TikTok</a></li>
                            <li><a href="#" className={styles.link}>Twitter</a></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>&copy; {currentYear} Veloryc Skincare. All rights reserved.</p>
                    <p className={styles.credit}>
                        Designed & Built by <a href="https://whoisalfaz.me" target="_blank" rel="noopener noreferrer" className={styles.creditLink}>Alfaz Mahmud Rizve</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
