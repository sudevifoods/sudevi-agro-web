
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Track scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Trigger animations after initial load
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative bg-sudevi-red text-white overflow-hidden h-[90vh]">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-90 transition-transform duration-300"
        style={{ 
          backgroundImage: "url('/lovable-uploads/95191a19-4a8a-422f-8065-7111eb29deba.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${scrollY * 0.1}px)`,
          filter: "brightness(0.6)"
        }}
      ></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-80"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10 flex items-center h-full">
        <div className="max-w-3xl">
          <h1 
            className={`text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-white transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '0.2s' }}
          >
            Taste The Tradition
          </h1>
          <p 
            className={`text-xl md:text-2xl mb-8 text-white transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '0.4s' }}
          >
            Authentic Indian flavors crafted with care. Discover our range of pickles, spices, soya chunks and vermicelli.
          </p>
          <div 
            className={`flex flex-wrap gap-4 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '0.6s' }}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-sudevi-red hover:bg-gray-100 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link to="/products">Explore Our Products</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-sudevi-red bg-transparent rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link to="/about">About Us</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.8s' }}>
        <div className="w-8 h-12 rounded-full border-2 border-white flex justify-center animate-bounce">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
