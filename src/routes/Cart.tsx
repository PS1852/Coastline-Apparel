import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import CartItemRow from '../components/CartItem';

/**
 * Cart page — lists all cart items with quantity controls,
 * totals sidebar, and checkout CTA.
 */
export default function Cart() {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    const shipping = totalPrice > 200 ? 0 : 15;
    const orderTotal = totalPrice + shipping;

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-baseline justify-between mb-10">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">Your Cart</h1>
                {cart.length > 0 && (
                    <span className="text-gray-500 font-medium text-sm">
                        {cart.length} item{cart.length !== 1 ? 's' : ''}
                    </span>
                )}
            </div>

            {cart.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm text-center">
                    <div className="p-5 bg-gray-50 rounded-full mb-6">
                        <ShoppingBag className="h-10 w-10 text-gray-400" aria-hidden="true" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3 tracking-tight">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8 max-w-sm text-sm">
                        You haven't added anything yet. Discover our latest coastal collections.
                    </p>
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-dark text-white rounded-full text-sm font-semibold uppercase tracking-wide hover:bg-brand-accent hover:shadow-lg transition-all group"
                    >
                        Start Shopping
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                </div>
            ) : (
                <div className="lg:grid lg:grid-cols-12 lg:gap-14">
                    {/* Items list */}
                    <section className="lg:col-span-8" aria-label="Cart items">
                        <div className="bg-white rounded-3xl border border-gray-100 px-6 md:px-8 pt-2 pb-4 shadow-sm">
                            <div className="flex justify-between items-center py-4 border-b border-gray-100 mb-2">
                                <h2 className="font-semibold text-sm uppercase tracking-widest text-gray-700">Items</h2>
                                <button
                                    onClick={clearCart}
                                    className="text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider"
                                >
                                    Clear All
                                </button>
                            </div>
                            {cart.map((item) => (
                                <CartItemRow key={item.id} item={item} />
                            ))}
                        </div>
                    </section>

                    {/* Order summary */}
                    <aside className="lg:col-span-4 mt-8 lg:mt-0" aria-label="Order summary">
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-sm sticky top-24">
                            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-200 pb-4 mb-5">
                                Summary
                            </h2>

                            <dl className="space-y-3 text-sm font-medium text-gray-600 mb-6">
                                <div className="flex justify-between">
                                    <dt>Subtotal</dt>
                                    <dd>${totalPrice.toFixed(2)}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt>Shipping</dt>
                                    <dd>{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</dd>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-xs text-gray-400">Free shipping on orders over $200</p>
                                )}
                            </dl>

                            <div className="flex justify-between items-center text-base font-bold text-gray-900 border-t border-gray-200 pt-5 mb-6">
                                <span>Total</span>
                                <span>${orderTotal.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full flex items-center justify-center gap-2 bg-brand-dark text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-accent hover:shadow-xl active:scale-95 transition-all group"
                            >
                                Checkout Now
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </button>

                            <p className="text-center text-xs text-gray-400 mt-4">
                                Secured by 256-bit SSL encryption
                            </p>
                        </div>
                    </aside>
                </div>
            )}
        </main>
    );
}
