
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample product data - replace with actual products
const productCategories = [
  {
    id: "pickles",
    name: "Pickles",
    products: [
      { id: 1, name: "Mango Pickle", description: "Traditional Indian mango pickle made with premium mangoes and spices." },
      { id: 2, name: "Lemon Pickle", description: "Tangy lemon pickle prepared with the finest lemons and authentic spices." },
      { id: 3, name: "Mixed Vegetable Pickle", description: "A delightful mix of vegetables preserved in our special blend of spices." },
      { id: 4, name: "Garlic Pickle", description: "Spicy garlic pickle made with fresh garlic and traditional recipe." },
    ]
  },
  {
    id: "spices",
    name: "Spices",
    products: [
      { id: 1, name: "Turmeric Powder", description: "Pure turmeric powder with high curcumin content for health and flavor." },
      { id: 2, name: "Chili Powder", description: "Premium quality chili powder with perfect heat and color." },
      { id: 3, name: "Garam Masala", description: "Aromatic blend of spices for authentic Indian flavor." },
      { id: 4, name: "Coriander Powder", description: "Freshly ground coriander seeds with rich aroma." },
    ]
  },
  {
    id: "soya",
    name: "Soya Chunks",
    products: [
      { id: 1, name: "Mini Soya Chunks", description: "Small sized soya chunks perfect for curries and stir-fries." },
      { id: 2, name: "Regular Soya Chunks", description: "Standard sized soya chunks with high protein content." },
      { id: 3, name: "Soya Granules", description: "Finely textured soya granules for various recipes." },
    ]
  },
  {
    id: "vermicelli",
    name: "Vermicelli",
    products: [
      { id: 1, name: "Plain Vermicelli", description: "Traditional plain vermicelli for sweet and savory dishes." },
      { id: 2, name: "Roasted Vermicelli", description: "Pre-roasted vermicelli for quick and easy preparation." },
      { id: 3, name: "Rice Vermicelli", description: "Rice-based vermicelli for delicious Asian dishes." },
    ]
  },
];

const Products = () => {
  const [activeTab, setActiveTab] = useState("pickles");

  return (
    <>
      <Helmet>
        <title>Products - Sudevi Agro Foods</title>
        <meta name="description" content="Explore Sudevi Agro Foods' range of pickles, spices, soya chunks and vermicelli. Authentic Indian flavors crafted with premium ingredients." />
      </Helmet>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Our Products</h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            Discover our range of authentic Indian food products made with premium ingredients and traditional recipes.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="pickles" value={activeTab} onValueChange={setActiveTab}>
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
            
            {productCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="animate-fade-in">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-6 text-center">{category.name}</h2>
                  <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                    Explore our range of premium quality {category.name.toLowerCase()}.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="h-48 bg-gray-200">
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          Product Image
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                      </div>
                    </div>
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
