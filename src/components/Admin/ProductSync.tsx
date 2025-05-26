
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { RefreshCw, Database, Upload, Download } from 'lucide-react';
import { syncSupabaseToMySQL, getProductsFromMySQL } from '@/services/productSyncService';

const ProductSync = () => {
  const [syncing, setSyncing] = useState(false);
  const [mysqlProducts, setMysqlProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSyncToMySQL = async () => {
    setSyncing(true);
    try {
      const result = await syncSupabaseToMySQL();
      toast({
        title: "Success",
        description: `Synced ${result.synced} products to MySQL database`
      });
    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: "Error",
        description: "Failed to sync products to MySQL",
        variant: "destructive"
      });
    } finally {
      setSyncing(false);
    }
  };

  const handleFetchFromMySQL = async () => {
    setLoading(true);
    try {
      const products = await getProductsFromMySQL();
      setMysqlProducts(products);
      toast({
        title: "Success",
        description: `Fetched ${products.length} products from MySQL`
      });
    } catch (error) {
      console.error('Fetch error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch products from MySQL",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              MySQL Database Sync
            </CardTitle>
            <CardDescription>
              Synchronize products between Supabase admin panel and your MySQL database
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Hybrid Mode
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="font-medium">Sync Operations</h3>
            <div className="space-y-2">
              <Button
                onClick={handleSyncToMySQL}
                disabled={syncing}
                className="w-full justify-start"
                variant="outline"
              >
                {syncing ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                {syncing ? 'Syncing...' : 'Sync to MySQL'}
              </Button>
              
              <Button
                onClick={handleFetchFromMySQL}
                disabled={loading}
                className="w-full justify-start"
                variant="outline"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                {loading ? 'Fetching...' : 'Fetch from MySQL'}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Status</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>MySQL Products:</span>
                <Badge variant="secondary">{mysqlProducts.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Last Sync:</span>
                <span className="text-gray-500">Manual trigger</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Configuration Required</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Set up MySQL connection details in Supabase Edge Function secrets</p>
            <p>• Configure MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE</p>
            <p>• Ensure your MySQL table schema matches the Supabase products table</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSync;
