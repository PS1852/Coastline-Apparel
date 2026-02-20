import p1Image from '../assets/p1_linen_shirt.png';
import p2Image from '../assets/p2_summer_dress.png';
import p3Image from '../assets/p3_straw_hat.png';
import p4Image from '../assets/p4_summer_cardigan.png';
import p5Image from '../assets/p5_chino_shorts.png';
import p6Image from '../assets/p6_crossbody_bag.png';
import p7Image from '../assets/p7_linen_trousers.png';
import p8Image from '../assets/p8_merino_polo.png';

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
        image: p1Image,
        images: [p1Image],
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
        image: p2Image,
        images: [p2Image],
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
        image: p3Image,
        images: [p3Image],
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
        image: p4Image,
        images: [p4Image],
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
        image: p5Image,
        images: [p5Image],
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
        image: p6Image,
        images: [p6Image],
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
        image: p7Image,
        images: [p7Image],
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
        image: p8Image,
        images: [p8Image],
        description:
            'Superfine merino polo with a classic fit. Regulates temperature perfectly for mornings on the water through to sunset dinners.',
        inStock: false,
    },
];
