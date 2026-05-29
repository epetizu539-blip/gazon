/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LAWN_TYPES } from '../data';
import { CalculatorState, CalculatorResult, LawnCategory } from '../types';
import { HelpCircle, Sparkles, CheckCircle2, ChevronRight, Truck, Timer, Receipt } from 'lucide-react';

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
  const [area, setArea] = useState<number>(150);
  const [lawnCategory, setLawnCategory] = useState<LawnCategory>('premium');
  const [options, setOptions] = useState({
    soilPreparation: true,
    removeOldWeeds: false,
    delivery: true,
    molesMesh: false,
    autoWatering: false,
    maintenance: true
  });

  const [result, setResult] = useState<CalculatorResult>({
    lawnCost: 0,
    soilPrepCost: 0,
    weedRemovalCost: 0,
    deliveryCost: 0,
    molesMeshCost: 0,
    autoWateringCost: 0,
    maintenanceCost: 0,
    subtotal: 0,
    discount: 0,
    total: 0,
    daysToComplete: 1
  });

  // Calculate whenever params change
  useEffect(() => {
    const selectedLawn = LAWN_TYPES.find((l) => l.id === lawnCategory) || LAWN_TYPES[1];
    
    // Core Costs
    const lawnCost = area * selectedLawn.pricePerSqm;
    const soilPrepCost = options.soilPreparation ? area * 80 : 0; // 80 ₽/sqm
    const weedRemovalCost = options.removeOldWeeds ? area * 60 : 0; // 60 ₽/sqm
    
    // Delivery (5000 ₽ flat rate, free for > 350 sqm)
    const deliveryCost = options.delivery ? (area >= 350 ? 0 : 5000) : 0;
    
    const molesMeshCost = options.molesMesh ? area * 110 : 0; // 110 ₽/sqm
    const autoWateringCost = options.autoWatering ? area * 240 : 0; // 240 ₽/sqm
    const maintenanceCost = options.maintenance ? area * 30 : 0; // 30 ₽/sqm

    const subtotal = lawnCost + soilPrepCost + weedRemovalCost + deliveryCost + molesMeshCost + autoWateringCost + maintenanceCost;
    
    // Discounts
    // Bulk discount: >150 sqm: 5%, >400 sqm: 8%, >800 sqm: 12%
    let discountPercent = 0.05; // Base 5% greeting discount
    if (area > 800) {
      discountPercent = 0.12;
    } else if (area > 400) {
      discountPercent = 0.08;
    } else if (area > 150) {
      discountPercent = 0.06;
    }

    const discount = Math.round(subtotal * discountPercent);
    const total = Math.max(0, subtotal - discount);

    // Timeline estimate
    let daysToComplete = 1;
    if (area > 1000) {
      daysToComplete = 3;
    } else if (area > 400) {
      daysToComplete = 2;
    }

    setResult({
      lawnCost,
      soilPrepCost,
      weedRemovalCost,
      deliveryCost,
      molesMeshCost,
      autoWateringCost,
      maintenanceCost,
      subtotal,
      discount,
      total,
      daysToComplete
    });
  }, [area, lawnCategory, options]);

  const handleCheckboxChange = (key: keyof typeof options) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAreaSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setArea(isNaN(value) ? 50 : value);
  };

  const handleAreaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value.replace(/\D/g, ''), 10);
    if (isNaN(value)) value = 0;
    setArea(value);
  };

  const handleCategorySelect = (id: LawnCategory) => {
    setLawnCategory(id);
  };

  const handleGetSummary = () => {
    const selectedLawn = LAWN_TYPES.find((l) => l.id === lawnCategory) || LAWN_TYPES[1];
    onOpenModalWithData(
      'Получить точную смету и 3 подарка',
      `Мы укрепим за вами рассчет стоимости ${result.total.toLocaleString('ru-RU')} ₽ и отправим пошаговый чек-лист подготовки участка на этот номер.`,
      'Получить смету со скидкой',
      'calculator_quote',
      {
        area: `${area} м²`,
        lawnCategory: selectedLawn.nameRu,
        totalPrice: result.total,
        soilPrep: options.soilPreparation ? 'Да' : 'Нет',
        antiMole: options.molesMesh ? 'Да' : 'Нет',
        autoWater: options.autoWatering ? 'Да' : 'Нет'
      }
    );
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-brand-emerald bg-brand-emerald/10 mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Умный онлайн калькулятор
          </span>
          <h2 className="text-2xl sm:text-3.5xl md:text-4xl font-display font-black text-brand-dark tracking-tight">
            Рассчитайте стоимость укладки <br />
            и получите 3 подарка за 1 минуту
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Сделайте предварительный расчет. Цены указаны с учетом среза травы в питомнике и работ по ГОСТ.
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* CALCULATOR SELECTORS AND INPUTS (LEFT) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6 text-left">
            
            {/* Step 1: Area size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                  1. Укажите площадь участка <span className="text-brand-main">(м²)</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={area === 0 ? '' : area}
                    onChange={handleAreaInputChange}
                    onBlur={() => { if (area < 10) setArea(10); }}
                    className="w-24 px-2.5 py-1.5 font-display font-black text-center text-brand-dark bg-slate-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-main/20 border border-slate-200 text-sm"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">м²</span>
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="10"
                max="2000"
                step="5"
                value={area}
                onChange={handleAreaSliderChange}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-emerald focus:outline-none"
              />

              {/* Segment markings */}
              <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1 mt-2">
                <span>10 м²</span>
                <span>200 м²</span>
                <span>500 м² (Бесплатная доставка)</span>
                <span>1000 м²</span>
                <span>2000 м²+</span>
              </div>
            </div>

            {/* Step 2: Choose Lawn Sort */}
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-bold text-slate-800 uppercase tracking-wide">
                2. Выберите сорт газона
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LAWN_TYPES.map((lawn) => (
                  <button
                    key={lawn.id}
                    onClick={() => handleCategorySelect(lawn.id)}
                    className={`p-4 rounded-2xl text-left border text-sm transition-all cursor-pointer relative flex flex-col justify-between ${
                      lawnCategory === lawn.id
                        ? 'border-brand-main bg-brand-emerald/5 ring-4 ring-brand-main/10 font-bold'
                        : 'border-slate-150 hover:border-slate-350 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-1">
                      <span className="font-extrabold text-[#111827] text-sm">
                        {lawn.nameRu}
                      </span>
                      {lawnCategory === lawn.id && (
                        <span className="w-4 h-4 rounded-full bg-brand-main flex items-center justify-center text-white text-[10px]">✓</span>
                      )}
                    </div>
                    
                    <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {lawn.description}
                    </p>

                    <div className="flex items-baseline gap-1.5 mt-3 pt-2.5 border-t border-slate-100">
                      <span className="font-display font-black text-brand-main text-base">
                        {lawn.pricePerSqm} ₽<span className="text-[10px] font-medium text-slate-400">/м²</span>
                      </span>
                      {lawn.oldPricePerSqm && (
                        <span className="text-xs line-through text-slate-450 text-slate-400">
                          {lawn.oldPricePerSqm} ₽
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Additional Options Checkboxes */}
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-bold text-slate-800 uppercase tracking-wide">
                3. Добавьте услуги по подготовке грунта и монтажу
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Soil Preparation */}
                <button
                  type="button"
                  onClick={() => handleCheckboxChange('soilPreparation')}
                  className={`p-3.5 rounded-xl border text-xs text-left cursor-pointer transition-all flex items-start gap-3 ${
                    options.soilPreparation ? 'border-brand-main bg-brand-emerald/5' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={options.soilPreparation}
                    readOnly
                    className="mt-0.5 rounded text-brand-main focus:ring-brand-main/20 shrink-0 cursor-pointer"
                  />
                  <div>
                    <p className="font-bold text-slate-850">Вспашка и подготовка (+80 ₽/м²)</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Расчистка земли, культивация фрезами, укатка, выравнивание по лазеру.</p>
                  </div>
                </button>

                {/* Remove Old Weeds */}
                <button
                  type="button"
                  onClick={() => handleCheckboxChange('removeOldWeeds')}
                  className={`p-3.5 rounded-xl border text-xs text-left cursor-pointer transition-all flex items-start gap-3 ${
                    options.removeOldWeeds ? 'border-brand-main bg-brand-emerald/5' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={options.removeOldWeeds}
                    readOnly
                    className="mt-0.5 rounded text-brand-main focus:ring-brand-main/20 shrink-0 cursor-pointer"
                  />
                  <div>
                    <p className="font-bold text-slate-850">Борьба с бурьяном (+60 ₽/м²)</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Обработка сорняков системными гербицидами, снятие дерна спецтехникой.</p>
                  </div>
                </button>

                {/* Moles protection grid */}
                <button
                  type="button"
                  onClick={() => handleCheckboxChange('molesMesh')}
                  className={`p-3.5 rounded-xl border text-xs text-left cursor-pointer transition-all flex items-start gap-3 ${
                    options.molesMesh ? 'border-brand-main bg-brand-emerald/5' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={options.molesMesh}
                    readOnly
                    className="mt-0.5 rounded text-brand-main focus:ring-brand-main/20 shrink-0 cursor-pointer"
                  />
                  <div>
                    <p className="font-bold text-slate-850">Сетка от кротов (+110 ₽/м²)</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Прочная мелкоячеистая полимерная сетка с креплением колышками.</p>
                  </div>
                </button>

                {/* Auto watering system */}
                <button
                  type="button"
                  onClick={() => handleCheckboxChange('autoWatering')}
                  className={`p-3.5 rounded-xl border text-xs text-left cursor-pointer transition-all flex items-start gap-3 ${
                    options.autoWatering ? 'border-brand-main bg-brand-emerald/5' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={options.autoWatering}
                    readOnly
                    className="mt-0.5 rounded text-brand-main focus:ring-brand-main/20 shrink-0 cursor-pointer"
                  />
                  <div>
                    <p className="font-bold text-slate-850">Автополив под ключ (+240 ₽/м²)</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Трубопроводы, электромагнитные клапана, роторные дождеватели, пульт.</p>
                  </div>
                </button>

                {/* Soil delivery */}
                <button
                  type="button"
                  onClick={() => handleCheckboxChange('delivery')}
                  className={`p-3.5 rounded-xl border text-xs text-left cursor-pointer transition-all flex items-start gap-3 ${
                    options.delivery ? 'border-brand-main bg-brand-emerald/5' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={options.delivery}
                    readOnly
                    className="mt-0.5 rounded text-brand-main focus:ring-brand-main/20 shrink-0 cursor-pointer"
                  />
                  <div>
                    <p className="font-bold text-slate-850">Доставка спецтранспортом</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Возим в изотермических рефрижераторах. Бесплатно при заказе от 350 м²!</p>
                  </div>
                </button>

                {/* Maintenance */}
                <button
                  type="button"
                  onClick={() => handleCheckboxChange('maintenance')}
                  className={`p-3.5 rounded-xl border text-xs text-left cursor-pointer transition-all flex items-start gap-3 ${
                    options.maintenance ? 'border-brand-main bg-brand-emerald/5' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={options.maintenance}
                    readOnly
                    className="mt-0.5 rounded text-brand-main focus:ring-brand-main/20 shrink-0 cursor-pointer"
                  />
                  <div>
                    <p className="font-bold text-slate-850">Пакет «Первый Уход» (+30 ₽/м²)</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Выезд агронома на первое кошение, внесение стимулятора корней.</p>
                  </div>
                </button>

              </div>
            </div>

          </div>

          {/* CALCULATION REPORT SUMMARY INVOICE (RIGHT) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-brand-dark text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl text-left relative overflow-hidden">
              {/* Graphic background circle */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light/10 blur-[40px] rounded-full pointer-events-none" />

              <h3 className="font-display font-black text-lg sm:text-xl border-b border-slate-700/50 pb-4 mb-4 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-brand-gold" />
                Смета укладки газона
              </h3>

              {/* Dynamic Bill Listing */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-350">
                <div className="flex justify-between">
                  <span>Общая площадь:</span>
                  <span className="font-bold text-white">{area} м²</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Сортовой газон:</span>
                  <span className="font-bold text-white">
                    {result.lawnCost.toLocaleString('ru-RU')} ₽
                  </span>
                </div>

                {options.soilPreparation && (
                  <div className="flex justify-between text-slate-400">
                    <span>• Подготовка и вспашка:</span>
                    <span>{result.soilPrepCost.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}

                {options.removeOldWeeds && (
                  <div className="flex justify-between text-slate-400">
                    <span>• Снятие сорняков:</span>
                    <span>{result.weedRemovalCost.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}

                {options.molesMesh && (
                  <div className="flex justify-between text-slate-400">
                    <span>• Сетка против кротов:</span>
                    <span>{result.molesMeshCost.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}

                {options.autoWatering && (
                  <div className="flex justify-between text-slate-400">
                    <span>• Монтаж автополива:</span>
                    <span>{result.autoWateringCost.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}

                {options.maintenance && (
                  <div className="flex justify-between text-slate-400">
                    <span>• Выезд и кошение:</span>
                    <span>{result.maintenanceCost.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}

                {options.delivery && (
                  <div className="flex justify-between text-slate-400">
                    <span>• Доставка до объекта:</span>
                    {result.deliveryCost === 0 ? (
                      <span className="text-brand-emerald font-semibold uppercase text-xs">Бесплатно</span>
                    ) : (
                      <span>{result.deliveryCost.toLocaleString('ru-RU')} ₽</span>
                    )}
                  </div>
                )}

                {/* Subtotal before discount */}
                <div className="border-t border-slate-700/50 pt-3.5 mt-2 flex justify-between text-xs text-slate-450">
                  <span>Стоимость работ и трав:</span>
                  <span>{result.subtotal.toLocaleString('ru-RU')} ₽</span>
                </div>

                {/* Real-time Discount value */}
                <div className="flex justify-between text-brand-gold text-xs leading-none">
                  <span className="flex items-center gap-1">
                    Персональная скидка по акции:
                  </span>
                  <span className="font-bold">-{result.discount.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              {/* Total Balance block */}
              <div className="border-t border-slate-700/80 pt-4 mt-4 flex items-baseline justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">ИТОГО ПОД КЛЮЧ:</p>
                  <p className="text-2xl sm:text-3xl font-display font-black text-brand-gold">
                    {result.total.toLocaleString('ru-RU')} ₽
                  </p>
                </div>

                {/* Estimated Completion time */}
                <div className="text-right text-[11px] font-semibold text-slate-350">
                  <div className="flex items-center gap-1 justify-end text-brand-emerald font-bold">
                    <Timer className="w-4 h-4" />
                    <span>{result.daysToComplete} {result.daysToComplete === 1 ? 'день' : 'дня'}</span>
                  </div>
                  <span className="block mt-0.5 text-slate-400">срок укладки</span>
                </div>
              </div>

              {/* CTA Calculation submit */}
              <button
                type="button"
                onClick={handleGetSummary}
                className="w-full mt-6 bg-brand-gold hover:bg-brand-amber text-brand-dark hover:text-white font-bold text-xs uppercase tracking-wider py-4.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-brand-gold/10 hover:shadow-brand-amber/30"
              >
                <span>Зафиксировать цену и подарки</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-slate-400 text-center mt-3 leading-normal">
                Расчёт является предварительным. Точная смета формируется агрономом при бесплатном выезде на участок согласно перепадам высот.
              </p>
            </div>

            {/* THREE FREE GIFTS TAMP BADGE (HIGHER CONVERSIONS) */}
            <div className="bg-gradient-to-tr from-brand-main to-brand-dark text-white rounded-3xl p-5 border border-brand-emerald/10 text-left">
              <span className="bg-brand-gold text-brand-dark text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Зафиксировано за вами</span>
              <h4 className="font-display font-extrabold text-base text-white mt-1.5 mb-3">
                3 гарантированных подарка при выезде сегодня:
              </h4>
              
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0" />
                  <span>Фирменное органическое удобрение для приживаемости газона (весом 10кг)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0" />
                  <span>Электронная инструкция по поливу и защите от болезней «Зеленый Сад»</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0" />
                  <span>Упаковка профессионального стимулятора старта корней в подарок</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
