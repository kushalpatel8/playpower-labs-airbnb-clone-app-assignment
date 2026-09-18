'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BedDouble, Armchair } from 'lucide-react';
import { ListingDetails } from '@/lib/types';

interface SleepingSectionProps {
  arrangements: ListingDetails['sleepingArrangements'];
}

export function SleepingSection({ arrangements }: SleepingSectionProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-8 border-b border-zinc-200">
      <h2 className="text-2xl font-bold text-zinc-900 mb-6">
        Where you&apos;ll sleep
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {arrangements.map((item) => {
          const hasError = !!imageErrors[item.id];

          return (
            <div key={item.id} className="group">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-100 mb-3 border border-zinc-200/80 shadow-sm">
                {item.image && !hasError ? (
                  <Image
                    src={item.image}
                    alt={item.room}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={() => handleImageError(item.id)}
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex flex-col items-center justify-center p-6 text-zinc-600">
                    {item.room.toLowerCase().includes('bedroom') ? (
                      <BedDouble className="w-12 h-12 text-zinc-700 stroke-[1.3] mb-2" />
                    ) : (
                      <Armchair className="w-12 h-12 text-zinc-700 stroke-[1.3] mb-2" />
                    )}
                    <span className="text-sm font-semibold text-zinc-800">{item.room}</span>
                    <span className="text-xs text-zinc-500">{item.bedCount} {item.bedType}</span>
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-zinc-900 text-base">
                {item.room}
              </h3>
              <p className="text-sm text-zinc-500 mt-0.5">
                {item.bedCount} {item.bedType}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}


