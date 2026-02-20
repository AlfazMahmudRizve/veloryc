import styles from "./page.module.css";
import Image from "next/image";
import { PRODUCTS } from "@/lib/data";
import BrandPhilosophy from "@/components/BrandPhilosophy";
import SkincareRoutine from "@/components/SkincareRoutine";
import Newsletter from "@/components/Newsletter";

import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              Science-Backed.<br />
              Minimalist.<br />
              Effective.
            </h1>
            <p className={styles.subtitle}>
              High-performance serums for the modern skincare enthusiast.
            </p>
            <div className={styles.ctaGroup}>
              <Link href="/shop" className="btn btn-primary">Shop Serums</Link>
              <Link href="/quiz" className="btn btn-outline">Take Skin Quiz</Link>
            </div>
          </div>

          <div className={styles.heroImageContainer}>
            {/* Abstract Background Blobs */}
            <div className={styles.heroBgBlobs}>
              <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className={styles.blobSvg}>
                <path fill="var(--color-accent-c)" d="M42.2,-62.4C54.3,-54.6,63.5,-41.7,71.2,-27.6C78.9,-13.5,85.1,1.8,82.4,16.2C79.7,30.6,68,44,54.4,54.4C40.8,64.8,25.4,72.1,10.2,74.6C-5,77.1,-19.9,74.9,-34.5,68.2C-49.2,61.5,-63.5,50.3,-72.1,35.9C-80.6,21.5,-83.4,4,-80.6,-13C-77.8,-30,-69.3,-46.5,-55.8,-53.9C-42.2,-61.3,-21.1,-59.6,-2.8,-55.3C15.5,-51,30.1,-70.2,42.2,-62.4Z" transform="translate(250 250) scale(2)" opacity="0.08" />
                <path fill="var(--color-accent-ha)" d="M38.1,-53.2C49.1,-46.3,57.5,-35.1,64.4,-22.4C71.3,-9.6,76.6,4.7,75.1,18.8C73.6,33,65.3,47,53.4,56.7C41.5,66.4,26,71.9,10.1,74.4C-5.8,76.9,-22.1,76.4,-36.8,70.1C-51.5,63.7,-64.6,51.5,-72.7,36.8C-80.8,22.1,-83.9,4.9,-81.4,-11.5C-78.9,-27.9,-70.8,-43.6,-58.4,-50.2C-46,-56.9,-29.3,-54.6,-14.8,-52.3C-0.3,-50.1,12.1,-47.9,38.1,-53.2Z" transform="translate(250 250) scale(1.8)" opacity="0.05" />
              </svg>
            </div>

            <Image
              src="/mainone.png"
              alt="Veloryc Premium Serums"
              fill
              priority
              className={styles.heroImage}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </section>

      <section className="section container">
        <h2 className={styles.sectionTitle}>Featured Variances</h2>
        <div className={styles.grid}>
          {/* Placeholders for products */}

          <Link href="/product/vitamin-c-serum" className={styles.card}>
            <div className={`${styles.imagePlaceholder} ${styles.accentC}`}>
              <Image
                src={PRODUCTS['vitamin-c-serum'].image}
                alt="Vitamin C Serum"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3>Vitamin C Brightening</h3>
            <p>৳ 5,800</p>
          </Link>
          <Link href="/product/hyaluronic-serum" className={styles.card}>
            <div className={`${styles.imagePlaceholder} ${styles.accentHa}`}>
              <Image
                src={PRODUCTS['hyaluronic-serum'].image}
                alt="Hyaluronic Serum"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3>Hyaluronic Hydration</h3>
            <p>৳ 4,950</p>
          </Link>
          <Link href="/product/niacinamide-serum" className={styles.card}>
            <div className={`${styles.imagePlaceholder} ${styles.accentNia}`}>
              <Image
                src={PRODUCTS['niacinamide-serum'].image}
                alt="Niacinamide Serum"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3>Niacinamide Clarifying</h3>
            <p>৳ 5,200</p>
          </Link>
        </div>
      </section>

      <BrandPhilosophy />

      <SkincareRoutine />

      <Newsletter />
    </main>
  );
}
