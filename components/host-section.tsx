'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Sparkles, GraduationCap, Cake, MessageCircle, Check } from 'lucide-react';
import { HostInfo } from '@/lib/types';

interface HostSectionProps {
  host: HostInfo;
}

export function HostSection({ host }: HostSectionProps) {
  const [messageSent, setMessageSent] = useState(false);

  return (
    <section className="py-8 border-b border-zinc-200" id="host">
      <h2 className="text-2xl font-bold text-zinc-900 mb-6">
        Meet your host
      </h2>

      {/* Main Host Card */}
      <div className="max-w-2xl bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Host Avatar & Name */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-3">
              <div className="w-24 h-24 rounded-full bg-[#1b3d34] flex flex-col items-center justify-center text-white shadow-md text-center p-2">
                <span className="text-[10px] tracking-widest font-serif font-light">MIRASHYA</span>
                <span className="text-[8px] tracking-wider text-emerald-300 font-sans">HOMES</span>
              </div>
              <div
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#FF385C] text-white flex items-center justify-center shadow-md border-2 border-white"
                title="Identity verified"
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-zinc-900">{host.name}</h3>
            <p className="text-sm font-medium text-zinc-600">Host</p>
          </div>

          {/* Stats Box (Reviews, Rating, Years hosting) */}
          <div className="space-y-4 text-right self-center sm:self-auto min-w-[140px]">
            <div>
              <p className="text-2xl font-bold text-zinc-900">{host.reviewCount.toLocaleString()}</p>
              <p className="text-xs text-zinc-500 font-medium">Reviews</p>
            </div>
            <div className="pt-2 border-t border-zinc-100">
              <p className="text-2xl font-bold text-zinc-900">{host.rating.toFixed(2)}★</p>
              <p className="text-xs text-zinc-500 font-medium">Rating</p>
            </div>
            <div className="pt-2 border-t border-zinc-100">
              <p className="text-2xl font-bold text-zinc-900">{host.yearsHosting}</p>
              <p className="text-xs text-zinc-500 font-medium">Years hosting</p>
            </div>
          </div>
        </div>

        {/* Bio details bullets */}
        <div className="mt-8 pt-6 border-t border-zinc-100 space-y-3 text-sm text-zinc-800">
          <div className="flex items-center gap-3">
            <Cake className="w-5 h-5 text-zinc-700 stroke-[1.5]" />
            <span>Born in the 80s</span>
          </div>
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-zinc-700 stroke-[1.5]" />
            <span>Where I went to school: NICMAR GOA</span>
          </div>
        </div>
      </div>

      {/* Co-Hosts Section */}
      {host.coHosts && host.coHosts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-base font-bold text-zinc-900 mb-4">
            Co-Hosts
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {host.coHosts.map((cohost, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {cohost.avatar ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-200 shrink-0">
                    <Image
                      src={cohost.avatar}
                      alt={cohost.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                      cohost.initials === 'S'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-sky-100 text-sky-800'
                    }`}
                  >
                    {cohost.initials}
                  </div>
                )}
                <span className="text-sm font-medium text-zinc-900">
                  {cohost.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Host Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-zinc-900">
          Host details
        </h3>
        <div className="space-y-1 text-sm text-zinc-800 font-medium">
          <p>Response rate: {host.responseRate}</p>
          <p>Responds {host.responseTime}</p>
        </div>

        <button
          onClick={() => {
            setMessageSent(true);
            setTimeout(() => setMessageSent(false), 4000);
          }}
          className="px-6 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-sm transition-all mt-2 active:scale-95"
        >
          Message host
        </button>

        {messageSent && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl animate-in fade-in duration-200 max-w-md">
            Message draft sent to Mirashya Homes! They typically reply within an hour.
          </div>
        )}

        <div className="flex items-center gap-3 text-xs text-zinc-500 pt-3 border-t border-zinc-100 max-w-xl">
          <ShieldCheck className="w-6 h-6 text-zinc-600 shrink-0 stroke-[1.5]" />
          <span>To help protect your payment, always use Airbnb to send money and communicate with hosts.</span>
        </div>
      </div>
    </section>
  );
}

