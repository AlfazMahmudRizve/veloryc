'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import styles from '../page.module.css';
import Link from 'next/link';

export default function AdminProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const { data } = await supabase.from('products').select('*').order('name');
        setProducts(data || []);
        setLoading(false);
    };

    const handleUpdateStock = async (id: string, newStock: number) => {
        setUpdatingId(id);
        const { error } = await supabase
            .from('products')
            .update({ stock: newStock })
            .eq('id', id);

        if (!error) {
            setProducts(products.map(p => p.id === id ? { ...p, stock: newStock } : p));
        }
        setUpdatingId(null);
    };

    const handleUpdatePrice = async (id: string, newPrice: number) => {
        setUpdatingId(id);
        const { error } = await supabase
            .from('products')
            .update({ price: newPrice })
            .eq('id', id);

        if (!error) {
            setProducts(products.map(p => p.id === id ? { ...p, price: newPrice } : p));
        }
        setUpdatingId(null);
    };

    if (loading) return <div className={styles.content}>Loading Products...</div>;

    return (
        <div className={styles.adminContainer}>
            <aside className={styles.sidebar}>
                <Link href="/" className={styles.sidebarBrand}>VELORYC</Link>
                <nav className={styles.nav}>
                    <Link href="/admin" className={styles.navLink}>Dashboard</Link>
                    <Link href="/admin/products" className={`${styles.navLink} ${styles.active}`}>Products & Stock</Link>
                    <Link href="/admin/orders" className={styles.navLink}>Orders</Link>
                    <Link href="/profile?settings=true" className={styles.navLink}>Settings</Link>
                </nav>
            </aside>

            <main className={styles.content}>
                <header className={styles.header}>
                    <div className={styles.sectionHeader}>
                        <h1 className={styles.title}>Inventory Control</h1>
                        <button className="btn btn-primary">Add New Product</button>
                    </div>
                </header>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price (৳)</th>
                                <th>Stock</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <div style={{ fontWeight: 500 }}>{product.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-secondary)' }}>/{product.slug}</div>
                                    </td>
                                    <td>{product.category}</td>
                                    <td>
                                        <input
                                            type="number"
                                            defaultValue={product.price}
                                            className={styles.inlineInput}
                                            onBlur={(e) => handleUpdatePrice(product.id, Number(e.target.value))}
                                            style={{ width: '100px' }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            defaultValue={product.stock}
                                            className={styles.inlineInput}
                                            onBlur={(e) => handleUpdateStock(product.id, Number(e.target.value))}
                                            style={{
                                                width: '80px',
                                                color: product.stock < 10 ? '#ef4444' : 'inherit'
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <span className={`${styles.status} ${product.stock < 10 ? styles.low : styles.paid}`}>
                                            {product.stock < 10 ? 'Low Stock' : 'In Stock'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
