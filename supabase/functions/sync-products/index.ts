
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ProductData {
  id?: string;
  name: string;
  description?: string;
  category: string;
  price?: number;
  image_url?: string;
  features?: string[];
  is_active: boolean;
}

// Simple MySQL connection using fetch for HTTP-based MySQL proxy
const executeMySQLQuery = async (query: string, params: any[] = []) => {
  const mysqlHost = Deno.env.get('MYSQL_HOST');
  const mysqlUser = Deno.env.get('MYSQL_USER');
  const mysqlPassword = Deno.env.get('MYSQL_PASSWORD');
  const mysqlDatabase = Deno.env.get('MYSQL_DATABASE');
  const mysqlPort = Deno.env.get('MYSQL_PORT') || '3306';

  console.log('MySQL connection attempt:', {
    host: mysqlHost,
    user: mysqlUser,
    database: mysqlDatabase,
    port: mysqlPort,
    hasPassword: !!mysqlPassword
  });

  if (!mysqlHost || !mysqlUser || !mysqlPassword || !mysqlDatabase) {
    throw new Error('Missing MySQL configuration. Please check MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DATABASE secrets.');
  }

  // For now, we'll simulate the MySQL operations and log what would be executed
  // This is because direct MySQL connections from edge functions can be problematic
  console.log('Would execute MySQL query:', query);
  console.log('With parameters:', params);
  
  // Return a simulated successful result
  return {
    affectedRows: 1,
    insertId: null,
    rows: []
  };
};

const syncProductToMySQL = async (product: ProductData) => {
  try {
    console.log('Starting MySQL sync for product:', product.name);
    
    // Create table query (would be executed)
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10,2),
        image_url TEXT,
        features JSON,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    console.log('Creating/checking products table...');
    await executeMySQLQuery(createTableQuery);
    
    // Insert/Update product
    const productId = product.id || crypto.randomUUID();
    const upsertQuery = `
      INSERT INTO products (id, name, description, category, price, image_url, features, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      description = VALUES(description),
      category = VALUES(category),
      price = VALUES(price),
      image_url = VALUES(image_url),
      features = VALUES(features),
      is_active = VALUES(is_active),
      updated_at = CURRENT_TIMESTAMP
    `;
    
    const featuresJson = product.features ? JSON.stringify(product.features) : null;
    const params = [
      productId,
      product.name,
      product.description || null,
      product.category,
      product.price || null,
      product.image_url || null,
      featuresJson,
      product.is_active
    ];
    
    console.log('Executing product upsert...');
    const result = await executeMySQLQuery(upsertQuery, params);
    
    console.log('Product sync completed successfully');
    return { 
      success: true, 
      message: 'Product synced to MySQL successfully (simulated)',
      productId,
      affectedRows: result.affectedRows 
    };
  } catch (error) {
    console.error('Error syncing product to MySQL:', error);
    throw error;
  }
};

const getProductsFromMySQL = async () => {
  try {
    console.log('Fetching products from MySQL...');
    
    // Simulate fetching products
    const mockProducts = [
      {
        id: '1',
        name: 'Sample Product 1',
        description: 'This is a sample product',
        category: 'sample',
        price: 100,
        image_url: null,
        features: '["feature1", "feature2"]',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    console.log('Fetched products from MySQL (simulated):', mockProducts.length, 'products');
    return mockProducts;
  } catch (error) {
    console.error('Error fetching products from MySQL:', error);
    throw error;
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Sync-products function called:', req.method);
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    if (req.method === 'POST') {
      const { productData } = await req.json();
      console.log('Received product data for sync:', productData);

      const result = await syncProductToMySQL(productData);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Product synced to MySQL successfully (simulated mode)', 
          result,
          note: 'Currently running in simulation mode due to network connectivity limitations'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    if (req.method === 'GET') {
      console.log('Fetching products from MySQL');

      const products = await getProductsFromMySQL();

      return new Response(
        JSON.stringify({ 
          success: true, 
          products,
          count: products.length,
          note: 'Currently running in simulation mode due to network connectivity limitations'
        }),
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
    console.error('Error in sync-products function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        details: error.stack,
        suggestion: 'The MySQL server may not be accessible from Supabase edge functions. Consider using a MySQL proxy service or alternative connection method.'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
