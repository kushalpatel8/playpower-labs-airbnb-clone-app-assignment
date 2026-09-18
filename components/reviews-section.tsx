'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Star,
  Sparkles,
  CheckCircle2,
  Key,
  MessageSquare,
  MapPin,
  Tag,
  SprayCan,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { ListingDetails, ReviewItem } from '@/lib/types';
import { ReviewsModal } from './reviews-modal';

interface ReviewsSectionProps {
  rating: ListingDetails['rating'];
  reviews: ReviewItem[];
}

export function ReviewsSection({ rating, reviews }: ReviewsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Tag filter pills
  const reviewTags = [
    { label: 'Comfort', count: 6, emoji: '🛋️' },
    { label: 'Accuracy', count: 5, emoji: '🎯' },
    { label: 'Hot tub', count: 5, emoji: '🛁' },
    { label: 'Condition', count: 4, emoji: '✨' },
    { label: 'Hospitality', count: 8, emoji: '🎁' },
    { label: 'Cleanliness', count: 4, emoji: '🧼' },
  ];

  return (
    <section className="py-12 border-b border-zinc-200" id="reviews">
      {/* Centerpiece Guest Favourite Trophy Header */}
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <div className="flex items-center justify-center gap-4">
          {/* Left Laurel Branch SVG */}
          <svg className="w-12 h-20 text-zinc-900" viewBox="0 0 48 80" fill="currentColor">
            <path d="M40 70 C 35 60, 20 50, 15 35 C 10 20, 20 10, 25 5 C 22 12, 16 22, 22 36 C 26 46, 36 58, 40 70 Z" />
            <path d="M30 65 C 20 60, 8 50, 6 36 C 4 22, 12 12, 18 8 C 14 16, 10 26, 15 38 C 18 47, 26 56, 30 65 Z" />
            <path d="M22 52 C 14 46, 4 36, 3 24 C 2 14, 8 6, 12 2 C 9 8, 6 18, 10 28 C 13 36, 18 44, 22 52 Z" />
          </svg>

          <span className="text-6xl sm:text-7xl font-bold tracking-tight text-zinc-900">
            {rating.overall.toFixed(2)}
          </span>

          {/* Right Laurel Branch SVG */}
          <svg className="w-12 h-20 text-zinc-900 transform scale-x-[-1]" viewBox="0 0 48 80" fill="currentColor">
            <path d="M40 70 C 35 60, 20 50, 15 35 C 10 20, 20 10, 25 5 C 22 12, 16 22, 22 36 C 26 46, 36 58, 40 70 Z" />
            <path d="M30 65 C 20 60, 8 50, 6 36 C 4 22, 12 12, 18 8 C 14 16, 10 26, 15 38 C 18 47, 26 56, 30 65 Z" />
            <path d="M22 52 C 14 46, 4 36, 3 24 C 2 14, 8 6, 12 2 C 9 8, 6 18, 10 28 C 13 36, 18 44, 22 52 Z" />
          </svg>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-2">
          Guest favourite
        </h3>
        <p className="text-zinc-600 text-sm sm:text-base max-w-md mt-1">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-sm font-semibold underline text-zinc-900 hover:text-black mt-2"
        >
          How reviews work
        </button>
      </div>

      {/* Category Breakdown Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-8 py-6 border-t border-b border-zinc-200">
        {/* Overall Rating Histogram */}
        <div className="border-r border-zinc-200/80 pr-4 flex flex-col justify-between">
          <span className="text-xs font-semibold text-zinc-700 block mb-1">Overall rating</span>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-medium">
              <span>5</span>
              <div className="flex-1 h-1 bg-zinc-900 rounded-full" />
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-medium">
              <span>4</span>
              <div className="flex-1 h-1 bg-zinc-200 rounded-full" />
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-medium">
              <span>3</span>
              <div className="flex-1 h-1 bg-zinc-200 rounded-full" />
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-medium">
              <span>2</span>
              <div className="flex-1 h-1 bg-zinc-200 rounded-full" />
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-medium">
              <span>1</span>
              <div className="flex-1 h-1 bg-zinc-200 rounded-full" />
            </div>
          </div>
        </div>

        {/* Cleanliness */}
        <div className="border-r border-zinc-200/80 pr-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-zinc-700 block">Cleanliness</span>
            <span className="text-base font-bold text-zinc-900">5.0</span>
          </div>
          <Sparkles className="w-6 h-6 text-zinc-800 stroke-[1.5] mt-2" />
        </div>

        {/* Accuracy */}
        <div className="border-r border-zinc-200/80 pr-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-zinc-700 block">Accuracy</span>
            <span className="text-base font-bold text-zinc-900">5.0</span>
          </div>
          <CheckCircle2 className="w-6 h-6 text-zinc-800 stroke-[1.5] mt-2" />
        </div>

        {/* Check-in */}
        <div className="border-r border-zinc-200/80 pr-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-zinc-700 block">Check-in</span>
            <span className="text-base font-bold text-zinc-900">5.0</span>
          </div>
          <Key className="w-6 h-6 text-zinc-800 stroke-[1.5] mt-2" />
        </div>

        {/* Communication */}
        <div className="border-r border-zinc-200/80 pr-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-zinc-700 block">Communication</span>
            <span className="text-base font-bold text-zinc-900">5.0</span>
          </div>
          <MessageSquare className="w-6 h-6 text-zinc-800 stroke-[1.5] mt-2" />
        </div>

        {/* Location */}
        <div className="border-r border-zinc-200/80 pr-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-zinc-700 block">Location</span>
            <span className="text-base font-bold text-zinc-900">4.8</span>
          </div>
          <MapPin className="w-6 h-6 text-zinc-800 stroke-[1.5] mt-2" />
        </div>

        {/* Value */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-zinc-700 block">Value</span>
            <span className="text-base font-bold text-zinc-900">4.8</span>
          </div>
          <Tag className="w-6 h-6 text-zinc-800 stroke-[1.5] mt-2" />
        </div>
      </div>

      {/* Review Category Filter Tag Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {reviewTags.map((tag, idx) => (
          <button
            key={idx}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-300 bg-white hover:border-zinc-800 hover:bg-zinc-50 text-xs font-semibold text-zinc-800 shrink-0 transition-all"
          >
            <span>{tag.emoji}</span>
            <span>{tag.label}</span>
            <span className="text-zinc-500 font-normal">{tag.count}</span>
          </button>
        ))}
      </div>

      {/* Reviews Grid (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10 mb-8">
        {reviews.slice(0, 6).map((review) => {
          const isLong = review.comment.length > 150;
          const isExpanded = !!expandedReviews[review.id];

          return (
            <div key={review.id} className="space-y-3">
              {/* Author Avatar & Info */}
              <div className="flex items-center gap-3">
                {review.author.avatar ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-200 shrink-0">
                    <Image
                      src={review.author.avatar}
                      alt={review.author.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base shrink-0 ${
                      review.author.name === 'Amit'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-purple-100 text-purple-900'
                    }`}
                  >
                    {review.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-zinc-900 text-base">
                    {review.author.name}
                  </h4>
                  <p className="text-xs text-zinc-500">
                    {review.author.yearsOnAirbnb < 1
                      ? `${Math.round(review.author.yearsOnAirbnb * 12)} months on Airbnb`
                      : `${Math.round(review.author.yearsOnAirbnb)} years on Airbnb`}
                  </p>
                </div>
              </div>

              {/* Rating Stars & Date */}
              <div className="flex items-center gap-2 text-xs text-zinc-700">
                <div className="flex text-black">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-black text-black" />
                  ))}
                </div>
                <span>·</span>
                <span className="font-semibold text-zinc-900">{review.date}</span>
              </div>

              {/* Review Text */}
              <p className="text-sm text-zinc-800 leading-relaxed">
                {isExpanded || !isLong
                  ? review.comment
                  : `${review.comment.slice(0, 150)}...`}
              </p>

              {isLong && (
                <button
                  onClick={() => toggleExpand(review.id)}
                  className="font-semibold text-sm underline text-zinc-900 hover:text-black block"
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Show all reviews button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 rounded-xl border border-zinc-900 text-zinc-900 font-semibold text-sm hover:bg-zinc-50 active:scale-[0.99] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        Show all {rating.reviewCount} reviews
      </button>

      {/* Full Reviews Modal */}
      <ReviewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rating={rating}
        reviews={reviews}
      />
    </section>
  );
}

