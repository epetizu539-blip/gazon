/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Shield, Phone, MessageSquare, ClipboardCheck, ArrowRight } from 'lucide-react';

interface LeadPopupProps {
  idName?: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  buttonText?: string;
  source: string;
  additionalData?: Record<string, string | number | boolean | string[]>;
}

export const LeadPopup: React.FC<LeadPopupProps> = ({
  idName = 'lead-modal',
  isOpen,
  onClose,
  title,
  subtitle,
  buttonText = 'Отправить заявку',
  source,
  additionalData = {} as Record<string, any>
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [errorPhone, setErrorPhone] = useState('');
  const [errorName, setErrorName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Quick reset on open
  useEffect(() => {
    if (isOpen) {
      setName('');
      setPhone('');
      setErrorPhone('');
      setErrorName('');
      setIsSuccess(false);
      setIsLoading(false);
      // Disable body scroll when open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle phone input formatting to +7 (999) 999-99-99
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ''); // strip all non-digits
    
    // Ignore leading "+7" or "8" if the user entered it
    if (input.startsWith('7') || input.startsWith('8')) {
      input = input.substring(1);
    }
    
    // limit to 10 characters (excluding +7 prefix)
    input = input.substring(0, 10);

    let formatted = '';
    if (input.length > 0) {
      formatted += '+7 (' + input.substring(0, 3);
    } else {
      formatted = '';
    }
    if (input.length >= 4) {
      formatted += ') ' + input.substring(3, 6);
    }
    if (input.length >= 7) {
      formatted += '-' + input.substring(6, 8);
    }
    if (input.length >= 9) {
      formatted += '-' + input.substring(8, 10);
    }

    setPhone(formatted);
    if (formatted.length >= 18) {
      setErrorPhone('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!name.trim()) {
      setErrorName('Пожалуйста, введите ваше имя');
      hasError = true;
    } else {
      setErrorName('');
    }

    // A valid formatted phone is "+7 (XXX) XXX-XX-XX" which contains exactly 18 characters
    if (phone.length < 18) {
      setErrorPhone('Введите корректный номер телефона (10 цифр)');
      hasError = true;
    } else {
      setErrorPhone('');
    }

    if (!isChecked) {
      alert('Пожалуйста, подтвердите согласие на обработку персональных данных');
      hasError = true;
    }

    if (hasError) return;

    // Simulated API submission with loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Dispatch custom analytic event if available
      try {
        console.log('Lead Submitted successfully to analytics:', {
          name,
          phone,
          source,
          additionalData,
          timestamp: new Date().toISOString()
        });
      } catch (err) {
        console.warn(err);
      }
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div
      id={idName}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Dark overlay backdrop */}
      <div
        className="fixed inset-0 bg-brand-dark/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main modal surface */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 z-10 transition-all duration-300 transform scale-100 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-full hover:bg-slate-50 cursor-pointer z-20"
          aria-label="Закрыть окно"
          id={`${idName}-close-btn`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 c-scrollbar md:p-8 flex-1">
          {!isSuccess ? (
            <div>
              {/* Header */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-brand-main bg-brand-light/10 mb-3">
                  <ClipboardCheck className="w-3.5 h-3.5" />
                  Экспресс расчет
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-brand-dark tracking-tight leading-snug">
                  {title}
                </h3>
                <p className="text-slate-500 text-sm mt-2">
                  {subtitle}
                </p>
              </div>

              {/* Form body */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Ваше имя <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Александр"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (e.target.value.trim()) setErrorName('');
                    }}
                    className={`w-full px-4 py-3.5 rounded-xl border ${
                      errorName ? 'border-rose-500 bg-rose-50/50 focus:ring-rose-500/20' : 'border-slate-200 focus:border-brand-main focus:ring-brand-main/20'
                    } text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-4 transition-all`}
                  />
                  {errorName && (
                    <p className="text-rose-500 text-xs font-medium mt-1.5">
                      {errorName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Номер телефона <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (999) 999-99-99"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={`w-full pl-11 pr-4 py-3.5 rounded-xl border ${
                        errorPhone ? 'border-rose-500 bg-rose-50/50 focus:ring-rose-500/20' : 'border-slate-200 focus:border-brand-main focus:ring-brand-main/20'
                      } text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-4 transition-all`}
                    />
                  </div>
                  {errorPhone ? (
                    <p className="text-rose-500 text-xs font-medium mt-1.5">
                      {errorPhone}
                    </p>
                  ) : (
                    <p className="text-slate-400 text-[10px] mt-1.5 leading-relaxed">
                      На этот номер в течение 10 секунд мы отправим расчёт сметы и зафиксируем за вами скидку 10%.
                    </p>
                  )}
                </div>

                {/* Additional context display (if calculator was filled) */}
                {additionalData && Object.keys(additionalData).length > 0 && (
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-500 space-y-1">
                    <p className="font-bold text-slate-700">Передаем агроному параметры объекта:</p>
                    {additionalData.area && (
                      <p>• Площадь участка: <strong className="text-brand-dark">{additionalData.area} м²</strong></p>
                    )}
                    {additionalData.lawnCategory && (
                      <p>• Сорт газона: <strong className="text-brand-dark">{additionalData.lawnCategory === 'premium' ? 'Парковый Премиум' : additionalData.lawnCategory === 'elite' ? 'Спортивный' : additionalData.lawnCategory === 'shadow' ? 'Теневыносливый' : 'Городской Стандарт'}</strong></p>
                    )}
                    {additionalData.totalPrice && (
                      <p>• Расчет сметы: <strong className="text-brand-main">{(additionalData.totalPrice as number).toLocaleString('ru-RU')} ₽</strong></p>
                    )}
                  </div>
                )}

                {/* Submitting button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-brand-gold hover:bg-brand-amber text-brand-dark hover:text-white font-bold text-sm uppercase tracking-wide py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-brand-gold/20 hover:shadow-brand-amber/30 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Отправка данных...
                    </span>
                  ) : (
                    <>
                      <span>{buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* GDPR Checklist */}
                <div className="flex items-start gap-2.5 mt-2">
                  <input
                    type="checkbox"
                    id="consent-checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="mt-1 w-4 h-4 text-brand-main border-slate-200 rounded focus:ring-brand-main/20 focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="consent-checkbox" className="text-[10px] text-slate-400 leading-normal cursor-pointer">
                    Согласен на обработку персональных данных. Ваши данные защищены по стандарту шифрования SSL и не передаются третьим лицам.
                  </label>
                </div>
              </form>
            </div>
          ) : (
            /* SUCCESS GRATITUDE VIEW */
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-emerald/10 text-brand-emerald mb-4">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-display font-black text-brand-dark leading-tight">
                Большое спасибо, {name}!
              </h3>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                Смета успешно зафиксирована. Мы отправили подробный PDF-каталог с ценами в 
                <strong> WhatsApp</strong> на номер <strong>{phone}</strong>.
              </p>

              <div className="my-6 bg-brand-dark/5 p-4 rounded-2xl border border-brand-dark/5 text-left text-xs text-slate-705 space-y-2">
                <p className="font-bold text-brand-dark text-center">Что произойдет дальше?</p>
                <div className="flex gap-2.5 items-start mt-1">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-emerald text-white text-[10px] font-bold shrink-0">1</span>
                  <p className="text-slate-600">Наш ведущий агроном свяжется с вами в течение <strong>10-15 минут</strong> для уточнения деталей.</p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-emerald text-white text-[10px] font-bold shrink-0">2</span>
                  <p className="text-slate-600">Вы согласуете удобное время бесплатного выезда замерщика с образцами травы.</p>
                </div>
              </div>

              {/* Instant Messengers links for better conversions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <a
                  href={`https://wa.me/79998887766?text=Привет!%20Я%20оставил%20заявку%20на%20сайте%20на%20имя%20${encodeURIComponent(name)}.`}
                  target="_blank"
                  rel="noreferrer referrer"
                  className="flex-1 bg-[#25D366] text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-all cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Написать в WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="flex-1 bg-brand-dark text-white font-bold text-xs py-3 px-4 rounded-xl hover:bg-black transition-all cursor-pointer"
                >
                  Вернуться на сайт
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 justify-self-center">
                <Shield className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Защищено 256-битным SSL-шифрованием</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
