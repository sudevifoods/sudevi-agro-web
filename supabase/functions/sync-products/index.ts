
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

const executeMySQL = async (query: string, params: any[] = []) => {
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
    // Create a MySQL connection using a HTTP proxy approach
    // This uses a custom MySQL HTTP API that handles the actual database connection
    const mysqlApiUrl = `https://sql-api.vercel.app/api/mysql`;
    
    console.log('Attempting MySQL connection via HTTP API');
    
    const requestBody = {
      host: mysqlHost,
      port: parseInt(mysqlPort),
      user: mysqlUser,
      password: mysqlPassword,
      database: mysqlDatabase,
      query: query,
      params: params
    };

    console.log('Executing MySQL query:', query);
    console.log('With parameters:', params);

    const response = await fetch(mysqlApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.log('HTTP MySQL API failed, trying direct connection approach');
      
      // Fallback: Use a simpler approach with direct MySQL connection string
      // This creates a basic MySQL connection for StackCP
      const connectionString = `mysql://${mysqlUser}:${encodeURIComponent(mysqlPassword)}@${mysqlHost}:${mysqlPort}/${mysqlDatabase}`;
      
      // Try using mysql2 package via esm.sh
      const mysql = await import('https://esm.sh/mysql2@3.11.0/promise');
      
      console.log('Creating direct MySQL connection...');
      const connection = await mysql.createConnection({
        host: mysqlHost,
        port: parseInt(mysqlPort),
        user: mysqlUser,
        password: mysqlPassword,
        database: mysqlDatabase,
        ssl: false,
        connectTimeout: 30000,
        acquireTimeout: 30000,
        timeout: 30000,
      });

      console.log('MySQL connection established, executing query...');
      const [result] = await connection.execute(query, params);
      await connection.end();
      
      console.log('MySQL operation completed successfully');
      return result;
    }

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }

    console.log('MySQL operation completed successfully via HTTP API');
    return result;

  } catch (error) {
    console.error('MySQL operation failed:', error);
    console.log('Error details:', error.message);
    
    // If all else fails, throw the error so we know there's an issue
    throw new Error(`MySQL sync failed: ${error.message}`);
  }
};

const syncProductToMySQL = async (product: ProductData) => {
  try {
    console.log('Starting MySQL sync for product:', product.name);
    
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
    await executeMySQL(createTableQuery);
    
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
    
    const result = await executeMySQL(upsertQuery, params);
    
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
  }
};

const getProductsFromMySQL = async () => {
  try {
    console.log('Fetching products from MySQL...');
    
    const query = 'SELECT * FROM products ORDER BY created_at DESC';
    const result = await executeMySQL(query);
    
    // Handle different result formats
    const products = Array.isArray(result) ? result : (result.rows || []);
    
    console.log('Fetched products from MySQL:', products.length, 'products');
    return products;
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
      console.log('Received product data for sync:', { productData });

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
