
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-sudevi-red text-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center hero-gradient"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
      ></div>
      
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Taste The Tradition
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in">
            Authentic Indian flavors crafted with care. Discover our range of pickles, spices, soya chunks and vermicelli.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in">
            <Button asChild size="lg" className="bg-white text-sudevi-red hover:bg-gray-100 rounded-md">
              <Link to="/products">Explore Our Products</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 rounded-md">
              <Link to="/about">About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
