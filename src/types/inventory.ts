export interface Ingredient {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  minStock: number;
  lastUpdated: Date;
}

export interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: Date;
}

export interface SaleItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  date: Date;
}

export interface DailyStats {
  date: string;
  sales: number;
  expenses: number;
  profit: number;
}

export interface MonthlyStats {
  month: string;
  sales: number;
  expenses: number;
  profit: number;
}
