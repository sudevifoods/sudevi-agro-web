
import { supabase } from '@/integrations/supabase/client';

export interface GMCProduct {
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

export interface GMCSettings {
  id: string;
  merchant_id: string;
  currency: string;
  country: string;
  language: string;
  brand: string;
}

export const syncProductsToGMC = async (products: GMCProduct[], settings: GMCSettings) => {
  try {
    console.log('Starting GMC sync via edge function...');
    
    const { data, error } = await supabase.functions.invoke('gmc-sync', {
      body: {
        products,
        settings,
      },
    });

    if (error) {
      console.error('GMC sync error:', error);
      throw error;
    }
    
    console.log('GMC sync result:', data);
    return data;
  } catch (error) {
    console.error('Error syncing products to GMC:', error);
    throw error;
  }
};

export const prepareProductsForGMC = (products: any[], brand: string) => {
  return products.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description || '',
    price: product.price || 0,
    category: product.category,
    image_url: product.image_url || '',
    availability: 'in stock',
    condition: 'new',
    brand: brand,
    shop_link: product.shop_link
  }));
};
