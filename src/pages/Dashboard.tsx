
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchApi } from '../lib/api';
import { t } from '../lib/translations';

interface ProductSummary {
  name: string;
  quantity: number;
}

interface StockSummary {
  name: string;
  min: number;
  max: number;
  current: number;
}

interface ProductExpireSummary {
  name: string;
  count: number;
  daysToExpire: number;
}

interface DashboardData {
  totalProducts: number;
  totalStock: number;
  lowStockProducts: number;
  expiringProducts: number;
}

const Dashboard = () => {
  const [productSummary, setProductSummary] = useState<ProductSummary[]>([]);
  const [productExpireSummary, setProductExpireSummary] = useState<ProductExpireSummary[]>([]);
  const [stockSummary, setStockSummary] = useState<StockSummary[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalProducts: 0,
    totalStock: 0,
    lowStockProducts: 0,
    expiringProducts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // In a real app, these would be actual API endpoints
        // For now, we'll use mock data since the actual endpoints return errors
        
        // Mock data for product summary
        const mockProductSummary = [
          { name: "Product A", quantity: 150 },
          { name: "Product B", quantity: 300 },
          { name: "Product C", quantity: 200 },
          { name: "Product D", quantity: 250 },
          { name: "Product E", quantity: 180 }
        ];
        setProductSummary(mockProductSummary);
        
        // Mock data for product expiry
        const mockExpireSummary = [
          { name: "Product X", count: 5, daysToExpire: 7 },
          { name: "Product Y", count: 3, daysToExpire: 14 },
          { name: "Product Z", count: 8, daysToExpire: 30 }
        ];
        setProductExpireSummary(mockExpireSummary);
        
        // Mock data for stock min/max
        const mockStockSummary = [
          { name: "Item 1", min: 50, max: 200, current: 120 },
          { name: "Item 2", min: 30, max: 150, current: 25 },
          { name: "Item 3", min: 100, max: 300, current: 210 }
        ];
        setStockSummary(mockStockSummary);
        
        // Mock dashboard summary data
        const mockDashboardData = {
          totalProducts: 250,
          totalStock: 12500,
          lowStockProducts: 15,
          expiringProducts: 22
        };
        setDashboardData(mockDashboardData);
        
        // In a production environment, you would fetch real data like this:
        /*
        const [productData, expireData, stockData, dashData] = await Promise.all([
          fetchApi('/Products/summary'),
          fetchApi('/Products/expire-summary'),
          fetchApi('/Stock/minmax-summary'),
          fetchApi('/Dashboard/summary')
        ]);
        
        setProductSummary(productData);
        setProductExpireSummary(expireData);
        setStockSummary(stockData);
        setDashboardData(dashData);
        */
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalProducts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalStock}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{dashboardData.lowStockProducts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{dashboardData.expiringProducts}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Stock Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            {loading ? <p>Loading...</p> : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={productSummary}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantity" fill="#0ea5e9" name="Quantity" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Stock Min/Max Levels</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            {loading ? <p>Loading...</p> : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stockSummary}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="min" fill="#22c55e" name="Minimum" />
                  <Bar dataKey="max" fill="#ef4444" name="Maximum" />
                  <Bar dataKey="current" fill="#3b82f6" name="Current" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Expiring Products</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <p>Loading...</p> : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-2">Product</th>
                      <th className="text-left p-2">Quantity</th>
                      <th className="text-left p-2">Days to Expire</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productExpireSummary.map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">{product.count}</td>
                        <td className="p-2">
                          <span className={product.daysToExpire < 10 ? "text-red-500 font-medium" : ""}>
                            {product.daysToExpire} days
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
