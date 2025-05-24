
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import { Reveal } from "@/hooks/useScrollAnimation";

// Updated product data with real images
const productCategories = [
  {
    id: "pickles",
    name: "Pickles",
    products: [
      { 
        id: 1, 
        name: "Sweet Mango Pickle", 
        description: "Traditional sweet mango pickle made with premium mangoes and aromatic spices. No added preservatives.", 
        image: "/lovable-uploads/16a778da-81c5-4bc9-bc15-9874378511f0.png",
        features: ["No Added Preservatives", "Purely Home Made", "Rich in Taste"]
      },
      { 
        id: 2, 
        name: "Mix Pickle", 
        description: "Tangy & spicy mix pickle prepared with various vegetables and authentic spices. 100% Natural.", 
        image: "/lovable-uploads/926e4570-c385-4a82-b88e-7ba81d835a2f.png",
        features: ["Tangy & Spicy", "Rich in Taste", "100% Natural"]
      },
      { 
        id: 3, 
        name: "Green Chilli Pickle", 
        description: "Spicy green chilli pickle made with fresh green chillies and traditional recipe.", 
        image: "/lovable-uploads/0fdf8210-758c-4dc6-b342-b2eef29814de.png",
        features: ["Spicy & Tangy Taste", "No Artificial Preservatives", "Made with Fresh Ingredients", "Rich in Flavor"]
      },
      { 
        id: 4, 
        name: "Green Mango Pickle", 
        description: "Sweet & spicy green mango pickle made with raw mangoes following traditional recipes.", 
        image: "/lovable-uploads/78092173-7081-4527-a9cc-672ab2416ffe.png",
        features: ["Sweet & Spicy", "No Artificial Flavours", "Traditional Recipe", "Made with Raw Mango"]
      },
      { 
        id: 5, 
        name: "Sweet Berry", 
        description: "Limited edition sweet berry preserve made with mixed berries. Purely home made with no preservatives.", 
        image: "/lovable-uploads/2dbfb706-0547-4ba1-91f1-aa7f73b59885.png",
        features: ["Limited Edition", "Purely Home Made", "Rich in Flavor"]
      },
    ]
  },
  {
    id: "spices",
    name: "Spices",
    products: [
      { 
        id: 1, 
        name: "Whole Jeera", 
        description: "Premium quality whole cumin seeds with rich aroma and flavor.", 
        image: "/lovable-uploads/0cc44a35-9de5-44a5-9024-1e43fc0909d4.png",
        features: ["Premium Quality", "Rich Aroma", "No Additives"]
      },
      { 
        id: 2, 
        name: "Jeera Powder", 
        description: "Finely ground cumin powder for authentic Indian flavor.",
        image: "/lovable-uploads/33874bcc-52bc-4b88-81a2-706287205d56.png",
        features: ["Wholesome", "Freshly Ground", "Pure Spice"]
      },
      { 
        id: 3, 
        name: "Flax Seeds", 
        description: "Raw and unroasted flax seeds rich in omega-3 fatty acids.",
        image: "/lovable-uploads/fe32e1b7-f13d-4bfd-a356-2183223c37f4.png",
        features: ["Raw & Unroasted", "High in Omega-3", "Natural Goodness"]
      },
      { id: 4, name: "Turmeric Powder", description: "Pure turmeric powder with high curcumin content for health and flavor." },
      { id: 5, name: "Chili Powder", description: "Premium quality chili powder with perfect heat and color." },
      { id: 6, name: "Garam Masala", description: "Aromatic blend of spices for authentic Indian flavor." },
      { id: 7, name: "Coriander Powder", description: "Freshly ground coriander seeds with rich aroma." },
    ]
  },
  {
    id: "soya",
    name: "Soya Chunks",
    products: [
      { 
        id: 1, 
        name: "Regular Soya Chunks", 
        description: "High-protein soya chunks that absorb more masalas and flavors.",
        image: "/lovable-uploads/d014a63a-1af5-4585-99d3-5fe4ce3cc927.png",
        features: ["High Protein", "Absorbs More Masalas", "100% Veg", "Juicy and Tasty"]
      },
      { id: 2, name: "Mini Soya Chunks", description: "Small sized soya chunks perfect for curries and stir-fries." },
      { id: 3, name: "Soya Granules", description: "Finely textured soya granules for various recipes." },
    ]
  },
  {
    id: "vermicelli",
    name: "Vermicelli",
    products: [
      { 
        id: 1, 
        name: "Wheat Vermicelli", 
        description: "Semiya vermicelli made from wheat for delicious sweet and savory dishes.",
        image: "/lovable-uploads/9373690e-0fa6-46ea-b056-74fc97c8fa7b.png",
        features: ["Made from Wheat", "Saturated Fat Free", "Good Source of Fiber", "No Added Preservatives"]
      },
      { id: 2, name: "Plain Vermicelli", description: "Traditional plain vermicelli for sweet and savory dishes." },
      { id: 3, name: "Roasted Vermicelli", description: "Pre-roasted vermicelli for quick and easy preparation." },
      { id: 4, name: "Rice Vermicelli", description: "Rice-based vermicelli for delicious Asian dishes." },
    ]
  },
];

const Products = () => {
  const [activeTab, setActiveTab] = useState("pickles");
  
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
        
        {/* Product Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Sudevi Agro Foods Product Range",
            "description": "Premium Indian food products including pickles, spices, soya chunks and vermicelli",
            "numberOfItems": 4,
            "itemListElement": [
              {
                "@type": "Product",
                "position": 1,
                "name": "Indian Pickles",
                "description": "Traditional Indian pickles crafted with age-old recipes and premium ingredients",
                "category": "Food & Beverages > Condiments & Sauces > Pickles"
              },
              {
                "@type": "Product",
                "position": 2,
                "name": "Organic Spices",
                "description": "Pure, aromatic spices that bring authentic flavors to your cooking",
                "category": "Food & Beverages > Seasonings & Spices"
              },
              {
                "@type": "Product",
                "position": 3,
                "name": "Soya Chunks",
                "description": "High-protein, nutritious soya chunks perfect for a healthy diet",
                "category": "Food & Beverages > Protein"
              },
              {
                "@type": "Product",
                "position": 4,
                "name": "Vermicelli",
                "description": "Premium quality vermicelli that makes delicious dishes in minutes",
                "category": "Food & Beverages > Pasta & Noodles"
              }
            ]
          })}
        </script>
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
                  {category.products.map((product) => (
                    <Reveal key={product.id} direction="up" className="h-full">
                      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
                        <div className="h-64 bg-gray-100 overflow-hidden">
                          {product.image ? (
                            <img 
                              src={product.image} 
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
                          
                          {product.features && (
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
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default Products;
