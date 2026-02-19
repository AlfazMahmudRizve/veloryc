'use client';

import React from 'react';
import styles from './SkincareRoutine.module.css';

const STEPS = [
    {
        number: '01',
        title: 'Cleanse',
        description: 'Start with a gentle cleanser to remove impurities.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                <path d="M8 12C8 12 10 14 12 14C14 14 16 12 16 12" />
            </svg>
        )
    },
    {
        number: '02',
        title: 'Treat',
        description: 'Apply your specific Veloryc serum to target concerns.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L12 14" />
                <path d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 6 12 6C7.58172 6 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z" />
            </svg>
        )
    },
    {
        number: '03',
        title: 'Moisturize',
        description: 'Lock in hydration with your favorite moisturizer.',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                <line x1="16" y1="8" x2="2" y2="22" />
                <line x1="17.5" y1="15" x2="9" y2="15" />
            </svg>
        )
    }
];

export default function SkincareRoutine() {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.heading}>The Simple Routine</h2>
                <div className={styles.steps}>
                    {STEPS.map((step) => (
                        <div key={step.number} className={styles.step}>
                            <div className={styles.iconWrapper}>{step.icon}</div>
                            <span className={styles.number}>{step.number}</span>
                            <h3 className={styles.title}>{step.title}</h3>
                            <p className={styles.description}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
