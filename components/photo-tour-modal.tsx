'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, X, Share2, Heart } from 'lucide-react';
import { ListingPhoto } from '@/lib/types';

interface PhotoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: ListingPhoto[];
  onOpenLightbox: (index: number) => void;
  onOpenShare?: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export function PhotoTourModal({
  isOpen,
  onClose,
  photos,
  onOpenLightbox,
  onOpenShare,
  isSaved = false,
  onToggleSave,
}: PhotoTourModalProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Categories list
  const categories = ['All', 'Living room', 'Bedroom', 'Jacuzzi & Pool', 'Kitchen & Dining', 'Bathroom', 'Balcony & Views'];

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter photos by category or show all grouped
  const filteredPhotos = activeCategory === 'All'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  // Group photos by category for the full view
  const groupedCategories = categories.filter((c) => c !== 'All').map((category) => ({
    category,
    photos: photos.filter((p) => p.category === category),
  })).filter((group) => group.photos.length > 0);

  const scrollToCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
    if (categoryName === 'All') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(`tour-category-${categoryName.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour gallery"
    >
      {/* Sticky Top Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 text-zinc-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            aria-label="Back to listing"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold text-zinc-900 text-base sm:text-lg">
            Photo tour
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenShare}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg hover:bg-zinc-100 text-zinc-800 font-medium text-sm transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            onClick={onToggleSave}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg hover:bg-zinc-100 text-zinc-800 font-medium text-sm transition-colors"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#FF385C] text-[#FF385C]' : ''}`} />
            <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 text-zinc-800 transition-colors ml-2"
            aria-label="Close photo tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Pills Navigation Bar */}
      <div className="sticky top-[61px] z-30 bg-white border-b border-zinc-100 px-4 sm:px-8 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar shadow-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => scrollToCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Photos Stream */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-12">
        {activeCategory !== 'All' ? (
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">
              {activeCategory} ({filteredPhotos.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPhotos.map((photo) => {
                const originalIndex = photos.findIndex((p) => p.id === photo.id);
                return (
                  <div
                    key={photo.id}
                    onClick={() => onOpenLightbox(originalIndex >= 0 ? originalIndex : 0)}
                    className="group cursor-pointer rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                      <Image
                        src={photo.url}
                        alt={photo.caption}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-zinc-900 text-sm">{photo.caption}</p>
                      {photo.description && (
                        <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{photo.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          groupedCategories.map((group) => (
            <section
              key={group.category}
              id={`tour-category-${group.category.replace(/\s+/g, '-').toLowerCase()}`}
              className="scroll-mt-36"
            >
              <div className="flex items-center justify-between mb-4 border-b border-zinc-100 pb-2">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
                  {group.category}
                </h2>
                <span className="text-xs sm:text-sm text-zinc-500 font-medium">
                  {group.photos.length} photos
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.photos.map((photo) => {
                  const originalIndex = photos.findIndex((p) => p.id === photo.id);
                  return (
                    <div
                      key={photo.id}
                      onClick={() => onOpenLightbox(originalIndex >= 0 ? originalIndex : 0)}
                      className="group cursor-pointer rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                        <Image
                          src={photo.url}
                          alt={photo.caption}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-semibold text-zinc-900 text-sm">{photo.caption}</p>
                        {photo.description && (
                          <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{photo.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
