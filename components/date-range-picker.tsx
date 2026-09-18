'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangePickerProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onChange: (checkIn: Date | null, checkOut: Date | null) => void;
}

export function DateRangePicker({ checkIn, checkOut, onChange }: DateRangePickerProps) {
  // Current visible month offset (0 = current month)
  const [monthOffset, setMonthOffset] = useState(0);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Month 1
  const month1Date = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  // Month 2
  const month2Date = new Date(today.getFullYear(), today.getMonth() + monthOffset + 1, 1);

  const formatMonthTitle = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (date: Date) => {
    if (date < today) return;

    if (!checkIn || (checkIn && checkOut)) {
      // First click: set check-in
      onChange(date, null);
    } else if (checkIn && !checkOut) {
      if (date < checkIn) {
        // Clicked before check-in, make this the new check-in
        onChange(date, null);
      } else if (date.getTime() === checkIn.getTime()) {
        // Clicked same date
        onChange(checkIn, null);
      } else {
        // Set check-out
        onChange(checkIn, date);
      }
    }
  };

  const isSelectedStart = (date: Date) => {
    return checkIn && date.getTime() === checkIn.getTime();
  };

  const isSelectedEnd = (date: Date) => {
    return checkOut && date.getTime() === checkOut.getTime();
  };

  const isInRange = (date: Date) => {
    if (checkIn && checkOut) {
      return date > checkIn && date < checkOut;
    }
    if (checkIn && !checkOut && hoverDate && hoverDate > checkIn) {
      return date > checkIn && date < hoverDate;
    }
    return false;
  };

  const renderMonth = (targetDate: Date) => {
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const daysCount = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];
    // Padding days before start of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`pad-${i}`} className="w-10 h-10" />);
    }

    for (let d = 1; d <= daysCount; d++) {
      const current = new Date(year, month, d);
      const isPast = current < today;
      const isStart = isSelectedStart(current);
      const isEnd = isSelectedEnd(current);
      const inRange = isInRange(current);

      let dayClass = 'w-10 h-10 flex items-center justify-center text-sm font-medium transition-all relative select-none';

      if (isPast) {
        dayClass += ' text-zinc-300 cursor-not-allowed line-through';
      } else {
        dayClass += ' cursor-pointer';
      }

      let buttonClass = 'w-9 h-9 rounded-full flex items-center justify-center transition-all z-10';

      if (isStart || isEnd) {
        buttonClass += ' bg-black text-white font-semibold shadow-sm';
      } else if (inRange) {
        buttonClass += ' bg-zinc-100 text-zinc-900 rounded-none';
      } else if (!isPast) {
        buttonClass += ' hover:border hover:border-black text-zinc-800';
      }

      days.push(
        <div
          key={`day-${d}`}
          className={dayClass}
          onClick={() => !isPast && handleDateClick(current)}
          onMouseEnter={() => !isPast && setHoverDate(current)}
          onMouseLeave={() => setHoverDate(null)}
        >
          {/* Background range bar */}
          {inRange && (
            <div className="absolute inset-0 bg-zinc-100 -z-0" />
          )}
          {isStart && checkOut && (
            <div className="absolute top-0 bottom-0 right-0 left-1/2 bg-zinc-100 -z-0" />
          )}
          {isEnd && (
            <div className="absolute top-0 bottom-0 left-0 right-1/2 bg-zinc-100 -z-0" />
          )}
          <div className={buttonClass}>{d}</div>
        </div>
      );
    }

    return (
      <div className="flex-1">
        <h4 className="text-center font-bold text-zinc-900 text-sm mb-4">
          {formatMonthTitle(targetDate)}
        </h4>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-zinc-500 mb-2">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>
        <div className="grid grid-cols-7 gap-y-1 justify-items-center">
          {days}
        </div>
      </div>
    );
  };

  // Calculate nights
  const nights = checkIn && checkOut
    ? Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="p-4 sm:p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm">
      {/* Calendar Header info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-xl font-bold text-zinc-900">
            {nights > 0 ? `${nights} nights in Candolim` : 'Select check-in date'}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500">
            {checkIn && checkOut
              ? `${checkIn.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} – ${checkOut.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
              : 'Add your travel dates for exact pricing'}
          </p>
        </div>

        {/* Clear dates button */}
        {(checkIn || checkOut) && (
          <button
            onClick={() => onChange(null, null)}
            className="text-xs font-semibold underline text-zinc-800 hover:text-black self-start sm:self-auto"
          >
            Clear dates
          </button>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="relative">
        <div className="flex items-center justify-between absolute -top-8 w-full z-10 px-2 pointer-events-none">
          <button
            onClick={() => setMonthOffset((prev) => Math.max(0, prev - 1))}
            disabled={monthOffset === 0}
            className={`p-1.5 rounded-full hover:bg-zinc-100 transition-colors pointer-events-auto ${
              monthOffset === 0 ? 'text-zinc-300 cursor-not-allowed' : 'text-zinc-700'
            }`}
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMonthOffset((prev) => prev + 1)}
            className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-700 transition-colors pointer-events-auto"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dual Month Calendar View */}
        <div className="flex flex-col md:flex-row gap-8">
          {renderMonth(month1Date)}
          <div className="hidden md:block w-px bg-zinc-100 self-stretch" />
          <div className="hidden md:block flex-1">
            {renderMonth(month2Date)}
          </div>
        </div>
      </div>
    </div>
  );
}
