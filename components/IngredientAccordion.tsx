'use client';

import React, { useState } from 'react';
import styles from './IngredientAccordion.module.css';

interface Ingredient {
    name: string;
    percentage: string;
    description: string;
}

interface Props {
    ingredients: Ingredient[];
}

export default function IngredientAccordion({ ingredients }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.container}>
            <button
                className={styles.trigger}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className={styles.title}>Ingredient Transparency Matrix</span>
                <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
            </button>

            <div className={`${styles.content} ${isOpen ? styles.open : ''}`}>
                <div className={styles.grid}>
                    <div className={styles.headerRow}>
                        <span>Active</span>
                        <span>Conc.</span>
                        <span>Function</span>
                    </div>
                    {ingredients.map((ing, i) => (
                        <div key={i} className={styles.row}>
                            <span className={styles.name}>{ing.name}</span>
                            <span className={styles.conc}>{ing.percentage}</span>
                            <span className={styles.desc}>{ing.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
