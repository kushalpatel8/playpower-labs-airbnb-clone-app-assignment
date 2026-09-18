'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Share2, Heart, Grid } from 'lucide-react';
import { ListingPhoto } from '@/lib/types';

interface LightboxModalProps {
  isOpen: boolean;
  currentIndex: number;
  photos: ListingPhoto[];
  onClose: () => void;
  onNavigate: (index: number) => void;
  onOpenPhotoTour?: () => void;
  onOpenShare?: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export function LightboxModal({
  isOpen,
  currentIndex,
  photos,
  onClose,
  onNavigate,
  onOpenPhotoTour,
  onOpenShare,
  isSaved = false,
  onToggleSave,
}: LightboxModalProps) {
  const totalPhotos = photos.length;
  const currentPhoto = photos[currentIndex] || photos[0];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + totalPhotos) % totalPhotos);
  }, [currentIndex, totalPhotos, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % totalPhotos);
  }, [currentIndex, totalPhotos, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 text-white flex flex-col justify-between select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox viewer"
    >
      {/* Top Controls Header */}
      <div className="w-full px-6 py-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 text-white font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close photo viewer"
        >
          <X className="w-5 h-5" />
          <span className="hidden sm:inline">Close</span>
        </button>

        {/* Counter */}
        <div className="text-sm font-semibold tracking-wide text-zinc-200">
          {currentIndex + 1} / {totalPhotos}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {onOpenPhotoTour && (
            <button
              onClick={onOpenPhotoTour}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 text-white text-xs sm:text-sm font-medium transition-colors"
              title="View all in Photo Tour"
            >
              <Grid className="w-4 h-4" />
              <span className="hidden sm:inline">Show all photos</span>
            </button>
          )}

          <button
            onClick={onOpenShare}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
            title="Share"
            aria-label="Share photo"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <button
            onClick={onToggleSave}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
            title={isSaved ? 'Saved' : 'Save'}
            aria-label="Save photo"
          >
            <Heart
              className={`w-5 h-5 ${isSaved ? 'fill-[#FF385C] text-[#FF385C]' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Main Center Image Stage with Left & Right Nav Arrows */}
      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-16 md:px-24">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 z-30 p-3 rounded-full bg-black/40 hover:bg-white/20 border border-white/20 text-white transition-all backdrop-blur-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Previous photo (Left Arrow)"
          title="Previous (←)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Main Photo Container */}
        <div className="relative w-full max-w-5xl h-[55vh] sm:h-[65vh] md:h-[72vh] flex items-center justify-center transition-all duration-300">
          <Image
            key={currentPhoto.id}
            src={currentPhoto.url}
            alt={currentPhoto.caption}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-contain animate-in fade-in zoom-in-95 duration-200"
            unoptimized
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-8 z-30 p-3 rounded-full bg-black/40 hover:bg-white/20 border border-white/20 text-white transition-all backdrop-blur-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Next photo (Right Arrow)"
          title="Next (→)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Info & Thumbnail Filmstrip */}
      <div className="w-full px-6 py-4 bg-gradient-to-t from-black/90 to-transparent z-20">
        {/* Photo Caption & Category */}
        <div className="max-w-4xl mx-auto text-center mb-3">
          <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 text-xs font-semibold mb-1">
            {currentPhoto.category}
          </div>
          <p className="text-sm sm:text-base font-medium text-zinc-100">
            {currentPhoto.caption}
          </p>
          {currentPhoto.description && (
            <p className="text-xs text-zinc-400 mt-0.5 hidden sm:block max-w-2xl mx-auto">
              {currentPhoto.description}
            </p>
          )}
        </div>

        {/* Interactive Filmstrip Thumbnails */}
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 overflow-x-auto py-1 no-scrollbar">
          {photos.map((photo, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={photo.id}
                onClick={() => onNavigate(idx)}
                className={`relative shrink-0 w-14 h-10 sm:w-16 sm:h-11 rounded-lg overflow-hidden transition-all duration-200 focus:outline-none ${
                  isActive
                    ? 'ring-2 ring-[#FF385C] scale-105 opacity-100 brightness-105'
                    : 'opacity-40 hover:opacity-80 brightness-75'
                }`}
                aria-label={`Jump to photo ${idx + 1}`}
              >
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  fill
                  sizes="64px"
                  className="object-cover"
                  unoptimized
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
