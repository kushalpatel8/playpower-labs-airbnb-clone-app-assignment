'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { NearbyStay } from '@/lib/types';

interface MoreStaysProps {
  stays?: NearbyStay[];
}

export function MoreStays({ stays = [] }: MoreStaysProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  // Alternate page 2 items for interactive carousel demonstration
  const page2Stays: NearbyStay[] = [
    {
      id: 'stay-4',
      title: 'Solitude Beach Villa with Jacuzzi',
      price: 38900,
      currencySymbol: '₹',
      rating: 4.96,
      imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'stay-5',
      title: 'Boho Sunset Penthouse, Baga',
      price: 29500,
      currencySymbol: '₹',
      rating: 4.92,
      imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'stay-6',
      title: 'Villa Azure with Infinity Pool',
      price: 52000,
      currencySymbol: '₹',
      rating: 4.98,
      imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const currentList = currentPage === 1 ? stays : page2Stays;

  return (
    <section className="py-10 border-b border-zinc-200" id="more-stays">
      {/* Header with Pagination Controls */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-zinc-900">
          More stays nearby
        </h2>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-zinc-600">
            {currentPage}/{totalPages}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center transition-all ${
                currentPage === 1
                  ? 'opacity-40 cursor-not-allowed text-zinc-400'
                  : 'hover:border-zinc-900 text-zinc-900 active:scale-95'
              }`}
              aria-label="Previous stays page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center transition-all ${
                currentPage === totalPages
                  ? 'opacity-40 cursor-not-allowed text-zinc-400'
                  : 'hover:border-zinc-900 text-zinc-900 active:scale-95'
              }`}
              aria-label="Next stays page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stay Cards Grid (3 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentList.map((stay) => (
          <div key={stay.id} className="group cursor-pointer">
            {/* Image Tile */}
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-100 mb-3 shadow-sm">
              <Image
                src={stay.imageUrl}
                alt={stay.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>

            {/* Title */}
            <h3 className="font-semibold text-zinc-900 text-sm sm:text-base truncate group-hover:text-black">
              {stay.title}
            </h3>

            {/* Price & Rating */}
            <div className="flex items-center gap-2 mt-1 text-sm text-zinc-800">
              <span className="font-semibold">
                {stay.currencySymbol}{stay.price.toLocaleString()}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 font-medium">
                <Star className="w-3.5 h-3.5 fill-black text-black" />
                {stay.rating.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
