
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 reveal-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Sudevi Agro Foods</h2>
            <p className="text-gray-700 mb-4">
              At Sudevi Agro Foods Private Limited, we're passionate about bringing authentic Indian flavors to your table. Our journey began with a simple mission: to preserve traditional recipes and flavors while meeting modern nutritional standards.
            </p>
            <p className="text-gray-700 mb-6">
              Based in Balasore, Odisha, we manufacture a wide range of food products including pickles, spices, soya chunks, and vermicelli, all made with carefully selected ingredients and time-honored techniques.
            </p>
            <Button asChild className="bg-sudevi-red hover:bg-sudevi-darkRed hover-grow">
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
          <div className="order-1 lg:order-2 reveal-right">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Food Processing Facility" 
                className="rounded-lg shadow-xl w-full hover-shadow"
              />
              <div className="absolute -bottom-6 -left-6 bg-sudevi-red text-white p-4 rounded-lg hidden md:block animate-pulse">
                <p className="font-bold text-xl">Established 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
