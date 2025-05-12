
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-sudevi-red text-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center hero-gradient opacity-80"
        style={{ 
          backgroundImage: "url('/lovable-uploads/33874bcc-52bc-4b88-81a2-706287205d56.png'), url('/lovable-uploads/d014a63a-1af5-4585-99d3-5fe4ce3cc927.png')",
          backgroundSize: "contain, cover",
          backgroundPosition: "right, center",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundBlendMode: "multiply"
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in text-white">
            Taste The Tradition
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in text-white">
            Authentic Indian flavors crafted with care. Discover our range of pickles, spices, soya chunks and vermicelli.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in">
            <Button asChild size="lg" className="bg-white text-sudevi-red hover:bg-gray-100 rounded-md">
              <Link to="/products">Explore Our Products</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-sudevi-red hover:bg-white bg-white hover:bg-white/90 rounded-md">
              <Link to="/about">About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
