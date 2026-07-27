/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { Logo } from './components/Logo';
import { Hero } from './components/Hero';
import { BeforeAfter } from './components/BeforeAfter';
import { Calculator } from './components/Calculator';
import GenerativeArtGallery from './components/ui/generative-art-gallery';
import { Quiz } from './components/Quiz';
import { ProductFeatures } from './components/ProductFeatures';
import { Workflow } from './components/Workflow';
import { FAQ } from './components/FAQ';
import { StickyMobileCta } from './components/StickyMobileCta';
import { LeadPopup } from './components/LeadPopup';

import { CASE_REVIEWS } from './data';
import { Star, ShieldAlert, CheckCircle2, ChevronRight, Phone, Send, MapPin, Building, FileText, Sparkles, UserCheck } from 'lucide-react';

export default function App() {
  // Modal configurations
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalSubtitle, setModalSubtitle] = useState('');
  const [modalButtonText, setModalButtonText] = useState('');
  const [modalSource, setModalSource] = useState('');
  const [modalAdditionalData, setModalAdditionalData] = useState<Record<string, string | number | boolean | string[]>>({});

  // Active Portfolio item tab index
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const openModal = (title: string, subtitle: string, buttonText: string, source: string) => {
    setModalTitle(title);
    setModalSubtitle(subtitle);
    setModalButtonText(buttonText);
    setModalSource(source);
    setModalAdditionalData({});
    setModalOpen(true);
  };

  const openModalWithData = (
    title: string,
    subtitle: string,
    buttonText: string,
    source: string,
    data: Record<string, string | number | boolean | string[]>
  ) => {
    setModalTitle(title);
    setModalSubtitle(subtitle);
    setModalButtonText(buttonText);
    setModalSource(source);
    setModalAdditionalData(data);
    setModalOpen(true);
  };

  const activeReview = CASE_REVIEWS[activeReviewIdx];

  const metrics = [
    { num: '3 часа', text: 'Среднее время от среза мятлика на поле до разгрузки' },
    { num: '12 месяцев', text: 'Гарантия на 100% приживаемость дерна по договору' },
    { num: '1500+ участков', text: 'Озеленено и благоустроено нашей компанией с 2006 года' },
    { num: '720 Га', text: 'Собственные поля в МО' }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-brand-emerald selection:text-white">
      
      {/* Sticky top header navigation */}
      <Header onOpenModal={openModal} />

      {/* Main sections */}
      <main className="flex-1">
        
        {/* HERO HERO HERO */}
        <Hero onOpenModal={openModal} />

        {/* METRICS METRICS METRICS */}
        <section id="metrics-panel" className="bg-brand-dark py-12 text-white relative overflow-hidden">
          {/* subtle decoration background glow */}
          <div className="absolute top-0 left-0 w-80 h-32 bg-brand-light/10 blur-[40px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-x divide-slate-800/60 max-w-none">
              {metrics.map((m, idx) => (
                <div key={idx} className="p-4 sm:p-6 text-center space-y-2 flex flex-col justify-center">
                  <span className="block font-display font-black text-2xl sm:text-3.5xl md:text-4xl text-brand-gold tracking-tight leading-none">
                    {m.num}
                  </span>
                  <p className="text-[10px] sm:text-xs text-slate-300 font-medium leading-relaxed max-w-[200px] mx-auto">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE COMPARISON CASE REVIEWS portfolio */}
        <section id="results" className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Title */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-brand-emerald bg-brand-emerald/10 mb-3 uppercase tracking-wider">
                Результаты вживую
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-3.5xl font-display font-black text-brand-dark tracking-tight">
                Посмотрите наши работы по укладке <br />
                через интерактивный слайдер
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
                Тяните ползунок в центре влево и вправо, чтобы сравнить состояние грунта ДO начала ландшафтных работ и готовый рулонный ковер ПОСЛЕ укладки.
              </p>
            </div>

            {/* TAB SELECTORS TO SWITCH Portfolio cases */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-3xl mx-auto">
              {CASE_REVIEWS.map((review, index) => (
                <button
                  key={review.id}
                  onClick={() => setActiveReviewIdx(index)}
                  className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex items-center gap-4 group relative overflow-hidden ${
                    activeReviewIdx === index
                      ? 'bg-white border-brand-emerald ring-2 ring-brand-emerald/15 shadow-lg shadow-brand-emerald/5 translate-y-[-2px]'
                      : 'bg-slate-50/60 hover:bg-white border-slate-200 hover:shadow-md hover:translate-y-[-1px]'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img 
                      src={review.afterImage} 
                      alt={review.location}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md text-[8px] font-black bg-brand-emerald text-white font-mono shadow-sm">
                      {review.area} м²
                    </span>
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <span className={`block text-[9px] font-black uppercase tracking-wider mb-0.5 ${
                      activeReviewIdx === index ? 'text-brand-emerald' : 'text-slate-400'
                    }`}>
                      Кейс #{index + 1}
                    </span>
                    <span className="block text-xs font-bold text-slate-800 truncate group-hover:text-brand-emerald transition-colors">
                      {review.location.split(',')[0]}
                    </span>
                    <span className="block text-[10px] text-slate-500 truncate mt-0.5 font-medium">
                      {review.lawnTypeRu}
                    </span>
                  </div>

                  {/* Micro indicator line at the bottom */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ${
                    activeReviewIdx === index ? 'bg-brand-emerald' : 'bg-transparent'
                  }`} />
                </button>
              ))}
            </div>

            {/* CASE STUDY TAB CONTENT */}
            {activeReview && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/50 p-6 sm:p-8 lg:p-12 rounded-3.5xl border border-slate-150">
                
                {/* Image slider column */}
                <div className="lg:col-span-7">
                  <BeforeAfter
                    beforeImage={activeReview.beforeImage}
                    afterImage={activeReview.afterImage}
                  />
                </div>

                {/* Testimonial detail text column */}
                <div className="lg:col-span-5 space-y-6 text-left flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    
                    {/* Stars Rating and Title */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-0.5">
                        {[...Array(activeReview.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold">• {activeReview.date}</span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-display font-black text-brand-dark tracking-tight leading-snug">
                      «{activeReview.author}»
                    </h4>

                    {/* Meta locations info */}
                    <div className="text-xs text-slate-500 space-y-1 bg-white p-3.5 rounded-xl border border-slate-150">
                      <p><strong>Адрес объекта:</strong> {activeReview.location}</p>
                      <p><strong>Площадь:</strong> <strong className="text-brand-dark">{activeReview.area} м²</strong></p>
                      <p><strong>Используемый сорт:</strong> <strong className="text-brand-main">{activeReview.lawnTypeRu}</strong></p>
                    </div>

                    {/* Testimonial text paragraphs */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium italic">
                      {activeReview.text}
                    </p>

                  </div>

                  <div className="border-t border-slate-200/60 pt-5 mt-4 flex items-center justify-between">
                    <button
                      onClick={() =>
                        openModal(
                          'Узнать стоимость такого же газона',
                          `Запросите индивидуальный расчёт укладки сорта «${activeReview.lawnTypeRu}» на площадь вашего участка по прошлогодним ценам.`,
                          'Хочу такой же газон',
                          `case_study_cta_${activeReview.id}`
                        )
                      }
                      className="bg-brand-emerald hover:bg-brand-main text-white font-bold text-xs py-3.5 px-5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-brand-emerald/10 transition-colors"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Хочу такой же результат!</span>
                    </button>
                    
                    {/* Avatar Badge */}
                    <div className="flex items-center gap-2">
                      <img
                        src={activeReview.avatar}
                        alt={activeReview.author}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="text-[10px] leading-tight">
                        <span className="block font-bold text-brand-dark">Заказчик</span>
                        <span className="block text-slate-400">Проверен</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        </section>

        {/* CUSTOM INVOICE CALCULATOR */}
        <Calculator onOpenModalWithData={openModalWithData} />

        {/* ADDITIONAL SERVICES GENERATIVE ART GALLERY */}
        <GenerativeArtGallery onOpenModal={openModal} />

        {/* GORGEOUS BENEFIT GIRD */}
        <ProductFeatures />

        {/* INTERACTIVE FUNNEL TEST QUEST */}
        <Quiz onOpenModal={openModal} />

        {/* WORKFLOW ROADMAP */}
        <Workflow />

        {/* RED CONTRACT WARNING SECTION (CONVERSIONS ACCELERATOR) */}
        <section className="py-12 bg-rose-50/50 border-t border-b border-rose-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3.5xl border border-rose-200/60 p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 text-left relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-4 h-full bg-rose-500" />
              
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              
              <div className="flex-1 space-y-2">
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block">Осторожно, мошенничество</span>
                <h3 className="text-base sm:text-lg font-display font-black text-brand-dark tracking-tight leading-snug">
                  Почему нельзя заказывать дешевые рулоны у «диких бригад»?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Остерегайтесь посредников, которые продают старый, сопревший в кузовах газон сорных лесных пород. Такая трава желтеет на 3-й день и полностью засыхает за неделю из-за поврежденного корня. Требуйте подписанный <strong>договор с официальной государственной фитосанитарной сертификацией</strong> и гарантией приживаемости!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILED FAQ BLOCK */}
        <FAQ />

        {/* BOTTOM FINAL OPEN FORM CTA BLOCK */}
        <section id="contacts" className="py-16 sm:py-24 bg-brand-dark text-white relative overflow-hidden">
          {/* visual background grids represent field sowing lines */}
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-light/5 rounded-full blur-[80px]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-emerald/5 rounded-full blur-[100px]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column Contacts info */}
              <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-brand-gold bg-brand-gold/10 uppercase tracking-wider">
                    Контакты и Офис
                  </span>
                  <h2 className="text-2xl sm:text-3.5xl font-display font-black tracking-tight leading-tight">
                    Свяжитесь с нами сегодня — <br className="hidden sm:block" />
                    и гуляйте по готовому газону уже послезавтра!
                  </h2>
                  <p className="text-slate-350 text-xs sm:text-sm leading-relaxed font-semibold max-w-lg">
                    Мы всегда на связи. Офис работает без выходных и перерывов на обед. Приезжайте на чашку кофе или заказывайте экспертный выезд в один клик.
                  </p>
                </div>

                {/* Specific coordinates list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 text-brand-emerald flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-brand-emerald" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">Горячая линия:</span>
                      <a href="tel:+79852394989" className="font-extrabold text-[#f3f4f6] hover:text-[#10b981] transition-colors leading-relaxed">+7 (985) 239-49-89</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 text-brand-emerald flex items-center justify-center shrink-0">
                      <Send className="w-4 h-4 text-brand-emerald" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">Наш Telegram:</span>
                      <a href="https://t.me/+79852394989" target="_blank" rel="noreferrer" className="font-extrabold text-[#f3f4f6] hover:text-[#10b981] transition-colors leading-relaxed">+7 (985) 239-49-89</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 text-brand-emerald flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-brand-emerald" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">Шоурум и Центральный Офис:</span>
                      <span className="text-[#f3f4f6] font-extrabold leading-normal block">
                        Молодёжная улица, 48, село Павловская Слобода, Истринский район, Московская область, 143581
                      </span>
                      <span className="text-brand-gold text-xs font-bold block mt-0.5">
                        3 этаж, 2 кабинет
                      </span>
                    </div>
                  </div>

                </div>

                {/* Embedded Yandex Map with exact marker coordinates */}
                <div className="rounded-2xl overflow-hidden border border-slate-800 h-[300px] bg-slate-900 shadow-2xl relative group">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=37.073121%2C55.815428&z=17&pt=37.073121%2C55.815428%2Cpm2grm~37.073121%2C55.815428%2Cpm2rdm"
                    className="w-full h-full border-none opacity-95 contrast-105"
                    title="Карта проезда: с. Павловская Слобода, ул. Молодёжная, д. 48"
                    allowFullScreen
                    loading="lazy"
                  />
                  
                  {/* Top info badge */}
                  <div className="absolute top-3 left-3 right-3 sm:right-auto bg-slate-950/95 backdrop-blur-md text-white text-[11px] font-bold py-2.5 px-3.5 rounded-xl flex items-center gap-2 border border-slate-700/80 shadow-xl">
                    <div className="relative flex h-3 w-3 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-emerald"></span>
                    </div>
                    <div>
                      <span className="text-white font-extrabold block">Офис отмечен точкой (55.815428, 37.073121)</span>
                      <span className="text-slate-300 font-normal text-[10px]">ул. Молодёжная 48, 3 этаж, каб. 2</span>
                    </div>
                  </div>

                  {/* Navigator Action button */}
                  <a
                    href="https://yandex.ru/maps/?whatshere%5Bpoint%5D=37.073121%2C55.815428&whatshere%5Bzoom%5D=17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 bg-brand-emerald hover:bg-brand-main text-white text-[11px] font-extrabold py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-xl transition-all hover:scale-105 border border-brand-light/20"
                  >
                    <MapPin className="w-3.5 h-3.5 text-white" />
                    <span>Построить маршрут</span>
                  </a>
                </div>

              </div>

              {/* Right Column Open Capture Card */}
              <div className="lg:col-span-6 bg-white text-slate-950 rounded-3.5xl p-6 sm:p-10 border border-slate-100 shadow-2xl relative text-left">
                <span className="bg-brand-emerald/10 text-brand-main text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Скидка 5% действует сегодня
                </span>
                
                <h3 className="text-xl sm:text-2xl font-display font-black text-brand-dark leading-tight mt-3">
                  Получить бесплатную смету <br />
                  и расчет доставки до участка
                </h3>
                
                <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                  Заполните форму ниже. Наш агроном перезвонит в течение 10 минут, сориентирует по стоимости и забронирует за вашим номером <strong>3 подарка</strong>.
                </p>

                {/* Standard Callback inside contacts block */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const nameInput = (e.currentTarget.elements.namedItem('footer-name') as HTMLInputElement).value;
                    const phoneInput = (e.currentTarget.elements.namedItem('footer-phone') as HTMLInputElement).value;
                    const addressInput = (e.currentTarget.elements.namedItem('footer-address') as HTMLInputElement).value;
                    
                    openModalWithData(
                      'Получить смету со скидкой',
                      `Заявка принята. Фиксируем персональную скидку 5% на имя ${nameInput}. Наш агроном позвонит на номер ${phoneInput} в течение 10 минут.`,
                      'Переговорить с агрономом',
                      'bottom_open_form_footer',
                      {
                        name: nameInput,
                        phone: phoneInput,
                        address: addressInput
                      }
                    );
                  }}
                  className="space-y-4 mt-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-600 uppercase tracking-widest mb-1">
                        Ваше имя:
                      </label>
                      <input
                        type="text"
                        name="footer-name"
                        required
                        placeholder="Александр"
                        className="w-full px-4 py-3 rounded-xl border border-slate-205 focus:border-brand-main focus:ring-brand-main/20 text-slate-900 placeholder-slate-400 font-medium text-xs focus:outline-none focus:ring-4 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-600 uppercase tracking-widest mb-1">
                        Номер мобильного:
                      </label>
                      <input
                        type="tel"
                        name="footer-phone"
                        required
                        placeholder="+7 (999) 999-99-99"
                        className="w-full px-4 py-3 rounded-xl border border-slate-205 focus:border-brand-main focus:ring-brand-main/20 text-slate-900 placeholder-slate-400 font-medium text-xs focus:outline-none focus:ring-4 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-600 uppercase tracking-widest mb-1">
                      Адрес или населенный пункт <span className="text-slate-400 font-normal">(не обязательно):</span>
                    </label>
                    <input
                      type="text"
                      name="footer-address"
                      placeholder="Например: Истра, КП Оранж Клаб"
                      className="w-full px-4 py-3 rounded-xl border border-slate-205 focus:border-brand-main focus:ring-brand-main/20 text-slate-900 placeholder-slate-400 font-medium text-xs focus:outline-none focus:ring-4 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-600 uppercase tracking-widest mb-1">
                      Ориентировочная площадь участка (соток):
                    </label>
                    <input
                      type="text"
                      placeholder="6 соток (600 м²)"
                      className="w-full px-4 py-3 rounded-xl border border-slate-205 focus:border-brand-main focus:ring-brand-main/20 text-slate-900 placeholder-slate-400 font-medium text-xs focus:outline-none focus:ring-4 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-gold hover:bg-brand-amber text-brand-dark hover:text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-gold/10 transition-all"
                  >
                    <span>Запросить сметный лист</span>
                    <ChevronRight className="w-4 h-4 animate-pulse" />
                  </button>

                  <p className="text-[10px] text-slate-400 text-center leading-normal">
                    Нажимая кнопку, вы подтверждаете согласие с Политикой конфиденциальности. Ваши данные передаются под надежной криптографической защитой HTTPS.
                  </p>
                </form>

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FULL LEGAL FOOTER */}
      <footer id="app-legal-footer" className="bg-zinc-950 text-slate-400 py-10 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Logo details */}
            <div className="flex items-center gap-3">
              <Logo className="w-10 h-10" />
              <div>
                <span className="block text-sm font-display font-black text-white tracking-widest uppercase">
                  ЛАНДШАФТ.РФ
                </span>
                <span className="block text-[9px] uppercase tracking-wider text-slate-500 mt-1">
                  Группа компаний по благоустройству • СНиП РФ • ГОСТ
                </span>
              </div>
            </div>

            {/* Micro Links */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
              <a href="#tariffs" className="hover:text-white transition-colors">Сорта травы</a>
              <span>•</span>
              <a href="#calculator" className="hover:text-white transition-colors">Калькулятор укладки</a>
              <span>•</span>
              <a href="#faq" className="hover:text-white transition-colors">Памятка ухода</a>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition-colors" onClick={() => openModal('Политика конфиденциальности', 'Сайт защищает ваши персональные данные согласно ФЗ-152.', 'Понятно', 'privacy_cookie')}>Политика конфиденциальности</span>
            </div>

          </div>

          <div className="border-t border-slate-900/80 pt-6 mt-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between text-[10px] text-slate-550 text-slate-500 space-y-4 md:space-y-0 leading-relaxed">
            <p className="max-w-2xl">
              © 2006-2026 ООО «ЛАНДШАФТ РФ». Все права защищены. <br className="hidden sm:block" />
              Любое копирование медиа-материалов, изображений или текстового наполнения карается законом об авторских правах РФ. Информация на сайте носит справочный характер и не является публичной офертой.
            </p>
            <div className="flex items-center gap-1.5 shrink-0">
              <FileText className="w-3.5 h-3.5 text-slate-650" />
              <span>Договор-оферта укладки газона №У-04-26</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Persistent floating triggers for mobile screens */}
      <StickyMobileCta onOpenModal={openModal} />

      {/* Universal callback popup dialog */}
      <LeadPopup
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        subtitle={modalSubtitle}
        buttonText={modalButtonText}
        source={modalSource}
        additionalData={modalAdditionalData}
      />

    </div>
  );
}
