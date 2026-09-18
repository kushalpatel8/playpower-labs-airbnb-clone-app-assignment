'use client';

import React from 'react';
import { Clock, Shield, CalendarX, ChevronRight } from 'lucide-react';
import { ListingDetails } from '@/lib/types';

interface ThingsToKnowProps {
  listing: ListingDetails;
}

export function ThingsToKnow({ listing }: ThingsToKnowProps) {
  return (
    <section className="py-8 border-b border-zinc-200">
      <h2 className="text-2xl font-bold text-zinc-900 mb-6">
        Things to know
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cancellation Policy */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <CalendarX className="w-5 h-5 text-zinc-800 stroke-[1.5]" />
          </div>
          <h3 className="font-bold text-zinc-900 text-base">Cancellation policy</h3>
          <div className="space-y-1.5 text-sm text-zinc-700 leading-relaxed">
            <p>{listing.cancellationPolicy.summary}</p>
            <p className="text-zinc-500">{listing.cancellationPolicy.details}</p>
          </div>
          <button className="flex items-center gap-1 font-bold text-sm text-zinc-900 underline hover:text-black pt-1">
            <span>Learn more</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* House Rules */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-zinc-800 stroke-[1.5]" />
          </div>
          <h3 className="font-bold text-zinc-900 text-base">House rules</h3>
          <div className="space-y-1.5 text-sm text-zinc-700">
            <p>Check-in after 2:00 pm</p>
            <p>Checkout before 11:00 am</p>
            <p>3 guests maximum</p>
          </div>
          <button className="flex items-center gap-1 font-bold text-sm text-zinc-900 underline hover:text-black pt-1">
            <span>Learn more</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Safety & Property */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-zinc-800 stroke-[1.5]" />
          </div>
          <h3 className="font-bold text-zinc-900 text-base">Safety & property</h3>
          <div className="space-y-1.5 text-sm text-zinc-700">
            <p>Carbon monoxide alarm not reported</p>
            <p>Smoke alarm not reported</p>
            <p>Exterior security cameras on property</p>
          </div>
          <button className="flex items-center gap-1 font-bold text-sm text-zinc-900 underline hover:text-black pt-1">
            <span>Learn more</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </section>
  );
}

