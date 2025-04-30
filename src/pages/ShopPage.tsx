import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';
import { products } from '../data/products';
import { Product } from '../types/product';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const categoryParam = searchParams.get('category');
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  const featuredParam = searchParams.get('featured');
  const newArrivalsParam = searchParams.get('newArrivals');
  
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category
    if (categoryParam) {
      filtered = filtered.filter(product => product.category === categoryParam);
    }
    
    // Filter by price range
    if (minPriceParam) {
      filtered = filtered.filter(product => product.price >= Number(minPriceParam));
    }
    
    if (maxPriceParam) {
      filtered = filtered.filter(product => product.price <= Number(maxPriceParam));
    }
    
    // Filter featured products
    if (featuredParam === 'true') {
      filtered = filtered.filter(product => product.featured);
    }
    
    // Filter new arrivals
    if (newArrivalsParam === 'true') {
      filtered = filtered.filter(product => product.newArrival);
    }
    
    setFilteredProducts(filtered);
  }, [categoryParam, minPriceParam, maxPriceParam, featuredParam, newArrivalsParam]);
  
  const updateFilter = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    
    setSearchParams(newParams);
  };
  
  const clearFilters = () => {
    setSearchParams({});
  };
  
  const categories = [
    { id: 'tshirts', name: 'T-shirts' },
    { id: 'hoodies', name: 'Sweats & Hoodies' },
    { id: 'pants', name: 'Pantalons' },
    { id: 'accessories', name: 'Accessoires' },
    { id: 'shoes', name: 'Chaussures' }
  ];
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Filters for mobile */}
          <div className="w-full md:hidden mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Boutique</h1>
            <Button variant="outline" size="sm" onClick={toggleFilters}>
              <SlidersHorizontal size={16} className="mr-2" />
              Filtres
            </Button>
          </div>
          
          {/* Sidebar Filters */}
          <aside 
            className={`w-full md:w-64 bg-neutral-800 p-6 rounded-lg ${
              showFilters ? 'block' : 'hidden md:block'
            } md:sticky md:top-24`}
          >
            <div className="flex justify-between items-center mb-6 md:mb-4">
              <h2 className="text-xl font-semibold text-white">Filtres</h2>
              <button 
                onClick={clearFilters}
                className="text-sm text-red-500 hover:text-red-400"
              >
                Réinitialiser
              </button>
              <button 
                className="md:hidden text-gray-400"
                onClick={toggleFilters}
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-white font-medium mb-3">Catégories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      id={category.id}
                      name="category"
                      checked={categoryParam === category.id}
                      onChange={() => updateFilter('category', category.id)}
                      className="mr-2 h-4 w-4 accent-red-600"
                    />
                    <label htmlFor={category.id} className="text-gray-300">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-white font-medium mb-3">Prix</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="minPrice" className="text-gray-400 text-sm">
                    Min
                  </label>
                  <input
                    type="number"
                    id="minPrice"
                    value={minPriceParam || ''}
                    onChange={(e) => updateFilter('minPrice', e.target.value || null)}
                    className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-white"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label htmlFor="maxPrice" className="text-gray-400 text-sm">
                    Max
                  </label>
                  <input
                    type="number"
                    id="maxPrice"
                    value={maxPriceParam || ''}
                    onChange={(e) => updateFilter('maxPrice', e.target.value || null)}
                    className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-white"
                    placeholder="200"
                  />
                </div>
              </div>
            </div>
            
            {/* Other Filters */}
            <div>
              <h3 className="text-white font-medium mb-3">Autres filtres</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featuredParam === 'true'}
                    onChange={(e) => updateFilter('featured', e.target.checked ? 'true' : null)}
                    className="mr-2 h-4 w-4 accent-red-600"
                  />
                  <label htmlFor="featured" className="text-gray-300">
                    Produits à la une
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newArrivals"
                    checked={newArrivalsParam === 'true'}
                    onChange={(e) => updateFilter('newArrivals', e.target.checked ? 'true' : null)}
                    className="mr-2 h-4 w-4 accent-red-600"
                  />
                  <label htmlFor="newArrivals" className="text-gray-300">
                    Nouveautés
                  </label>
                </div>
              </div>
            </div>
          </aside>
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="hidden md:flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-white">Boutique</h1>
              <div className="text-gray-400">
                {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            {/* Active Filters */}
            {(categoryParam || minPriceParam || maxPriceParam || featuredParam || newArrivalsParam) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {categoryParam && (
                  <div className="bg-neutral-700 px-3 py-1 rounded-full flex items-center text-sm">
                    <span>
                      Catégorie: {categories.find(c => c.id === categoryParam)?.name}
                    </span>
                    <button 
                      onClick={() => updateFilter('category', null)}
                      className="ml-2 text-gray-400 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                {(minPriceParam || maxPriceParam) && (
                  <div className="bg-neutral-700 px-3 py-1 rounded-full flex items-center text-sm">
                    <span>
                      Prix: {minPriceParam || '0'} - {maxPriceParam || '∞'}
                    </span>
                    <button 
                      onClick={() => {
                        updateFilter('minPrice', null);
                        updateFilter('maxPrice', null);
                      }}
                      className="ml-2 text-gray-400 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                {featuredParam === 'true' && (
                  <div className="bg-neutral-700 px-3 py-1 rounded-full flex items-center text-sm">
                    <span>À la une</span>
                    <button 
                      onClick={() => updateFilter('featured', null)}
                      className="ml-2 text-gray-400 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                {newArrivalsParam === 'true' && (
                  <div className="bg-neutral-700 px-3 py-1 rounded-full flex items-center text-sm">
                    <span>Nouveautés</span>
                    <button 
                      onClick={() => updateFilter('newArrivals', null)}
                      className="ml-2 text-gray-400 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-white mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-400 mb-6">Essayez de modifier vos filtres ou de parcourir toutes nos catégories.</p>
                <Button onClick={clearFilters}>Voir tous les produits</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;