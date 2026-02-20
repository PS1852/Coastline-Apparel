import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import { products } from '../data/products';

/**
 * Shop page — displays product grid with live filtering by
 * category, size, price, and URL search query.
 */
export default function Shop() {
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryParam = searchParams.get('category') ?? 'All';
    const queryParam = searchParams.get('q') ?? '';

    const [selectedCategory, setSelectedCategory] = useState(categoryParam);
    const [selectedSize, setSelectedSize] = useState('All');

    const highestPrice = Math.max(...products.map((p) => p.price));
    const [maxPrice, setMaxPrice] = useState(highestPrice);

    // Keep local state in sync when URL param changes (e.g. navbar links)
    useEffect(() => {
        setSelectedCategory(categoryParam);
    }, [categoryParam]);

    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        const next = new URLSearchParams(searchParams);
        if (cat === 'All') {
            next.delete('category');
        } else {
            next.set('category', cat);
        }
        setSearchParams(next);
    };

    const handleClearFilters = () => {
        handleCategoryChange('All');
        setSelectedSize('All');
        setMaxPrice(highestPrice);
        const next = new URLSearchParams(searchParams);
        next.delete('q');
        setSearchParams(next);
    };

    const categories = [...new Set(products.map((p) => p.category))];
    const sizes = [...new Set(products.flatMap((p) => p.size))];

    const filteredProducts = useMemo(() => {
        const lowerQuery = queryParam.toLowerCase();
        return products.filter((p) => {
            const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
            const matchSize = selectedSize === 'All' || p.size.includes(selectedSize);
            const matchPrice = p.price <= maxPrice;
            const matchSearch =
                !lowerQuery ||
                p.name.toLowerCase().includes(lowerQuery) ||
                p.description.toLowerCase().includes(lowerQuery);
            return matchCategory && matchSize && matchPrice && matchSearch;
        });
    }, [selectedCategory, selectedSize, maxPrice, queryParam]);

    const headingText = queryParam
        ? `Search: "${queryParam}"`
        : selectedCategory !== 'All'
            ? selectedCategory
            : 'The Collection';

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Page header */}
            <header className="mb-10">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-3">
                    {headingText}
                </h1>
                <p className="text-gray-500 max-w-xl">
                    Discover our full range of premium coastal apparel, crafted for effortless everyday style.
                </p>
            </header>

            {/* Filters */}
            <FilterBar
                categories={categories}
                sizes={sizes}
                selectedCategory={selectedCategory}
                setSelectedCategory={handleCategoryChange}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                highestPrice={highestPrice}
            />

            {/* Grid / empty state */}
            {filteredProducts.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold mb-2">No products found</h2>
                    <p className="text-gray-500 mb-6">Try adjusting or clearing your filters.</p>
                    <button
                        onClick={handleClearFilters}
                        className="px-6 py-3 bg-brand-dark text-white rounded-full text-sm font-semibold uppercase tracking-wide hover:bg-black transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </main>
    );
}
