import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface FilterBarProps {
    categories: string[];
    sizes: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedSize: string;
    setSelectedSize: (size: string) => void;
    maxPrice: number;
    setMaxPrice: (price: number) => void;
    highestPrice: number;
}

/**
 * Filter sidebar / bar for the shop.
 * Collapsed on mobile, always visible on lg+.
 */
export default function FilterBar({
    categories,
    sizes,
    selectedCategory,
    setSelectedCategory,
    selectedSize,
    setSelectedSize,
    maxPrice,
    setMaxPrice,
    highestPrice,
}: FilterBarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const pillBase =
        'px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-1';
    const pillActive = 'bg-brand-dark text-white';
    const pillInactive = 'bg-gray-100 text-gray-700 hover:bg-gray-200';

    const squareBase =
        'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-1';

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 p-5">
            {/* Mobile toggle */}
            <button
                className="flex items-center justify-between w-full lg:hidden"
                onClick={() => setIsOpen((o) => !o)}
                aria-expanded={isOpen}
                aria-controls="filter-panel"
            >
                <span className="font-semibold flex items-center gap-2 text-sm uppercase tracking-wider">
                    <Filter className="h-4 w-4" aria-hidden="true" /> Filters
                </span>
                <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                />
            </button>

            {/* Filter groups */}
            <div
                id="filter-panel"
                className={`${isOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row gap-8 mt-4 lg:mt-0`}
            >
                {/* Category */}
                <fieldset className="flex-1 min-w-0">
                    <legend className="font-medium text-xs text-gray-500 mb-3 uppercase tracking-widest">
                        Category
                    </legend>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className={`${pillBase} ${selectedCategory === 'All' ? pillActive : pillInactive}`}
                            aria-pressed={selectedCategory === 'All'}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`${pillBase} ${selectedCategory === cat ? pillActive : pillInactive}`}
                                aria-pressed={selectedCategory === cat}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </fieldset>

                {/* Size */}
                <fieldset className="flex-1 min-w-0">
                    <legend className="font-medium text-xs text-gray-500 mb-3 uppercase tracking-widest">
                        Size
                    </legend>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedSize('All')}
                            className={`${squareBase} ${selectedSize === 'All' ? pillActive : pillInactive}`}
                            aria-pressed={selectedSize === 'All'}
                        >
                            All
                        </button>
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`${squareBase} ${selectedSize === size ? pillActive : pillInactive}`}
                                aria-pressed={selectedSize === size}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </fieldset>

                {/* Price range */}
                <fieldset className="flex-1 min-w-0">
                    <div className="flex justify-between mb-3">
                        <legend className="font-medium text-xs text-gray-500 uppercase tracking-widest">
                            Price Range
                        </legend>
                        <span className="text-sm font-semibold text-brand-dark">
                            Up to ${maxPrice.toFixed(0)}
                        </span>
                    </div>
                    <label htmlFor="price-range" className="sr-only">
                        Maximum price: ${maxPrice}
                    </label>
                    <input
                        id="price-range"
                        type="range"
                        min={0}
                        max={highestPrice}
                        step={5}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-brand-dark"
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
                        <span>$0</span>
                        <span>${highestPrice.toFixed(0)}</span>
                    </div>
                </fieldset>
            </div>
        </div>
    );
}
