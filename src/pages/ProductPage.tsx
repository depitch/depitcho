import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag } from 'lucide-react';
import Button from '../components/ui/Button';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../utils/utils';
import toast from 'react-hot-toast';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!product) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Produit non trouvé</h2>
          <p className="text-gray-400 mb-6">
            Le produit que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Button onClick={() => navigate('/boutique')}>
            Retour à la boutique
          </Button>
        </div>
      </div>
    );
  }
  
  const { name, description, price, images, sizes, discount, category } = product;
  const discountedPrice = discount ? price * (1 - discount / 100) : price;
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Veuillez sélectionner une taille');
      return;
    }
    
    addToCart(product, quantity, selectedSize);
    toast.success('Produit ajouté au panier');
  };
  
  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };
  
  const relatedProducts = products
    .filter(p => p.category === category && p.id !== id)
    .slice(0, 4);
  
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Product Images */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="aspect-square overflow-hidden bg-neutral-800 rounded-lg">
                <img
                  src={images[currentImageIndex]}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded overflow-hidden ${
                      index === currentImageIndex ? 'ring-2 ring-red-600' : 'opacity-70'
                    }`}
                  >
                    <img src={image} alt={`${name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white mr-2">
                {formatPrice(discountedPrice)}
              </span>
              {discount && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(price)}
                </span>
              )}
              {discount && (
                <span className="ml-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  -{discount}%
                </span>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-gray-300">
                {description}
              </p>
            </div>
            
            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-white font-medium mb-2">Taille</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border ${
                      selectedSize === size
                        ? 'border-red-600 bg-red-600 bg-opacity-10 text-white'
                        : 'border-neutral-600 text-gray-300 hover:border-white'
                    } rounded-md transition-colors`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize === '' && (
                <p className="text-red-500 text-sm mt-2">
                  Veuillez sélectionner une taille
                </p>
              )}
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-white font-medium mb-2">Quantité</h3>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="bg-neutral-800 text-white p-2 rounded-l-md hover:bg-neutral-700 border border-neutral-700"
                >
                  <Minus size={16} />
                </button>
                <div className="w-16 text-center border-t border-b border-neutral-700 py-2">
                  {quantity}
                </div>
                <button
                  onClick={incrementQuantity}
                  className="bg-neutral-800 text-white p-2 rounded-r-md hover:bg-neutral-700 border border-neutral-700"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="mb-8">
              <Button fullWidth onClick={handleAddToCart}>
                <ShoppingBag size={18} className="mr-2" />
                Ajouter au panier
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="border-t border-neutral-700 pt-6">
              <div className="flex flex-col space-y-4">
                <div>
                  <h3 className="text-white font-medium">Catégorie</h3>
                  <p className="text-gray-400 capitalize">
                    {category === 'tshirts' ? 'T-shirts' : 
                     category === 'hoodies' ? 'Sweats & Hoodies' : 
                     category === 'pants' ? 'Pantalons' : 
                     category === 'accessories' ? 'Accessoires' : 'Chaussures'}
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-medium">Livraison</h3>
                  <p className="text-gray-400">
                    2-4 jours ouvrables
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-medium">Partager</h3>
                  <div className="flex space-x-4 mt-1">
                    <a href="#" className="text-gray-400 hover:text-white">
                      Facebook
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Twitter
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Vous pourriez aussi aimer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <div key={product.id} className="group">
                  <div
                    className="relative aspect-square overflow-hidden bg-neutral-800 rounded-lg cursor-pointer"
                    onClick={() => navigate(`/produit/${product.id}`)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3">
                    <h3
                      className="text-white font-medium group-hover:text-red-500 transition-colors cursor-pointer"
                      onClick={() => navigate(`/produit/${product.id}`)}
                    >
                      {product.name}
                    </h3>
                    <div className="mt-1">
                      <span className="text-white font-bold">
                        {formatPrice(product.discount ? product.price * (1 - product.discount / 100) : product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;