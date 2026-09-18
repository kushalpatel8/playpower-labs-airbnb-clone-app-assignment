'use client';

import React, { useState, useEffect } from 'react';
import { X, Search, Bath, Waves, Wifi, Briefcase, Car, Wind, Tv, UtensilsCrossed, Palmtree, Shirt, Flame, Refrigerator, Microwave, Coffee, CookingPot, Wine, Sparkles, Droplets, BedDouble, Sparkle, Moon, ShieldAlert, Cross, FlameKindling, Key, ArrowUpDown, Dumbbell, Luggage, CalendarDays, Brush, Zap, ShieldCheck } from 'lucide-react';
import { AmenityItem } from '@/lib/types';

interface AmenitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  amenities: AmenityItem[];
}

export function AmenitiesModal({ isOpen, onClose, amenities }: AmenitiesModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Map icon name to lucide component
  const getIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-zinc-800 shrink-0' };
    switch (iconName) {
      case 'Bath': return <Bath {...props} />;
      case 'Waves': return <Waves {...props} />;
      case 'Wifi': return <Wifi {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Car': return <Car {...props} />;
      case 'Wind': return <Wind {...props} />;
      case 'Tv': return <Tv {...props} />;
      case 'UtensilsCrossed': return <UtensilsCrossed {...props} />;
      case 'Palmtree': return <Palmtree {...props} />;
      case 'Shirt': return <Shirt {...props} />;
      case 'Flame': return <Flame {...props} />;
      case 'Refrigerator': return <Refrigerator {...props} />;
      case 'Microwave': return <Microwave {...props} />;
      case 'Coffee': return <Coffee {...props} />;
      case 'CookingPot': return <CookingPot {...props} />;
      case 'Wine': return <Wine {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Droplets': return <Droplets {...props} />;
      case 'BedDouble': return <BedDouble {...props} />;
      case 'Sparkle': return <Sparkle {...props} />;
      case 'Moon': return <Moon {...props} />;
      case 'ShieldAlert': return <ShieldAlert {...props} />;
      case 'Cross': return <Cross {...props} />;
      case 'FlameKindling': return <FlameKindling {...props} />;
      case 'Key': return <Key {...props} />;
      case 'ArrowUpDown': return <ArrowUpDown {...props} />;
      case 'Dumbbell': return <Dumbbell {...props} />;
      case 'Luggage': return <Luggage {...props} />;
      case 'CalendarDays': return <CalendarDays {...props} />;
      case 'Brush': return <Brush {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

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

  const filteredAmenities = amenities.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by category
  const categories = Array.from(new Set(amenities.map((a) => a.category)));

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="All amenities"
    >
      <div className="bg-white w-full max-w-3xl max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-zinc-100 text-zinc-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-zinc-900">What this place offers</h2>
          <div className="w-9" /> {/* balance spacer */}
        </div>

        {/* Search Bar */}
        <div className="px-6 py-3 border-b border-zinc-100 bg-zinc-50/50">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search amenities (e.g. Jacuzzi, Wi-Fi, Kitchen)..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-300 rounded-full text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-6 overflow-y-auto space-y-8 flex-1">
          {searchQuery ? (
            <div>
              <p className="text-sm font-semibold text-zinc-500 mb-4">
                Found {filteredAmenities.length} matching amenities
              </p>
              <div className="divide-y divide-zinc-100">
                {filteredAmenities.map((amenity) => (
                  <div key={amenity.id} className="py-4 flex items-start gap-4">
                    <div className="p-2 rounded-xl bg-zinc-100 shrink-0">
                      {getIcon(amenity.iconName)}
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 text-base">{amenity.name}</p>
                      {amenity.description && (
                        <p className="text-sm text-zinc-500 mt-0.5">{amenity.description}</p>
                      )}
                      <span className="inline-block text-[11px] font-medium text-zinc-400 mt-1">
                        Category: {amenity.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            categories.map((category) => {
              const categoryItems = amenities.filter((a) => a.category === category);
              return (
                <div key={category}>
                  <h3 className="text-lg font-bold text-zinc-900 mb-4 pb-2 border-b border-zinc-100">
                    {category}
                  </h3>
                  <div className="divide-y divide-zinc-100">
                    {categoryItems.map((amenity) => (
                      <div key={amenity.id} className="py-3.5 flex items-start gap-4">
                        <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100 shrink-0">
                          {getIcon(amenity.iconName)}
                        </div>
                        <div>
                          <p className="font-medium text-zinc-900 text-sm sm:text-base">
                            {amenity.name}
                          </p>
                          {amenity.description && (
                            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                              {amenity.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
