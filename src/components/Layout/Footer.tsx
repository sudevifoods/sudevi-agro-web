
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img alt="Sudevi Logo" className="h-16 mb-3" src="/lovable-uploads/52338f59-44c9-401f-8a0d-b8ebbbf6dea6.png" />
              <p className="text-gray-300 text-sm">
                Sudevi Agro Foods Private Limited is dedicated to bringing traditional flavors to modern tables through our range of pickles, spices, soya chunks and vermicelli.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-sudevi-red transition-colors text-sm">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-sudevi-red transition-colors text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-sudevi-red transition-colors text-sm">Products</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-sudevi-red transition-colors text-sm">Contact Us</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-sudevi-red transition-colors text-sm">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-sudevi-red shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">
                  Plot No:- 1730/2463/9212, AT- Mohammadpur, Badakhua Lane, Sunhat, Balasore, 756002
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-sudevi-red" />
                <a href="tel:+918260990093" className="text-gray-300 hover:text-sudevi-red transition-colors text-sm">
                  +91 8260990093
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-sudevi-red" />
                <a href="mailto:sudevifoods@gmail.com" className="text-gray-300 hover:text-sudevi-red transition-colors text-sm">
                  sudevifoods@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.sudevifoods.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-2 rounded-full hover:bg-sudevi-red transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.sudevifoods.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-2 rounded-full hover:bg-sudevi-red transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://linkedin.sudevifoods.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-2 rounded-full hover:bg-sudevi-red transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Sudevi Agro Foods Private Limited. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              CIN: U10306OD2025PTC049131
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
