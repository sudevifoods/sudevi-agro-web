
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or interested in partnering with us? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-sudevi-red/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-sudevi-red" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Our customer support team is ready to help you</p>
            <a 
              href="tel:+918260990093" 
              className="text-sudevi-red font-medium hover:underline"
            >
              +91 8260990093
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-sudevi-red/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-sudevi-red" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Send us an email and we'll get back to you</p>
            <a 
              href="mailto:sudevifoods@gmail.com" 
              className="text-sudevi-red font-medium hover:underline"
            >
              sudevifoods@gmail.com
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-sudevi-red/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-sudevi-red" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-4">Come visit our manufacturing facility</p>
            <address className="not-italic text-sudevi-red font-medium">
              Mohammadpur, Balasore, 756002
            </address>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-sudevi-red hover:bg-sudevi-darkRed">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
