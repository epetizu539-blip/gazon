/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Send, Calculator, PhoneCall, MessageCircle } from 'lucide-react';

interface StickyMobileCtaProps {
  onOpenModal: (title: string, subtitle: string, buttonText: string, source: string) => void;
}

export const StickyMobileCta: React.FC<StickyMobileCtaProps> = ({ onOpenModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      // Show sticky mobile bar only after scrolling 250px to avoid cluttering first screen
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Mark as scrolling and clear any existing timeout
      setIsScrolling(true);
      window.clearTimeout(timeoutId);

      // Reset scroll state after 300ms of inactivity
      timeoutId = window.setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="mobile-sticky-quick-bar"
      className={`lg:hidden fixed bottom-4 left-4 right-4 z-40 bg-slate-100/95 backdrop-blur-md rounded-2xl border border-slate-300/40 p-2.5 flex items-center justify-between gap-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.15)] animate-slideUp transition-all duration-300 ${
        isScrolling ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {/* Phone Call Hotkey */}
      <a
        href="tel:+79852394989"
        className="w-11 h-11 bg-white hover:bg-slate-200 text-brand-dark flex items-center justify-center rounded-xl shrink-0 border border-slate-200 shadow-sm transition-colors"
        aria-label="Позвонить на горячую линию"
      >
        <PhoneCall className="w-5 h-5" />
      </a>

      {/* Telegram and WhatsApp messenger buttons */}
      <a
        href="https://t.me/izumrudny_gazon"
        target="_blank"
        rel="noreferrer referrer"
        className="flex-1 bg-slate-800 text-white text-[11px] font-extrabold py-3 px-2 rounded-xl flex items-center justify-center gap-1 shadow-sm active:bg-slate-900 transition-all cursor-pointer hover:bg-slate-700"
      >
        <Send className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">Telegram</span>
      </a>

      <a
        href="https://wa.me/79852394989"
        target="_blank"
        rel="noreferrer"
        className="flex-1 bg-gradient-to-r from-[#25a3fc] via-[#524bf2] to-[#b83bf2] text-white text-[11px] font-extrabold py-3 px-2 rounded-xl flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer hover:brightness-110"
      >
        <MessageCircle className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">MAX</span>
      </a>

      {/* Calculator callback pop-up (replaces Find out the price text with Icon) */}
      <button
        onClick={() =>
          onOpenModal(
            'Рассчитать смету со скидкой 5%',
            'Введите контакты ниже. Наш агроном сформирует сравнительную смету по всем сортам травы для вашего замера.',
            'Получить расчет',
            'sticky_mobile_app_bar'
          )
        }
        className="w-11 h-11 bg-brand-gold text-brand-dark hover:bg-brand-amber hover:text-white flex items-center justify-center rounded-xl shrink-0 shadow-sm transition-colors cursor-pointer"
        aria-label="Запустить калькулятор рулонных газонов"
      >
        <Calculator className="w-5 h-5 shrink-0" />
      </button>
    </div>
  );
};
