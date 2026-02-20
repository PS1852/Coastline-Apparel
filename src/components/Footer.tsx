import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone } from 'lucide-react';

/** Site-wide footer with brand info, quick links, and contact details. */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brand-dark text-white pt-16 pb-8" aria-label="Site footer">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <p className="text-xl font-bold tracking-tighter uppercase text-brand-accent mb-4">
                            Coastline Apparel
                        </p>
                        <p className="text-gray-400 max-w-sm leading-relaxed mb-6">
                            Premium coastal wear designed for effortless elegance and everyday comfort.
                            Sustainably crafted for life by the sea.
                        </p>
                        <a
                            href="https://instagram.com/coastlineapparel"
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="Follow us on Instagram"
                            className="inline-block text-gray-400 hover:text-white transition-colors"
                        >
                            <Instagram className="h-5 w-5" aria-hidden="true" />
                        </a>
                    </div>

                    {/* Quick links */}
                    <nav aria-label="Footer navigation">
                        <h2 className="font-semibold text-sm tracking-widest uppercase text-gray-300 mb-4">
                            Customer Care
                        </h2>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            {[
                                { label: 'Shop All', to: '/shop' },
                                { label: 'My Account', to: '/account' },
                                { label: 'Order History', to: '/orders' },
                                { label: 'Size Guide', to: '/shop' },
                            ].map(({ label, to }) => (
                                <li key={label}>
                                    <Link to={to} className="hover:text-white transition-colors">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact */}
                    <address className="not-italic">
                        <h2 className="font-semibold text-sm tracking-widest uppercase text-gray-300 mb-4">
                            Contact
                        </h2>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="flex items-start gap-2">
                                <Mail className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                                <a
                                    href="mailto:support@coastlineapparel.com.au"
                                    className="hover:text-white transition-colors break-all"
                                >
                                    support@coastlineapparel.com.au
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                                <a href="tel:+61355500182" className="hover:text-white transition-colors">
                                    +61 3 5550 0182
                                </a>
                            </li>
                        </ul>
                    </address>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
                    <p>© {currentYear} Coastline Apparel Pty Ltd. All rights reserved.</p>
                    <p>Australia</p>
                </div>
            </div>
        </footer>
    );
}
