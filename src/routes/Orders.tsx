import { Link } from 'react-router-dom';
import { Package, ArrowRight, ChevronRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

/** Displays the authenticated user's full order history. */
export default function Orders() {
    const { orders } = useAuth();

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-baseline justify-between mb-12 border-b border-gray-100 pb-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">
                    Order History
                </h1>
                <span className="text-sm text-gray-400 font-medium">
                    {orders.length} order{orders.length !== 1 ? 's' : ''}
                </span>
            </div>

            {orders.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm text-center">
                    <div className="p-5 bg-gray-50 rounded-full mb-6">
                        <Package className="h-10 w-10 text-gray-400" aria-hidden="true" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3 tracking-tight">No orders yet</h2>
                    <p className="text-gray-500 text-sm mb-8 max-w-xs">
                        When you place an order it will appear here. Start exploring our latest pieces.
                    </p>
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-dark text-white rounded-full text-sm font-semibold uppercase tracking-wide hover:bg-brand-accent hover:shadow-lg transition-all group"
                    >
                        Shop Now
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                </div>
            ) : (
                <ol className="space-y-6" aria-label="Your orders">
                    {orders.map((order) => (
                        <li
                            key={order.id}
                            className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Order meta */}
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 border-b border-gray-100 pb-6">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                                            Date
                                        </p>
                                        <p className="font-semibold text-sm text-gray-900">
                                            {new Date(order.date).toLocaleDateString('en-AU', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                                            Total
                                        </p>
                                        <p className="font-semibold text-sm text-gray-900">${order.total.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                                            Order #
                                        </p>
                                        <p className="font-mono text-sm text-gray-900">{order.id}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-green-100 text-green-700">
                                        {order.status}
                                    </span>
                                    <button
                                        aria-label={`View details for order ${order.id}`}
                                        className="flex items-center gap-1 text-xs font-semibold text-brand-accent hover:text-brand-dark uppercase tracking-wider transition-colors"
                                    >
                                        Details <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>

                            {/* Item thumbnails */}
                            <ul className="flex gap-3 overflow-x-auto pb-1" aria-label="Order items">
                                {order.items.map((item, idx) => (
                                    <li key={`${item.id}-${idx}`} className="shrink-0">
                                        <Link
                                            to={`/product/${item.id}`}
                                            aria-label={`View ${item.name}`}
                                            className="block w-20 aspect-[3/4] rounded-lg overflow-hidden border border-gray-100 hover:border-brand-dark transition-colors"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                loading="lazy"
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ol>
            )}
        </main>
    );
}
