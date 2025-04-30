import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import AdminLayout from './AdminLayout';
import Button from '../../components/ui/Button';
import { products } from '../../data/products';
import { formatPrice } from '../../utils/utils';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });
  
  const handleDelete = (productId: string) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };
  
  const confirmDelete = () => {
    // Here you would delete the product
    toast.success('Produit supprimé avec succès');
    setShowDeleteModal(false);
    setProductToDelete(null);
  };
  
  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestion des produits</h1>
          <p className="text-gray-400">Gérez l'inventaire de vos produits</p>
        </div>
        <Button>
          <Plus size={18} className="mr-2" />
          Ajouter un produit
        </Button>
      </div>
      
      <div className="bg-neutral-800 rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="p-6 border-b border-neutral-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-auto md:flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-neutral-700 border-none rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-neutral-700 border-none rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Toutes catégories</option>
                <option value="tshirts">T-shirts</option>
                <option value="hoodies">Sweats & Hoodies</option>
                <option value="pants">Pantalons</option>
                <option value="accessories">Accessoires</option>
                <option value="shoes">Chaussures</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Product List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm">
                <th className="px-6 py-3">Produit</th>
                <th className="px-6 py-3">Catégorie</th>
                <th className="px-6 py-3">Prix</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="text-white">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded overflow-hidden bg-neutral-700 mr-3">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-white font-medium">{product.name}</div>
                        <div className="text-gray-400 text-sm">
                          {product.sizes.join(', ')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize">
                    {product.category === 'tshirts' ? 'T-shirts' : 
                     product.category === 'hoodies' ? 'Sweats & Hoodies' : 
                     product.category === 'pants' ? 'Pantalons' : 
                     product.category === 'accessories' ? 'Accessoires' : 'Chaussures'}
                  </td>
                  <td className="px-6 py-4">
                    {formatPrice(product.price)}
                    {product.discount && (
                      <span className="ml-2 text-sm text-red-500">-{product.discount}%</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      product.inStock
                        ? 'bg-green-600 bg-opacity-20 text-green-500'
                        : 'bg-red-600 bg-opacity-20 text-red-500'
                    }`}>
                      {product.inStock ? 'En stock' : 'Épuisé'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-2 bg-neutral-700 rounded-md text-white hover:bg-neutral-600 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button 
                        className="p-2 bg-red-600 bg-opacity-20 rounded-md text-red-500 hover:bg-opacity-30 transition-colors"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    Aucun produit trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-neutral-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Confirmer la suppression</h3>
            <p className="text-gray-300 mb-6">
              Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Annuler
              </Button>
              <Button 
                variant="primary"
                onClick={confirmDelete}
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;