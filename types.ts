export type UnitCategory = 
  | 'length' 
  | 'mass' 
  | 'time' 
  | 'temperature' 
  | 'area' 
  | 'volume' 
  | 'speed' 
  | 'pressure' 
  | 'energy' 
  | 'power' 
  | 'data'
  | 'currency'
  | 'angle'
  | 'frequency'
  | 'force'
  | 'transfer'
  | 'fuel';

export type CalculatorType = 'bmi' | 'loan' | 'stats';
export type Language = 'en' | 'zh' | 'ja';

export interface UnitDefinition {
  id: string;
  name: string; // Default English name
  symbol: string;
  toBase?: (val: number) => number; 
  fromBase?: (val: number) => number;
  factor?: number; 
}

export interface CategoryDefinition {
  id: UnitCategory;
  name: string; // Default English name
  icon: React.ReactNode;
  units: UnitDefinition[];
  baseUnitId: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  type: 'conversion' | 'calculator';
  description: string;
  result: string;
}

export type AppView = 
  | { type: 'landing' }
  | { type: 'category'; id: UnitCategory }
  | { type: 'calculator'; id: CalculatorType }
  | { type: 'dashboard' };
