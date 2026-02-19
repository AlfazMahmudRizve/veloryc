'use client';

import React from 'react';
import Image from 'next/image';
import styles from './UGCGallery.module.css';

const MOCK_REVIEWS = [
    { id: 1, user: 'Sarah M.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80', text: 'My skin has never looked better! The Vitamin C serum is a game changer.', skinType: 'Dry' },
    { id: 2, user: 'Jessica K.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', text: 'Love the texture and how fast it absorbs. Highly recommend.', skinType: 'Oily' },
    { id: 3, user: 'Emily R.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', text: 'Results within 2 weeks. Adding this to my daily routine.', skinType: 'Combination' },
];

export default function UGCGallery() {
    return (
        <div className={styles.section}>
            <h2 className={styles.title}>Real Results from Real Users</h2>
            <div className={styles.grid}>
                {MOCK_REVIEWS.map((review) => (
                    <div key={review.id} className={styles.card}>
                        <div className={styles.imagePlaceholder}>
                            <Image
                                src={review.image}
                                alt={review.user}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className={styles.content}>
                            <p className={styles.text}>"{review.text}"</p>
                            <div className={styles.meta}>
                                <span className={styles.user}>{review.user}</span>
                                <span className={styles.skinType}>{review.skinType} Skin</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
