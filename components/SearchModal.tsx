'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './SearchModal.module.css';

const SEARCH_DATA = [
    { type: 'product', name: 'Vitamin C Brightening Serum', slug: 'vitamin-c-serum', tags: ['brightening', 'dullness', 'glow', 'vitamin c'] },
    { type: 'product', name: 'Hyaluronic Hydration Serum', slug: 'hyaluronic-serum', tags: ['hydration', 'dry', 'plumping', 'moisture'] },
    { type: 'product', name: 'Niacinamide Clarifying Serum', slug: 'niacinamide-serum', tags: ['acne', 'pores', 'oil', 'blemishes'] },
    { type: 'product', name: 'Retinol Anti-Aging Serum', slug: 'retinol-serum', tags: ['aging', 'wrinkles', 'lines', 'youth'] },
    { type: 'concern', name: 'Dry Skin Solutions', slug: 'hyaluronic-serum', tags: ['dry', 'flakey'] },
    { type: 'concern', name: 'Acne Prone Routine', slug: 'niacinamide-serum', tags: ['acne', 'breakouts'] }
];

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(SEARCH_DATA);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }
        const lowerQ = query.toLowerCase();
        const filtered = SEARCH_DATA.filter(item =>
            item.name.toLowerCase().includes(lowerQ) ||
            item.tags.some(tag => tag.includes(lowerQ))
        );
        setResults(filtered);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Search for products or concerns..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        autoFocus
                    />
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </div>
                <div className={styles.results}>
                    {results.length === 0 && query && <p className={styles.noResults}>No results found.</p>}
                    {results.length === 0 && !query && <p className={styles.placeholder}>Try typing "dry skin" or "vitamin c"</p>}

                    {results.map((item, idx) => (
                        <Link
                            key={idx}
                            href={`/product/${item.slug}`}
                            className={styles.resultItem}
                            onClick={onClose}
                        >
                            <span className={styles.resultName}>{item.name}</span>
                            <span className={styles.resultType}>{item.type === 'concern' ? 'Concern' : 'Product'}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
