import { Ingredient, Expense, Sale, MonthlyStats } from '@/types/inventory';

interface PrintData {
  ingredients: Ingredient[];
  expenses: Expense[];
  sales: Sale[];
  monthlyStats: MonthlyStats[];
}

export function printAllData({ ingredients, expenses, sales, monthlyStats }: PrintData) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const currentDate = new Date().toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const totalSales = monthlyStats.reduce((acc, stat) => acc + stat.sales, 0);
  const totalExpenses = monthlyStats.reduce((acc, stat) => acc + stat.expenses, 0);
  const totalProfit = monthlyStats.reduce((acc, stat) => acc + stat.profit, 0);
  const inventoryValue = ingredients.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Reserved Restaurant - Complete Report</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #333; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #16a34a; padding-bottom: 20px; }
        .header h1 { color: #16a34a; font-size: 28px; margin-bottom: 5px; }
        .header p { color: #666; }
        .section { margin-bottom: 30px; page-break-inside: avoid; }
        .section h2 { color: #16a34a; font-size: 18px; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 8px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #eee; }
        th { background: #f8f9fa; font-weight: 600; color: #333; }
        tr:hover { background: #f8f9fa; }
        .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px; }
        .summary-card { background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; border-left: 4px solid #16a34a; }
        .summary-card h3 { color: #666; font-size: 12px; margin-bottom: 5px; }
        .summary-card p { color: #16a34a; font-size: 20px; font-weight: bold; }
        .low-stock { color: #dc2626; font-weight: 600; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
        @media print { 
          body { padding: 20px; } 
          .no-print { display: none; }
          .section { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🍽️ Reserved Restaurant</h1>
        <p>Complete System Report - Generated on ${currentDate}</p>
      </div>

      <div class="summary-grid">
        <div class="summary-card">
          <h3>Total Sales (YTD)</h3>
          <p>₱${totalSales.toLocaleString()}</p>
        </div>
        <div class="summary-card">
          <h3>Total Expenses (YTD)</h3>
          <p>₱${totalExpenses.toLocaleString()}</p>
        </div>
        <div class="summary-card">
          <h3>Total Profit (YTD)</h3>
          <p>₱${totalProfit.toLocaleString()}</p>
        </div>
        <div class="summary-card">
          <h3>Inventory Value</h3>
          <p>₱${inventoryValue.toLocaleString()}</p>
        </div>
      </div>

      <div class="section">
        <h2>📊 Monthly Performance</h2>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Sales</th>
              <th>Expenses</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            ${monthlyStats.map(stat => `
              <tr>
                <td>${stat.month}</td>
                <td>₱${stat.sales.toLocaleString()}</td>
                <td>₱${stat.expenses.toLocaleString()}</td>
                <td>₱${stat.profit.toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2>📦 Inventory (${ingredients.length} items)</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${ingredients.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.quantity} ${item.unit}</td>
                <td>₱${item.unitPrice.toFixed(2)}</td>
                <td>₱${(item.quantity * item.unitPrice).toFixed(2)}</td>
                <td class="${item.quantity <= item.minStock ? 'low-stock' : ''}">${item.quantity <= item.minStock ? 'Low Stock' : 'OK'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2>💰 Recent Expenses (${expenses.length} records)</h2>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${expenses.map(expense => `
              <tr>
                <td>${expense.description}</td>
                <td>${expense.category}</td>
                <td>₱${expense.amount.toLocaleString()}</td>
                <td>${new Date(expense.date).toLocaleDateString('en-PH')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2>🛒 Recent Sales (${sales.length} records)</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${sales.map(sale => `
              <tr>
                <td>${sale.itemName}</td>
                <td>${sale.quantity}</td>
                <td>₱${sale.unitPrice.toFixed(2)}</td>
                <td>₱${sale.total.toFixed(2)}</td>
                <td>${new Date(sale.date).toLocaleDateString('en-PH')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="footer">
        <p>Reserved Restaurant Management System</p>
        <p>Report generated automatically on ${currentDate}</p>
      </div>

      <script>
        window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
