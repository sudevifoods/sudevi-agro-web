
import { supabase } from '@/integrations/supabase/client';

export interface ProductSyncData {
  id?: string;
  name: string;
  description?: string;
  category: string;
  price?: number;
  image_url?: string;
  features?: string[];
  is_active: boolean;
}

export const syncProductToMySQL = async (productData: ProductSyncData) => {
  try {
    console.log('Syncing product to MySQL:', productData);
    
    const { data, error } = await supabase.functions.invoke('sync-products', {
      body: {
        productData,
      },
    });

    if (error) {
      console.error('Sync error:', error);
      throw error;
    }
    
    console.log('Sync result:', data);
    return data;
  } catch (error) {
    console.error('Error syncing product to MySQL:', error);
    throw error;
  }
};

export const getProductsFromMySQL = async () => {
  try {
    console.log('Fetching products from MySQL...');
    
    const { data, error } = await supabase.functions.invoke('sync-products');

    if (error) {
      console.error('Fetch error:', error);
      throw error;
    }
    
    console.log('Fetched products:', data);
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products from MySQL:', error);
    throw error;
  }
};

export const syncSupabaseToMySQL = async () => {
  try {
    console.log('Starting Supabase to MySQL sync...');
    
    // Get all products from Supabase
    const { data: supabaseProducts, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Error fetching from Supabase:', error);
      throw error;
    }

    console.log(`Found ${supabaseProducts.length} products to sync`);

    // Sync each product to MySQL
    const syncResults = [];
    for (const product of supabaseProducts) {
      try {
        const result = await syncProductToMySQL({
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price,
          image_url: product.image_url,
          features: product.features,
          is_active: product.is_active,
        });
        syncResults.push(result);
        console.log(`Synced product: ${product.name}`);
      } catch (productError) {
        console.error(`Failed to sync product ${product.name}:`, productError);
        // Continue with other products even if one fails
      }
    }

    return { 
      success: true, 
      synced: syncResults.length, 
      total: supabaseProducts.length 
    };
  } catch (error) {
    console.error('Error syncing Supabase to MySQL:', error);
    throw error;
  }
};
