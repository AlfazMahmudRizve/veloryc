import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function AboutPage() {
    return (
        <main className={styles.main}>
            <div className="container">
                <section className={styles.hero}>
                    <span className={styles.label}>Since 2024</span>
                    <h1 className={styles.title}>Science. Simplification. Skin.</h1>
                </section>

                <div className={styles.contentGrid}>
                    <div className={styles.textBlock}>
                        <h2>Purposeful Formulation</h2>
                        <p>
                            Veloryc was born from a frustration with cluttered bathroom shelves and complex routines.
                            We believe that effective skincare starts with transparency. Every ingredient in our
                            bottles serves a purpose.
                        </p>
                    </div>
                    <div className={styles.imageBlock}>
                        <div className={styles.imagePlaceholder}>
                            <Image
                                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80"
                                alt="Laboratory Aesthetic"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className={styles.textBlock}>
                        <h2>Clinically Proven</h2>
                        <p>
                            We don't chase trends. We follow the science. Our formulations are grounded in
                            dermatological research, utilizing active ingredients at clinically effective
                            concentrations to deliver real, visible results.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
