/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, ShieldCheck, Flame, Star, Compass, Snowflake, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenModal: (title: string, subtitle: string, buttonText: string, source: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section
      id="hero-section"
      className="relative pt-[110px] pb-12 sm:pb-20 lg:pt-[150px] lg:pb-32 overflow-hidden bg-gradient-to-b from-brand-emerald/10 via-brand-emerald/5 to-transparent"
    >
      {/* Abstract Background Grass Vector Accents and Richer Colorful Glows */}
      <div className="absolute top-[10%] right-[-10%] w-[550px] h-[550px] bg-gradient-to-tr from-brand-main/20 via-brand-emerald/30 to-brand-gold/15 blur-[100px] rounded-full pointer-events-none opacity-80" />
      <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] bg-brand-emerald/10 blur-[85px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: HIGH CONVERTING CORE OFFERS */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Live Trust Prompt Ticket */}
            <div className="inline-flex flex-wrap items-center gap-2 bg-brand-dark/5 backdrop-blur-md border border-brand-dark/5 px-4 py-2 rounded-2xl">
              <span className="flex h-2.5 w-2.5 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-emerald"></span>
              </span>
              <p className="text-xs font-semibold text-brand-dark flex items-center gap-1">
                <span>Сезон 2026 открыт:</span>
                <span className="text-brand-light">Вспашка и замер в день звонка</span>
              </p>
            </div>

            {/* Core Promise Title */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] lg:leading-[1.1] font-display font-black text-brand-dark tracking-tight">
                Идеальный изумрудный <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-main via-brand-emerald to-brand-light">
                  газон под ключ за 1 день
                </span> <br />
                с гарантией 12 месяцев по договору
              </h1>
              
              <p className="text-slate-600 font-medium text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
                Собственный питомник в Подмосковье площадью 120 Га. Укладываем газон, который <span className="text-brand-main font-bold">срезали всего 3 часа назад</span>. Бесплатный выезд агронома-замерщика сегодня!
              </p>
            </div>

            {/* Bullets/Triggers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-emerald shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-brand-dark">100% приживаемость</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">В случае пожелтения — заменим пласты по гарантии бесплатно</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-emerald shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-brand-dark">Дважды очищен от сорняков</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Суперплотная корневая система не пропускает бурьян</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-emerald shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-brand-dark">Оплата по факту укладки</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Никаких предоплат вслепую. Сначала принимаете работу — затем платите</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-emerald shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-brand-dark">Свежесть категории А</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Возим рефрижераторами при температуре строго +4°C</p>
                </div>
              </div>
            </div>

            {/* CALL TO ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3.5 max-w-lg">
              
              {/* Primary Call Action: Scroll to Quiz/Calc */}
              <a
                href="#calculator"
                className="flex-1 bg-brand-gold hover:bg-brand-amber text-brand-dark hover:text-white font-bold text-sm uppercase tracking-wider py-4.5 px-6 rounded-2xl flex items-center justify-center gap-2.5 shadow-xl shadow-brand-gold/20 hover:shadow-brand-amber/30 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Flame className="w-4 h-4 fill-current text-amber-800 animate-pulse" />
                <span>Рассчитать смету со скидкой</span>
              </a>

              {/* Secondary Call Action: Modal */}
              <button
                onClick={() =>
                  onOpenModal(
                    'Заказать бесплатный выезд замерщика',
                    'Наш замерщик приедет со всеми видами газонов, лазером измерит перепады высот на участке и подготовит детальный план.',
                    'Заказать бесплатный выезд',
                    'hero_modal_cta'
                  )
                }
                className="flex-1 bg-brand-dark hover:bg-black text-white font-bold text-sm uppercase tracking-wider py-4.5 px-6 rounded-2xl flex items-center justify-center gap-2.5 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 border border-slate-800/20"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Заказать замер</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-3 justify-start opacity-85">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <Star className="w-4.5 h-4.5 fill-brand-gold text-brand-gold" />
                <span>Оценка клиентов: <strong>4.97 / 5.00</strong></span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block" />
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <Compass className="w-4.5 h-4.5 text-brand-main" />
                <span>Работаем по <strong>всей МО</strong></span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block" />
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <Snowflake className="w-4.5 h-4.5 text-blue-500" />
                <span>Морозостойкость до <strong>-40°C</strong></span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: HIGH QUALITY Collaged Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[450px] lg:max-w-none">
              
              {/* Outer Glass Frame container emphasizing lawn translucent theme */}
              <div className="relative p-3.5 rounded-[42px] bg-white/20 backdrop-blur-xl border border-white/40 shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500 group">
                
                {/* Main premium illustration photo border card with translucent backdrop blending */}
                <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-tr from-brand-main/40 via-brand-emerald/30 to-brand-gold/20 border border-white/15 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=800&q=80"
                    alt="Красивый постеленный рулонный газон у роскошного загородного дома"
                    className="w-full h-[380px] sm:h-[460px] object-cover mix-blend-multiply opacity-75 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Visual image bottom gradient overlay with soft translucent feel */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2f1b]/95 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating caption overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white text-left z-10">
                    <span className="bg-brand-emerald text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Реальный кейс</span>
                    <p className="font-display font-black text-sm sm:text-base mt-2">
                      Поселок «Княжье Озеро». Укладка газона за 14 часов.
                    </p>
                  </div>
                </div>
              </div>

              {/* FLOATING BADGE 1: FRESH HARVEST */}
              <div className="absolute -top-4 -left-6 z-10 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-3.5 flex items-center gap-3 border border-white/40 max-w-[220px] animate-bounce duration-5000">
                <div className="w-10 h-10 rounded-full bg-brand-light/10 text-brand-main flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Свежесть</span>
                  <p className="text-xs font-extrabold text-slate-800">Срезка сегодня в 05:00 утра</p>
                </div>
              </div>

              {/* FLOATING BADGE 2: LIVE METRICS */}
              <div className="absolute bottom-12 -right-6 z-10 bg-brand-dark/95 backdrop-blur-md shadow-xl rounded-2xl p-4 flex items-center gap-3.5 border border-slate-700/30 text-white max-w-[200px]">
                <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center shrink-0 font-display font-black text-brand-dark text-lg">
                  12
                </div>
                <div className="text-left">
                  <span className="block text-[10px] uppercase font-bold text-slate-300">Договорная</span>
                  <p className="text-xs font-extrabold">Гарантия приживаемости 12 месяцев</p>
                </div>
              </div>

              {/* Visual Grid pattern representing lawn structure */}
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[radial-gradient(#0d522c_1.5px,transparent_1.5px)] [background-size:8px_8px] opacity-40 pointer-events-none" />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
