import { type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

/**
 * Accessible modal overlay.
 * Renders nothing when closed — no DOM presence.
 */
export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/60">
                    {title && (
                        <h2 id="modal-title" className="text-lg font-bold tracking-tight">
                            {title}
                        </h2>
                    )}
                    <button
                        onClick={onClose}
                        aria-label="Close dialog"
                        className="ml-auto text-gray-400 hover:text-gray-900 transition-colors p-1.5 hover:bg-white rounded-full"
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
