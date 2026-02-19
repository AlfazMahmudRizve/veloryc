export type VariantType = 'vitamin-c' | 'hyaluronic' | 'niacinamide' | 'retinol';

export interface Product {
    id: string;
    slug: string;
    name: string;
    subtitle: string;
    description: string;
    price: number;
    variance: VariantType;
    activeIngredients: { name: string; percentage: string; description: string }[];
    benefits: string[];
    skinType: string[];
    usage: string;
    image: string;
}

export const PRODUCTS: Record<string, Product> = {
    'vitamin-c-serum': {
        id: '1',
        slug: 'vitamin-c-serum',
        name: 'Vitamin C Brightening Serum',
        subtitle: 'Radiance & Even Tone',
        description: 'A potent antioxidant blend designed to brighten complexion, reduce dark spots, and protect against environmental stressors.',
        price: 5800,
        variance: 'vitamin-c',
        activeIngredients: [
            { name: 'L-Ascorbic Acid', percentage: '15%', description: 'Pure Vitamin C to brighten and firm.' },
            { name: 'Ferulic Acid', percentage: '0.5%', description: 'Enhances stability and efficacy of Vitamin C.' },
            { name: 'Vitamin E', percentage: '1%', description: 'Nourishes and protects skin barrier.' }
        ],
        benefits: ['Brightens', 'Firms', 'Protects'],
        skinType: ['Dull', 'Uneven Tone', 'All Types'],
        usage: 'Apply 3-4 drops to clean face in the morning.',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    },
    'hyaluronic-serum': {
        id: '2',
        slug: 'hyaluronic-serum',
        name: 'Hyaluronic Hydration Serum',
        subtitle: 'Deep Moisture & Plumping',
        description: 'Multi-molecular weight hyaluronic acid penetrates deep into the skin layers for lasting hydration and visible plumping.',
        price: 4950,
        variance: 'hyaluronic',
        activeIngredients: [
            { name: 'Hyaluronic Acid', percentage: '2%', description: 'Binds moisture to the skin.' },
            { name: 'Vitamin B5', percentage: '1%', description: 'Soothes and repairs skin barrier.' }
        ],
        benefits: ['Hydrates', 'Plumps', 'Smoothes'],
        skinType: ['Dry', 'Dehydrated', 'Sensitive'],
        usage: 'Apply to damp skin morning and night.',
        image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=800&q=80'
    },
    'niacinamide-serum': {
        id: '3',
        slug: 'niacinamide-serum',
        name: 'Niacinamide Clarifying Serum',
        subtitle: 'Pore Refining & Oil Control',
        description: 'High-strength vitamin and mineral blemish formula to reduce the appearance of skin blemishes and congestion.',
        price: 5200,
        variance: 'niacinamide',
        activeIngredients: [
            { name: 'Niacinamide', percentage: '10%', description: 'Reduces appearance of skin blemishes.' },
            { name: 'Zinc PCA', percentage: '1%', description: 'Balances visible sebum activity.' }
        ],
        benefits: ['Clarifies', 'Balances', 'Refines Pores'],
        skinType: ['Oily', 'Combination', 'Acne-Prone'],
        usage: 'Apply to entire face morning and evening before heavier creams.',
        image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80'
    },
    'retinol-serum': {
        id: '4',
        slug: 'retinol-serum',
        name: 'Retinol Anti-Aging Serum',
        subtitle: 'Renew & Resurface',
        description: 'A stable retinol emulsion to target general signs of skin aging, rough texture, and uneven skin tone.',
        price: 6500,
        variance: 'retinol',
        activeIngredients: [
            { name: 'Retinol', percentage: '0.5%', description: 'Promotes cell turnover and collagen production.' },
            { name: 'Squalane', percentage: '2%', description: 'Hydrates and prevents moisture loss.' }
        ],
        benefits: ['Resurfaces', 'Smooths', 'Anti-Aging'],
        skinType: ['Normal', 'Dry', 'Mature'],
        usage: 'Apply small amount in the PM. Use sun protection during the day.',
        image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=800&q=80'
    }
};
