'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Copy, Check, MessageSquare, Mail, Share2 } from 'lucide-react';
import { ListingDetails } from '@/lib/types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: ListingDetails;
}

export function ShareModal({ isOpen, onClose, listing }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

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

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://airbnb-clone.example.com';

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Check out this romantic stay in Goa: ${listing.title} - ${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(`Vacation stay: ${listing.title}`);
    const body = encodeURIComponent(`Hey, check out this amazing Airbnb listing in Candolim, Goa: ${currentUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Share listing"
    >
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-zinc-100 text-zinc-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-zinc-900">Share this place</h2>
          <div className="w-9" />
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Listing Preview Snippet */}
          <div className="flex items-center gap-4 p-3 bg-zinc-50 rounded-2xl border border-zinc-200/80">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-200">
              <Image
                src={listing.photos[0]?.url || ''}
                alt={listing.title}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <h3 className="font-semibold text-zinc-900 text-sm truncate">
                {listing.title}
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                ★ {listing.rating.overall} · {listing.type}
              </p>
            </div>
          </div>

          {/* Share Channels */}
          <div className="grid grid-cols-2 gap-3">
            {/* Copy Link */}
            <button
              onClick={handleCopy}
              className="p-4 rounded-2xl border border-zinc-200 hover:border-black flex flex-col items-center justify-center gap-2 text-center transition-all bg-white hover:bg-zinc-50"
            >
              {copied ? (
                <Check className="w-6 h-6 text-emerald-600" />
              ) : (
                <Copy className="w-6 h-6 text-zinc-800" />
              )}
              <span className="text-xs font-semibold text-zinc-800">
                {copied ? 'Link Copied!' : 'Copy Link'}
              </span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={handleShareWhatsApp}
              className="p-4 rounded-2xl border border-zinc-200 hover:border-black flex flex-col items-center justify-center gap-2 text-center transition-all bg-white hover:bg-zinc-50"
            >
              <MessageSquare className="w-6 h-6 text-emerald-600" />
              <span className="text-xs font-semibold text-zinc-800">
                WhatsApp
              </span>
            </button>

            {/* Email */}
            <button
              onClick={handleShareEmail}
              className="p-4 rounded-2xl border border-zinc-200 hover:border-black flex flex-col items-center justify-center gap-2 text-center transition-all bg-white hover:bg-zinc-50"
            >
              <Mail className="w-6 h-6 text-blue-600" />
              <span className="text-xs font-semibold text-zinc-800">
                Email
              </span>
            </button>

            {/* Native Share */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: listing.title,
                    text: listing.description.summary,
                    url: currentUrl,
                  }).catch(() => {});
                } else {
                  handleCopy();
                }
              }}
              className="p-4 rounded-2xl border border-zinc-200 hover:border-black flex flex-col items-center justify-center gap-2 text-center transition-all bg-white hover:bg-zinc-50"
            >
              <Share2 className="w-6 h-6 text-purple-600" />
              <span className="text-xs font-semibold text-zinc-800">
                More Options
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
