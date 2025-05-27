
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import { Reveal } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  price?: number;
  image_url?: string;
  features?: string[];
  is_active: boolean;
}

const Products = () => {
  const [activeTab, setActiveTab] = useState("pickles");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group products by category
  const productCategories = [
    { id: "pickles", name: "Pickles" },
    { id: "spices", name: "Spices" },
    { id: "soya", name: "Soya Chunks" },
    { id: "vermicelli", name: "Vermicelli" },
  ].map(category => ({
    ...category,
    products: products.filter(product => product.category === category.id)
  }));

  // Add smooth scroll to anchor when URL contains hash
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setActiveTab(hash);
      
      // Smooth scroll to the tabs section
      setTimeout(() => {
        const tabsElement = document.getElementById("product-tabs");
        if (tabsElement) {
          tabsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
    
    // Reset scroll position on component mount
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Premium Indian Food Products - Pickles, Spices & More | Sudevi Agro Foods</title>
        <meta name="description" content="Explore Sudevi Agro Foods' premium range of Indian pickles, organic spices, soya chunks and vermicelli. Authentic flavors crafted with traditional recipes and natural ingredients in Balasore, Odisha." />
        <meta name="keywords" content="Indian pickles, mango pickle, mix pickle, green chilli pickle, organic spices, cumin powder, turmeric powder, soya chunks, wheat vermicelli, food products, Balasore" />
        <link rel="canonical" href="https://sudevi-agro-foods.lovable.app/products" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Premium Indian Food Products - Pickles, Spices & More | Sudevi Agro Foods" />
        <meta property="og:description" content="Explore Sudevi Agro Foods' premium range of Indian pickles, organic spices, soya chunks and vermicelli. Authentic flavors crafted with traditional recipes." />
        <meta property="og:url" content="https://sudevi-agro-foods.lovable.app/products" />
        <meta property="og:image" content="https://sudevi-agro-foods.lovable.app/lovable-uploads/2dbfb706-0547-4ba1-91f1-aa7f73b59885.png" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="Premium Indian Food Products - Pickles, Spices & More | Sudevi Agro Foods" />
        <meta name="twitter:description" content="Explore Sudevi Agro Foods' premium range of Indian pickles, organic spices, soya chunks and vermicelli." />
        <meta name="twitter:image" content="https://sudevi-agro-foods.lovable.app/lovable-uploads/2dbfb706-0547-4ba1-91f1-aa7f73b59885.png" />
      </Helmet>
      
      <Reveal direction="down">
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Our Products</h1>
            <p className="text-gray-600 text-center max-w-3xl mx-auto">
              Discover our range of authentic Indian food products made with premium ingredients and traditional recipes.
            </p>
          </div>
        </div>
      </Reveal>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs 
            defaultValue="pickles" 
            value={activeTab} 
            onValueChange={setActiveTab}
            id="product-tabs"
          >
            <Reveal direction="up">
              <div className="flex justify-center mb-12">
                <TabsList className="bg-gray-100 p-1">
                  {productCategories.map((category) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="px-4 py-2 data-[state=active]:bg-sudevi-red data-[state=active]:text-white"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Reveal>
            
            {productCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Reveal direction="up">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-6 text-center">{category.name}</h2>
                    <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                      Explore our range of premium quality {category.name.toLowerCase()}.
                    </p>
                  </div>
                </Reveal>
                
                {category.products.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No products available in this category.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
                    {category.products.map((product) => (
                      <Reveal key={product.id} direction="up" className="h-full">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
                          <div className="h-64 bg-gray-100 overflow-hidden">
                            {product.image_url ? (
                              <img 
                                src={product.image_url} 
                                alt={product.name} 
                                className="w-full h-full object-contain p-4 transition-all duration-500 hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500">
                                Product Image
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            
                            {product.features && product.features.length > 0 && (
                              <div className="mt-4">
                                <ul className="space-y-2">
                                  {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                      <Check className="h-4 w-4 text-sudevi-red mr-2" />
                                      <span className="text-sm text-gray-700">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {product.price && (
                              <div className="mt-4 text-lg font-semibold text-sudevi-red">
                                ₹{product.price}
                              </div>
                            )}
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default Products;
