/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, CalendarCheck, Layers, Menu, X, ArrowRight } from 'lucide-react';

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
    { name: 'Сорта и Цены', href: '#tariffs' },
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
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-dark to-brand-emerald flex items-center justify-center text-white shadow-md shadow-brand-main/10 group-hover:scale-105 transition-transform">
              {/* Custom SVG grass blades icon representing Rolled Lawn */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12,2A10,10,0,0,0,2,12a10,10,0,0,0,10,10A10,10,0,0,0,22,12,10,10,0,0,0,12,2Zm1,17.4V13H11v6.4a8,8,0,0,1-6.1-5.1A1,1,0,0,0,3,14a8,8,0,1,1,16,0,1,1,0,0,0-1.9.3A8,8,0,0,1,13,19.4ZM11,11V6a1,1,0,0,1,2,0v5a1,1,0,0,1-2,0Z"/>
              </svg>
            </div>
            <div>
              <span className="block text-base sm:text-lg font-display font-black text-brand-dark leading-none tracking-tight">
                ИЗУМРУДНЫЙ
              </span>
              <span className="block text-[10px] sm:text-xs font-bold text-brand-emerald uppercase tracking-widest leading-none mt-1">
                ГАЗОН • Питомник
              </span>
            </div>
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
                href="tel:+74951503883"
                className="flex items-center gap-1.5 font-display font-black text-xs sm:text-sm md:text-base text-brand-dark hover:text-brand-emerald transition-colors"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-brand-emerald animate-pulse shrink-0" />
                <span>+7 (495) 150-38-83</span>
              </a>
              <span className="block text-[9px] sm:text-[10px] text-slate-500 font-medium leading-none mt-1">
                Звонок бесплатный • Круглосуточно
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
              href="tel:+74951503883"
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
        <div className="lg:hidden fixed inset-0 top-[60px] z-40 bg-zinc-950/20 backdrop-blur-md">
          <div className="w-full bg-white border-b border-slate-100 flex flex-col p-6 space-y-4 shadow-xl max-h-[80vh] overflow-y-auto">
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
                href="tel:+74951503883"
                className="bg-brand-emerald/10 hover:bg-brand-emerald/20 text-brand-main font-display font-black text-sm p-4 rounded-2xl flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-emerald animate-bounce" />
                <span>+7 (495) 150-38-83</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal(
                    'Расчет сметы за 10 минут',
                    'Введите контакты, чтобы забронировать выезд замерщика с образцами травы и скидкой 10%.',
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
              ООО «Изумрудный Газон» • ОГРН 1157746352920 <br />Работаем по всей Москве и Московской области
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
