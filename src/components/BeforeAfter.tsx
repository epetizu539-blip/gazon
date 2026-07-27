/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Участок ДО укладки',
  afterLabel = 'Изумрудный газон ПОСЛЕ'
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth introductory animation to show interactivity on first mount
  useEffect(() => {
    if (hasInteracted) return;

    let start: number | null = null;
    const duration = 2200; // 2.2 seconds

    const animate = (timestamp: number) => {
      if (hasInteracted) return;
      if (!start) start = timestamp;
      const progress = timestamp - start;

      if (progress < duration) {
        // Multi-phase sine wave to swing left, then right, then center:
        // 50% + sin(progress * speed) * amplitude * decay
        const angle = (progress / duration) * Math.PI * 2.5; // 1.25 full waves
        const decay = Math.max(0, 1 - progress / duration);
        const offset = Math.sin(angle) * 15 * decay;
        setSliderPosition(50 + offset);
        requestAnimationFrame(animate);
      } else {
        setSliderPosition(50);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hasInteracted]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleStart = (clientX: number) => {
    setHasInteracted(true);
    setIsDragging(true);
    handleMove(clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="space-y-4">
      {/* Visual Header */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 font-medium px-1">
        <div className="flex items-center gap-1.5 text-brand-main">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald shadow-sm" />
          {afterLabel}
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <span className="hidden xs:inline">Потяните слайдер по центру</span>
          <span className="xs:hidden">Проведите пальцем</span>
          <ArrowRight className="w-3.5 h-3.5 animate-pulse text-brand-emerald animate-infinite" />
        </div>
        <div className="flex items-center gap-1.5 text-brand-soil">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-800 shadow-sm" />
          {beforeLabel}
        </div>
      </div>

      {/* Main Slider Area */}
      <div
        id="before-after-slider-container"
        ref={containerRef}
        className="relative w-full h-[320px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-slate-150 touch-none group"
        onMouseDown={(e) => handleStart(e.clientX)}
        onTouchStart={(e) => {
          if (e.touches[0]) {
            handleStart(e.touches[0].clientX);
          }
        }}
      >
        {/* BEFORE IMAGE (Bottom Layer) */}
        <img
          src={beforeImage}
          alt="До проведения работ по укладке рулонного газона"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/images/case1_before.jpg';
          }}
        />

        {/* AFTER IMAGE (Top Layer, Clipped) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={afterImage}
            alt="После проведения работ по укладке рулонного газона под ключ"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/images/case1_after.jpg';
            }}
          />
        </div>

        {/* Dynamic Glassmorphic Corner Badges */}
        <div 
          className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-xl bg-brand-emerald/85 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-wider select-none pointer-events-none shadow-lg transition-opacity duration-300"
          style={{ opacity: sliderPosition > 15 ? 1 : 0.1 }}
        >
          После укладки
        </div>
        <div 
          className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-xl bg-slate-900/75 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-wider select-none pointer-events-none shadow-lg transition-opacity duration-300"
          style={{ opacity: sliderPosition < 85 ? 1 : 0.1 }}
        >
          До укладки
        </div>

        {/* Elegant Inset Shadow Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.15)] pointer-events-none z-10" />

        {/* SLIDER DIVIDER LINE */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/95 shadow-[0_0_15px_rgba(0,0,0,0.45)] z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Ambient Bouncing Glow Ring when Idle */}
          {!hasInteracted && (
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-brand-emerald/25 animate-ping pointer-events-none" />
          )}

          {/* DRAG HANDLE BADGE */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.25)] border-2 border-brand-emerald transition-all duration-200 group-hover:scale-105 group-active:scale-95 group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
            <div className="flex gap-1 text-[10px]">
              <span className="font-black select-none pointer-events-none text-brand-emerald">◀</span>
              <span className="font-black select-none pointer-events-none text-brand-emerald">▶</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
