/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data';
import { HelpCircle, ChevronDown, MessageCircleQuestion } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First item opened by default

  const handleToggle = (index: number) => {
    setOpenIdx(prev => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50 border-t border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-brand-emerald bg-brand-emerald/10 mb-3 uppercase tracking-wider">
            Ответы экспертов
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-brand-dark tracking-tight">
            Отвечаем на частые вопросы <br />
            и реальные возражения клиентов
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
            Разъясняем технические тонкости ухода, укладки и юридических гарантий перед заказом газона.
          </p>
        </div>

        {/* Accordions container list */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-150 rounded-2.5xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                
                {/* Accordion header clicker */}
                <button
                  type="button"
                  onClick={() => handleToggle(idx)}
                  className="w-full px-6 py-5 sm:py-6 flex items-center justify-between gap-4 text-left transition-colors hover:bg-slate-50/50 cursor-pointer"
                  id={`faq-accordion-trigger-${idx}`}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <HelpCircle className={`w-5 h-5 mt-0.5 shrink-0 transition-colors ${isOpen ? 'text-brand-main' : 'text-slate-400'}`} />
                    <span className="font-display font-extrabold text-sm sm:text-base text-brand-dark leading-snug">
                      {item.question}
                    </span>
                  </div>
                  
                  {/* Rotating Chevron circle indicator */}
                  <div className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-brand-main text-white' : 'bg-white text-[#111827]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Smooth CSS-Grid transition drawer wrapper */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 border-t border-slate-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 sm:px-8 sm:py-6 text-xs sm:text-sm text-slate-600 leading-relaxed text-left font-medium">
                      {item.answer}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic micro-CTA under FAQ */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-150 shadow-sm text-left flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-light/10 text-brand-main flex items-center justify-center shrink-0">
              <MessageCircleQuestion className="w-6 h-6 shrink-0" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-display font-black text-brand-dark tracking-tight leading-snug">
                Остались индивидуальные вопросы по участку?
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
                Получите бесплатную голосовую консультацию нашего эксперта-агронома Ивана Савельева (МСХА им. Тимирязева).
              </p>
            </div>
          </div>

          <a
            href="tel:+74951503883"
            className="w-full sm:w-auto bg-brand-dark hover:bg-black text-white font-black text-xs uppercase tracking-wide px-5 py-3.5 rounded-xl text-center shadow-md cursor-pointer transition-colors shrink-0"
          >
            Позвонить агроному
          </a>
        </div>

      </div>
    </section>
  );
};
