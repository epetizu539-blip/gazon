/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Types of lawns available
export type LawnCategory = 'standard' | 'premium' | 'elite' | 'shadow';

export interface LawnType {
  id: LawnCategory;
  name: string;
  nameRu: string;
  pricePerSqm: number;
  oldPricePerSqm?: number;
  composition: string;
  density: string;
  thickness: string;
  description: string;
  features: string[];
  bestFor: string;
  image: string;
}

// Calculator input state
export interface CalculatorState {
  area: number; // in square meters
  lawnCategory: LawnCategory;
  soilPreparation: boolean; // вспашка, выравнивание, уплотнение
  removeOldWeeds: boolean; // удаление сорняков и старой травы
  delivery: boolean; // доставка до объекта
  molesMesh: boolean; // укладка сетки от кротов
  autoWatering: boolean; // монтаж автополива под ключ
  maintenance: boolean; // первое кошение и внесение удобрений
}

// Calculator calculation report
export interface CalculatorResult {
  lawnCost: number;
  soilPrepCost: number;
  weedRemovalCost: number;
  deliveryCost: number;
  molesMeshCost: number;
  autoWateringCost: number;
  maintenanceCost: number;
  subtotal: number;
  discount: number;
  total: number;
  daysToComplete: number;
}

// Quiz step definition
export interface QuizQuestion {
  id: number;
  text: string;
  options: QuizOption[];
}

export interface QuizOption {
  text: string;
  value: string;
  iconName: string; // Lucide icon identifier
}

// Quiz answers state
export interface QuizAnswers {
  purpose: string;
  soilState: string;
  additionalServices: string[];
  areaText: string;
}

// Review/Case study definition
export interface Review {
  id: number;
  author: string;
  location: string;
  area: number;
  lawnTypeRu: string;
  text: string;
  rating: number;
  beforeImage: string;
  afterImage: string;
  date: string;
  avatar: string;
}

// Lead format
export interface LeadSubmission {
  name: string;
  phone: string;
  source: string; // calculator, quiz, top_header, hero, footer, sticky
  additionalData?: Record<string, string | number | boolean | string[]>;
}
