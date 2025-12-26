import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SalesTable } from '@/components/sales/SalesTable';
import { SaleDialog } from '@/components/sales/SaleDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search } from 'lucide-react';
import { mockSales, mockDailyStats, mockMonthlyStats } from '@/data/mockData';
import { Sale } from '@/types/inventory';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);

  const filteredSales = sales.filter(sale =>
    sale.itemName.toLowerCase().includes(search.toLowerCase())
  );

  const totalSales = sales.reduce((acc, sale) => acc + sale.total, 0);
  const totalProfit = mockDailyStats.reduce((acc, day) => acc + day.profit, 0);

  const handleSave = (data: Omit<Sale, 'id'>) => {
    if (editingSale) {
      setSales(sales.map(sale =>
        sale.id === editingSale.id ? { ...sale, ...data } : sale
      ));
      toast.success('Sale updated successfully');
    } else {
      const newSale: Sale = {
        ...data,
        id: Date.now().toString(),
      };
      setSales([...sales, newSale]);
      toast.success('Sale recorded successfully');
    }
    setEditingSale(null);
  };

  const handleEdit = (sale: Sale) => {
    setEditingSale(sale);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setSales(sales.filter(sale => sale.id !== id));
    toast.success('Sale deleted successfully');
  };

  const handleAddNew = () => {
    setEditingSale(null);
    setDialogOpen(true);
  };

  return (
    <PageLayout
      title="Sales"
      subtitle="Track daily and monthly sales performance"
      actions={
        <Button onClick={handleAddNew} className="gap-2">
          <Plus className="w-4 h-4" />
          Record Sale
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm animate-slide-up">
          <p className="text-muted-foreground text-sm font-medium">Total Sales</p>
          <p className="text-3xl font-bold text-success mt-2">${totalSales.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground mt-2">{sales.length} transactions</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm animate-slide-up" style={{ animationDelay: '100ms' }}>
          <p className="text-muted-foreground text-sm font-medium">Weekly Profit</p>
          <p className="text-3xl font-bold text-primary mt-2">${totalProfit.toFixed(2)}</p>
          <p className="text-sm text-success mt-2">+15% from last week</p>
        </div>
      </div>

      <Tabs defaultValue="daily" className="mb-6">
        <TabsList>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="monthly">Monthly View</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-6">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm animate-slide-up">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Daily Sales & Profit</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockDailyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                    }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
                  />
                  <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Sales" />
                  <Bar dataKey="profit" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="mt-6">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm animate-slide-up">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Monthly Performance</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockMonthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    name="Sales"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                    name="Profit"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search sales..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <SalesTable
        sales={filteredSales}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SaleDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        sale={editingSale}
        onSave={handleSave}
      />
    </PageLayout>
  );
}
