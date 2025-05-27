
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Reveal, useScrollAnimation } from '@/hooks/useScrollAnimation';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  image_url?: string;
}

const Products = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [productCategories, setProductCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group products by category and take first product from each category
      const categories = ['pickles', 'spices', 'soya', 'vermicelli'];
      const categoryData = categories.map(categoryId => {
        const categoryProducts = data?.filter(product => product.category === categoryId) || [];
        const featuredProduct = categoryProducts[0]; // Take the first product as featured
        
        return {
          id: categoryId,
          name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
          description: getCategoryDescription(categoryId),
          image: featuredProduct?.image_url || getDefaultImage(categoryId),
        };
      });

      setProductCategories(categoryData);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to default data if fetch fails
      setProductCategories(getDefaultCategories());
    } finally {
      setLoading(false);
    }
  };

  const getCategoryDescription = (category: string) => {
    const descriptions = {
      pickles: 'Traditional Indian pickles crafted with age-old recipes and premium ingredients.',
      spices: 'Pure, aromatic spices that bring authentic flavors to your cooking.',
      soya: 'High-protein, nutritious soya chunks perfect for a healthy diet.',
      vermicelli: 'Premium quality vermicelli that makes delicious dishes in minutes.',
    };
    return descriptions[category as keyof typeof descriptions] || '';
  };

  const getDefaultImage = (category: string) => {
    const images = {
      pickles: '/lovable-uploads/2dbfb706-0547-4ba1-91f1-aa7f73b59885.png',
      spices: '/lovable-uploads/0cc44a35-9de5-44a5-9024-1e43fc0909d4.png',
      soya: '/lovable-uploads/d014a63a-1af5-4585-99d3-5fe4ce3cc927.png',
      vermicelli: '/lovable-uploads/9373690e-0fa6-46ea-b056-74fc97c8fa7b.png',
    };
    return images[category as keyof typeof images] || '';
  };

  const getDefaultCategories = () => [
    {
      id: 'pickles',
      name: 'Pickles',
      description: 'Traditional Indian pickles crafted with age-old recipes and premium ingredients.',
      image: '/lovable-uploads/2dbfb706-0547-4ba1-91f1-aa7f73b59885.png',
    },
    {
      id: 'spices',
      name: 'Spices',
      description: 'Pure, aromatic spices that bring authentic flavors to your cooking.',
      image: '/lovable-uploads/0cc44a35-9de5-44a5-9024-1e43fc0909d4.png',
    },
    {
      id: 'soya',
      name: 'Soya Chunks',
      description: 'High-protein, nutritious soya chunks perfect for a healthy diet.',
      image: '/lovable-uploads/d014a63a-1af5-4585-99d3-5fe4ce3cc927.png',
    },
    {
      id: 'vermicelli',
      name: 'Vermicelli',
      description: 'Premium quality vermicelli that makes delicious dishes in minutes.',
      image: '/lovable-uploads/9373690e-0fa6-46ea-b056-74fc97c8fa7b.png',
    },
  ];

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading products...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <Reveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Product Range</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our diverse range of high-quality food products, crafted with authentic recipes and premium ingredients.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productCategories.map((category, index) => (
            <Reveal 
              key={category.id}
              direction="up" 
              delay={index * 150}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-contain p-2 transition-transform hover:scale-110 duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{category.description}</p>
                  <Link 
                    to={`/products#${category.name.toLowerCase()}`} 
                    className="text-sudevi-red font-medium inline-flex items-center group"
                  >
                    Explore 
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" delay={600}>
          <div className="text-center mt-12">
            <Button 
              asChild 
              size="lg" 
              className="bg-sudevi-red hover:bg-sudevi-darkRed transition-transform hover:scale-105"
            >
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Products;
