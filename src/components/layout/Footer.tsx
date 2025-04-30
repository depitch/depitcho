import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">URBAN<span className="text-red-600">WEAR</span></h3>
            <p className="text-gray-400 mb-4">
              Votre destination streetwear préférée, avec les dernières tendances urbaines et designs exclusifs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Catégories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/boutique?category=tshirts" className="text-gray-400 hover:text-white transition-colors">
                  T-shirts
                </Link>
              </li>
              <li>
                <Link to="/boutique?category=hoodies" className="text-gray-400 hover:text-white transition-colors">
                  Sweats & Hoodies
                </Link>
              </li>
              <li>
                <Link to="/boutique?category=pants" className="text-gray-400 hover:text-white transition-colors">
                  Pantalons
                </Link>
              </li>
              <li>
                <Link to="/boutique?category=accessories" className="text-gray-400 hover:text-white transition-colors">
                  Accessoires
                </Link>
              </li>
              <li>
                <Link to="/boutique?category=shoes" className="text-gray-400 hover:text-white transition-colors">
                  Chaussures
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Aide</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Retours
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Guide des tailles
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Inscrivez-vous pour recevoir nos dernières nouveautés et promotions exclusives.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="bg-neutral-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-full"
              />
              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-md transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} URBANWEAR. Tous droits réservés.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <Link to="#" className="hover:text-white transition-colors">
                Conditions générales
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;