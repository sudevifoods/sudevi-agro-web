
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

  try {
    const client = await new Client().connect({
      hostname: mysqlHost,
      username: mysqlUser,
      password: mysqlPassword,
      db: mysqlDatabase,
      port: parseInt(mysqlPort),
    });

    console.log('Successfully connected to MySQL database');
    return client;
  } catch (error) {
    console.error('Failed to connect to MySQL:', error);
    throw new Error(`MySQL connection failed: ${error.message}`);
  }
};

const syncProductToMySQL = async (product: ProductData) => {
  let client;
  
  try {
    console.log('Starting MySQL sync for product:', product.name);
    
    client = await createMySQLConnection();
    
    // Create table if it doesn't exist
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
    await client.execute(createTableQuery);
    
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
    console.log('Query:', upsertQuery);
    console.log('Parameters:', params);
    
    const result = await client.execute(upsertQuery, params);
    
    console.log('Product sync completed successfully');
    return { 
      success: true, 
      message: 'Product synced to MySQL successfully',
      productId,
      affectedRows: result.affectedRows || 1
    };
  } catch (error) {
    console.error('Error syncing product to MySQL:', error);
    throw error;
  } finally {
    if (client) {
      try {
        await client.close();
        console.log('MySQL connection closed');
      } catch (closeError) {
        console.error('Error closing MySQL connection:', closeError);
      }
    }
  }
};

const getProductsFromMySQL = async () => {
  let client;
  
  try {
    console.log('Fetching products from MySQL...');
    
    client = await createMySQLConnection();
    
    const query = 'SELECT * FROM products ORDER BY created_at DESC';
    const result = await client.execute(query);
    
    const products = result.rows || [];
    
    console.log('Fetched products from MySQL:', products.length, 'products');
    return products;
  } catch (error) {
    console.error('Error fetching products from MySQL:', error);
    throw error;
  } finally {
    if (client) {
      try {
        await client.close();
        console.log('MySQL connection closed');
      } catch (closeError) {
        console.error('Error closing MySQL connection:', closeError);
      }
    }
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
          message: 'Product synced to MySQL successfully', 
          result
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
          count: products.length
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
        details: error.stack
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
