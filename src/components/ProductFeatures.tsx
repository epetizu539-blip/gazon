/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Leaf, Award, Compass, Timer, Settings2, Hammer, ShieldAlert, Sparkles } from 'lucide-react';

export const ProductFeatures: React.FC = () => {
  const list = [
    {
      title: 'Срез травы за 3 часа до погрузки',
      description: 'Трава — это живой организм. Если возить её в сложенном состоянии дольше суток, она перегревается и преет. Мы косим дернину на рассвете в 05:00 и привозим её к вам на участок уже к 09:00 утра.',
      icon: Timer,
      badge: 'Свежесть А+'
    },
    {
      title: 'Лазерное выравнивание по ГОСТ',
      description: 'Газон укладывается только на идеально ровную почву. Мы пропахиваем территорию культиваторами фрезерного типа и проводим высотную планировку с использованием лазерных нивелиров.',
      icon: Settings2,
      badge: 'Немецкие катки'
    },
    {
      title: 'Сертификат качества Минсельхоза РФ',
      description: 'Вся наша продукция проходит фитосанитарный контроль. Гарантируем полное отсутствие сорняков, садовых вредителей, личинок хруща и возбудителей грибковых заболеваний во всех рулонах.',
      icon: Award,
      badge: '100% безопасный'
    },
    {
      title: 'Сверхпрочная структура дерна',
      description: 'Толщина дернины строго 2.2 — 2.4 см. Мощно переплетенная корневая система мятлика настолько прочная, что рулон шириной 40 см можно поднять вертикально за один край, и он не разорвется.',
      icon: Leaf,
      badge: 'Двойная селекция'
    },
    {
      title: 'Команда сертифицированных агрономов',
      description: 'На каждом объекте укладку контролирует профессиональный инженер-агроном с профильным образованием МСХА им. Тимирязева. Он берет пробы почвы и настраивает нормы автополива индивидуально.',
      icon: Compass,
      badge: 'Экспертный подход'
    },
    {
      title: 'Строгие юридические гарантии',
      description: 'Цена в смете окончательная и фиксируется до начала работ. Никаких доплат за непредвиденный грунт. За просрочку сдачи укладки газона платим штраф 5000 рублей за каждый час опоздания.',
      icon: ShieldAlert,
      badge: 'Все официально'
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-brand-emerald bg-brand-emerald/10 mb-3 uppercase tracking-wider">
            Почему мы лучшие на рынке
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-3.5xl font-display font-black text-brand-dark tracking-tight leading-snug">
            Премиальные стандарты укладки <br />
            рулонного газона для безупречного результата
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            Мы не просто привозим рулоны травы. Мы создаем идеальную экосистему на вашем участке, которая будет радовать вас изумрудной свежестью долгие годы.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 hover:border-brand-emerald/20 hover:bg-white hover:shadow-2xl transition-all duration-300 group text-left flex flex-col justify-between min-h-[290px]"
              >
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-main/10 text-brand-main group-hover:bg-brand-emerald group-hover:text-white flex items-center justify-center font-bold transition-all">
                      <Icon className="w-6 h-6 shrink-0" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 border border-slate-200/50 px-2.5 py-1 rounded-md">
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

                <div className="border-t border-slate-250 border-dashed pt-4 mt-5">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-main">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>По стандарту ассоциации агрономов России</span>
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
