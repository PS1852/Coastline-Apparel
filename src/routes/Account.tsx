import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Package, Settings, CreditCard, MapPin } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

/** Account page — login form for unauthenticated users, dashboard for authenticated. */
export default function Account() {
    const { user, login, logout, orders } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim()) return;
        login(email.trim());
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    /* ── Not logged in ─────────────────────────────────────────── */
    if (!user) {
        return (
            <main className="flex items-center justify-center min-h-[80vh] px-4">
                <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-xl p-8">
                    <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200">
                            <User className="h-8 w-8 text-gray-400" aria-hidden="true" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-center tracking-tighter uppercase mb-1">
                        Welcome Back
                    </h1>
                    <p className="text-center text-gray-500 text-sm mb-8">
                        Sign in to view your orders and speed up checkout.
                    </p>

                    <form onSubmit={handleLogin} className="space-y-5" aria-label="Sign in form">
                        <div>
                            <label htmlFor="login-email" className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-1.5">
                                Email Address
                            </label>
                            <input
                                id="login-email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-brand-dark text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-black hover:shadow-lg active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2"
                        >
                            Sign In
                        </button>

                        <p className="text-center text-xs text-gray-400">
                            By signing in, you agree to our{' '}
                            <span className="underline cursor-pointer hover:text-brand-dark transition-colors">
                                Terms of Service
                            </span>
                        </p>
                    </form>
                </div>
            </main>
        );
    }

    /* ── Logged in ─────────────────────────────────────────────── */
    const navLinks = [
        { icon: Package, label: 'Order History', to: '/orders' },
        { icon: MapPin, label: 'Saved Addresses', to: null },
        { icon: CreditCard, label: 'Payment Methods', to: null },
        { icon: Settings, label: 'Account Settings', to: null },
    ];

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header */}
            <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">My Account</h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-500 uppercase tracking-widest transition-colors"
                    aria-label="Sign out"
                >
                    <LogOut className="h-4 w-4" aria-hidden="true" /> Sign Out
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <aside className="md:col-span-1" aria-label="Account navigation">
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm sticky top-24">
                        {/* Avatar + name */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-12 w-12 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-lg uppercase shrink-0">
                                {user.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                                <p className="font-bold text-gray-900 truncate">{user.name}</p>
                                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                            </div>
                        </div>

                        <nav aria-label="Account sections">
                            <ul className="space-y-1">
                                {navLinks.map(({ icon: Icon, label, to }) => {
                                    const cls =
                                        'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left';
                                    return (
                                        <li key={label}>
                                            {to ? (
                                                <Link
                                                    to={to}
                                                    className={`${cls} bg-gray-50 text-brand-dark hover:bg-gray-100`}
                                                >
                                                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> {label}
                                                </Link>
                                            ) : (
                                                <button className={`${cls} text-gray-500 hover:bg-gray-50`}>
                                                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> {label}
                                                </button>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>
                </aside>

                {/* Main content */}
                <div className="md:col-span-3">
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold uppercase tracking-wide">Recent Orders</h2>
                            <Link
                                to="/orders"
                                className="text-xs font-bold text-brand-accent hover:text-brand-dark uppercase tracking-widest transition-colors"
                            >
                                View All
                            </Link>
                        </div>

                        {orders.length === 0 ? (
                            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                <p className="text-gray-500 text-sm mb-3">No orders yet.</p>
                                <Link to="/shop" className="text-brand-accent text-sm font-bold hover:underline">
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-100" aria-label="Recent orders">
                                {orders.slice(0, 4).map((order) => (
                                    <li key={order.id}>
                                        <Link
                                            to="/orders"
                                            className="flex flex-col sm:flex-row justify-between sm:items-center py-4 hover:bg-gray-50 -mx-4 px-4 rounded-xl transition-colors group"
                                        >
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-0.5">
                                                    {new Date(order.date).toLocaleDateString('en-AU')}
                                                </p>
                                                <p className="font-mono font-bold text-sm text-gray-900 group-hover:text-brand-accent transition-colors">
                                                    {order.id}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4 mt-2 sm:mt-0">
                                                <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700">
                                                    {order.status}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
