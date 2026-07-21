"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

// Utility for class names
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface GenerativeArtCanvasProps {
  isHovered: boolean;
}

// Generative Art Canvas Component
const GenerativeArtCanvas: React.FC<GenerativeArtCanvasProps> = ({ isHovered }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lines: Line[] = [];
    const numLines = 30;

    class Line {
      x: number;
      y: number;
      speed: number;
      angle: number;
      length: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 400);
        this.y = Math.random() * (canvas?.height || 400);
        this.speed = Math.random() * 0.6 + 0.2;
        this.angle = Math.random() * Math.PI * 2;
        this.length = Math.random() * 25 + 8;
      }

      update() {
        if (!canvas) return;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        // Emerald & green generative glowing particles
        ctx.strokeStyle = `rgba(16, 185, 129, ${Math.random() * 0.4 + 0.2})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    const init = () => {
      lines = [];
      for (let i = 0; i < numLines; i++) {
        lines.push(new Line());
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      if (isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lines.forEach((line) => {
          line.update();
          line.draw();
        });
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    canvas.width = 400;
    canvas.height = 400;
    init();
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
    />
  );
};

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

interface GalleryCardProps {
  item: ServiceItem;
  index: number;
  onSelect?: (item: ServiceItem) => void;
}

// Gallery Card Component matching site styling
const GalleryCard: React.FC<GalleryCardProps> = ({ item, index, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cardVariants = {
    offscreen: { y: 40, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.2, duration: 0.8, delay: index * 0.1 }
    }
  };

  return (
    <motion.div
      key={item.title}
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onSelect && onSelect(item)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative w-full rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-brand-emerald/40 cursor-pointer overflow-hidden transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://images.unsplash.com/photo-1558904541-efa8c196b27d?q=80&w=600&auto=format&fit=crop';
          }}
        />
        <GenerativeArtCanvas isHovered={isHovered} />

        {/* Gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/10 to-transparent"></div>

        {/* Top category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-emerald bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-brand-emerald/20 shadow-sm">
            <Sparkles className="w-3 h-3 text-brand-gold" />
            {item.category}
          </span>
        </div>

        {/* Action arrow icon */}
        <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-brand-dark flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-md">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      {/* Bottom Content Body */}
      <div className="p-6 text-left flex-1 flex flex-col justify-between bg-white">
        <div>
          <h3 className="text-xl font-display font-black text-brand-dark mb-2 leading-snug group-hover:text-brand-main transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-3 mb-6 leading-relaxed font-normal">
            {item.description}
          </p>
        </div>

        {/* Action Button - No Prices */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            className="w-full py-3 px-4 rounded-xl bg-slate-50 group-hover:bg-brand-emerald text-brand-dark group-hover:text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-none group-hover:shadow-md border border-slate-200/60 group-hover:border-transparent cursor-pointer"
          >
            <span>Заказать услугу</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

interface GenerativeArtGalleryProps {
  onOpenModal?: (
    title: string,
    subtitle: string,
    buttonText: string,
    source: string
  ) => void;
}

// The main Gallery component for Additional Services
export const GenerativeArtGallery: React.FC<GenerativeArtGalleryProps> = ({ onOpenModal }) => {
  const serviceItems: ServiceItem[] = [
    {
      id: "auto_irrigation",
      title: "Системы автополива",
      category: "Инженерия",
      description: "Проектирование и монтаж скрытого автоматического полива с датчиками влажности почвы и форсунками Hunter.",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "drainage_system",
      title: "Дренаж и ливневка",
      category: "Водоотведение",
      description: "Глубинный дренаж и ливневая канализация для защиты газона от застоя воды и заболачивания.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "paving_stones",
      title: "Укладка брусчатки",
      category: "Благоустройство",
      description: "Мощение тротуарной плитки, садовых дорожек и парковочных зон с подготовкой усиленного основания.",
      image: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "landscape_lighting",
      title: "Ландшафтное освещение",
      category: "Подсветка",
      description: "Архитектурная и парковая 12V подсветка газона, дорожек, альпийских горок и деревьев.",
      image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "lawn_maintanance",
      title: "Уход и аэрация газона",
      category: "Сервис",
      description: "Сезонная скарификация, аэрация колющими валами, внесение комплексных удобрений и стрижка.",
      image: "https://images.unsplash.com/photo-1592417817038-d13fd7342605?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "soil_prep",
      title: "Подготовка и культивация",
      category: "Земляные работы",
      description: "Выравнивание рельефа мотоблоком, выборка сорняков, ввоз плодородного просеянного грунта.",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleSelectService = (item: ServiceItem) => {
    if (onOpenModal) {
      onOpenModal(
        `Заказать услугу «${item.title}»`,
        `Оставьте номер телефона, чтобы забронировать выезд инженера и получить бесплатный расчёт со скидкой 5% на услугу ${item.title}.`,
        'Запросить расчёт услуги',
        `gallery_service_${item.id}`
      );
    }
  };

  return (
    <section className="relative w-full py-20 bg-slate-50 text-brand-dark overflow-hidden border-t border-slate-200/80">
      {/* Background ambient glows in site emerald/gold colors */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-emerald/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-brand-emerald bg-brand-emerald/10 border border-brand-emerald/20 uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            Комплексный ландшафт под ключ
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-brand-dark leading-tight"
          >
            Дополнительные услуги <br className="hidden sm:block" />
            для идеального участка
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed font-normal max-w-xl"
          >
            Инженерное благоустройство любой сложности. Выберите нужную услугу, чтобы заказать бесплатный выезд специалиста на ваш участок.
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              onSelect={handleSelectService}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default GenerativeArtGallery;

