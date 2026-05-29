/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageSquare, Calculator, PhoneCall } from 'lucide-react';

interface StickyMobileCtaProps {
  onOpenModal: (title: string, subtitle: string, buttonText: string, source: string) => void;
}

export const StickyMobileCta: React.FC<StickyMobileCtaProps> = ({ onOpenModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky mobile bar only after scrolling 250px to avoid cluttering first screen
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="mobile-sticky-quick-bar"
      className="lg:hidden fixed bottom-4 left-4 right-4 z-40 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-150 p-2.5 flex items-center justify-between gap-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.15)] animate-slideUp transition-all"
    >
      {/* Phone Call Hotkey */}
      <a
        href="tel:+74951503883"
        className="w-11 h-11 bg-slate-100 hover:bg-slate-200 text-brand-dark flex items-center justify-center rounded-xl shrink-0 transition-colors"
        aria-label="Позвонить на горячую линию"
      >
        <PhoneCall className="w-5 h-5" />
      </a>

      {/* WhatsApp Link button */}
      <a
        href="https://wa.me/79998887766?text=Здравствуйте!%20Хочу%20узнать%20стоимость%20укладки%2520рулонного%2520газона."
        target="_blank"
        rel="noreferrer referrer"
        className="flex-1 bg-[#25D366] text-white text-xs font-bold py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md active:bg-[#20ba59] transition-all cursor-pointer"
      >
        <MessageSquare className="w-4 h-4 fill-white shrink-0" />
        <span>Чат WhatsApp</span>
      </a>

      {/* Calculator callback pop-up */}
      <button
        onClick={() =>
          onOpenModal(
            'Рассчитать смету со скидкой 10%',
            'Введите контакты ниже. Наш агроном сформирует сравнительную смету по всем сортам травы для вашего замера.',
            'Получить расчет',
            'sticky_mobile_app_bar'
          )
        }
        className="flex-1 bg-brand-gold text-brand-dark hover:bg-brand-amber hover:text-white text-xs font-black py-3 px-3 rounded-xl uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
      >
        <Calculator className="w-4 h-4 shrink-0" />
        <span>Узнать цену</span>
      </button>
    </div>
  );
};
