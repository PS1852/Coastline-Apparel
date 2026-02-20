import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Heart, ShieldCheck, Truck } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';

/**
 * Product detail page — image gallery, size selector, add-to-cart.
 */
export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const product = products.find((p) => p.id === id);
    const { addToCart } = useCart();

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [sizeError, setSizeError] = useState(false);
    const [added, setAdded] = useState(false);

    const [prevId, setPrevId] = useState(id);

    if (id !== prevId) {
        setPrevId(id);
        setSelectedImageIndex(0);
        setSelectedSize('');
        setSizeError(false);
        setAdded(false);
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
                <button
                    onClick={() => navigate('/shop')}
                    className="inline-flex items-center gap-2 text-brand-accent hover:underline font-medium"
                >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Shop
                </button>
            </div>
        );
    }

    const needsSize = product.size.length > 0 && product.size[0] !== 'OS';

    const handleAddToCart = () => {
        if (needsSize && !selectedSize) {
            setSizeError(true);
            return;
        }
        addToCart(product, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 2500);
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            {/* Back */}
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-dark transition-colors mb-10 uppercase tracking-widest"
                aria-label="Go back"
            >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                {/* ── Image Gallery ─────────────────────────────────────────── */}
                <div className="space-y-4">
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50">
                        <img
                            src={product.images[selectedImageIndex]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {product.images.length > 1 && (
                        <div className="flex gap-3" role="list" aria-label="Product gallery thumbnails">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImageIndex(idx)}
                                    role="listitem"
                                    aria-label={`View image ${idx + 1}`}
                                    aria-current={selectedImageIndex === idx}
                                    className={`relative w-20 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all shrink-0 ${selectedImageIndex === idx
                                        ? 'border-brand-dark scale-105'
                                        : 'border-transparent hover:border-gray-200 opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Product Info ───────────────────────────────────────────── */}
                <div className="flex flex-col">
                    <p className="text-brand-accent font-semibold tracking-widest uppercase text-xs mb-2">
                        {product.category}
                    </p>
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tighter mb-3">{product.name}</h1>
                    <p className="text-2xl font-light text-gray-400 mb-6">${product.price.toFixed(2)}</p>

                    <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

                    {/* Size selector */}
                    {needsSize && (
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-medium text-sm uppercase tracking-widest">Select Size</span>
                                {sizeError && (
                                    <span className="text-red-500 text-xs font-medium" role="alert">
                                        Please select a size
                                    </span>
                                )}
                            </div>
                            <div className="grid grid-cols-4 gap-2" role="group" aria-label="Size options">
                                {product.size.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => {
                                            setSelectedSize(size);
                                            setSizeError(false);
                                        }}
                                        aria-pressed={selectedSize === size}
                                        className={`py-3 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-1 ${selectedSize === size
                                            ? 'border-brand-dark bg-brand-dark text-white shadow-md'
                                            : 'border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="flex gap-3 mb-10">
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            aria-label={added ? `${product.name} added to cart` : `Add ${product.name} to cart`}
                            className={`flex-1 py-4 px-6 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${added
                                ? 'bg-green-500 text-white shadow-lg shadow-green-500/30 focus:ring-green-500'
                                : 'bg-brand-dark text-white hover:bg-black hover:shadow-xl active:scale-95 focus:ring-brand-dark'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {added ? (
                                <>
                                    <Check className="h-4 w-4" aria-hidden="true" /> Added to Cart
                                </>
                            ) : product.inStock ? (
                                'Add to Cart'
                            ) : (
                                'Out of Stock'
                            )}
                        </button>

                        <button
                            aria-label="Save to wishlist"
                            className="p-4 rounded-xl border border-gray-200 text-gray-500 hover:border-brand-dark hover:text-brand-dark transition-all"
                        >
                            <Heart className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Trust icons */}
                    <div className="grid grid-cols-2 gap-5 pt-6 border-t border-gray-100">
                        <div className="flex gap-3">
                            <Truck className="h-5 w-5 text-brand-accent shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                                <p className="font-semibold text-sm">Free Express Delivery</p>
                                <p className="text-xs text-gray-500 mt-0.5">On orders over $200</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <ShieldCheck className="h-5 w-5 text-brand-accent shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                                <p className="font-semibold text-sm">Quality Guaranteed</p>
                                <p className="text-xs text-gray-500 mt-0.5">30-day free returns</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
