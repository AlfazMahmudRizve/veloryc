'use client';

import React from 'react';
import { useCartStore } from '@/lib/store';
import { Product } from '@/lib/data';

export default function AddToCartButton({ product, className }: { product: Product, className?: string }) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            slug: product.slug
        });
    };

    return (
        <button className={`btn btn-primary ${className}`} onClick={handleAddToCart} style={{ width: '100%' }}>
            Add to Cart — ${product.price.toFixed(2)}
        </button>
    );
}
