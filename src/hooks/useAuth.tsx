import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import type { CartItem } from './useCart';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered';
}

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    orders: Order[];
    login: (email: string) => void;
    logout: () => void;
    addOrder: (order: Order) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'coastline_auth';
const ORDERS_KEY = 'coastline_orders';

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const saved = localStorage.getItem(AUTH_KEY);
            return saved ? (JSON.parse(saved) as User) : null;
        } catch {
            return null;
        }
    });

    const [orders, setOrders] = useState<Order[]>(() => {
        try {
            const saved = localStorage.getItem(ORDERS_KEY);
            return saved ? (JSON.parse(saved) as Order[]) : [];
        } catch {
            return [];
        }
    });

    // Persist auth state
    useEffect(() => {
        if (user) {
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(AUTH_KEY);
        }
    }, [user]);

    // Persist orders
    useEffect(() => {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }, [orders]);

    /** Simulated login — derives display name from email prefix */
    const login = (email: string) => {
        const name = email.split('@')[0];
        setUser({ name, email });
    };

    const logout = () => setUser(null);

    const addOrder = (order: Order) => {
        setOrders((prev) => [order, ...prev]);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                orders,
                login,
                logout,
                addOrder,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}
