
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Careers', path: '/careers' },
    { name: 'Partner With Us', path: '/partners' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img 
              alt="Sudevi Logo" 
              className="h-14" 
              src="/lovable-uploads/78b304cb-96fe-4981-8649-fdff6b06bfba.png" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`text-sm font-medium transition-colors hover:text-sudevi-red ${
                  isActive(item.path) ? 'text-sudevi-red font-semibold' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Auth Links */}
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
              {user ? (
                <>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className={`flex items-center text-sm font-medium transition-colors hover:text-sudevi-red ${
                        isActive('/admin') ? 'text-sudevi-red font-semibold' : 'text-gray-700'
                      }`}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Admin
                    </Link>
                  )}
                  <span className="text-xs text-gray-500">
                    {user.email}
                  </span>
                </>
              ) : (
                <Link 
                  to="/auth" 
                  className={`text-sm font-medium transition-colors hover:text-sudevi-red ${
                    isActive('/auth') ? 'text-sudevi-red font-semibold' : 'text-gray-700'
                  }`}
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-sudevi-red" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-3">
              {navItems.map(item => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`text-sm font-medium py-2 transition-colors hover:text-sudevi-red ${
                    isActive(item.path) ? 'text-sudevi-red font-semibold' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Links */}
              <div className="pt-3 border-t border-gray-200">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className={`flex items-center text-sm font-medium py-2 transition-colors hover:text-sudevi-red ${
                          isActive('/admin') ? 'text-sudevi-red font-semibold' : 'text-gray-700'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        Admin Panel
                      </Link>
                    )}
                    <span className="text-xs text-gray-500 py-2 block">
                      Signed in as: {user.email}
                    </span>
                  </>
                ) : (
                  <Link 
                    to="/auth" 
                    className={`text-sm font-medium py-2 transition-colors hover:text-sudevi-red ${
                      isActive('/auth') ? 'text-sudevi-red font-semibold' : 'text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
