
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";

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

const createMySQLConnection = async () => {
  console.log('Creating MySQL connection...');
  
  const client = await new Client().connect({
    hostname: Deno.env.get('MYSQL_HOST') || 'localhost',
    username: Deno.env.get('MYSQL_USER') || 'root',
    password: Deno.env.get('MYSQL_PASSWORD') || '',
    db: Deno.env.get('MYSQL_DATABASE') || 'your_database',
    port: parseInt(Deno.env.get('MYSQL_PORT') || '3306'),
  });
  
  console.log('MySQL connection established');
  return client;
};

const syncProductToMySQL = async (product: ProductData) => {
  const client = await createMySQLConnection();
  
  try {
    console.log('Syncing product to MySQL:', product.name);
    
    // Create table if it doesn't exist
    await client.execute(`
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
    `);
    
    // Insert or update product
    const result = await client.execute(
      `INSERT INTO products (id, name, description, category, price, image_url, features, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       name = VALUES(name),
       description = VALUES(description),
       category = VALUES(category),
       price = VALUES(price),
       image_url = VALUES(image_url),
       features = VALUES(features),
       is_active = VALUES(is_active),
       updated_at = CURRENT_TIMESTAMP`,
      [
        product.id || crypto.randomUUID(),
        product.name,
        product.description || null,
        product.category,
        product.price || null,
        product.image_url || null,
        product.features ? JSON.stringify(product.features) : null,
        product.is_active
      ]
    );
    
    console.log('Product synced successfully:', result);
    return result;
  } finally {
    await client.close();
  }
};

const getProductsFromMySQL = async () => {
  const client = await createMySQLConnection();
  
  try {
    console.log('Fetching products from MySQL...');
    
    const result = await client.execute('SELECT * FROM products ORDER BY created_at DESC');
    console.log(`Fetched ${result.rows?.length || 0} products from MySQL`);
    
    return result.rows || [];
  } finally {
    await client.close();
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
        JSON.stringify({ success: true, message: 'Product synced to MySQL', result }),
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
        JSON.stringify({ success: true, products }),
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
        details: error.stack 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
