
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const productCategories = [
  {
    id: 1,
    name: 'Pickles',
    description: 'Traditional Indian pickles crafted with age-old recipes and premium ingredients.',
    image: 'https://images.unsplash.com/photo-1589135233689-df9aad8fbffd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: 2,
    name: 'Spices',
    description: 'Pure, aromatic spices that bring authentic flavors to your cooking.',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: 3,
    name: 'Soya Chunks',
    description: 'High-protein, nutritious soya chunks perfect for a healthy diet.',
    image: 'https://images.unsplash.com/photo-1612257999012-405c2352650b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: 4,
    name: 'Vermicelli',
    description: 'Premium quality vermicelli that makes delicious dishes in minutes.',
    image: 'https://images.unsplash.com/photo-1612260505559-cc7fbd92d4d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
];

const Products = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Product Range</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our diverse range of high-quality food products, crafted with authentic recipes and premium ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productCategories.map((category) => (
            <div 
              key={category.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{category.description}</p>
                <Link 
                  to={`/products#${category.name.toLowerCase()}`} 
                  className="text-sudevi-red font-medium inline-flex items-center"
                >
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-sudevi-red hover:bg-sudevi-darkRed">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
