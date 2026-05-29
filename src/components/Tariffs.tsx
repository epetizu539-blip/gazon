/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LAWN_TYPES } from '../data';
import { CheckCircle2, ChevronRight, Ruler, Layers, ShieldCheck, Flame } from 'lucide-react';

interface TariffsProps {
  onOpenModal: (title: string, subtitle: string, buttonText: string, source: string) => void;
}

export const Tariffs: React.FC<TariffsProps> = ({ onOpenModal }) => {
  return (
    <section id="tariffs" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-brand-emerald bg-brand-emerald/10 mb-3 uppercase tracking-wider">
            Каталог сортов газона
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-3.5xl font-display font-black text-brand-dark tracking-tight">
            Прямые поставки свежесрезанной травы <br />
            напрямую из питомника в Подмосковье
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            Выберите сорт под ваши задачи. Все рулоны сертифицированы, дважды скошены и обработаны от паразитов перед доставкой.
          </p>
        </div>

        {/* Catalog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {LAWN_TYPES.map((lawn) => {
            const isPremium = lawn.id === 'premium';
            const isElite = lawn.id === 'elite';
            return (
              <div
                key={lawn.id}
                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative flex flex-col justify-between ${
                  isPremium
                    ? 'border-brand-main ring-4 ring-brand-emerald/10 shadow-lg'
                    : 'border-slate-150'
                }`}
              >
                {/* Popularity Badge floating */}
                {isPremium && (
                  <span className="absolute top-4 right-4 z-15 bg-brand-gold text-brand-dark text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-current text-white shrink-0" />
                    <span>Выбор 85% клиентов</span>
                  </span>
                )}

                {/* Card header with visual photo */}
                <div className="h-44 overflow-hidden relative bg-slate-200">
                  <img
                    src={lawn.image}
                    alt={lawn.nameRu}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-left">
                    <span className="text-[10px] uppercase font-bold text-brand-emerald bg-white px-2 py-0.5 rounded-md">
                      {lawn.name} Series
                    </span>
                    <h3 className="text-base font-display font-black text-white mt-1 leading-snug">
                      {lawn.nameRu}
                    </h3>
                  </div>
                </div>

                {/* Card body specs */}
                <div className="p-5 sm:p-6 text-left flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    {/* Price structure */}
                    <div className="flex items-baseline gap-2 pb-4 border-b border-slate-100">
                      <p className="text-xl sm:text-2xl font-display font-black text-brand-main">
                        {lawn.pricePerSqm} ₽<span className="text-xs font-semibold text-slate-500">/м²</span>
                      </p>
                      {lawn.oldPricePerSqm && (
                        <p className="text-xs line-through text-slate-400">
                          {lawn.oldPricePerSqm} ₽
                        </p>
                      )}
                    </div>

                    {/* Micro parameters */}
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-start gap-2 text-slate-600">
                        <Layers className="w-4 h-4 text-brand-main shrink-0 mt-0.5" />
                        <p><strong>Состав травы:</strong> <span className="text-slate-500 block text-[11px] mt-0.5 leading-relaxed">{lawn.composition}</span></p>
                      </div>

                      <div className="flex items-start gap-2 text-slate-600">
                        <Ruler className="w-4 h-4 text-brand-main shrink-0 mt-0.5" />
                        <p><strong>Параметры:</strong> <span className="text-slate-505 text-slate-500 block text-[11px] mt-0.5 leading-relaxed">{lawn.density} • {lawn.thickness}</span></p>
                      </div>
                    </div>

                    {/* Bullet features list */}
                    <ul className="space-y-2 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-700 leading-normal">
                      {lawn.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    {/* Recommendation details */}
                    <div className="bg-slate-50 rounded-xl p-3 text-[10px] text-slate-505 border border-slate-100 leading-normal mb-4">
                      <p className="font-extrabold text-slate-700">Идеальное назначение:</p>
                      <p className="text-slate-500 mt-0.5 leading-relaxed">{lawn.bestFor}</p>
                    </div>

                    {/* Order action button */}
                    <button
                      type="button"
                      onClick={() =>
                        onOpenModal(
                          `Заказ сорта «${lawn.nameRu}»`,
                          `Вы заказываете расчёт укладки элитного рулонного газона сорта «${lawn.nameRu}». Наш агроном привезет образцы именно этой травы прямо к вам на участок бесплатно.`,
                          'Получить смету по этому сорту',
                          `tariff_btn_${lawn.id}`
                        )
                      }
                      className={`w-full font-bold text-xs uppercase tracking-wide py-3.5 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        isPremium
                          ? 'bg-brand-main hover:bg-brand-dark text-white shadow-md'
                          : 'bg-slate-100 hover:bg-slate-205 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      <span>Подобрать этот сорт</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
