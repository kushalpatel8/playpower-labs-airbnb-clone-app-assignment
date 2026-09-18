'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Search, Star } from 'lucide-react';
import { ReviewItem, ListingDetails } from '@/lib/types';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rating: ListingDetails['rating'];
  reviews: ReviewItem[];
}

export function ReviewsModal({ isOpen, onClose, rating, reviews }: ReviewsModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredReviews = reviews.filter(
    (r) =>
      r.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.author.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="All guest reviews"
    >
      <div className="bg-white w-full max-w-4xl max-h-[88vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-zinc-100 text-zinc-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-black text-black" />
            <span className="font-bold text-zinc-900 text-base">
              {rating.overall.toFixed(2)} · {rating.reviewCount} reviews
            </span>
          </div>
          <div className="w-9" />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-8 flex-1">
          {/* Left Column: Rating breakdown */}
          <div className="md:col-span-4 space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold text-zinc-900 text-base">Overall rating</h3>
              <div className="space-y-2.5 text-xs font-medium text-zinc-700">
                {Object.entries(rating.categories).map(([category, score]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="capitalize">{category.replace(/([A-Z])/g, ' $1')}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1 bg-zinc-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-zinc-900 rounded-full"
                          style={{ width: `${(score / 5) * 100}%` }}
                        />
                      </div>
                      <span className="w-5 text-right font-semibold text-zinc-900">{score.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Search + Review Cards */}
          <div className="md:col-span-8 space-y-6">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reviews (e.g., jacuzzi, clean, host)..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="space-y-6 divide-y divide-zinc-100">
              {filteredReviews.length === 0 ? (
                <p className="text-zinc-500 text-sm py-4">No reviews matching your search query.</p>
              ) : (
                filteredReviews.map((review) => (
                  <div key={review.id} className="pt-6 first:pt-0 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden bg-zinc-200">
                        <Image
                          src={review.author.avatar}
                          alt={review.author.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-zinc-900 text-sm">{review.author.name}</h4>
                        <p className="text-xs text-zinc-500">
                          {review.author.location} · {review.author.yearsOnAirbnb} years on Airbnb
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <div className="flex text-black">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-black text-black" />
                        ))}
                      </div>
                      <span>·</span>
                      <span className="font-medium text-zinc-800">{review.date}</span>
                      {review.stayDuration && (
                        <>
                          <span>·</span>
                          <span>{review.stayDuration}</span>
                        </>
                      )}
                    </div>

                    <p className="text-sm text-zinc-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
