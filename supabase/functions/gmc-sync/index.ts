
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  category: string;
  image_url?: string;
  availability: string;
  condition: string;
  brand: string;
  shop_link?: string;
}

const syncToGoogleMerchantCenter = async (products: Product[], settings: any) => {
  try {
    console.log('Starting GMC sync for', products.length, 'products');
    
    const gmcApiKey = Deno.env.get('GOOGLE_MERCHANT_API_KEY');
    const merchantId = settings.merchant_id;
    
    if (!gmcApiKey) {
      throw new Error('Google Merchant Center API key not configured');
    }
    
    if (!merchantId) {
      throw new Error('Merchant ID not configured');
    }

    // Google Content API for Shopping endpoint
    const baseUrl = `https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/products`;
    
    const syncResults = [];
    
    for (const product of products) {
      try {
        const productData = {
          offerId: product.id,
          title: product.name,
          description: product.description || '',
          link: product.shop_link || `https://sudeviagro.com/products#${product.id}`,
          imageLink: product.image_url,
          contentLanguage: settings.language || 'en',
          targetCountry: settings.country || 'IN',
          channel: 'online',
          availability: product.availability,
          condition: product.condition,
          price: {
            value: product.price?.toString() || '0',
            currency: settings.currency || 'INR'
          },
          brand: product.brand,
          productTypes: [product.category],
          googleProductCategory: 'Food, Beverages & Tobacco'
        };

        console.log('Syncing product to GMC:', product.name);
        
        const response = await fetch(baseUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${gmcApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('GMC API Error:', response.status, errorText);
          throw new Error(`GMC API Error: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        syncResults.push({
          productId: product.id,
          productName: product.name,
          status: 'success',
          gmcId: result.id
        });
        
        console.log('Successfully synced product:', product.name);
      } catch (error) {
        console.error('Error syncing product:', product.name, error);
        syncResults.push({
          productId: product.id,
          productName: product.name,
          status: 'error',
          error: error.message
        });
      }
    }

    return {
      success: true,
      syncedCount: syncResults.filter(r => r.status === 'success').length,
      errorCount: syncResults.filter(r => r.status === 'error').length,
      results: syncResults
    };
  } catch (error) {
    console.error('GMC sync failed:', error);
    throw error;
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('GMC sync function called:', req.method);
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    if (req.method === 'POST') {
      const { products, settings } = await req.json();
      console.log('Received sync request for', products?.length, 'products');

      if (!products || !Array.isArray(products)) {
        throw new Error('Invalid products data provided');
      }

      if (!settings) {
        throw new Error('GMC settings not provided');
      }

      const result = await syncToGoogleMerchantCenter(products, settings);

      // Update last sync time in database
      await supabaseClient
        .from('gmc_settings')
        .update({ last_sync: new Date().toISOString() })
        .eq('id', settings.id);

      return new Response(
        JSON.stringify(result),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not supported' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405,
      }
    );

  } catch (error) {
    console.error('Error in GMC sync function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        details: error.stack
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
