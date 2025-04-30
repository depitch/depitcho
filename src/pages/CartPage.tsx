import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../utils/utils';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(productId, quantity);
  };
  
  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      navigate('/checkout');
      setIsLoading(false);
    }, 500);
  };
  
  const estimatedShipping = items.length > 0 ? 1500 : 0;
  const total = totalPrice + estimatedShipping;
  
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-6">Mon Panier</h1>
        
        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
                <div className="hidden md:grid grid-cols-5 gap-4 p-4 border-b border-neutral-700 text-sm text-gray-400">
                  <div className="col-span-2">Produit</div>
                  <div>Prix</div>
                  <div>Quantité</div>
                  <div>Total</div>
                </div>
                
                <div className="divide-y divide-neutral-700">
                  {items.map(item => (
                    <div key={`${item.product.id}-${item.size}`} className="p-4">
                      <div className="md:grid md:grid-cols-5 md:gap-4 md:items-center space-y-4 md:space-y-0">
                        {/* Product Info */}
                        <div className="flex md:col-span-2">
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded overflow-hidden bg-neutral-700 mr-4">
                            <img 
                              src={item.product.images[0]} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-between py-1">
                            <Link 
                              to={`/produit/${item.product.id}`}
                              className="text-white font-medium hover:text-red-500 transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <div className="text-gray-400 text-sm">
                              Taille: {item.size}
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="flex items-center text-sm text-red-500 hover:text-red-400 transition-colors mt-1"
                            >
                              <Trash2 size={14} className="mr-1" />
                              Supprimer
                            </button>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="md:hidden text-gray-400 text-sm">Prix:</div>
                        <div className="text-white">
                          {formatPrice(item.product.price)}
                        </div>
                        
                        {/* Quantity */}
                        <div className="md:hidden text-gray-400 text-sm">Quantité:</div>
                        <div>
                          <div className="flex items-center">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              className="bg-neutral-700 text-white px-2 py-1 rounded-l"
                            >
                              -
                            </button>
                            <span className="bg-neutral-700 text-white px-4 py-1">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className="bg-neutral-700 text-white px-2 py-1 rounded-r"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        {/* Total */}
                        <div className="md:hidden text-gray-400 text-sm">Total:</div>
                        <div className="text-white font-bold">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <Link 
                  to="/boutique"
                  className="inline-flex items-center text-white hover:text-red-500 transition-colors"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Continuer mes achats
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-neutral-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Résumé de la commande</h2>
                
                <div className="space-y-3 border-b border-neutral-700 pb-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sous-total</span>
                    <span className="text-white">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Frais de livraison estimés</span>
                    <span className="text-white">{formatPrice(estimatedShipping)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between mb-6">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-white font-bold text-xl">{formatPrice(total)}</span>
                </div>
                
                <Button 
                  fullWidth 
                  onClick={handleCheckout}
                  isLoading={isLoading}
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Passer à la caisse
                </Button>
                
                <div className="mt-4 text-sm text-gray-400 text-center">
                  Paiements sécurisés par Wave, Orange Money, Moov Money et MTN Money
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-neutral-800 rounded-lg">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-700 rounded-full mb-6">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Votre panier est vide</h2>
            <p className="text-gray-400 mb-6">
              Vous n'avez aucun article dans votre panier pour le moment.
            </p>
            <Link to="/boutique">
              <Button>
                Commencer vos achats
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;