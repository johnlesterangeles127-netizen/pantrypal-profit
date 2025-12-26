import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ExpenseTable } from '@/components/expenses/ExpenseTable';
import { ExpenseDialog } from '@/components/expenses/ExpenseDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { mockExpenses } from '@/data/mockData';
import { Expense } from '@/types/inventory';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(search.toLowerCase()) ||
    expense.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
  }));

  const colors = ['hsl(var(--primary))', 'hsl(var(--chart-5))', 'hsl(var(--warning))', 'hsl(var(--accent))', 'hsl(var(--success))'];

  const handleSave = (data: Omit<Expense, 'id'>) => {
    if (editingExpense) {
      setExpenses(expenses.map(exp =>
        exp.id === editingExpense.id ? { ...exp, ...data } : exp
      ));
      toast.success('Expense updated successfully');
    } else {
      const newExpense: Expense = {
        ...data,
        id: Date.now().toString(),
      };
      setExpenses([...expenses, newExpense]);
      toast.success('Expense added successfully');
    }
    setEditingExpense(null);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
    toast.success('Expense deleted successfully');
  };

  const handleAddNew = () => {
    setEditingExpense(null);
    setDialogOpen(true);
  };

  return (
    <PageLayout
      title="Expenses"
      subtitle="Track your restaurant's expenses"
      actions={
        <Button onClick={handleAddNew} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Expense
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm animate-slide-up">
          <p className="text-muted-foreground text-sm font-medium">Total Expenses</p>
          <p className="text-3xl font-bold text-destructive mt-2">${totalExpenses.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground mt-2">{expenses.length} transactions</p>
        </div>

        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-sm animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Expenses by Category</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tickFormatter={(value) => `$${value}`} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="category" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                  }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ExpenseTable
        expenses={filteredExpenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ExpenseDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        expense={editingExpense}
        onSave={handleSave}
      />
    </PageLayout>
  );
}
