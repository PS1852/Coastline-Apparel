// ─────────────────────────────────────────────────────────────────────────────
// Product catalogue — all images sourced from Unsplash (free-to-use)
// ─────────────────────────────────────────────────────────────────────────────

export type Category = 'Men' | 'Women' | 'Accessories';

export interface Product {
    id: string;
    name: string;
    price: number;
    category: Category;
    size: string[];
    /** Primary card image */
    image: string;
    /** All gallery images (first should match `image`) */
    images: string[];
    description: string;
    inStock: boolean;
}

export const products: Product[] = [
    {
        id: 'p1',
        name: 'Classic Linen Shirt',
        price: 89.99,
        category: 'Men',
        size: ['S', 'M', 'L', 'XL'],
        image:
            'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=800',
        ],
        description:
            'A breathable, stylish linen shirt perfect for warm coastal days. Designed for comfort and effortless elegance with a relaxed tailored fit.',
        inStock: true,
    },
    {
        id: 'p2',
        name: 'Ocean Breeze Dress',
        price: 120.0,
        category: 'Women',
        size: ['XS', 'S', 'M', 'L'],
        image:
            'https://images.unsplash.com/photo-1566479179817-4d1e4f9b5ee5?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1566479179817-4d1e4f9b5ee5?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1572804013309-82a89b4f9104?auto=format&fit=crop&q=80&w=800',
        ],
        description:
            'Flowy, lightweight summer dress featuring delicate floaty layers. Hand-finished details for a premium coastal look.',
        inStock: true,
    },
    {
        id: 'p3',
        name: 'Woven Straw Hat',
        price: 45.0,
        category: 'Accessories',
        size: ['OS'],
        image:
            'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1533827432537-70133748f5c8?auto=format&fit=crop&q=80&w=800',
        ],
        description:
            'Wide-brimmed straw hat providing excellent sun protection. A must-have accessory for beach days.',
        inStock: true,
    },
    {
        id: 'p4',
        name: 'Knitted Summer Cardigan',
        price: 95.0,
        category: 'Women',
        size: ['S', 'M', 'L'],
        image:
            'https://images.unsplash.com/photo-1434389678232-05f32ea07172?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1434389678232-05f32ea07172?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
        ],
        description:
            'Cozy yet breathable knitted cardigan for breezy evenings by the shore. Pairs beautifully with our Ocean Breeze Dress.',
        inStock: true,
    },
    {
        id: 'p5',
        name: 'Tailored Chino Shorts',
        price: 65.0,
        category: 'Men',
        size: ['30', '32', '34', '36'],
        image:
            'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1598522325074-042db73aa4e6?auto=format&fit=crop&q=80&w=800',
        ],
        description:
            'Premium cotton-blend shorts with a tailored fit. Durable, comfortable, and effortlessly stylish for all-day wear.',
        inStock: true,
    },
    {
        id: 'p6',
        name: 'Leather Crossbody Bag',
        price: 150.0,
        category: 'Accessories',
        size: ['OS'],
        image:
            'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
        ],
        description:
            'Genuine leather crossbody bag with minimalist design and solid brass hardware. Compact and versatile for coastal adventures.',
        inStock: true,
    },
    {
        id: 'p7',
        name: 'Relaxed Linen Trousers',
        price: 110.0,
        category: 'Women',
        size: ['XS', 'S', 'M', 'L', 'XL'],
        image:
            'https://images.unsplash.com/photo-1594938298603-c8148c4b4f9b?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1594938298603-c8148c4b4f9b?auto=format&fit=crop&q=80&w=800',
        ],
        description:
            'Wide-leg linen trousers in a soft natural weave. The ideal balance between smart and relaxed coastal style.',
        inStock: true,
    },
    {
        id: 'p8',
        name: 'Merino Knit Polo',
        price: 130.0,
        category: 'Men',
        size: ['S', 'M', 'L', 'XL', 'XXL'],
        image:
            'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&q=80&w=800',
        ],
        description:
            'Superfine merino polo with a classic fit. Regulates temperature perfectly for mornings on the water through to sunset dinners.',
        inStock: false,
    },
];
