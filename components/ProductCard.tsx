import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { Product } from '@/lib/data';

interface ProductCardProps {
    product: Product;
    accentClass?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, accentClass }) => {
    return (
        <Link href={`/product/${product.slug}`} className={styles.card}>
            <div className={`${styles.imageContainer} ${accentClass ? styles[accentClass] : ''}`}>
                <button
                    className={styles.wishlistBtn}
                    onClick={(e) => {
                        e.preventDefault();
                        // Wishlist logic here
                    }}
                    aria-label="Add to wishlist"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <div className={styles.cardInfo}>
                <p className={styles.price}>৳ {product.price.toLocaleString()}</p>
                <h3 className={styles.title}>{product.name}</h3>
                <p className={styles.brand}>{product.subtitle}</p>
            </div>
        </Link>
    );
};

export default ProductCard;
