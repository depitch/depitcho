import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { formatPrice } from '../../utils/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, images, discount, newArrival } = product;
  const displayPrice = discount ? price * (1 - discount / 100) : price;
  
  return (
    <div className="group">
      <Link to={`/produit/${id}`} className="relative block overflow-hidden bg-neutral-800 rounded-lg">
        <div className="aspect-square overflow-hidden">
          <img
            src={images[0]}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Product badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {newArrival && (
            <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
              NOUVEAU
            </span>
          )}
          {discount && (
            <span className="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>
        
        {/* Quick view overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all opacity-0 group-hover:opacity-100">
          <span className="bg-white text-black px-4 py-2 rounded text-sm font-medium">
            Voir détails
          </span>
        </div>
      </Link>
      
      <div className="mt-3">
        <Link to={`/produit/${id}`} className="text-white font-medium hover:text-red-500 transition-colors">
          {name}
        </Link>
        <div className="mt-1 flex items-center">
          <span className="text-white font-bold">
            {formatPrice(displayPrice)}
          </span>
          {discount && (
            <span className="ml-2 text-gray-400 line-through text-sm">
              {formatPrice(price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;