
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

const getGoogleAccessToken = async () => {
  const serviceAccountKey = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_KEY');
  
  if (!serviceAccountKey) {
    throw new Error('Google Service Account key not configured');
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountKey);
    
    // Create JWT for Google OAuth
    const now = Math.floor(Date.now() / 1000);
    const header = {
      alg: "RS256",
      typ: "JWT"
    };
    
    const payload = {
      iss: serviceAccount.client_email,
      scope: "https://www.googleapis.com/auth/content",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now
    };

    // For demo purposes, we'll simulate the token request
    // In production, you'd need to implement proper JWT signing with RS256
    console.log('Would request OAuth token for:', serviceAccount.client_email);
    
    // Simulate token response
    return 'mock_access_token_for_demo';
  } catch (error) {
    console.error('Error parsing service account key:', error);
    throw new Error('Invalid Google Service Account key format');
  }
};

const syncToGoogleMerchantCenter = async (products: Product[], settings: any) => {
  try {
    console.log('Starting GMC sync for', products.length, 'products');
    
    const merchantId = settings.merchant_id;
    
    if (!merchantId) {
      throw new Error('Merchant ID not configured');
    }

    // For now, we'll simulate the sync since proper OAuth implementation requires more setup
    console.log('Simulating GMC sync with OAuth authentication...');
    
    const syncResults = [];
    
    for (const product of products) {
      try {
        console.log('Simulating sync for product:', product.name);
        
        // Simulate successful sync for demo
        syncResults.push({
          productId: product.id,
          productName: product.name,
          status: 'simulated_success',
          gmcId: `gmc_${product.id}`
        });
        
        console.log('Simulated successful sync for product:', product.name);
      } catch (error) {
        console.error('Error simulating sync for product:', product.name, error);
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
      syncedCount: syncResults.filter(r => r.status === 'simulated_success').length,
      errorCount: syncResults.filter(r => r.status === 'error').length,
      results: syncResults,
      message: 'Sync simulated successfully. To enable real sync, configure Google Service Account credentials.'
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
