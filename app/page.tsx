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
        <div className="container">
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

        {/* Abstract Abstract SVG Background Elements */}
        <div className={styles.bgShape1}>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#F2F2F2" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.2C93.4,8.9,81.8,22.2,70.8,33.4C59.8,44.6,49.3,53.8,37.8,61.7C26.3,69.6,13.8,76.3,-0.9,77.9C-15.6,79.4,-30.9,75.8,-43.6,67.6C-56.3,59.3,-66.4,46.5,-73.9,32.3C-81.4,18.1,-86.3,2.5,-84.3,-12.3C-82.3,-27.1,-73.4,-41.1,-61.6,-51.1C-49.8,-61.1,-35.1,-67.1,-21.2,-70.6C-7.4,-74.1,5.6,-75.1,19,-73.8L30.5,-83.6" transform="translate(100 100)" />
          </svg>
        </div>
      </section>

      <section className="section container">
        <h2 className={styles.sectionTitle}>Featured Variances</h2>
        <div className={styles.grid}>
          {/* Placeholders for products */}

          <div className={styles.card}>
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
            <p>$48.00</p>
          </div>
          <div className={styles.card}>
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
            <p>$42.00</p>
          </div>
          <div className={styles.card}>
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
            <p>$45.00</p>
          </div>
        </div>
      </section>

      <BrandPhilosophy />

      <SkincareRoutine />

      <Newsletter />
    </main>
  );
}
