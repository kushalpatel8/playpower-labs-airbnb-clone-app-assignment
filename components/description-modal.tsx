'use client';

import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { ListingDetails } from '@/lib/types';

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: ListingDetails['description'];
  title: string;
}

export function DescriptionModal({ isOpen, onClose, description, title }: DescriptionModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="About this space"
    >
      <div className="bg-white w-full max-w-2xl max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-zinc-100 text-zinc-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-zinc-900">About this space</h2>
          <div className="w-9" />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm sm:text-base text-zinc-700 leading-relaxed">
          <p className="font-medium text-zinc-900">{description.summary}</p>

          <div className="pt-4 border-t border-zinc-100">
            <h3 className="font-bold text-zinc-900 mb-2">The space</h3>
            <p className="whitespace-pre-line text-sm text-zinc-700 leading-relaxed">
              {description.space}
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-100">
            <h3 className="font-bold text-zinc-900 mb-2">Guest access</h3>
            <p className="text-sm text-zinc-700 leading-relaxed">
              {description.guestAccess}
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-100">
            <h3 className="font-bold text-zinc-900 mb-2">Other things to note</h3>
            <p className="whitespace-pre-line text-sm text-zinc-700 leading-relaxed">
              {description.otherNotes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
