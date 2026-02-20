import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck, Mail, MapPin, CreditCard } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth, type Order } from '../hooks/useAuth';
import Modal from '../components/Modal';

/** Simulates a checkout flow with order confirmation dialog. */
export default function Checkout() {
    const { cart, totalPrice, clearCart } = useCart();
    const { addOrder, user, login } = useAuth();
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const shipping = totalPrice > 200 ? 0 : 15;
    const orderTotal = totalPrice + shipping;

    // Redirect if cart is empty (and confirmation hasn't just appeared)
    if (cart.length === 0 && !showConfirmation) {
        navigate('/cart', { replace: true });
        return null;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate async API call
        setTimeout(() => {
            const order: Order = {
                id: `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
                date: new Date().toISOString(),
                items: [...cart],
                total: orderTotal,
                status: 'Processing',
            };

            addOrder(order);

            // Auto-create guest session if not logged in
            if (!user) login('guest@coastlineapparel.com.au');

            setIsProcessing(false);
            setShowConfirmation(true);
        }, 1800);
    };

    const handleConfirmClose = () => {
        setShowConfirmation(false);
        clearCart();
        navigate('/orders');
    };

    const inputCls =
        'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-colors';

    const sectionHeading = (icon: React.ReactNode, label: string) => (
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
            {icon}
            <h2 className="text-lg font-bold uppercase tracking-wide">{label}</h2>
        </div>
    );

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-bold tracking-tighter uppercase mb-12 border-b border-gray-100 pb-6">
                Checkout
            </h1>

            <div className="lg:grid lg:grid-cols-12 lg:gap-14">
                {/* ── Form ──────────────────────────────────────────────────── */}
                <form
                    onSubmit={handleSubmit}
                    className="lg:col-span-8 space-y-10 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
                    noValidate
                    aria-label="Checkout form"
                >
                    {/* Contact */}
                    <section aria-labelledby="contact-heading">
                        {sectionHeading(
                            <Mail className="h-5 w-5 text-brand-accent" aria-hidden="true" />,
                            'Contact'
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <label htmlFor="email" className="block text-xs font-bold mb-1.5 uppercase tracking-widest text-gray-600">
                                    Email Address *
                                </label>
                                <input id="email" type="email" required placeholder="you@example.com" className={inputCls} />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-xs font-bold mb-1.5 uppercase tracking-widest text-gray-600">
                                    Phone Number
                                </label>
                                <input id="phone" type="tel" placeholder="+61 400 000 000" className={inputCls} />
                            </div>
                        </div>
                    </section>

                    {/* Shipping */}
                    <section aria-labelledby="shipping-heading">
                        {sectionHeading(
                            <MapPin className="h-5 w-5 text-brand-accent" aria-hidden="true" />,
                            'Shipping Address'
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="first-name" className="block text-xs font-bold mb-1.5 uppercase tracking-widest text-gray-600">
                                    First Name *
                                </label>
                                <input id="first-name" type="text" required placeholder="John" className={inputCls} />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-xs font-bold mb-1.5 uppercase tracking-widest text-gray-600">
                                    Last Name *
                                </label>
                                <input id="last-name" type="text" required placeholder="Doe" className={inputCls} />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="address" className="block text-xs font-bold mb-1.5 uppercase tracking-widest text-gray-600">
                                    Street Address *
                                </label>
                                <input id="address" type="text" required placeholder="123 Beach Rd" className={inputCls} />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-xs font-bold mb-1.5 uppercase tracking-widest text-gray-600">
                                    City *
                                </label>
                                <input id="city" type="text" required placeholder="Melbourne" className={inputCls} />
                            </div>
                            <div>
                                <label htmlFor="postcode" className="block text-xs font-bold mb-1.5 uppercase tracking-widest text-gray-600">
                                    Postcode *
                                </label>
                                <input id="postcode" type="text" required placeholder="3000" className={inputCls} />
                            </div>
                        </div>
                    </section>

                    {/* Payment */}
                    <section aria-labelledby="payment-heading">
                        {sectionHeading(
                            <CreditCard className="h-5 w-5 text-brand-accent" aria-hidden="true" />,
                            'Payment Details'
                        )}

                        <div className="flex items-start gap-4 bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                            <ShieldCheck className="h-6 w-6 text-green-500 shrink-0" aria-hidden="true" />
                            <div>
                                <p className="font-semibold text-sm text-gray-900">Secure Encrypted Payment</p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Your payment info is encrypted. We never store card details.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <label htmlFor="card-number" className="block text-xs font-bold mb-1.5 uppercase tracking-widest text-gray-600">
                                    Card Number *
                                </label>
                                <input
                                    id="card-number"
                                    type="text"
                                    required
                                    placeholder="0000 0000 0000 0000"
                                    maxLength={19}
                                    className={`${inputCls} font-mono`}
                                />
                            </div>
                            <div>
                                <label htmlFor="card-expiry" className="block text-xs font-bold mb-1.5 uppercase tracking-widest text-gray-600">
                                    Expiry Date *
                                </label>
                                <input id="card-expiry" type="text" required placeholder="MM / YY" maxLength={7} className={`${inputCls} font-mono`} />
                            </div>
                            <div>
                                <label htmlFor="card-cvc" className="block text-xs font-bold mb-1.5 uppercase tracking-widest text-gray-600">
                                    CVC *
                                </label>
                                <input id="card-cvc" type="text" required placeholder="123" maxLength={4} className={`${inputCls} font-mono`} />
                            </div>
                        </div>
                    </section>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full py-5 rounded-xl font-bold text-sm uppercase tracking-widest bg-brand-dark text-white hover:bg-brand-accent hover:shadow-xl active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                    >
                        {isProcessing ? (
                            <span className="flex items-center justify-center gap-3">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Processing…
                            </span>
                        ) : (
                            'Confirm Order'
                        )}
                    </button>
                </form>

                {/* ── Order summary sidebar ──────────────────────────────── */}
                <aside className="lg:col-span-4 mt-8 lg:mt-0" aria-label="Order summary">
                    <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-sm sticky top-24">
                        <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-200 pb-4 mb-6">
                            Your Order
                        </h2>

                        <ul className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-1" aria-label="Cart items summary">
                            {cart.map((item) => (
                                <li key={item.id} className="flex gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-14 h-20 object-cover rounded-lg shrink-0"
                                        loading="lazy"
                                    />
                                    <div className="text-sm">
                                        <p className="font-semibold text-gray-900 leading-tight">{item.name}</p>
                                        <p className="text-gray-400 text-xs mt-0.5">Qty: {item.quantity}</p>
                                        <p className="font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <dl className="space-y-3 text-sm font-medium text-gray-600 border-t border-gray-200 pt-5">
                            <div className="flex justify-between">
                                <dt>Subtotal</dt>
                                <dd>${totalPrice.toFixed(2)}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt>Shipping</dt>
                                <dd>
                                    {shipping === 0 ? (
                                        <span className="text-green-600">Free</span>
                                    ) : (
                                        `$${shipping.toFixed(2)}`
                                    )}
                                </dd>
                            </div>
                            <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-200 pt-3 mt-1">
                                <dt>Total</dt>
                                <dd>${orderTotal.toFixed(2)}</dd>
                            </div>
                        </dl>
                    </div>
                </aside>
            </div>

            {/* ── Order Confirmed Modal ───────────────────────────────── */}
            <Modal isOpen={showConfirmation} onClose={handleConfirmClose} title="Order Confirmed!">
                <div className="text-center py-4">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-5" aria-hidden="true" />
                    <h3 className="text-2xl font-bold mb-3">Thank You!</h3>
                    <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                        Your order has been placed. A confirmation email will be sent with your tracking details.
                    </p>
                    <button
                        onClick={handleConfirmClose}
                        className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-accent hover:shadow-lg active:scale-95 transition-all"
                    >
                        View My Orders
                    </button>
                </div>
            </Modal>
        </main>
    );
}
