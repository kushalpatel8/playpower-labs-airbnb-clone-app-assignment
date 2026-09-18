'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Star,
  Share2,
  Heart,
  Award,
  Sparkles,
  Key,
  Fan,
  Palmtree,
  Waves,
  ChevronRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

import { LISTING_DATA } from '@/lib/listing-data';
import { BookingState } from '@/lib/types';

import { Header } from '@/components/header';
import { PhotoGrid } from '@/components/photo-grid';
import { PhotoTourModal } from '@/components/photo-tour-modal';
import { LightboxModal } from '@/components/lightbox-modal';
import { StickyReserveCard } from '@/components/sticky-reserve-card';
import { DateRangePicker } from '@/components/date-range-picker';
import { SleepingSection } from '@/components/sleeping-section';
import { AmenitiesSection } from '@/components/amenities-section';
import { ReviewsSection } from '@/components/reviews-section';
import { LocationMap } from '@/components/location-map';
import { HostSection } from '@/components/host-section';
import { ThingsToKnow } from '@/components/things-to-know';
import { MoreStays } from '@/components/more-stays';
import { ShareModal } from '@/components/share-modal';
import { DescriptionModal } from '@/components/description-modal';
import { Footer } from '@/components/footer';

export default function Home() {
  const listing = LISTING_DATA;

  // State Management
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Booking & Dates state (Default matching 18 Oct 2026 - 23 Oct 2026 from reference)
  const defaultCheckIn = new Date(2026, 9, 18);
  const defaultCheckOut = new Date(2026, 9, 23);

  const [booking, setBooking] = useState<BookingState>({
    checkInDate: defaultCheckIn,
    checkOutDate: defaultCheckOut,
    guests: {
      adults: 2,
      children: 0,
      infants: 0,
      pets: 0,
    },
  });

  // Photo handlers
  const handleOpenPhotoTour = () => {
    setIsLightboxOpen(false);
    setIsPhotoTourOpen(true);
  };

  const handleOpenLightbox = (index: number) => {
    setActivePhotoIndex(index);
    setIsLightboxOpen(true);
  };

  const handleDateChange = (checkIn: Date | null, checkOut: Date | null) => {
    setBooking((prev) => ({
      ...prev,
      checkInDate: checkIn,
      checkOutDate: checkOut,
    }));
  };

  const scrollToCalendar = () => {
    const el = document.getElementById('calendar-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* Top Header */}
      <Header
        onOpenShare={() => setIsShareModalOpen(true)}
        isSaved={isSaved}
        onToggleSave={() => setIsSaved(!isSaved)}
        wishlistCount={isSaved ? 1 : 0}
        listing={listing}
        booking={booking}
        onReserveClick={scrollToCalendar}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-8 xl:px-12 pt-6">
        {/* Listing Title & Top Actions */}
        <section className="mb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
              {listing.title}
            </h1>

            {/* Top Right Action Links */}
            <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-zinc-100 font-semibold text-sm underline transition-colors"
                aria-label="Share listing"
              >
                <Share2 className="w-4 h-4 stroke-[2.2]" />
                <span>Share</span>
              </button>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-zinc-100 font-semibold text-sm underline transition-colors"
                aria-label="Save listing to wishlist"
              >
                <Heart
                  className={`w-4 h-4 stroke-[2.2] ${
                    isSaved ? 'fill-[#FF385C] text-[#FF385C]' : ''
                  }`}
                />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* 5-Photo Hero Grid */}
        <PhotoGrid
          photos={listing.photos}
          onOpenPhotoTour={handleOpenPhotoTour}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* 2-Column Content Layout (Details on Left, Sticky Reserve Card on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6 items-start">
          {/* Left Column (Details, Amenities, Calendar) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8 divide-y divide-zinc-200">
            {/* Subtitle & Specs */}
            <div className="pt-1 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
                {listing.type}
              </h2>
              <p className="text-sm text-zinc-700 mt-1 font-medium">
                {listing.stats.guests} guests · {listing.stats.bedrooms} bedroom · {listing.stats.beds} bed · {listing.stats.baths} bathroom
              </p>
            </div>

            {/* Guest Favourite Top Badge Banner */}
            <div className="py-6">
              <div className="flex items-center justify-between p-5 rounded-2xl border border-zinc-200/90 shadow-sm bg-white">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-zinc-900">
                    <svg className="w-6 h-8 text-zinc-900" viewBox="0 0 24 32" fill="currentColor">
                      <path d="M12 2 C8 6, 4 12, 4 18 C4 24, 8 28, 12 30 C16 28, 20 24, 20 18 C20 12, 16 6, 12 2 Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 text-base">Guest favourite</h3>
                    <p className="text-xs text-zinc-500">One of the most loved homes on Airbnb, according to guests</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-right">
                  <div>
                    <div className="text-lg font-bold text-zinc-900 flex items-center justify-end gap-1">
                      <span>4.95</span>
                    </div>
                    <div className="flex text-black text-[10px] justify-end">
                      ★★★★★
                    </div>
                  </div>
                  <div className="border-l border-zinc-200 pl-4">
                    <p className="text-lg font-bold text-zinc-900">19</p>
                    <p className="text-xs text-zinc-500 font-medium underline cursor-pointer">Reviews</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Host Quick Header */}
            <div className="py-6 flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-[#1b3d34] flex flex-col items-center justify-center text-white text-center shadow-sm">
                  <span className="text-[7px] tracking-widest font-serif font-light">MIRASHYA</span>
                  <span className="text-[5px] tracking-wider text-emerald-300 font-sans">HOMES</span>
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#FF385C] text-white flex items-center justify-center shadow-sm border border-white">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-zinc-900">
                  Hosted by {listing.host.name}
                </h3>
                <p className="text-xs text-zinc-500">
                  {listing.host.yearsHosting} years hosting
                </p>
              </div>
            </div>

            {/* Property Key Highlights */}
            <div className="py-6 space-y-6">
              <div className="flex items-start gap-4">
                <Palmtree className="w-6 h-6 text-zinc-800 shrink-0 mt-0.5 stroke-[1.5]" />
                <div>
                  <h4 className="font-semibold text-zinc-900 text-base">
                    Outdoor entertainment
                  </h4>
                  <p className="text-sm text-zinc-500">
                    The pool and alfresco dining are great for summer trips.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Fan className="w-6 h-6 text-zinc-800 shrink-0 mt-0.5 stroke-[1.5]" />
                <div>
                  <h4 className="font-semibold text-zinc-900 text-base">
                    Designed for staying cool
                  </h4>
                  <p className="text-sm text-zinc-500">
                    Beat the heat with the A/C and ceiling fan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Key className="w-6 h-6 text-zinc-800 shrink-0 mt-0.5 stroke-[1.5]" />
                <div>
                  <h4 className="font-semibold text-zinc-900 text-base">
                    Self check-in
                  </h4>
                  <p className="text-sm text-zinc-500">
                    You can check in with the building staff.
                  </p>
                </div>
              </div>
            </div>

            {/* Translation Notice & Description */}
            <div className="py-6 space-y-4">
              <div className="p-4 bg-zinc-50/80 rounded-2xl border border-zinc-100 text-sm text-zinc-600">
                <span>Some info has been automatically translated. </span>
                <button className="font-bold underline text-zinc-900 hover:text-black">
                  Show original
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-base text-zinc-800 leading-relaxed font-normal">
                  {listing.description.summary}
                </p>

                {isDescriptionExpanded && (
                  <div className="space-y-3 pt-2 text-base text-zinc-800 leading-relaxed">
                    <p>{listing.description.space}</p>
                    <p>{listing.description.guestAccess}</p>
                    <p>{listing.description.otherNotes}</p>
                  </div>
                )}

                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="flex items-center gap-1 font-bold text-sm text-zinc-900 underline hover:text-black pt-2"
                >
                  <span>{isDescriptionExpanded ? 'Show less' : 'Show more'}</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>

            {/* Where you'll sleep */}
            <SleepingSection arrangements={listing.sleepingArrangements} />

            {/* Amenities Section */}
            <AmenitiesSection amenities={listing.amenities} />

            {/* Interactive Calendar Section */}
            <div className="py-8" id="calendar-section">
              <DateRangePicker
                checkIn={booking.checkInDate}
                checkOut={booking.checkOutDate}
                onChange={handleDateChange}
              />
            </div>
          </div>

          {/* Right Column (Sticky Booking Widget) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <StickyReserveCard
              listing={listing}
              booking={booking}
              onBookingChange={setBooking}
              onOpenCalendar={scrollToCalendar}
            />
          </div>
        </div>

        {/* Full-Width Bottom Sections */}
        <div className="mt-12 space-y-4 divide-y divide-zinc-200">
          {/* Reviews Section */}
          <ReviewsSection
            rating={listing.rating}
            reviews={listing.reviews}
          />

          {/* Location Map Section */}
          <LocationMap location={listing.location} />

          {/* Meet the Host Section */}
          <HostSection host={listing.host} />

          {/* Things to Know Section */}
          <ThingsToKnow listing={listing} />

          {/* More stays nearby Section */}
          <MoreStays stays={listing.nearbyStays} />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <PhotoTourModal
        isOpen={isPhotoTourOpen}
        onClose={() => setIsPhotoTourOpen(false)}
        photos={listing.photos}
        onOpenLightbox={(idx) => {
          setActivePhotoIndex(idx);
          setIsLightboxOpen(true);
        }}
        onOpenShare={() => setIsShareModalOpen(true)}
        isSaved={isSaved}
        onToggleSave={() => setIsSaved(!isSaved)}
      />

      <LightboxModal
        isOpen={isLightboxOpen}
        currentIndex={activePhotoIndex}
        photos={listing.photos}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(idx) => setActivePhotoIndex(idx)}
        onOpenPhotoTour={() => {
          setIsLightboxOpen(false);
          setIsPhotoTourOpen(true);
        }}
        onOpenShare={() => setIsShareModalOpen(true)}
        isSaved={isSaved}
        onToggleSave={() => setIsSaved(!isSaved)}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        listing={listing}
      />

      <DescriptionModal
        isOpen={isDescriptionModalOpen}
        onClose={() => setIsDescriptionModalOpen(false)}
        description={listing.description}
        title={listing.title}
      />
    </div>
  );
}

