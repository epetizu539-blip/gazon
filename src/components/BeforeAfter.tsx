/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Eye, ArrowRight } from 'lucide-react';



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
  const [containerWidth, setContainerWidth] = useState<number>(600); // default fallback
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set initial width
    setContainerWidth(containerRef.current.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Visual Header */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 font-medium px-1">
        <div className="flex items-center gap-1.5 text-brand-soil">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-800" />
          {beforeLabel}
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <span>Потяните слайдер по центру</span>
          <ArrowRight className="w-3.5 h-3.5 animate-pulse text-brand-emerald" />
        </div>
        <div className="flex items-center gap-1.5 text-brand-main">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald" />
          {afterLabel}
        </div>
      </div>

      {/* Main Slider Area */}
      <div
        id="before-after-slider-container"
        ref={containerRef}
        className="relative w-full h-[320px] sm:h-[450px] rounded-2xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-slate-200 touch-none"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* BEFORE IMAGE (Bottom Layer) */}
        <img
          src={beforeImage}
          alt="До проведения работ по укладке рулонного газона"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />

        {/* AFTER IMAGE (Top Layer, Clipped) */}
        <div
          className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={afterImage}
            alt="После проведения работ по укладке рулонного газона под ключ"
            className="absolute inset-y-0 left-0 h-full object-cover max-w-none pointer-events-none"
            style={{ width: containerWidth }}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* SLIDER DIVIDER LINE */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/90 shadow-[0_0_15px_rgba(0,0,0,0.4)] z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* DRAG HANDLE BADGE */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-lg border-2 border-slate-200 transition-transform scale-100 hover:scale-110 active:scale-95">
            <div className="flex gap-1 text-[10px]">
              <span className="font-bold select-none pointer-events-none">◀</span>
              <span className="font-bold select-none pointer-events-none">▶</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
