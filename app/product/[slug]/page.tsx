import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/data';
import styles from './page.module.css';
import VariantSelector from '@/components/VariantSelector';
import IngredientAccordion from '@/components/IngredientAccordion';
import AddToCartButton from '@/components/AddToCartButton';
import StickyATC from '@/components/StickyATC';
import UGCGallery from '@/components/UGCGallery';

// Using PageProps type for Next.js 15+ (App Router)
// Ensure params is awaited if necessary in future versions, currently it's a promise in some configs but safe to treat as object in standard 14 setup unless dynamicIO
interface PageProps {
    params: { slug: string };
}

export async function generateStaticParams() {
    return Object.keys(PRODUCTS).map((slug) => ({
        slug: slug,
    }));
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const product = PRODUCTS[params.slug];

    if (!product) {
        notFound();
    }

    return (
        <main className={styles.main}>
            {/* Pass product data to StickyATC */}
            <StickyATC product={product} />

            <div className={styles.container}>

                <div className={styles.gallery}>
                    <div className={`${styles.imagePlaceholder} ${styles[product.variance]}`}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            priority
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>

                <div className={styles.details}>
                    <span className={styles.subtitle}>{product.subtitle}</span>
                    <h1 className={styles.title}>{product.name}</h1>
                    <p className={styles.price}>৳ {product.price.toLocaleString()}</p>

                    <VariantSelector currentSlug={product.slug} />

                    <div className={styles.description}>
                        <p>{product.description}</p>
                    </div>

                    <div className={styles.actions} id="main-atc">
                        <AddToCartButton product={product} />
                    </div>

                    <IngredientAccordion ingredients={product.activeIngredients} />

                    <UGCGallery />
                </div>
            </div>
        </main>
    );
}
