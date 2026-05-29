/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS, LAWN_TYPES } from '../data';
import { LawnType } from '../types';
import { CheckCircle, Activity, Sparkles, Trees, CloudRain, CheckCircle2, AlertTriangle, Layers, RefreshCw, Droplets, Grid, Compass, XCircle, ChevronLeft, ArrowRight, Phone, MessageSquare, ClipboardCheck, Award } from 'lucide-react';

interface QuizProps {
  onOpenModal: (title: string, subtitle: string, buttonText: string, source: string) => void;
}

// Map react-icons style Lucide IDs to components dynamically for absolute type safety
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  // Step 1
  Activity: Activity,
  Sparkles: Sparkles,
  Trees: Trees,
  CloudRain: CloudRain,
  // Step 2
  CheckCircle2: CheckCircle2,
  AlertTriangle: AlertTriangle,
  Layers: Layers,
  RefreshCw: RefreshCw,
  // Step 3
  Droplets: Droplets,
  Grid: Grid,
  Compass: Compass,
  XCircle: XCircle
};

export const Quiz: React.FC<QuizProps> = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0, 1, 2 = Questions. 3 = Results Form. 4 = Success
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [errorName, setErrorName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedLawn, setRecommendedLawn] = useState<LawnType | null>(null);

  // Dynamic formulation of the suggested lawn breed based on selections
  useEffect(() => {
    if (currentStep === 3) {
      const lawnPurpose = answers[0];
      const selectedOption = answers[2];

      let recommendedId = 'premium'; // Default recommendation

      if (lawnPurpose === 'shadow') {
        recommendedId = 'shadow';
      } else if (lawnPurpose === 'elite') {
        recommendedId = 'elite';
      } else if (lawnPurpose === 'standard') {
        recommendedId = 'standard';
      } else if (selectedOption === 'molesMesh') {
        recommendedId = 'elite'; // heavily fortified grass
      }

      const match = LAWN_TYPES.find((l) => l.id === recommendedId) || LAWN_TYPES[1];
      setRecommendedLawn(match);
    }
  }, [currentStep, answers]);

  const handleOptionSelect = (optionValue: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = optionValue;
    setAnswers(updatedAnswers);

    // Auto progress to next step with slight timing for a smooth visual feeling
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 280);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Masking Russian phones (+7 (999) 999-99-99)
  const handlePhoneValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.startsWith('7') || input.startsWith('8')) {
      input = input.substring(1);
    }
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

    setLeadPhone(formatted);
    if (formatted.length >= 18) {
      setErrorPhone('');
    }
  };

  const handleQuizFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!leadName.trim()) {
      setErrorName('Пожалуйста, введите ваше имя');
      hasError = true;
    } else {
      setErrorName('');
    }

    if (leadPhone.length < 18) {
      setErrorPhone('Введите корректный номер телефона (10 цифр)');
      hasError = true;
    } else {
      setErrorPhone('');
    }

    if (hasError) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(4); // Display thank you screen

      // Push logs to simulated analytics
      console.log('Quiz Completed & Lead Capture Success:', {
        name: leadName,
        phone: leadPhone,
        recommendedLawn: recommendedLawn?.nameRu,
        answers: {
          purpose: answers[0],
          soil: answers[1],
          infrastructure: answers[2]
        },
        source: 'interactive_quiz_funnel',
        timestamp: new Date().toISOString()
      });
    }, 1500);
  };

  const currentQuestion = currentStep < 3 ? QUIZ_QUESTIONS[currentStep] : null;

  return (
    <section id="quiz-funnel" className="py-16 sm:py-24 bg-gradient-to-b from-transparent to-brand-emerald/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-brand-main bg-brand-light/10 mb-3 uppercase tracking-wider">
            Премиум тест-подбор
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-brand-dark tracking-tight">
            Подобрать идеальный газон и рассчитать <br className="hidden sm:block" />
            смету со скидкой 10%
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
            Ответьте на 3 простых вопроса о вашем участке. На основе ваших ответов наш авто-алгоритм выберет подходящую смесь трав и сформирует памятку по уходу.
          </p>
        </div>

        {/* QUIZ INTERACTIVE INTERFACE CARD */}
        <div className="bg-white border border-slate-100 shadow-2xl rounded-3.5xl overflow-hidden min-h-[380px] flex flex-col justify-between p-6 sm:p-10 relative">
          
          {/* Decorative design corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-brand-emerald/5 rounded-bl-[50px] pointer-events-none" />

          {/* ACTIVE STEPS (0 - 2 = Questions) */}
          {currentStep < 3 && currentQuestion && (
            <div className="flex-1 flex flex-col justify-between">
              
              {/* Header: Progress indicators */}
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Шаг {currentStep + 1} из 3
                  </span>
                  <span className="text-xs font-semibold text-brand-main bg-brand-light/10 px-2.5 py-1 rounded-full">
                    Гарантия скидки зафиксирована 10%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full">
                  <div
                    className="h-full bg-brand-main rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
                  />
                </div>

                {/* Question title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-display font-black text-brand-dark tracking-tight leading-snug pt-2">
                  {currentQuestion.text}
                </h3>
              </div>

              {/* Answers Grid layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {currentQuestion.options.map((option, idx) => {
                  const IconComponent = iconMap[option.iconName] || CheckCircle2;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option.value)}
                      className="p-4 sm:p-5 text-left rounded-2xl border-2 border-slate-100 shadow-sm hover:shadow-md hover:border-brand-emerald bg-white transition-all duration-200 cursor-pointer flex items-start gap-3 group relative overflow-hidden"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-450 group-hover:bg-brand-emerald/10 group-hover:text-brand-main flex items-center justify-center shrink-0 transition-colors">
                        <IconComponent className="w-5 h-5 shrink-0" />
                      </div>
                      
                      <div className="text-left flex-1">
                        <span className="text-xs font-bold text-slate-800 group-hover:text-brand-dark leading-tight block">
                          {option.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Back navigation action button */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-2">
                <button
                  type="button"
                  disabled={currentStep === 0}
                  onClick={handleBack}
                  className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                    currentStep === 0
                      ? 'text-slate-305 text-slate-300 cursor-not-allowed'
                      : 'text-slate-500 hover:text-brand-dark cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Назад</span>
                </button>

                <p className="text-[10px] text-slate-400 font-medium">
                  * Выбор влияет на тип рекомендуемой смеси и агрономическую смету
                </p>
              </div>

            </div>
          )}

          {/* STEP 3: CONVERSIONS RECOMMENDATIONS RESULTS */}
          {currentStep === 3 && recommendedLawn && (
            <div className="flex-1 text-left flex flex-col md:flex-row gap-8 items-stretch">
              
              {/* Left results column (suggested lawn presentation) */}
              <div className="md:w-1/2 flex flex-col justify-between space-y-4">
                <div>
                  <span className="inline-flex items-center gap-1 bg-brand-emerald/10 text-brand-main font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                    <Award className="w-3.5 h-3.5" />
                    Расчет алгоритма готов!
                  </span>
                  
                  <h3 className="text-xl sm:text-2xl font-display font-black text-brand-dark leading-tight">
                    Для вас рекомендован сорт: <br />
                    <span className="text-brand-emerald">«{recommendedLawn.nameRu}»</span>
                  </h3>
                  
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                    Этот сорт идеально адаптирован под ваши задачи. {recommendedLawn.description}
                  </p>
                </div>

                {/* Micro specs of the recommended type */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs space-y-2">
                  <p className="text-slate-650"><strong>Состав:</strong> <span className="text-slate-600">{recommendedLawn.composition}</span></p>
                  <p className="text-slate-650"><strong>Плотность:</strong> <span className="text-slate-600">{recommendedLawn.density}</span></p>
                  <p className="text-slate-650"><strong>Стоимость:</strong> <span className="text-brand-main font-bold">{recommendedLawn.pricePerSqm} ₽/м²</span> <span className="line-through text-slate-400 text-[10px] ml-1">{recommendedLawn.oldPricePerSqm} ₽</span></p>
                </div>

                {/* Lawn preview image */}
                <div className="h-32 rounded-xl overflow-hidden relative border border-slate-150">
                  <img
                    src={recommendedLawn.image}
                    alt={recommendedLawn.nameRu}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-2.5 left-3.5 text-white text-[11px] font-bold">Образец газона из нашего питомника</span>
                </div>
              </div>

              {/* Right results column (Contact lead submission form) */}
              <div className="md:w-1/2 bg-slate-50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-slate-200/60 shadow-inner">
                <div>
                  <h4 className="text-base font-display font-black text-brand-dark tracking-tight leading-snug">
                    Получить итоговый расчет и скидку 10%
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    Введите номер телефона и имя. Мы зафиксируем замену цен со скидкой и пришлем готовую детальную смету на укладку в WhatsApp.
                  </p>
                </div>

                <form onSubmit={handleQuizFormSubmit} className="space-y-3.5 mt-5">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Ваше имя"
                      value={leadName}
                      onChange={(e) => {
                        setLeadName(e.target.value);
                        if (e.target.value.trim()) setErrorName('');
                      }}
                      className={`w-full px-4 py-3 rounded-xl border text-xs font-semibold ${
                        errorName ? 'border-rose-500 bg-rose-50' : 'border-slate-200'
                      } bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-main/20`}
                    />
                    {errorName && <span className="text-rose-500 text-[10px] mt-1 block font-semibold">{errorName}</span>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (999) 999-99-99"
                      value={leadPhone}
                      onChange={handlePhoneValueChange}
                      className={`w-full px-4 py-3 rounded-xl border text-xs font-semibold ${
                        errorPhone ? 'border-rose-500 bg-rose-50' : 'border-slate-200'
                      } bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-main/20`}
                    />
                    {errorPhone && <span className="text-rose-500 text-[10px] mt-1 block font-semibold">{errorPhone}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-brand-gold hover:bg-brand-amber text-brand-dark hover:text-white font-bold text-xs uppercase tracking-wide py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      'Идет расчет...'
                    ) : (
                      <>
                        <span>Получить смету в WhatsApp</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[9px] text-slate-400 leading-normal">
                    Передавая данные, вы соглашаетесь с Политикой обработки персональных данных. Смета подготавливается автоматически ИИ-алгоритмом на основе СНиП.
                  </p>
                </form>
              </div>

            </div>
          )}

          {/* STEP 4: SUCCESS GRATITUDE VIEW */}
          {currentStep === 4 && recommendedLawn && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-emerald/15 text-brand-[#10b981] mb-4">
                <CheckCircle className="w-8 h-8 text-brand-emerald" />
              </div>
              
              <h3 className="text-2xl font-display font-black text-brand-dark leading-snug">
                Поздравляем! Ваш расчет забронирован!
              </h3>
              
              <p className="text-slate-600 font-medium text-xs sm:text-sm max-w-lg mx-auto mt-3 leading-relaxed">
                Спасибо, <strong>{leadName}</strong>. Сорт газона <strong>«{recommendedLawn.nameRu}»</strong> и скидка 10% успешно прикреплены к вашему номеру <strong>{leadPhone}</strong>.
              </p>

              <div className="my-6 max-w-sm mx-auto bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-emerald/10 text-brand-main flex items-center justify-center shrink-0">
                  <ClipboardCheck className="w-5 h-5 text-brand-emerald" />
                </div>
                <div className="text-left font-medium">
                  <p className="text-xs text-brand-dark font-bold">СМЕТА В ПУТИ</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">В течение 10 минут агроном проверит отчет и позвонит вам или пришлет расчет в WhatsApp.</p>
                </div>
              </div>

              <div className="flex justify-center gap-3 max-w-md mx-auto">
                <a
                  href={`https://wa.me/79998887766?text=Я%20получил%2520результат%2520квиза%2520-${encodeURIComponent(recommendedLawn.nameRu)}.`}
                  target="_blank"
                  rel="noreferrer referrer"
                  className="flex-1 bg-[#25D366] text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Чат в WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(0);
                    setAnswers(['', '', '']);
                    setLeadName('');
                    setLeadPhone('');
                  }}
                  className="flex-1 bg-brand-dark text-white font-bold text-xs py-3 rounded-xl hover:bg-black transition-all cursor-pointer"
                >
                  Пройти тест заново
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
