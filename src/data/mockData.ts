import { Ingredient, Expense, Sale, DailyStats, MonthlyStats } from '@/types/inventory';

export const mockIngredients: Ingredient[] = [
  { id: '1', name: 'Tomatoes', category: 'Vegetables', quantity: 25, unit: 'kg', unitPrice: 3.50, minStock: 10, lastUpdated: new Date() },
  { id: '2', name: 'Olive Oil', category: 'Oils', quantity: 15, unit: 'liters', unitPrice: 12.00, minStock: 5, lastUpdated: new Date() },
  { id: '3', name: 'Chicken Breast', category: 'Meat', quantity: 30, unit: 'kg', unitPrice: 8.50, minStock: 15, lastUpdated: new Date() },
  { id: '4', name: 'Pasta', category: 'Dry Goods', quantity: 50, unit: 'kg', unitPrice: 2.00, minStock: 20, lastUpdated: new Date() },
  { id: '5', name: 'Parmesan Cheese', category: 'Dairy', quantity: 8, unit: 'kg', unitPrice: 25.00, minStock: 5, lastUpdated: new Date() },
  { id: '6', name: 'Garlic', category: 'Vegetables', quantity: 5, unit: 'kg', unitPrice: 6.00, minStock: 3, lastUpdated: new Date() },
  { id: '7', name: 'Basil', category: 'Herbs', quantity: 2, unit: 'kg', unitPrice: 15.00, minStock: 1, lastUpdated: new Date() },
  { id: '8', name: 'Salmon', category: 'Seafood', quantity: 12, unit: 'kg', unitPrice: 22.00, minStock: 8, lastUpdated: new Date() },
];

export const mockExpenses: Expense[] = [
  { id: '1', description: 'Weekly vegetable supply', category: 'Ingredients', amount: 450.00, date: new Date() },
  { id: '2', description: 'Kitchen equipment repair', category: 'Maintenance', amount: 150.00, date: new Date(Date.now() - 86400000) },
  { id: '3', description: 'Staff salaries', category: 'Payroll', amount: 3500.00, date: new Date(Date.now() - 172800000) },
  { id: '4', description: 'Utility bills', category: 'Utilities', amount: 280.00, date: new Date(Date.now() - 259200000) },
  { id: '5', description: 'Meat supplier payment', category: 'Ingredients', amount: 890.00, date: new Date(Date.now() - 345600000) },
];

export const mockSales: Sale[] = [
  { id: '1', itemName: 'Margherita Pizza', quantity: 15, unitPrice: 14.00, total: 210.00, date: new Date() },
  { id: '2', itemName: 'Pasta Carbonara', quantity: 12, unitPrice: 16.00, total: 192.00, date: new Date() },
  { id: '3', itemName: 'Grilled Salmon', quantity: 8, unitPrice: 24.00, total: 192.00, date: new Date() },
  { id: '4', itemName: 'Caesar Salad', quantity: 10, unitPrice: 12.00, total: 120.00, date: new Date(Date.now() - 86400000) },
  { id: '5', itemName: 'Tiramisu', quantity: 18, unitPrice: 8.00, total: 144.00, date: new Date(Date.now() - 86400000) },
];

export const mockDailyStats: DailyStats[] = [
  { date: 'Mon', sales: 1250, expenses: 450, profit: 800 },
  { date: 'Tue', sales: 1480, expenses: 520, profit: 960 },
  { date: 'Wed', sales: 1320, expenses: 380, profit: 940 },
  { date: 'Thu', sales: 1650, expenses: 490, profit: 1160 },
  { date: 'Fri', sales: 2100, expenses: 620, profit: 1480 },
  { date: 'Sat', sales: 2450, expenses: 780, profit: 1670 },
  { date: 'Sun', sales: 1890, expenses: 550, profit: 1340 },
];

export const mockMonthlyStats: MonthlyStats[] = [
  { month: 'Jan', sales: 32500, expenses: 18200, profit: 14300 },
  { month: 'Feb', sales: 28900, expenses: 16500, profit: 12400 },
  { month: 'Mar', sales: 35200, expenses: 19800, profit: 15400 },
  { month: 'Apr', sales: 38100, expenses: 21200, profit: 16900 },
  { month: 'May', sales: 41500, expenses: 22800, profit: 18700 },
  { month: 'Jun', sales: 45200, expenses: 24500, profit: 20700 },
];

export const categories = ['Vegetables', 'Meat', 'Seafood', 'Dairy', 'Dry Goods', 'Oils', 'Herbs', 'Spices'];
export const expenseCategories = ['Ingredients', 'Payroll', 'Utilities', 'Maintenance', 'Marketing', 'Other'];
export const units = ['kg', 'liters', 'pieces', 'boxes', 'bags'];
