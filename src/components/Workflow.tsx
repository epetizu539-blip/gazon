/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PhoneCall, Ruler, Truck, Sparkles, CheckSquare, ClipboardList } from 'lucide-react';

export const Workflow: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Быстрая заявка',
      description: 'Вы рассчитываете смету в калькуляторе или оставляете заявку. Закрепляем за вами персонального инженера-агронома.',
      icon: PhoneCall
    },
    {
      num: '02',
      title: 'Бесплатный замер завтра',
      description: 'Агроном приезжает на участок, проверяет кислотность почвы, измеряет площадь лазером и привозит 4 живых образца травы.',
      icon: Ruler
    },
    {
      num: '03',
      title: 'Бережный срез и доставка',
      description: 'В 05:00 косим отобранный газон в питомнике Подмосковья и везем на участок в закрытых вентилируемых рефрижераторах.',
      icon: Truck
    },
    {
      num: '04',
      title: 'Правильная укладка за 24 ч',
      description: 'Культивируем почву фрезами, уплотняем катками, планируем уклоны по нивелиру, раскатываем рулоны со смещением стыков.',
      icon: Sparkles
    },
    {
      num: '05',
      title: 'Прием работы и Гарантия',
      description: 'Обильно проливаем грунт, подписываем акт приемки, обучаем уходу и выписываем официальную гарантию на приживаемость 1 год.',
      icon: CheckSquare
    }
  ];

  return (
    <section id="workflow" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      
      {/* Visual Design Background element */}
      <div className="absolute top-[30%] -right-32 w-96 h-96 bg-brand-light/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-brand-emerald bg-brand-emerald/10 mb-3 uppercase tracking-wider">
            От замера до пикника
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-3.5xl font-display font-black text-brand-dark tracking-tight leading-snug">
            Всего 5 простых шагов к вашему <br />
            идеальному луговому ковру
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
            Мы берем на себя 100% сопутствующих хлопот по закупке, доставке, вспашке и утилизации остатков грунта.
          </p>
        </div>

        {/* Steps Horizontal/Vertical timeline */}
        <div className="relative">
          {/* Central Connecting line (desktop only) */}
          <div className="hidden lg:block absolute left-[8%] right-[8%] top-[100px] h-[3px] bg-gradient-to-r from-brand-main via-brand-emerald to-slate-200 pointer-events-none z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-stretch relative z-10">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-slate-50 p-6 sm:p-7 rounded-3xl border border-slate-100 hover:border-brand-emerald/30 group text-left relative transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Node Circle Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-205 border-slate-150 text-brand-main shadow-sm group-hover:bg-brand-main group-hover:text-white flex items-center justify-center transition-all">
                        <IconComp className="w-5 h-5 shrink-0" />
                      </div>
                      <span className="font-display font-black text-slate-300 text-3xl sm:text-4xl tracking-tight leading-none group-hover:text-brand-light/35 transition-colors">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="text-base font-display font-black text-brand-dark tracking-tight leading-none group-hover:text-brand-main transition-colors mb-3">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-505 text-slate-500 leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>

                  <div className="border-t border-slate-200/50 pt-3 mt-4 flex items-center gap-1.5 text-[9px] uppercase font-black text-slate-400">
                    <ClipboardList className="w-3.5 h-3.5 text-slate-350" />
                    <span>Документы ГОСТ</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
