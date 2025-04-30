import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black bg-opacity-90 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            URBAN<span className="text-red-600">WEAR</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-red-500 transition-colors">
              Accueil
            </Link>
            <Link to="/boutique" className="text-white hover:text-red-500 transition-colors">
              Boutique
            </Link>
            {user && user.isAdmin && (
              <Link to="/admin" className="text-white hover:text-red-500 transition-colors">
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <Link to="/profil" className="flex items-center text-white hover:text-red-500 transition-colors">
                  <User size={20} className="mr-1" />
                  <span className="text-sm">{user.name}</span>
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg hidden group-hover:block">
                  <Link to="/profil" className="block px-4 py-2 text-sm text-white hover:bg-neutral-700">
                    Mon profil
                  </Link>
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-700"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/connexion" className="text-white hover:text-red-500 transition-colors">
                <User size={20} />
              </Link>
            )}
            <Link to="/panier" className="text-white hover:text-red-500 transition-colors relative">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Link to="/panier" className="text-white hover:text-red-500 transition-colors relative mr-4">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              onClick={toggleMenu}
              className="text-white hover:text-red-500 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-neutral-900 border-t border-neutral-800">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-4 py-4">
              <Link 
                to="/" 
                className="text-white hover:text-red-500 transition-colors py-2"
                onClick={closeMenu}
              >
                Accueil
              </Link>
              <Link 
                to="/boutique" 
                className="text-white hover:text-red-500 transition-colors py-2"
                onClick={closeMenu}
              >
                Boutique
              </Link>
              {user ? (
                <>
                  <Link 
                    to="/profil" 
                    className="text-white hover:text-red-500 transition-colors py-2"
                    onClick={closeMenu}
                  >
                    Mon profil
                  </Link>
                  {user.isAdmin && (
                    <Link 
                      to="/admin" 
                      className="text-white hover:text-red-500 transition-colors py-2"
                      onClick={closeMenu}
                    >
                      Admin
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="text-left text-white hover:text-red-500 transition-colors py-2"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link 
                  to="/connexion" 
                  className="text-white hover:text-red-500 transition-colors py-2"
                  onClick={closeMenu}
                >
                  Connexion
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;