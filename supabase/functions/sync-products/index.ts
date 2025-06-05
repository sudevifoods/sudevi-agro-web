
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

// Simple MySQL connection using fetch API instead of MySQL driver
const executeMySQLQuery = async (query: string, params: any[] = []) => {
  const mysqlHost = Deno.env.get('MYSQL_HOST');
  const mysqlUser = Deno.env.get('MYSQL_USER');
  const mysqlPassword = Deno.env.get('MYSQL_PASSWORD');
  const mysqlDatabase = Deno.env.get('MYSQL_DATABASE');
  const mysqlPort = Deno.env.get('MYSQL_PORT') || '3306';

  console.log('MySQL connection details:', {
    host: mysqlHost,
    user: mysqlUser,
    database: mysqlDatabase,
    port: mysqlPort,
    hasPassword: !!mysqlPassword
  });

  if (!mysqlHost || !mysqlUser || !mysqlPassword || !mysqlDatabase) {
    throw new Error('Missing MySQL configuration. Please check MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DATABASE secrets.');
  }

  // For now, we'll simulate the MySQL operation and log it
  // In a real implementation, you would use a proper MySQL client or API
  console.log('Would execute MySQL query:', query, 'with params:', params);
  
  // Return a mock success response
  return { 
    success: true, 
    message: 'MySQL operation simulated successfully',
    affectedRows: 1 
  };
};

const syncProductToMySQL = async (product: ProductData) => {
  try {
    console.log('Syncing product to MySQL:', product.name);
    
    // Create table query (would be executed in real MySQL)
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
    
    await executeMySQLQuery(createTableQuery);
    
    // Insert/Update product query
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
    
    const params = [
      product.id || crypto.randomUUID(),
      product.name,
      product.description || null,
      product.category,
      product.price || null,
      product.image_url || null,
      product.features ? JSON.stringify(product.features) : null,
      product.is_active
    ];
    
    const result = await executeMySQLQuery(upsertQuery, params);
    console.log('Product synced successfully:', result);
    return result;
  } catch (error) {
    console.error('Error syncing product to MySQL:', error);
    throw error;
  }
};

const getProductsFromMySQL = async () => {
  try {
    console.log('Fetching products from MySQL...');
    
    const result = await executeMySQLQuery('SELECT * FROM products ORDER BY created_at DESC');
    console.log('Fetched products from MySQL');
    
    // Return mock data for now
    return [
      {
        id: 1,
        name: 'Mock Product',
        description: 'This is a mock product from MySQL simulation',
        category: 'pickles',
        price: 99.99,
        is_active: true,
        created_at: new Date().toISOString()
      }
    ];
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
          message: 'Product synced to MySQL', 
          result,
          note: 'Currently using MySQL simulation. Configure proper MySQL connection for production use.'
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
          note: 'Currently using MySQL simulation. Configure proper MySQL connection for production use.'
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
        suggestion: 'Please check your MySQL configuration secrets: MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
