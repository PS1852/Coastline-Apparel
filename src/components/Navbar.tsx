import { type FormEvent, useState, type ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, Anchor } from 'lucide-react';
import { useCart } from '../hooks/useCart';

/**
 * Fixed navigation bar — glassmorphism style, responsive mobile menu,
 * inline search form, and live cart count badge.
 */
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [query, setQuery] = useState('');
    const { totalItems } = useCart();
    const navigate = useNavigate();

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;
        navigate(`/shop?q=${encodeURIComponent(trimmed)}`);
        setQuery('');
        setIsMenuOpen(false);
    };

    const closeMenu = () => setIsMenuOpen(false);

    const navLinks = [
        { label: 'Shop All', to: '/shop' },
        { label: 'Men', to: '/shop?category=Men' },
        { label: 'Women', to: '/shop?category=Women' },
        { label: 'Accessories', to: '/shop?category=Accessories' },
    ];

    return (
        <header className="fixed top-0 inset-x-0 z-50 glass shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-xl font-bold tracking-tighter uppercase"
                        aria-label="Coastline Apparel — home"
                    >
                        <Anchor className="h-6 w-6 text-brand-accent" aria-hidden="true" />
                        <span>Coastline</span>
                    </Link>

                    {/* Desktop nav links */}
                    <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
                        {navLinks.map(({ label, to }) => (
                            <Link
                                key={label}
                                to={to}
                                className="text-sm font-medium text-gray-600 hover:text-brand-accent transition-colors"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop actions */}
                    <div className="hidden md:flex items-center gap-5">
                        <form onSubmit={handleSearch} role="search" className="relative">
                            <label htmlFor="desktop-search" className="sr-only">Search products</label>
                            <input
                                id="desktop-search"
                                type="search"
                                placeholder="Search…"
                                value={query}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                                className="pl-9 pr-4 py-1.5 w-44 rounded-full border border-gray-200 bg-white/70 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" aria-hidden="true" />
                        </form>

                        <Link to="/account" aria-label="My account">
                            <User className="h-5 w-5 text-gray-600 hover:text-brand-accent transition-colors" />
                        </Link>

                        <Link to="/cart" aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? 's' : ''}`} className="relative">
                            <ShoppingBag className="h-5 w-5 text-gray-600 hover:text-brand-accent transition-colors" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent text-[10px] font-bold text-white">
                                    {totalItems > 9 ? '9+' : totalItems}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile: cart + hamburger */}
                    <div className="flex md:hidden items-center gap-4">
                        <Link to="/cart" aria-label={`Cart — ${totalItems} items`} className="relative">
                            <ShoppingBag className="h-5 w-5 text-gray-600" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent text-[10px] font-bold text-white">
                                    {totalItems > 9 ? '9+' : totalItems}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen((o) => !o)}
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                            className="text-gray-600"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu drawer */}
            {isMenuOpen && (
                <div className="md:hidden glass border-t border-white/20 absolute inset-x-0 top-16 pb-4 shadow-lg">
                    <div className="px-4 pt-3 space-y-1">
                        {/* Mobile search */}
                        <form onSubmit={handleSearch} role="search" className="relative mb-3">
                            <label htmlFor="mobile-search" className="sr-only">Search products</label>
                            <input
                                id="mobile-search"
                                type="search"
                                placeholder="Search…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
                        </form>

                        {navLinks.map(({ label, to }) => (
                            <Link
                                key={label}
                                to={to}
                                onClick={closeMenu}
                                className="block px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                {label}
                            </Link>
                        ))}
                        <Link
                            to="/account"
                            onClick={closeMenu}
                            className="flex items-center gap-2 px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <User className="h-4 w-4" /> Account
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
