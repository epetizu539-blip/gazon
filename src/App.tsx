/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BeforeAfter } from './components/BeforeAfter';
import { Calculator } from './components/Calculator';
import { Quiz } from './components/Quiz';
import { ProductFeatures } from './components/ProductFeatures';
import { Tariffs } from './components/Tariffs';
import { Workflow } from './components/Workflow';
import { FAQ } from './components/FAQ';
import { StickyMobileCta } from './components/StickyMobileCta';
import { LeadPopup } from './components/LeadPopup';

import { CASE_REVIEWS } from './data';
import { Star, ShieldAlert, CheckCircle2, ChevronRight, Phone, MessageSquare, Mail, MapPin, Building, FileText, Sparkles, UserCheck } from 'lucide-react';

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
    { num: '3 часа', text: 'Среднее время от среза мятлика в питомнике до разгрузки' },
    { num: '12 месяцев', text: 'Гарантия на 100% приживаемость дерна по договору' },
    { num: '1500+ участков', text: 'Озеленено и благоустроено нашей компанией с 2014 года' },
    { num: '120 Га', text: 'Собственная площадь полей в Раменском районе МО' }
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
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-10 max-w-xl mx-auto">
              {CASE_REVIEWS.map((review, index) => (
                <button
                  key={review.id}
                  onClick={() => setActiveReviewIdx(index)}
                  className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                    activeReviewIdx === index
                      ? 'bg-brand-main text-white border-brand-main shadow-md shadow-brand-main/15'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="block text-[9px] uppercase opacity-75 font-black mb-0.5">Кейс #{index + 1}</span>
                  <span>{review.location.split(',')[0]}</span>
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

        {/* GORGEOUS BENEFIT GIRD */}
        <ProductFeatures />

        {/* INTERACTIVE FUNNEL TEST QUEST */}
        <Quiz onOpenModal={openModal} />

        {/* ROLLING LAWN SORTS DIRECT CATALOG LIST */}
        <Tariffs onOpenModal={openModal} />

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
                      <a href="tel:+74951503883" className="font-extrabold text-[#f3f4f6] hover:text-[#10b981] transition-colors leading-relaxed">+7 (495) 150-38-83</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 text-brand-emerald flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-brand-emerald" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">Наш Чат WhatsApp:</span>
                      <a href="https://wa.me/79998887766" target="_blank" rel="noreferrer" className="font-extrabold text-[#f3f4f6] hover:text-[#10b981] transition-colors leading-relaxed">+7 (999) 888-77-66</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 text-brand-emerald flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-brand-emerald" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">Электронная почта:</span>
                      <a href="mailto:info@eron-lawn.ru" className="font-extrabold text-[#f3f4f6] hover:text-[#10b981] transition-colors leading-relaxed">info@izumrud-gazon.ru</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 text-brand-emerald flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-brand-emerald" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">Шоурум и Офис:</span>
                      <span className="text-[#f3f4f6] font-extrabold leading-normal block">г. Москва, ул. Космонавта Волкова, д. 20, бизнес-центр «Волков»</span>
                    </div>
                  </div>

                </div>

                {/* Embedded static address / map marker layout */}
                <div className="rounded-2xl overflow-hidden border border-slate-800 h-[220px] bg-slate-900 shadow-xl relative">
                  {/* Real map frame pointing to generic Moscow region coordinates for realism */}
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=37.535805%2C55.816664&mode=search&oid=165842188147&ol=biz&z=15"
                    className="w-full h-full border-none grayscale invert contrast-125 opacity-80"
                    title="Карта проезда к Изумрудный Газон"
                    allowFullScreen
                    loading="lazy"
                  />
                  
                  <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md text-white text-[10px] font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 border border-slate-700">
                    <Building className="w-3.5 h-3.5 text-brand-emerald" />
                    <span>Административный офис продаж розницы</span>
                  </div>
                </div>

              </div>

              {/* Right Column Open Capture Card */}
              <div className="lg:col-span-6 bg-white text-slate-950 rounded-3.5xl p-6 sm:p-10 border border-slate-100 shadow-2xl relative text-left">
                <span className="bg-brand-emerald/10 text-brand-main text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Скидка 10% действует сегодня
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
                    
                    openModalWithData(
                      'Получить смету со скидкой',
                      `Заявка принята. Фиксируем персональную скидку 10% на имя ${nameInput}. Наш агроном позвонит на номер ${phoneInput} в течение 10 минут.`,
                      'Переговорить с агрономом',
                      'bottom_open_form_footer',
                      {
                        name: nameInput,
                        phone: phoneInput
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
            <div className="text-left">
              <span className="block text-sm font-display font-black text-white tracking-widest uppercase">
                ИЗУМРУДНЫЙ ГАЗОН
              </span>
              <span className="block text-[9px] uppercase tracking-wider text-slate-500 mt-1">
                Группа компаний по благоустройству • СНиП РФ • ГОСТ
              </span>
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
              © 2014-2026 ООО «ИЗУМРУДНЫЙ ГАЗОН» • ИНН 7714341930 • ОГРН 1157746352920. Все права защищены. <br className="hidden sm:block" />
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
