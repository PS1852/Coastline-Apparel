import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/** 404 Not Found page. */
export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <p
                className="text-[8rem] md:text-[12rem] font-black text-gray-100 leading-none select-none"
                aria-hidden="true"
            >
                404
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase mb-4 -mt-4">
                Page Not Found
            </h1>
            <p className="text-gray-500 max-w-sm mb-8 text-sm leading-relaxed">
                The page you're looking for doesn't exist or has been moved. Head back to our store.
            </p>
            <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-dark text-white rounded-full text-sm font-semibold uppercase tracking-wide hover:bg-black hover:shadow-lg transition-all group"
            >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                Back to Home
            </Link>
        </main>
    );
}
