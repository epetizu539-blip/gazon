/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Leaf, Award, Timer, Sparkles } from 'lucide-react';

export const ProductFeatures: React.FC = () => {
  const list = [
    {
      title: 'Максимальная свежесть: Срез травы за 3 часа до доставки',
      description: 'Трава — это живой организм. Мы косим дернину на рассвете в 05:00 и привозим её на ваш участок к 09:00 утра, полностью исключая перегрев и прение рулонов.',
      icon: Timer,
      badge: 'Свежесть 100%'
    },
    {
      title: 'Экологическая безопасность и фитоконтроль',
      description: 'Продукция проходит фитосанитарный контроль Минсельхоза РФ. Гарантируем отсутствие сорняков, садовых вредителей, личинок и аллергенов.',
      icon: Award,
      badge: 'Безопасность'
    },
    {
      title: 'Элитная селекция сортов мятлика',
      description: 'Используем премиальные семена мятлика лугового американской и канадской селекции. Густой изумрудный покров с мощной корневой системой.',
      icon: Leaf,
      badge: 'Селекция'
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-brand-emerald bg-brand-emerald/10 mb-3 uppercase tracking-wider">
            Ключевые преимущества
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-3.5xl font-display font-black text-brand-dark tracking-tight leading-snug">
            Почему выбирают наш <br />
            рулонный газон
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            Мы гарантируем высочайшие стандарты качества газона на всех этапах: от выращивания до доставки на ваш участок.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 hover:border-brand-emerald/20 hover:bg-white hover:shadow-2xl transition-all duration-300 group text-left flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-main/10 text-brand-main group-hover:bg-brand-emerald group-hover:text-white flex items-center justify-center font-bold transition-all">
                      <Icon className="w-6 h-6 shrink-0" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-brand-emerald bg-brand-emerald/10 border border-brand-emerald/20 px-2.5 py-1 rounded-md">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-display font-black text-brand-dark leading-snug group-hover:text-brand-main transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-500 mt-3.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="border-t border-slate-200 border-dashed pt-4 mt-5">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-main">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Гарантия качества производителя</span>
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
