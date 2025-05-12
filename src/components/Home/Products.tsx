
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const productCategories = [
  {
    id: 1,
    name: 'Pickles',
    description: 'Traditional Indian pickles crafted with age-old recipes and premium ingredients.',
    image: '/lovable-uploads/2dbfb706-0547-4ba1-91f1-aa7f73b59885.png',
  },
  {
    id: 2,
    name: 'Spices',
    description: 'Pure, aromatic spices that bring authentic flavors to your cooking.',
    image: '/lovable-uploads/0cc44a35-9de5-44a5-9024-1e43fc0909d4.png',
  },
  {
    id: 3,
    name: 'Soya Chunks',
    description: 'High-protein, nutritious soya chunks perfect for a healthy diet.',
    image: '/lovable-uploads/d014a63a-1af5-4585-99d3-5fe4ce3cc927.png',
  },
  {
    id: 4,
    name: 'Vermicelli',
    description: 'Premium quality vermicelli that makes delicious dishes in minutes.',
    image: '/lovable-uploads/9373690e-0fa6-46ea-b056-74fc97c8fa7b.png',
  },
];

const Products = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Product Range</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our diverse range of high-quality food products, crafted with authentic recipes and premium ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productCategories.map((category, index) => (
            <div 
              key={category.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
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
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
          <Button 
            asChild 
            size="lg" 
            className="bg-sudevi-red hover:bg-sudevi-darkRed transition-transform hover:scale-105"
          >
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
