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

export interface Sale {
  id: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
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
