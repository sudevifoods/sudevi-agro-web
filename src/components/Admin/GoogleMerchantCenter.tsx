import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ShoppingCart, Download, Upload, Settings, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { syncProductsToGMC, prepareProductsForGMC } from '@/services/gmcSyncService';

interface GMCSettings {
  id: string;
  merchant_id: string;
  feed_url: string;
  feed_format: string;
  auto_sync: boolean;
  sync_frequency: string;
  currency: string;
  country: string;
  language: string;
  brand: string;
  is_active: boolean;
  last_sync: string | null;
  created_at: string;
}

interface ProductFeed {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  availability: string;
  condition: string;
  brand: string;
  gtin?: string;
  mpn?: string;
}

const GoogleMerchantCenter = () => {
  const [settings, setSettings] = useState<GMCSettings | null>(null);
  const [products, setProducts] = useState<ProductFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [formData, setFormData] = useState({
    merchant_id: '',
    feed_url: '',
    feed_format: 'xml',
    auto_sync: false,
    sync_frequency: 'daily',
    currency: 'INR',
    country: 'IN',
    language: 'en',
    brand: 'Sudevi Agro Foods',
    is_active: true
  });

  useEffect(() => {
    fetchSettings();
    fetchProducts();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('gmc_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setSettings(data);
        setFormData({
          merchant_id: data.merchant_id,
          feed_url: data.feed_url,
          feed_format: data.feed_format,
          auto_sync: data.auto_sync,
          sync_frequency: data.sync_frequency,
          currency: data.currency,
          country: data.country,
          language: data.language,
          brand: data.brand,
          is_active: data.is_active
        });
      }
    } catch (error) {
      console.error('Error fetching GMC settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;

      const feedProducts = data?.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description || '',
        price: product.price || 0,
        category: product.category,
        image_url: product.image_url || '',
        availability: 'in stock',
        condition: 'new',
        brand: 'Sudevi Agro Foods',
        gtin: '',
        mpn: product.id
      })) || [];

      setProducts(feedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      if (settings) {
        const { error } = await supabase
          .from('gmc_settings')
          .update(formData)
          .eq('id', settings.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('gmc_settings')
          .insert([formData]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Google Merchant Center settings saved successfully"
      });
      
      await fetchSettings();
    } catch (error) {
      console.error('Error saving GMC settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    }
  };

  const generateProductFeed = () => {
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
<title>Sudevi Agro Foods Product Feed</title>
<link>https://sudeviagro.com</link>
<description>Product feed for Google Merchant Center</description>`;

    const xmlProducts = products.map(product => `
<item>
<g:id>${product.id}</g:id>
<g:title><![CDATA[${product.name}]]></g:title>
<g:description><![CDATA[${product.description}]]></g:description>
<g:link>https://sudeviagro.com/products#${product.id}</g:link>
<g:image_link>${product.image_url}</g:image_link>
<g:condition>${product.condition}</g:condition>
<g:availability>${product.availability}</g:availability>
<g:price>${product.price} ${formData.currency}</g:price>
<g:brand>${product.brand}</g:brand>
<g:product_type>${product.category}</g:product_type>
<g:google_product_category>Food, Beverages &amp; Tobacco</g:google_product_category>
${product.gtin ? `<g:gtin>${product.gtin}</g:gtin>` : ''}
<g:mpn>${product.mpn}</g:mpn>
</item>`).join('');

    const xmlFooter = `
</channel>
</rss>`;

    return xmlHeader + xmlProducts + xmlFooter;
  };

  const handleDownloadFeed = () => {
    const feed = generateProductFeed();
    const blob = new Blob([feed], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'google-merchant-feed.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Product feed downloaded successfully"
    });
  };

  const handleSyncToGMC = async () => {
    setSyncing(true);
    try {
      if (!settings) {
        throw new Error('GMC settings not configured');
      }

      if (!settings.merchant_id) {
        throw new Error('Merchant ID is required for GMC sync');
      }

      // Prepare products for GMC
      const gmcProducts = prepareProductsForGMC(products, formData.brand);
      
      console.log('Syncing', gmcProducts.length, 'products to GMC');
      
      const result = await syncProductsToGMC(gmcProducts, {
        id: settings.id,
        merchant_id: settings.merchant_id,
        currency: formData.currency,
        country: formData.country,
        language: formData.language,
        brand: formData.brand
      });

      toast({
        title: "Sync Complete",
        description: `Successfully synced ${result.syncedCount} products to Google Merchant Center. ${result.errorCount} errors.`
      });
      
      await fetchSettings();
    } catch (error) {
      console.error('Error syncing to GMC:', error);
      toast({
        title: "Sync Failed",
        description: error.message || "Failed to sync products to Google Merchant Center",
        variant: "destructive"
      });
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-lg">Loading Google Merchant Center settings...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Configuration Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> To sync products to Google Merchant Center, you need to configure your Google Merchant Center API key in the Supabase Edge Function secrets. 
          Contact your administrator to set up the GOOGLE_MERCHANT_API_KEY secret.
        </AlertDescription>
      </Alert>

      {/* Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Google Merchant Center Settings
          </CardTitle>
          <CardDescription>
            Configure your Google Merchant Center integration and product feed settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="merchant_id">Merchant Center ID</Label>
              <Input
                id="merchant_id"
                value={formData.merchant_id}
                onChange={(e) => setFormData({ ...formData, merchant_id: e.target.value })}
                placeholder="Your Google Merchant Center ID"
              />
            </div>
            <div>
              <Label htmlFor="feed_url">Feed URL</Label>
              <Input
                id="feed_url"
                value={formData.feed_url}
                onChange={(e) => setFormData({ ...formData, feed_url: e.target.value })}
                placeholder="https://yoursite.com/feed.xml"
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IN">India</SelectItem>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="GB">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="sync_frequency">Sync Frequency</Label>
              <Select value={formData.sync_frequency} onValueChange={(value) => setFormData({ ...formData, sync_frequency: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="auto_sync"
                checked={formData.auto_sync}
                onCheckedChange={(checked) => setFormData({ ...formData, auto_sync: checked })}
              />
              <Label htmlFor="auto_sync">Enable Auto Sync</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={handleSaveSettings} className="bg-sudevi-red hover:bg-sudevi-darkRed">
              <Settings className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
            <Button variant="outline" asChild>
              <a href="https://merchants.google.com/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Google Merchant Center
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Product Feed Card */}
      <Card>
        <CardHeader>
          <CardTitle>Product Feed Management</CardTitle>
          <CardDescription>
            Manage and sync your product feed with Google Merchant Center
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Badge variant="outline">{products.length} Products</Badge>
              {settings?.last_sync && (
                <Badge className="bg-green-100 text-green-800">
                  Last synced: {new Date(settings.last_sync).toLocaleDateString()}
                </Badge>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleDownloadFeed}>
                <Download className="h-4 w-4 mr-2" />
                Download Feed
              </Button>
              <Button 
                onClick={handleSyncToGMC} 
                disabled={syncing || !formData.merchant_id}
                className="bg-sudevi-red hover:bg-sudevi-darkRed"
              >
                {syncing ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                {syncing ? 'Syncing...' : 'Sync to GMC'}
              </Button>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No active products found. Add products to generate a feed.
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Feed Preview:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• {products.length} products ready for sync</div>
                <div>• Format: XML (Google Shopping Feed)</div>
                <div>• Currency: {formData.currency}</div>
                <div>• Country: {formData.country}</div>
                <div>• Brand: {formData.brand}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleMerchantCenter;
