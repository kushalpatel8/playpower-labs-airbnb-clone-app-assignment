'use client';

import React from 'react';
import Image from 'next/image';
import { Grid, Sparkles } from 'lucide-react';
import { ListingPhoto } from '@/lib/types';

interface PhotoGridProps {
  photos: ListingPhoto[];
  onOpenPhotoTour: () => void;
  onOpenLightbox: (index: number) => void;
}

export function PhotoGrid({ photos, onOpenPhotoTour, onOpenLightbox }: PhotoGridProps) {
  // Get first 5 photos for hero display
  const heroPhotos = photos.slice(0, 5);

  return (
    <div className="relative my-6" id="photos">
      {/* 5 Photo Grid Layout matching exact Airbnb specifications */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden shadow-sm">
        {/* Main Large Hero Image (Left half - 2 cols, 2 rows) */}
        {heroPhotos[0] && (
          <div
            onClick={() => onOpenLightbox(0)}
            className="md:col-span-2 md:row-span-2 relative cursor-pointer group overflow-hidden bg-zinc-100"
            role="button"
            tabIndex={0}
            aria-label={`View photo 1: ${heroPhotos[0].caption}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(0);
              }
            }}
          >
            <Image
              src={heroPhotos[0].url}
              alt={heroPhotos[0].caption}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-90"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        )}

        {/* Top-Mid Photo */}
        {heroPhotos[1] && (
          <div
            onClick={() => onOpenLightbox(1)}
            className="hidden md:block md:col-span-1 md:row-span-1 relative cursor-pointer group overflow-hidden bg-zinc-100"
            role="button"
            tabIndex={0}
            aria-label={`View photo 2: ${heroPhotos[1].caption}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(1);
              }
            }}
          >
            <Image
              src={heroPhotos[1].url}
              alt={heroPhotos[1].caption}
              fill
              sizes="25vw"
              className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-90"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        )}

        {/* Top-Right Photo */}
        {heroPhotos[2] && (
          <div
            onClick={() => onOpenLightbox(2)}
            className="hidden md:block md:col-span-1 md:row-span-1 relative cursor-pointer group overflow-hidden bg-zinc-100"
            role="button"
            tabIndex={0}
            aria-label={`View photo 3: ${heroPhotos[2].caption}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(2);
              }
            }}
          >
            <Image
              src={heroPhotos[2].url}
              alt={heroPhotos[2].caption}
              fill
              sizes="25vw"
              className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-90"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        )}

        {/* Bottom-Mid Photo */}
        {heroPhotos[3] && (
          <div
            onClick={() => onOpenLightbox(3)}
            className="hidden md:block md:col-span-1 md:row-span-1 relative cursor-pointer group overflow-hidden bg-zinc-100"
            role="button"
            tabIndex={0}
            aria-label={`View photo 4: ${heroPhotos[3].caption}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(3);
              }
            }}
          >
            <Image
              src={heroPhotos[3].url}
              alt={heroPhotos[3].caption}
              fill
              sizes="25vw"
              className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-90"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        )}

        {/* Bottom-Right Photo */}
        {heroPhotos[4] && (
          <div
            onClick={() => onOpenLightbox(4)}
            className="hidden md:block md:col-span-1 md:row-span-1 relative cursor-pointer group overflow-hidden bg-zinc-100"
            role="button"
            tabIndex={0}
            aria-label={`View photo 5: ${heroPhotos[4].caption}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(4);
              }
            }}
          >
            <Image
              src={heroPhotos[4].url}
              alt={heroPhotos[4].caption}
              fill
              sizes="25vw"
              className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-90"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        )}
      </div>

      {/* Floating 'Show all photos' Button */}
      <button
        onClick={onOpenPhotoTour}
        className="absolute bottom-5 right-5 z-10 flex items-center gap-2 bg-white/95 hover:bg-white text-zinc-900 px-4 py-2 rounded-lg border border-zinc-900 font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        aria-label={`Show all ${photos.length} photos`}
      >
        <svg
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          className="w-4 h-4 fill-current"
        >
          <path d="M3 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3zm0 6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H3zm8-6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-2zm-2 8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V9z" />
        </svg>
        <span>Show all {photos.length} photos</span>
      </button>
    </div>
  );
}
