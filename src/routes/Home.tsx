import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Home page — hero banner + featured category cards.
 */
export default function Home() {
    return (
        <div className="flex flex-col">
            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <section
                className="relative flex items-center justify-center min-h-screen overflow-hidden"
                aria-label="Hero"
            >
                <div className="absolute inset-0 -z-10">
                    <img
                        src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2560"
                        alt=""
                        role="presentation"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/45" />
                </div>

                <div className="text-center text-white px-4 max-w-3xl mx-auto space-y-6">
                    <p className="text-brand-accent font-semibold tracking-widest uppercase text-sm">
                        New Season — Now Live
                    </p>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-tight">
                        Embrace the<br />Coastal Life
                    </h1>
                    <p className="text-lg md:text-xl font-light text-gray-200 max-w-xl mx-auto leading-relaxed">
                        Premium, sustainably crafted apparel designed for effortless elegance by the sea.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                        <Link
                            to="/shop"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-dark rounded-full font-semibold text-sm uppercase tracking-wide hover:bg-brand-accent hover:text-white transition-all shadow-xl group"
                        >
                            Shop Collection
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </Link>
                        <Link
                            to="/shop?category=Accessories"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/60 text-white rounded-full font-semibold text-sm uppercase tracking-wide hover:bg-white/10 transition-all"
                        >
                            Accessories
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Featured Categories ───────────────────────────────────────── */}
            <section className="py-24 bg-brand-light" aria-label="Featured categories">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
                            Curated For You
                        </h2>
                        <div className="w-20 h-1 bg-brand-accent mx-auto mt-4" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                label: 'Women',
                                sub: 'New Arrivals',
                                to: '/shop?category=Women',
                                img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200',
                            },
                            {
                                label: 'Men',
                                sub: 'Essentials',
                                to: '/shop?category=Men',
                                img: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?auto=format&fit=crop&q=80&w=1200',
                            },
                        ].map(({ label, sub, to, img }) => (
                            <Link
                                key={label}
                                to={to}
                                className="group relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl block"
                                aria-label={`Shop ${label}`}
                            >
                                <img
                                    src={img}
                                    alt={`${label} collection`}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                                    <p className="text-brand-accent font-semibold tracking-widest uppercase text-xs mb-2">
                                        {sub}
                                    </p>
                                    <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
                                        {label}
                                    </h3>
                                    <span className="inline-flex items-center gap-2 text-sm font-semibold group-hover:text-brand-accent transition-colors">
                                        Explore Now
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
