/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, CalendarCheck, Layers, Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenModal: (title: string, subtitle: string, buttonText: string, source: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Калькулятор', href: '#calculator' },
    { name: 'До / После', href: '#results' },
    { name: 'Преимущества', href: '#features' },
    { name: 'Схема работы', href: '#workflow' },
    { name: 'Реальные FAQ', href: '#faq' }
  ];

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm py-3'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <a href="#" className="flex items-center gap-2 group cursor-pointer">
            <Logo hasText={true} className="w-11 h-11 shrink-0 group-hover:scale-105 transition-transform" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs xl:text-sm font-semibold text-slate-600 hover:text-brand-main transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-brand-emerald after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Contact Details and Call To Action */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-right">
              <a
                href="tel:+79852394989"
                className="flex items-center gap-1.5 font-display font-black text-xs sm:text-sm md:text-base text-brand-dark hover:text-brand-emerald transition-colors"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-brand-emerald animate-pulse shrink-0" />
                <span>+7 (985) 239-49-89</span>
              </a>
              <span className="block text-[9px] sm:text-[10px] text-slate-500 font-medium leading-none mt-1">
                Звонок бесплатный
              </span>
            </div>
            
            <button
              onClick={() =>
                onOpenModal(
                  'Бесплатный расчет сметы и выезд замерщика',
                  'Наш специалист приедет на участок с образцами травы, сделает лазерные замеры грунта и составит смету.',
                  'Заказать бесплатный замер',
                  'top_header_cta'
                )
              }
              className="bg-brand-emerald hover:bg-brand-main text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-brand-emerald/10 cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Вызвать замерщика</span>
            </button>
          </div>

          {/* Mobile Menu Trigger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:+79852394989"
              className="p-2 rounded-xl bg-slate-50 text-brand-dark hover:text-brand-emerald transition-colors"
              aria-label="Позвонить нам"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:text-brand-dark transition-colors cursor-pointer"
              aria-label="Открыть меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop below header */}
          <div 
            className="lg:hidden fixed inset-0 top-0 left-0 w-full h-full bg-slate-900/30 backdrop-blur-xs z-30"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Menu Panel exactly under the header */}
          <div className="lg:hidden absolute top-full left-0 right-0 z-40 bg-white border-b border-slate-150/80 shadow-2xl flex flex-col p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-3 duration-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Навигация по сайту</span>
            <div className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 px-4 py-3 rounded-xl flex items-center justify-between border border-slate-100"
                >
                  <span>{link.name}</span>
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                </a>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
              <a
                href="tel:+79852394989"
                className="bg-brand-emerald/10 hover:bg-brand-emerald/20 text-brand-main font-display font-black text-sm p-4 rounded-2xl flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-emerald animate-bounce" />
                <span>+7 (985) 239-49-89</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal(
                    'Расчет сметы за 10 минут',
                    'Введите контакты, чтобы забронировать выезд замерщика с образцами травы и скидкой 5%.',
                    'Заказать замер бесплатно',
                    'mobile_drawer_cta'
                  );
                }}
                className="bg-brand-gold hover:bg-brand-amber text-brand-dark hover:text-white font-black text-xs uppercase tracking-wide p-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Получить смету бесплатно</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center leading-normal">
              ООО «ЛАНДШАФТ РФ» <br />Работаем по всей Москве и Московской области
            </p>
          </div>
        </>
      )}
    </header>
  );
};
