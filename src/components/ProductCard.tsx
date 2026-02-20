import { Link } from 'react-router-dom';
import type { Product } from '../data/products';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
    product: Product;
}

/**
 * Displays a single product card with hover image swap, price, and add-to-cart.
 */
export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const hasSecondImage = product.images.length > 1;

    return (
        <article className="group relative flex flex-col overflow-hidden bg-white shadow-sm border border-gray-100 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {/* Image area */}
            <Link
                to={`/product/${product.id}`}
                className="block relative overflow-hidden"
                style={{ aspectRatio: '3/4' }}
                aria-label={`View ${product.name}`}
            >
                {/* Primary image — always visible */}
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hasSecondImage ? 'group-hover:opacity-0' : ''
                        }`}
                />

                {/* Secondary hover image — only rendered when it exists */}
                {hasSecondImage && (
                    <img
                        src={product.images[1]}
                        alt={`${product.name} alternate view`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                )}

                {!product.inStock && (
                    <div className="absolute top-3 left-3 bg-brand-dark text-white text-xs px-3 py-1 uppercase rounded tracking-widest font-bold z-10">
                        Sold Out
                    </div>
                )}
            </Link>

            {/* Card body */}
            <div className="flex flex-col flex-grow p-5">
                <div className="flex justify-between items-start mb-1">
                    <Link to={`/product/${product.id}`}>
                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-brand-accent transition-colors leading-tight">
                            {product.name}
                        </h3>
                    </Link>
                    <span className="font-bold text-gray-900 ml-2 whitespace-nowrap">
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <p className="text-sm text-gray-400 mb-4">{product.category}</p>

                <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    aria-label={`Add ${product.name} to cart`}
                    className="mt-auto w-full bg-brand-dark text-white py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg active:scale-95 uppercase tracking-wide"
                >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </article>
    );
}
