'use client';

import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Wifi,
  Briefcase,
  Car,
  Waves,
  Bath,
  PawPrint,
  Video,
  BellOff,
  Sparkles,
} from 'lucide-react';
import { AmenityItem } from '@/lib/types';
import { AmenitiesModal } from './amenities-modal';

interface AmenitiesSectionProps {
  amenities: AmenityItem[];
}

export function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Popular preview items (first 10)
  const previewAmenities = amenities.slice(0, 10);

  const getIcon = (iconName: string, name: string) => {
    const props = { className: 'w-6 h-6 text-zinc-800 shrink-0 stroke-[1.5]' };
    
    if (name.toLowerCase().includes('carbon monoxide') || name.toLowerCase().includes('smoke alarm')) {
      return (
        <div className="relative flex items-center justify-center">
          <BellOff {...props} />
        </div>
      );
    }

    switch (iconName) {
      case 'UtensilsCrossed': return <UtensilsCrossed {...props} />;
      case 'Wifi': return <Wifi {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Car': return <Car {...props} />;
      case 'Waves': return <Waves {...props} />;
      case 'Bath': return <Bath {...props} />;
      case 'PawPrint': return <PawPrint {...props} />;
      case 'Video': return <Video {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <section className="py-8 border-b border-zinc-200" id="amenities">
      <h2 className="text-2xl font-bold text-zinc-900 mb-6">
        What this place offers
      </h2>

      {/* 2-column grid matching Airbnb */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-7">
        {previewAmenities.map((amenity) => {
          const isNotReported =
            amenity.name.toLowerCase().includes('carbon monoxide') ||
            amenity.name.toLowerCase().includes('smoke alarm');

          return (
            <div key={amenity.id} className="flex items-center gap-4">
              <div className="text-zinc-800">
                {getIcon(amenity.iconName, amenity.name)}
              </div>
              <span
                className={`text-base font-normal ${
                  isNotReported ? 'line-through text-zinc-500' : 'text-zinc-800'
                }`}
              >
                {amenity.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Show all button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 rounded-xl border border-zinc-900 text-zinc-900 font-semibold text-sm hover:bg-zinc-50 active:scale-[0.99] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        Show all {amenities.length} amenities
      </button>

      {/* Full Modal */}
      <AmenitiesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amenities={amenities}
      />
    </section>
  );
}

