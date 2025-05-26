
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
    const { data, error } = await supabase.functions.invoke('sync-products', {
      body: {
        productData,
      },
      method: 'POST',
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error syncing product to MySQL:', error);
    throw error;
  }
};

export const getProductsFromMySQL = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('sync-products', {
      method: 'GET',
    });

    if (error) throw error;
    return data.products;
  } catch (error) {
    console.error('Error fetching products from MySQL:', error);
    throw error;
  }
};

export const syncSupabaseToMySQL = async () => {
  try {
    // Get all products from Supabase
    const { data: supabaseProducts, error } = await supabase
      .from('products')
      .select('*');

    if (error) throw error;

    // Sync each product to MySQL
    const syncPromises = supabaseProducts.map(product => 
      syncProductToMySQL({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        image_url: product.image_url,
        features: product.features,
        is_active: product.is_active,
      })
    );

    await Promise.all(syncPromises);
    return { success: true, synced: supabaseProducts.length };
  } catch (error) {
    console.error('Error syncing Supabase to MySQL:', error);
    throw error;
  }
};
