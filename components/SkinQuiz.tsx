'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './SkinQuiz.module.css';

const QUESTIONS = [
    {
        id: 'skinType',
        question: "What's your skin type?",
        options: [
            { label: 'Dry', value: 'dry' },
            { label: 'Oily', value: 'oily' },
            { label: 'Combination', value: 'combination' },
            { label: 'Normal', value: 'normal' }
        ]
    },
    {
        id: 'concern',
        question: "What's your primary skin concern?",
        options: [
            { label: 'Dullness & Dark Spots', value: 'dullness' },
            { label: 'Dehydration & Flakiness', value: 'dehydration' },
            { label: 'Acne & Pores', value: 'acne' },
            { label: 'Fine Lines & Wrinkles', value: 'aging' }
        ]
    },
    {
        id: 'sensitivity',
        question: "Is your skin sensitive?",
        options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' }
        ]
    }
];

export default function SkinQuiz() {
    const [step, setStep] = useState(0); // 0 = welcome, 1-3 = questions, 4 = result
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const handleAnswer = (value: string) => {
        const currentQuestion = QUESTIONS[step - 1];
        setAnswers({ ...answers, [currentQuestion.id]: value });
        setStep(step + 1);
    };

    const getRecommendation = () => {
        const { skinType, concern, sensitivity } = answers;

        // Logic: Prioritize sensitivity, then specific concern + skin type combos

        // 1. Sensitive Skin Guard
        if (sensitivity === 'yes') {
            // Avoid harsh actives like Retinol or high Vit C if possible, recommend Hyaluronic or Niacinamide
            if (concern === 'aging') return { name: 'Hyaluronic Hydration Serum', slug: 'hyaluronic-serum', imageColor: '#7DD3FC' }; // Retinol too harsh
            if (concern === 'acne') return { name: 'Niacinamide Clarifying Serum', slug: 'niacinamide-serum', imageColor: '#A7F3D0' }; // Niacinamide is usually okay
            return { name: 'Hyaluronic Hydration Serum', slug: 'hyaluronic-serum', imageColor: '#7DD3FC' }; // Safe bet
        }

        // 2. Specific Combinations
        if (concern === 'aging') {
            return { name: 'Retinol Anti-Aging Serum', slug: 'retinol-serum', imageColor: '#F472B6' };
        }

        if (concern === 'acne' || (skinType === 'oily' && concern === 'dullness')) {
            return { name: 'Niacinamide Clarifying Serum', slug: 'niacinamide-serum', imageColor: '#A7F3D0' };
        }

        if (concern === 'dullness') {
            return { name: 'Vitamin C Brightening Serum', slug: 'vitamin-c-serum', imageColor: '#FB923C' };
        }

        if (concern === 'dehydration' || skinType === 'dry') {
            return { name: 'Hyaluronic Hydration Serum', slug: 'hyaluronic-serum', imageColor: '#7DD3FC' };
        }

        // Default Fallback
        return { name: 'Hyaluronic Hydration Serum', slug: 'hyaluronic-serum', imageColor: '#7DD3FC' };
    };

    if (step === 0) {
        return (
            <div className={styles.intro}>
                <h1 className={styles.title}>Discover Your Perfect Formula</h1>
                <p className={styles.subtitle}>Take our 30-second quiz to find the serum tailored to your unique skin needs.</p>
                <button className="btn btn-primary" onClick={() => setStep(1)}>Start Quiz</button>
            </div>
        );
    }

    if (step <= QUESTIONS.length) {
        const question = QUESTIONS[step - 1];
        return (
            <div className={styles.questionContainer}>
                <div className={styles.progress}>
                    <span>Step {step} of {QUESTIONS.length}</span>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${(step / QUESTIONS.length) * 100}%` }}></div>
                    </div>
                </div>

                <h2 className={styles.question}>{question.question}</h2>

                <div className={styles.options}>
                    {question.options.map((opt) => (
                        <button
                            key={opt.value}
                            className={styles.optionBtn}
                            onClick={() => handleAnswer(opt.value)}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // Result Step
    const result = getRecommendation();

    return (
        <div className={styles.result}>
            <p className={styles.matchText}>We've found your match</p>
            <h2 className={styles.resultTitle}>{result.name}</h2>

            <div className={styles.resultImage} style={{ backgroundColor: result.imageColor }}>
                {/* Placeholder */}
            </div>

            <p className={styles.resultDesc}>Based on your skin type and concerns, this high-potency formula is your ideal daily serum.</p>

            <div className={styles.resultActions}>
                <Link href={`/product/${result.slug}`} className="btn btn-primary">Shop Now</Link>
                <button className="btn btn-outline" onClick={() => { setStep(0); setAnswers({}); }}>Retake Quiz</button>
            </div>
        </div>
    );
}

// Fix lint error in Result Step: "review" is not defined, copy-paste error.
// Removing "review.imageColor ||"
