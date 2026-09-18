'use client';

import React, { useState, useRef } from 'react';
import { Search, Plus, Minus, ChevronRight } from 'lucide-react';
import { ListingDetails } from '@/lib/types';

interface LocationMapProps {
  location?: ListingDetails['location'];
}

export function LocationMap({ location }: LocationMapProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isNeighbourhoodExpanded, setIsNeighbourhoodExpanded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetPan = () => {
    setPanOffset({ x: 0, y: 0 });
    setZoomLevel(1);
  };

  return (
    <section className="py-8 border-b border-zinc-200" id="location">
      <h2 className="text-2xl font-bold text-zinc-900 mb-2">
        Where you&apos;ll be
      </h2>
      <p className="text-sm text-zinc-700 mb-6 font-medium">
        Candolim, Goa, India
      </p>

      {/* Styled Interactive Airbnb Map Simulation for Candolim Coastal Goa */}
      <div
        ref={mapRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-zinc-200 shadow-sm bg-[#e8eee4] select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Stylized SVG Map Layer representing Candolim & Coast */}
        <div
          className="w-full h-full transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: 'center center',
          }}
        >
          <svg
            viewBox="0 0 1000 600"
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Base Land Fill */}
            <rect width="1000" height="600" fill="#e8eee4" />

            {/* Grid Pattern across land */}
            <defs>
              <pattern id="coastal-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#d5e2d1" strokeWidth="1.2" />
              </pattern>
            </defs>
            <rect width="1000" height="600" fill="url(#coastal-grid)" />

            {/* Arabian Sea Coastal Water on Left (Shoreline diagonal with soft curve) */}
            <path
              d="M 0 0 L 420 0 Q 340 280 240 600 L 0 600 Z"
              fill="#adcfe4"
            />

            {/* Shoreline Transition Strip */}
            <path
              d="M 420 0 L 432 0 Q 352 280 252 600 L 240 600 Q 340 280 420 0 Z"
              fill="#d0e5cb"
            />

            {/* Surrounding zone/radar circles matching reference */}
            {/* Left zone circle overlapping shoreline */}
            <circle
              cx="328"
              cy="275"
              r="45"
              fill="#d3e9cc"
              stroke="#222222"
              strokeWidth="1.8"
            />

            {/* Right zone circle */}
            <circle
              cx="675"
              cy="355"
              r="58"
              fill="#d3e9cc"
              stroke="#222222"
              strokeWidth="1.8"
            />

            {/* Candolim coastal roads (subtle white tracks) */}
            <path
              d="M 450 0 Q 420 300 360 600"
              stroke="#ffffff"
              strokeWidth="3.5"
              fill="none"
              strokeOpacity="0.7"
            />
            <path
              d="M 380 240 Q 600 250 850 200"
              stroke="#ffffff"
              strokeWidth="3"
              fill="none"
              strokeOpacity="0.7"
            />
            <path
              d="M 320 420 Q 550 430 820 460"
              stroke="#ffffff"
              strokeWidth="3"
              fill="none"
              strokeOpacity="0.7"
            />
          </svg>
        </div>

        {/* Center Home Marker Pin (Stationary in center container) */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
          <div className="w-13 h-13 p-3 rounded-full bg-zinc-900 shadow-xl flex items-center justify-center border-2 border-white pointer-events-auto">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-white fill-none stroke-white stroke-[2.2]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
        </div>

        {/* Search button (Top-Left) */}
        <div className="absolute top-5 left-5 z-10">
          <button
            onClick={resetPan}
            className="w-10 h-10 rounded-full bg-white shadow-md border border-zinc-200 text-zinc-700 flex items-center justify-center hover:bg-zinc-50 active:scale-95 transition-all"
            aria-label="Search or reset map view"
            title="Search / Center"
          >
            <Search className="w-4 h-4 stroke-[2.4]" />
          </button>
        </div>

        {/* Zoom Controls (Top-Right) */}
        <div className="absolute top-5 right-5 flex flex-col rounded-xl bg-white shadow-md border border-zinc-200 overflow-hidden z-10 divide-y divide-zinc-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoomLevel((z) => Math.min(2.5, z + 0.25));
            }}
            className="w-10 h-10 text-zinc-800 font-bold flex items-center justify-center hover:bg-zinc-50 active:scale-95 transition-all"
            aria-label="Zoom in"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoomLevel((z) => Math.max(0.8, z - 0.25));
            }}
            className="w-10 h-10 text-zinc-800 font-bold flex items-center justify-center hover:bg-zinc-50 active:scale-95 transition-all"
            aria-label="Zoom out"
          >
            <Minus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      <p className="text-sm font-semibold text-zinc-900 mt-4">
        Exact location will be provided after booking.
      </p>

      {/* Neighbourhood highlights */}
      <div className="mt-8 pt-6 border-t border-zinc-100 space-y-3">
        <h3 className="text-lg font-bold text-zinc-900">
          Neighbourhood highlights
        </h3>
        <p className="text-sm text-zinc-700 leading-relaxed max-w-3xl">
          Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.
          {isNeighbourhoodExpanded && (
            <span className="block mt-2">
              Within a 5-minute radius, you will find Candolim Beach, famous beach shacks, Aguada Fort, high-end Goan and continental eateries, grocery stores, and vibrant coastal nightlife while nestled in a calm, private sanctuary.
            </span>
          )}
        </p>
        <button
          onClick={() => setIsNeighbourhoodExpanded(!isNeighbourhoodExpanded)}
          className="flex items-center gap-1 font-bold text-sm text-zinc-900 underline hover:text-black pt-1"
        >
          <span>{isNeighbourhoodExpanded ? 'Show less' : 'Show more'}</span>
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </section>
  );
}



