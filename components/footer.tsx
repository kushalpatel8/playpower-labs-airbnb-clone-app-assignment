'use client';

import React from 'react';
import { Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 mt-16 text-zinc-700">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 xl:px-12 py-12">
        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-zinc-200 text-sm">
          {/* Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-600">
              <li><a href="#" className="hover:underline">Help Centre</a></li>
              <li><a href="#" className="hover:underline">AirCover</a></li>
              <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
              <li><a href="#" className="hover:underline">Disability support</a></li>
              <li><a href="#" className="hover:underline">Cancellation options</a></li>
              <li><a href="#" className="hover:underline">Report neighbourhood concern</a></li>
            </ul>
          </div>

          {/* Hosting */}
          <div className="space-y-3">
            <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider">
              Hosting
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-600">
              <li><a href="#" className="hover:underline">Airbnb your home</a></li>
              <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
              <li><a href="#" className="hover:underline">Hosting resources</a></li>
              <li><a href="#" className="hover:underline">Community forum</a></li>
              <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
              <li><a href="#" className="hover:underline">Join a free Hosting class</a></li>
            </ul>
          </div>

          {/* Airbnb */}
          <div className="space-y-3">
            <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider">
              Airbnb
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-600">
              <li><a href="#" className="hover:underline">Newsroom</a></li>
              <li><a href="#" className="hover:underline">New features</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Investors</a></li>
              <li><a href="#" className="hover:underline">Airbnb.org emergency stays</a></li>
            </ul>
          </div>

          {/* Assignment Note */}
          <div className="space-y-3">
            <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider">
              Take-Home Project
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Built for PlayPower Labs Take-Home Assignment. Features pixel-perfect parity with Airbnb&apos;s UI, Photo Tour, and Lightbox modal.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© 2026 Airbnb Clone, Inc.</span>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline">Sitemap</a>
            <span>·</span>
            <a href="#" className="hover:underline">Company details</a>
          </div>

          <div className="flex items-center gap-6 font-semibold text-zinc-900">
            <button className="flex items-center gap-2 hover:underline focus:outline-none">
              <Globe className="w-4 h-4" />
              <span>English (IN)</span>
            </button>
            <button className="hover:underline focus:outline-none">
              <span>₹ INR</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
