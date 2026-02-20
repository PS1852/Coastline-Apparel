import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart, type CartItem as CartItemType } from '../hooks/useCart';

interface CartItemProps {
    item: CartItemType;
}

/** A single line-item in the cart — quantity stepper, price, remove button. */
export default function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="flex items-start gap-5 py-6 border-b border-gray-100 last:border-0">
            {/* Thumbnail */}
            <Link to={`/product/${item.id}`} className="shrink-0" aria-label={`View ${item.name}`}>
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-28 object-cover rounded-lg shadow-sm"
                    loading="lazy"
                />
            </Link>

            {/* Details */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                    <Link to={`/product/${item.id}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-brand-accent transition-colors text-sm sm:text-base leading-tight">
                            {item.name}
                        </h3>
                    </Link>
                    <p className="font-bold text-gray-900 shrink-0 text-sm sm:text-base">
                        ${(item.price * item.quantity).toFixed(2)}
                    </p>
                </div>

                <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">{item.category}</p>

                <div className="flex items-center justify-between">
                    {/* Quantity stepper */}
                    <div
                        className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm"
                        role="group"
                        aria-label={`Quantity for ${item.name}`}
                    >
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                            className="px-3 py-2 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                        >
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <span className="px-4 font-medium text-sm" aria-live="polite">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="px-3 py-2 hover:bg-gray-50 transition-colors"
                        >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Remove */}
                    <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                    >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                        <span className="hidden sm:inline">Remove</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
