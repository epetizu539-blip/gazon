/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ChevronRight, ChevronLeft, Timer, Receipt, HelpCircle } from 'lucide-react';

interface CalculatorProps {
  onOpenModalWithData: (
    title: string,
    subtitle: string,
    buttonText: string,
    source: string,
    data: Record<string, string | number | boolean | string[]>
  ) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onOpenModalWithData }) => {
  const [step, setStep] = useState<number>(1);
  const [area, setArea] = useState<number>(150);
  const [ground, setGround] = useState<'basic' | 'prep'>('basic');
  const [irrigation, setIrrigation] = useState<'yes' | 'no'>('no');

  // Multi-step calculations
  const lawnCost = area * 250;
  const groundCost = area * (ground === 'prep' ? 450 : 0);
  const workCost = area * 200;
  const irrigationCost = area * (irrigation === 'yes' ? 1000 : 0);

  // Delivery details calculation depending on area
  const getDeliveryDetails = (currentArea: number) => {
    let cost = 0;
    let desc = '';

    if (currentArea <= 100) {
      cost = 15000;
      desc = 'Малый грузовик';
    } else if (currentArea <= 300) {
      cost = 40000;
      desc = '10-тонная машина';
    } else if (currentArea <= 600) {
      cost = 55000;
      desc = 'Доставка фурой';
    } else {
      const tempArea = currentArea;
      let numFura = Math.floor(tempArea / 600);
      const rem = tempArea % 600;
      let numTenTon = 0;
      let numSmall = 0;

      if (rem > 0) {
        if (rem <= 100) {
          numSmall = 1;
        } else if (rem <= 300) {
          numTenTon = 1;
        } else if (rem <= 400) {
          numFura += 1;
        } else {
          numFura += 1;
        }
      }

      cost = (numFura * 55000) + (numTenTon * 40000) + (numSmall * 15000);
      const parts = [];
      if (numFura > 0) parts.push(`${numFura} x Фура`);
      if (numTenTon > 0) parts.push(`${numTenTon} x 10т`);
      if (numSmall > 0) parts.push(`${numSmall} x Малая`);
      
      desc = `Комбинированная (${parts.join(' + ')})`;
    }

    return { cost, desc };
  };

  const delivery = getDeliveryDetails(area);

  // Discount calculation: only on lawn and work
  let discountPercent = 0;
  if (area >= 500) {
    discountPercent = 0.15;
  } else if (area >= 300) {
    discountPercent = 0.10;
  } else if (area >= 150) {
    discountPercent = 0.05;
  }

  const discountValue = Math.round((lawnCost + workCost) * discountPercent);
  const subtotal = lawnCost + groundCost + workCost + delivery.cost + irrigationCost;
  const total = Math.max(0, subtotal - discountValue);

  // Duration calculation
  let daysText = '1 день';
  if (area > 600) {
    daysText = '2-3 дня';
  } else if (area > 200) {
    daysText = '1-2 дня';
  }

  // Next / Previous step controls
  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      handleOpenLeadForm();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const setAreaPreset = (val: number) => {
    setArea(val);
  };

  const handleOpenLeadForm = () => {
    onOpenModalWithData(
      'Получить точную смету и подарки',
      `Мы зафиксируем за вами расчет на сумму ${total.toLocaleString('ru-RU')} ₽ и отправим детальный чек-лист подготовки участка на этот номер.`,
      'Зафиксировать результаты расчета',
      'calculator_stepped_quote',
      {
        'Площадь': `${area} м²`,
        'Подготовка грунта': ground === 'prep' ? 'Требуется полная подготовка (+450 ₽/м²)' : 'Чистая земля (Базовая)',
        'Автоматический полив': irrigation === 'yes' ? 'Да, спроектировать (+1 000 ₽/м²)' : 'Нет, ручной полив',
        'Стоимость укладки': `${total.toLocaleString('ru-RU')} ₽`,
        'Срок реализации': daysText,
        'Подарки зафиксированы': 'Да'
      }
    );
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-brand-soil/[0.02] border-y border-slate-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-brand-emerald bg-brand-emerald/10 mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Интерактивный расчет стоимости
          </span>
          <h2 className="text-2.5xl sm:text-3.5xl md:text-4xl lg:text-5.5xl font-display font-black text-brand-dark tracking-tight">
            Калькулятор укладки газона «под ключ»
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Ответьте на 3 простых вопроса, чтобы мгновенно получить детализированную смету и зафиксировать сезонные подарки.
          </p>
        </div>

        {/* Calculator Main Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form & Steps */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-150/90 p-5 sm:p-8 shadow-sm text-left">
            
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Шаг <span className="text-brand-dark font-black">{step}</span> из 3
                </span>
                <span className="text-xs font-bold text-brand-main">
                  {Math.round((step / 3) * 100)}% заполнено
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-main transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content: Step 1 (Area) */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-brand-dark mb-2">
                    1. Укажите площадь вашего участка
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    Двигайте ползунок или введите точное значение вручную. Мы рассчитаем точный объём рулонов и автоматически определим подходящий грузовой транспорт.
                  </p>
                </div>

                <div className="bg-slate-50/60 rounded-2xl p-5 sm:p-6 border border-slate-100">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                    <span className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
                      Площадь озеленения:
                    </span>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min="10"
                        max="5000"
                        value={area}
                        onChange={(e) => {
                          let val = parseInt(e.target.value);
                          if (isNaN(val)) val = 10;
                          setArea(val);
                        }}
                        onBlur={() => {
                          if (area < 10) setArea(10);
                          if (area > 5000) setArea(5000);
                        }}
                        className="w-32 bg-white border-2 border-slate-200 focus:border-brand-main focus:outline-none text-brand-dark text-xl font-display font-black py-2 px-4 rounded-xl text-center pr-10 transition-all font-sans"
                      />
                      <span className="absolute right-4 text-xs font-extrabold text-slate-400">м²</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="10"
                    max="2000"
                    step="10"
                    value={area > 2000 ? 2000 : area}
                    onChange={(e) => setArea(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none accent-brand-main"
                  />

                  {/* Grid Labels under Slider */}
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1 mt-3">
                    <span>10 м²</span>
                    <span>500 м²</span>
                    <span>1000 м²</span>
                    <span>1500 м²</span>
                    <span>2000 м²+</span>
                  </div>
                </div>

                {/* Popular sizes presets */}
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">
                    Популярные размеры:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { val: 50, label: '50 м² (5 соток)' },
                      { val: 150, label: '150 м² (1.5 сотки)' },
                      { val: 300, label: '300 м² (3 сотки)' },
                      { val: 600, label: '600 м² (6 соток)' },
                      { val: 1200, label: '1200 м² (12 соток)' }
                    ].map((btn) => (
                      <button
                        key={btn.val}
                        type="button"
                        onClick={() => setAreaPreset(btn.val)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          area === btn.val
                            ? 'bg-brand-dark text-white border-brand-dark shadow-md'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step Content: Step 2 (Soil ground condition) */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-brand-dark mb-2">
                    2. Что сейчас находится на месте будущего газона?
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    От этого зависит глубина подготовительных ландшафтных работ перед укладкой рулонов.
                  </p>
                </div>

                <div className="space-y-3.5">
                  {/* Option 1: Basic */}
                  <label
                    onClick={() => setGround('basic')}
                    className={`flex items-start gap-4 p-4.5 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all bg-white relative ${
                      ground === 'basic'
                        ? 'border-brand-main bg-brand-emerald/[0.03]'
                        : 'border-slate-150 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="ground"
                      value="basic"
                      checked={ground === 'basic'}
                      onChange={() => setGround('basic')}
                      className="mt-1 accent-brand-main w-4 h-4 cursor-pointer shrink-0"
                    />
                    <div className="flex-grow pr-16 text-left">
                      <span className="block font-bold text-brand-dark text-sm sm:text-base leading-snug">
                        Чистая земля (Базовая подготовка)
                      </span>
                      <span className="block text-slate-400 text-xs mt-1 leading-relaxed">
                        Основание ровное, без сорняков и дерна. Требуется только финишное планирование граблями и финишное уплотнение катком.
                      </span>
                    </div>
                    <span className="text-xs bg-brand-emerald/10 text-brand-main font-bold px-2.5 py-1 rounded-md absolute top-4 sm:top-5 right-4 sm:right-5">
                      +0 ₽/м²
                    </span>
                  </label>

                  {/* Option 2: Prep */}
                  <label
                    onClick={() => setGround('prep')}
                    className={`flex items-start gap-4 p-4.5 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all bg-white relative ${
                      ground === 'prep'
                        ? 'border-brand-main bg-brand-emerald/[0.03]'
                        : 'border-slate-150 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="ground"
                      value="prep"
                      checked={ground === 'prep'}
                      onChange={() => setGround('prep')}
                      className="mt-1 accent-brand-main w-4 h-4 cursor-pointer shrink-0"
                    />
                    <div className="flex-grow pr-16 text-left">
                      <span className="block font-bold text-brand-dark text-sm sm:text-base leading-snug">
                        Требует подготовку (Сорняки / Дерн / Неровности)
                      </span>
                      <span className="block text-slate-400 text-xs mt-1 leading-relaxed">
                        Требуется вспашка мотоблоком, выборка корней сорных трав, завоз/распределение плодородного грунта и планировка под лазер.
                      </span>
                    </div>
                    <span className="text-xs bg-brand-emerald/10 text-brand-main font-bold px-2.5 py-1 rounded-md absolute top-4 sm:top-5 right-4 sm:right-5">
                      +450 ₽/м²
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Step Content: Step 3 (Irrigation) */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-xl sm:text-2xl font-display font-black text-brand-dark">
                      3. Необходим ли автоматический полив?
                    </h3>
                    <span className="bg-brand-gold/25 text-brand-amber font-display font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse shrink-0">
                      Акция!
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    При выборе проектирования полива "под ключ" — вы экономите до 15 000 рублей на инженерном проекте системы.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option Yes */}
                  <label
                    onClick={() => setIrrigation('yes')}
                    className={`flex flex-col p-4 w-full rounded-2xl border-2 cursor-pointer transition-all bg-white relative text-left justify-between h-full min-h-[170px] ${
                      irrigation === 'yes'
                        ? 'border-brand-main bg-brand-emerald/[0.03]'
                        : 'border-slate-150 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <input
                          type="radio"
                          name="irrigation"
                          value="yes"
                          checked={irrigation === 'yes'}
                          onChange={() => setIrrigation('yes')}
                          className="accent-brand-main w-4 h-4 cursor-pointer shrink-0"
                        />
                        <span className="font-bold text-brand-dark text-base">Да, спроектировать</span>
                      </div>
                      <span className="block text-slate-400 text-xs leading-relaxed">
                        Скрытые магистрали Hunter/Rain Bird монтируются до укладки. Проект полива на ваш участок — в ПОДАРОК.
                      </span>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-slate-100 flex justify-between items-center bg-transparent">
                      <span className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">Оборудование + монтаж</span>
                      <span className="text-xs bg-brand-emerald/15 text-brand-main font-bold px-2 py-0.5 rounded-md">
                        +1 000 ₽/м²
                      </span>
                    </div>
                  </label>

                  {/* Option No */}
                  <label
                    onClick={() => setIrrigation('no')}
                    className={`flex flex-col p-4 w-full rounded-2xl border-2 cursor-pointer transition-all bg-white relative text-left justify-between h-full min-h-[170px] ${
                      irrigation === 'no'
                        ? 'border-brand-main bg-brand-emerald/[0.03]'
                        : 'border-slate-150 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <input
                          type="radio"
                          name="irrigation"
                          value="no"
                          checked={irrigation === 'no'}
                          onChange={() => setIrrigation('no')}
                          className="accent-brand-main w-4 h-4 cursor-pointer shrink-0"
                        />
                        <span className="font-bold text-brand-dark text-base">Нет, буду поливать сам</span>
                      </div>
                      <span className="block text-slate-400 text-xs leading-relaxed">
                        Будет использоваться ручной полив из шлангов или дождевателей. В подарок зафиксируем гайд по нормам полива.
                      </span>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-slate-100 flex justify-between items-center bg-transparent font-sans">
                      <span className="text-[10px] uppercase tracking-wide text-slate-400 font-bold">Доп. работы</span>
                      <span className="text-xs bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-md">
                        0 ₽
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Stepped Controls Section */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100 bg-transparent">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-5 py-3 cursor-pointer bg-white hover:bg-slate-50 text-brand-dark border border-slate-200 font-bold rounded-xl transition-all flex items-center gap-2 text-xs sm:text-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Назад
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 cursor-pointer bg-brand-main hover:bg-brand-main/90 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-md shadow-brand-main/20 text-xs sm:text-sm"
              >
                {step === 3 ? 'Рассчитать смету' : 'Далее'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Standard quality banner block */}
            <div className="mt-8 bg-slate-50/70 rounded-2xl p-5 border border-slate-100 flex gap-4 items-start">
              <div className="bg-white p-2.5 rounded-xl border border-slate-100 text-brand-main flex-shrink-0 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-brand-main" />
              </div>
              <div className="text-left font-sans">
                <h4 className="text-xs sm:text-sm font-display font-black text-brand-dark uppercase tracking-wider mb-1">
                  Единый стандарт качества Z-Premium
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-medium">
                  Мы укладываем исключительно <strong>100% Элитный Мятлик Луговой</strong> (зрелый 3-летний дерн). Мы осознанно отказались от дешевых кормовых смесей с райграсом и сорной травой. Наш газон обладает глубоким изумрудным цветом, идеально переносит морозные зимы и благодаря сверхплотной дернине физически блокирует появление сорняков.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Receipt bill summary */}
          <div className="lg:col-span-5 bg-brand-dark text-white rounded-3xl p-5 sm:p-8 lg:p-7 xl:p-8 shadow-xl relative overflow-hidden lg:sticky lg:top-24">
            
            {/* Subtle graphic background mesh */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10 text-left">
              
              {/* Receipt Header */}
              <div className="flex items-center gap-3 border-b border-white/[0.08] pb-5 mb-5 bg-transparent">
                <Receipt className="w-5 h-5 text-brand-gold shrink-0" />
                <h2 className="text-lg sm:text-xl font-display font-black tracking-tight">
                  Смета укладки газона
                </h2>
              </div>

              {/* Items Table */}
              <div className="space-y-4 text-xs sm:text-sm border-b border-white/[0.08] pb-5 mb-5 font-sans">
                {/* Area size */}
                <div className="flex justify-between items-center text-slate-300">
                  <span>Общая площадь:</span>
                  <span className="font-bold text-white text-sm">{area} м²</span>
                </div>

                {/* Lawn pure price */}
                <div className="flex justify-between items-center text-slate-300">
                  <span>Сортовой газон 100% мятлик:</span>
                  <span className="font-semibold text-white">{lawnCost.toLocaleString('ru-RU')} ₽</span>
                </div>

                {/* Soil Preparation desc and cost */}
                <div className="flex justify-between items-start text-slate-300">
                  <div>
                    <span>Подготовка и вспашка:</span>
                    <span className="block text-[10px] text-brand-emerald font-black font-display uppercase tracking-widest mt-0.5">
                      {ground === 'basic' ? 'Чистая земля (Базовая)' : 'Требуется вспашка и планировка'}
                    </span>
                  </div>
                  <span className="font-semibold text-white mt-0.5">{groundCost.toLocaleString('ru-RU')} ₽</span>
                </div>

                {/* Installation work */}
                <div className="flex justify-between items-center text-slate-300">
                  <span>Выезд, укладка и прикатка:</span>
                  <span className="font-semibold text-white">{workCost.toLocaleString('ru-RU')} ₽</span>
                </div>

                {/* Auto irrigation system item */}
                <div className={`flex justify-between items-center text-slate-300 transition-all ${irrigation === 'no' ? 'opacity-40' : ''}`}>
                  <span>Автополив под ключ:</span>
                  <span className="font-semibold text-white">{irrigationCost.toLocaleString('ru-RU')} ₽</span>
                </div>

                {/* Free design project voucher */}
                <div className="flex justify-between items-center bg-slate-900/60 p-2.5 rounded-xl border border-white/[0.05]">
                  <div className="flex items-center gap-2 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald" />
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Проект автополива:</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider ${irrigation === 'yes' ? 'text-brand-gold animate-pulse' : 'text-slate-500'}`}>
                    {irrigation === 'yes' ? 'В подарок!' : 'Не требуется'}
                  </span>
                </div>

                {/* Delivery cost */}
                <div className="flex justify-between items-start text-slate-300">
                  <div>
                    <span>Доставка на объект:</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">
                      {delivery.desc}
                    </span>
                  </div>
                  <span className="font-semibold text-white mt-0.5">
                    {delivery.cost.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>

              {/* Subtotals & Discounts */}
              <div className="space-y-3.5 mb-6 font-sans text-xs sm:text-sm">
                
                {discountValue > 0 && (
                  <>
                    <div className="flex justify-between text-slate-400">
                      <span>Стоимость работ и материалов:</span>
                      <span className="font-semibold line-through text-slate-500">
                        {subtotal.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-brand-gold font-bold">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Скидка за объём ({Math.round(discountPercent * 100)}%):</span>
                      </div>
                      <span>-{discountValue.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </>
                )}

                {/* Premium total ticket block */}
                <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-white/[0.05] mt-4 text-left">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest font-display">
                      Итого под ключ:
                    </span>
                    <div className="flex items-center gap-1 text-brand-emerald text-xs font-bold leading-none select-none">
                      <Timer className="w-3.5 h-3.5" />
                      <span>{daysText}</span>
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4.5xl font-display font-black text-brand-emerald tracking-tight leading-none mt-1">
                    {total.toLocaleString('ru-RU')} <span className="text-lg">₽</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed font-medium">
                    Расчёт является предварительным. Точная смета формируется агрономом при бесплатном замере вашего участка.
                  </p>
                </div>

              </div>

              {/* Submit calculations and lock-in awards CTA */}
              <button
                type="button"
                onClick={handleOpenLeadForm}
                className="w-full py-4.5 bg-brand-gold hover:bg-brand-gold/90 border-0 active:transform active:scale-[0.98] text-brand-dark font-display font-black text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2.5 shadow-lg shadow-brand-gold/15"
              >
                <span>Зафиксировать цену и подарки</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Security trust note */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium select-none bg-transparent">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Ваша выгода и подарки зафиксированы</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
