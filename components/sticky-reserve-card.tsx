'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Star, ChevronDown, Plus, Minus, ShieldCheck, Sparkles } from 'lucide-react';
import { ListingDetails, BookingState } from '@/lib/types';

interface StickyReserveCardProps {
  listing: ListingDetails;
  booking: BookingState;
  onBookingChange: (booking: BookingState) => void;
  onOpenCalendar?: () => void;
}

export function StickyReserveCard({
  listing,
  booking,
  onBookingChange,
  onOpenCalendar,
}: StickyReserveCardProps) {
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [isReservedSuccess, setIsReservedSuccess] = useState(false);
  const guestDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(e.target as Node)) {
        setIsGuestDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalGuests = booking.guests.adults + booking.guests.children;
  const maxGuests = listing.stats.guests;

  // Nights calculation
  const nights = booking.checkInDate && booking.checkOutDate
    ? Math.max(1, Math.round((booking.checkOutDate.getTime() - booking.checkInDate.getTime()) / (1000 * 60 * 60 * 24)))
    : 3; // Default 3 nights if not selected

  const baseTotal = listing.price.basePrice * nights;
  const discount = nights >= 7 ? Math.round(baseTotal * ((listing.price.discountPercentage || 10) / 100)) : 0;
  const cleaningFee = listing.price.cleaningFee;
  const serviceFee = listing.price.serviceFee;
  const totalAmount = baseTotal - discount + cleaningFee + serviceFee;

  const updateGuest = (type: keyof typeof booking.guests, delta: number) => {
    const current = booking.guests[type];
    const updated = Math.max(type === 'adults' ? 1 : 0, current + delta);

    // Total adults + children check
    if (type === 'adults' || type === 'children') {
      const other = type === 'adults' ? booking.guests.children : booking.guests.adults;
      if (updated + other > maxGuests) return;
    }

    onBookingChange({
      ...booking,
      guests: {
        ...booking.guests,
        [type]: updated,
      },
    });
  };

  const formatDateLabel = (date: Date | null, fallback: string) => {
    if (!date) return fallback;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleReserve = () => {
    setIsReservedSuccess(true);
    setTimeout(() => setIsReservedSuccess(false), 4000);
  };

  return (
    <div className="sticky top-28 bg-white rounded-2xl border border-zinc-200 shadow-xl p-6 transition-all duration-300">
      {/* Top Price & Rating Row */}
      <div className="flex items-baseline justify-between mb-5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-zinc-900">
            {listing.price.currencySymbol}{listing.price.basePrice.toLocaleString()}
          </span>
          <span className="text-sm font-normal text-zinc-500">night</span>
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-zinc-900">
          <Star className="w-3.5 h-3.5 fill-black text-black" />
          <span>{listing.rating.overall.toFixed(2)}</span>
          <span className="text-zinc-400">·</span>
          <a href="#reviews" className="underline text-zinc-500 hover:text-zinc-900">
            {listing.rating.reviewCount} reviews
          </a>
        </div>
      </div>

      {/* Date & Guest Input Frame */}
      <div className="border border-zinc-400 rounded-xl overflow-hidden mb-4 divide-y divide-zinc-400">
        {/* Check-in / Checkout Dual Box */}
        <div
          onClick={onOpenCalendar}
          className="grid grid-cols-2 divide-x divide-zinc-400 cursor-pointer hover:bg-zinc-50 transition-colors"
        >
          <div className="p-2.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-800">
              Check-in
            </div>
            <div className="text-xs sm:text-sm font-medium text-zinc-900 mt-0.5">
              {formatDateLabel(booking.checkInDate, 'Add date')}
            </div>
          </div>
          <div className="p-2.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-800">
              Checkout
            </div>
            <div className="text-xs sm:text-sm font-medium text-zinc-900 mt-0.5">
              {formatDateLabel(booking.checkOutDate, 'Add date')}
            </div>
          </div>
        </div>

        {/* Guests Dropdown Selector */}
        <div className="relative" ref={guestDropdownRef}>
          <button
            type="button"
            onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
            className="w-full p-2.5 text-left flex items-center justify-between hover:bg-zinc-50 transition-colors focus:outline-none"
            aria-expanded={isGuestDropdownOpen}
          >
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-800">
                Guests
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-900 mt-0.5">
                {totalGuests} guest{totalGuests > 1 ? 's' : ''}
                {booking.guests.infants > 0 && `, ${booking.guests.infants} infant${booking.guests.infants > 1 ? 's' : ''}`}
                {booking.guests.pets > 0 && `, ${booking.guests.pets} pet${booking.guests.pets > 1 ? 's' : ''}`}
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-zinc-700 transition-transform ${
                isGuestDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Guest Counter Popover */}
          {isGuestDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-2xl shadow-2xl border border-zinc-200 z-30 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-zinc-900">Adults</div>
                  <div className="text-xs text-zinc-500">Age 13+</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateGuest('adults', -1)}
                    disabled={booking.guests.adults <= 1}
                    className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-4 text-center text-sm font-semibold">
                    {booking.guests.adults}
                  </span>
                  <button
                    onClick={() => updateGuest('adults', 1)}
                    disabled={totalGuests >= maxGuests}
                    className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-zinc-900">Children</div>
                  <div className="text-xs text-zinc-500">Ages 2–12</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateGuest('children', -1)}
                    disabled={booking.guests.children <= 0}
                    className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-4 text-center text-sm font-semibold">
                    {booking.guests.children}
                  </span>
                  <button
                    onClick={() => updateGuest('children', 1)}
                    disabled={totalGuests >= maxGuests}
                    className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Infants */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-zinc-900">Infants</div>
                  <div className="text-xs text-zinc-500">Under 2</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateGuest('infants', -1)}
                    disabled={booking.guests.infants <= 0}
                    className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-4 text-center text-sm font-semibold">
                    {booking.guests.infants}
                  </span>
                  <button
                    onClick={() => updateGuest('infants', 1)}
                    disabled={booking.guests.infants >= 2}
                    className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Pets */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-zinc-900">Pets</div>
                  <div className="text-xs text-zinc-500">Service animals welcome</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateGuest('pets', -1)}
                    disabled={booking.guests.pets <= 0}
                    className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-4 text-center text-sm font-semibold">
                    {booking.guests.pets}
                  </span>
                  <button
                    onClick={() => updateGuest('pets', 1)}
                    disabled={booking.guests.pets >= 2}
                    className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-black"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-100 flex justify-between items-center">
                <span className="text-[11px] text-zinc-500">Max {maxGuests} guests</span>
                <button
                  onClick={() => setIsGuestDropdownOpen(false)}
                  className="text-xs font-semibold text-black underline hover:text-zinc-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reserve Airbnb Button with Gradient */}
      <button
        onClick={handleReserve}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] hover:brightness-105 active:scale-[0.99] text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden"
      >
        <span>Reserve</span>
      </button>

      {/* Reservation feedback toast */}
      {isReservedSuccess && (
        <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Dates reserved! Proceeding to checkout simulator.</span>
        </div>
      )}

      <p className="text-center text-xs text-zinc-500 mt-3">
        You won&apos;t be charged yet
      </p>

      {/* Itemized Price Calculation Breakdown */}
      <div className="mt-5 space-y-3 pt-4 border-t border-zinc-100 text-sm text-zinc-700">
        <div className="flex justify-between">
          <span className="underline">
            {listing.price.currencySymbol}{listing.price.basePrice.toLocaleString()} x {nights} night{nights > 1 ? 's' : ''}
          </span>
          <span>{listing.price.currencySymbol}{baseTotal.toLocaleString()}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-700 font-medium">
            <span>Special weekly discount</span>
            <span>-{listing.price.currencySymbol}{discount.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="underline">Cleaning fee</span>
          <span>{listing.price.currencySymbol}{cleaningFee.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="underline">Airbnb service fee</span>
          <span>{listing.price.currencySymbol}{serviceFee.toLocaleString()}</span>
        </div>

        <div className="pt-3 border-t border-zinc-200 flex justify-between font-bold text-base text-zinc-900">
          <span>Total before taxes</span>
          <span>{listing.price.currencySymbol}{totalAmount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
