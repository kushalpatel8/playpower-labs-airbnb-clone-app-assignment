'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Globe, Menu, User, Search, Heart, Share2, Star } from 'lucide-react';
import { ListingDetails, BookingState } from '@/lib/types';

interface HeaderProps {
  onOpenShare?: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  wishlistCount?: number;
  listing?: ListingDetails;
  booking?: BookingState;
  onReserveClick?: () => void;
}

export function Header({
  onOpenShare,
  isSaved = false,
  onToggleSave,
  wishlistCount = 0,
  listing,
  booking,
  onReserveClick,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState<'photos' | 'amenities' | 'reviews' | 'location'>('photos');

  // Track scroll position to toggle sticky sub-navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolledPastHero(scrollY > 520);

      // Section tracking for active underline
      const locationEl = document.getElementById('location');
      const reviewsEl = document.getElementById('reviews');
      const amenitiesEl = document.getElementById('amenities');
      const photosEl = document.getElementById('photos');

      const scrollPos = scrollY + 120;

      if (locationEl && scrollPos >= locationEl.offsetTop) {
        setActiveSection('location');
      } else if (reviewsEl && scrollPos >= reviewsEl.offsetTop) {
        setActiveSection('reviews');
      } else if (amenitiesEl && scrollPos >= amenitiesEl.offsetTop) {
        setActiveSection('amenities');
      } else {
        setActiveSection('photos');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Calculate pricing for quick reserve in sticky sub-nav
  const nights = booking?.checkInDate && booking?.checkOutDate
    ? Math.max(1, Math.round((booking.checkOutDate.getTime() - booking.checkInDate.getTime()) / (1000 * 60 * 60 * 24)))
    : 5;
  const basePrice = listing?.price.basePrice || 4599;
  const baseTotal = basePrice * nights;
  const discount = nights >= 7 ? Math.round(baseTotal * 0.1) : 0;
  const cleaningFee = listing?.price.cleaningFee || 850;
  const serviceFee = listing?.price.serviceFee || 620;
  const totalAmount = baseTotal - discount + cleaningFee + serviceFee;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-zinc-200 transition-all shadow-sm">
      {!isScrolledPastHero ? (
        /* Standard Header (Top of page) */
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 xl:px-12 h-20 flex items-center justify-between animate-in fade-in duration-200">
          {/* Left: Airbnb Logo & Branding */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg p-1"
            aria-label="Airbnb Home"
          >
            <svg
              className="w-8 h-8 text-[#FF385C] transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 32 32"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533.997c2.19 4.195 4.385 8.922 4.385 13.593 0 4.116-2.617 7.141-6.669 7.141-2.029 0-3.805-.853-5-2.288-1.195 1.435-2.971 2.288-5 2.288-4.052 0-6.669-3.025-6.669-7.141 0-4.671 2.195-9.398 4.385-13.593l.533-.997C8.156 1.963 9.611 1 11.619 1H16zm0 2.222h-4.381c-1.328 0-2.261.644-3.187 2.296l-.502.94C5.86 10.457 3.889 14.887 3.889 18.859c0 3.013 1.83 5.03 4.556 5.03 2.186 0 3.738-1.344 4.536-3.411a1.111 1.111 0 0 1 2.038 0c.798 2.067 2.35 3.411 4.536 3.411 2.726 0 4.556-2.017 4.556-5.03 0-3.972-1.971-8.402-4.042-12.402l-.502-.94c-.926-1.652-1.859-2.296-3.187-2.296H16zm0 9.245c1.782 0 3.228 1.42 3.228 3.169 0 1.967-1.426 3.425-3.228 5.215-1.802-1.79-3.228-3.248-3.228-5.215 0-1.749 1.446-3.169 3.228-3.169zm0 2.222c-.63 0-1.117.481-1.117 1.058 0 .848.868 1.93 1.117 2.235.249-.305 1.117-1.387 1.117-2.235 0-.577-.487-1.058-1.117-1.058z" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-[#FF385C] hidden md:inline">
              airbnb
            </span>
          </Link>

          {/* Center: Search Capsule */}
          <div className="hidden md:flex items-center border border-zinc-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer divide-x divide-zinc-200">
            <button className="text-sm font-semibold text-zinc-900 px-3 hover:text-black focus:outline-none">
              Anywhere
            </button>
            <button className="text-sm font-semibold text-zinc-900 px-3 hover:text-black focus:outline-none">
              Anytime
            </button>
            <div className="flex items-center gap-3 pl-3">
              <button className="text-sm text-zinc-500 hover:text-black font-normal focus:outline-none">
                Add guests
              </button>
              <div className="w-8 h-8 rounded-full bg-[#FF385C] flex items-center justify-center text-white shadow-sm hover:bg-[#E00B41] transition-colors">
                <Search className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Right: Actions & User Dropdown */}
          <div className="flex items-center gap-1 sm:gap-2 relative">
            <button className="hidden md:inline-flex px-3 py-2 rounded-full hover:bg-zinc-100 text-sm font-semibold text-zinc-900 transition-colors">
              Airbnb your home
            </button>

            <button
              className="p-2.5 rounded-full hover:bg-zinc-100 text-zinc-700 transition-colors"
              title="Language and currency"
              aria-label="Language & Currency"
            >
              <Globe className="w-4 h-4" />
            </button>

            {/* User Profile Pill Menu */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-3 border border-zinc-300 rounded-full py-1.5 px-3 hover:shadow-md transition-shadow bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                aria-expanded={isMenuOpen}
                aria-label="Main navigation menu"
              >
                <Menu className="w-4 h-4 text-zinc-700" />
                <div className="w-8 h-8 rounded-full bg-zinc-700 text-white flex items-center justify-center overflow-hidden">
                  <User className="w-4 h-4" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-zinc-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 divide-y divide-zinc-100">
                    <div className="py-1">
                      <a
                        href="#photos"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full block text-left px-4 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                      >
                        Photo Gallery
                      </a>
                      <a
                        href="#amenities"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full block text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50"
                      >
                        Amenities
                      </a>
                      <a
                        href="#reviews"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full block text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50"
                      >
                        Guest Reviews
                      </a>
                      <a
                        href="#location"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full block text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50"
                      >
                        Location Map
                      </a>
                      <a
                        href="#host"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full block text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50"
                      >
                        Meet the Host
                      </a>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          if (onOpenShare) onOpenShare();
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50"
                      >
                        Share this listing
                      </button>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          if (onToggleSave) onToggleSave();
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50"
                      >
                        {isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Sticky Scrolled Sub-Navbar matching User Screenshot */
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 xl:px-12 h-20 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Left Navigation Section Tabs */}
          <nav className="flex items-center gap-6 sm:gap-8 h-full" aria-label="Listing navigation tabs">
            <button
              onClick={() => scrollToSection('photos')}
              className={`text-sm font-semibold transition-colors relative py-7 focus:outline-none ${
                activeSection === 'photos'
                  ? 'text-zinc-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Photos
            </button>
            <button
              onClick={() => scrollToSection('amenities')}
              className={`text-sm font-semibold transition-colors relative py-7 focus:outline-none ${
                activeSection === 'amenities'
                  ? 'text-zinc-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Amenities
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className={`text-sm font-semibold transition-colors relative py-7 focus:outline-none ${
                activeSection === 'reviews'
                  ? 'text-zinc-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('location')}
              className={`text-sm font-semibold transition-colors relative py-7 focus:outline-none ${
                activeSection === 'location'
                  ? 'text-zinc-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Location
            </button>
          </nav>

          {/* Right: Quick Reserve Widget */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-zinc-900">
                ₹{totalAmount.toLocaleString()} <span className="font-normal text-zinc-600">for {nights} nights</span>
              </p>
              <p className="text-xs font-semibold text-zinc-900 flex items-center justify-end gap-1">
                <Star className="w-3 h-3 fill-black text-black" />
                <span>4.95 · 19 reviews</span>
              </p>
            </div>

            <button
              onClick={() => {
                if (onReserveClick) {
                  onReserveClick();
                } else {
                  scrollToSection('calendar-section');
                }
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white font-bold text-sm shadow-md hover:opacity-95 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              Reserve
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

