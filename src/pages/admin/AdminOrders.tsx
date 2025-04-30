import { useState } from 'react';
import { Search, Filter, Eye, Download } from 'lucide-react';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  // Sample data for demonstration
  const orders = [
    { 
      id: 'ORD-65432', 
      customer: 'Amadou Diop', 
      email: 'amadou.diop@example.com',
      date: '2023-06-25', 
      status: 'Livré', 
      total: '129,800 XOF',
      items: 3
    },
    { 
      id: 'ORD-65431', 
      customer: 'Fatou Ndiaye', 
      email: 'fatou.ndiaye@example.com',
      date: '2023-06-24', 
      status: 'En cours', 
      total: '75,500 XOF',
      items: 2
    },
    { 
      id: 'ORD-65430', 
      customer: 'Ibrahim Sow', 
      email: 'ibrahim.sow@example.com',
      date: '2023-06-23', 
      status: 'En attente', 
      total: '95,300 XOF',
      items: 4
    },
    { 
      id: 'ORD-65429', 
      customer: 'Mariam Touré', 
      email: 'mariam.toure@example.com',
      date: '2023-06-22', 
      status: 'Livré', 
      total: '52,000 XOF',
      items: 1
    },
    { 
      id: 'ORD-65428', 
      customer: 'Ousmane Sarr', 
      email: 'ousmane.sarr@example.com',
      date: '2023-06-21', 
      status: 'Livré', 
      total: '148,200 XOF',
      items: 3
    },
    { 
      id: 'ORD-65427', 
      customer: 'Aminata Diallo', 
      email: 'aminata.diallo@example.com',
      date: '2023-06-20', 
      status: 'Annulé', 
      total: '67,900 XOF',
      items: 2
    }
  ];
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? order.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });
  
  const handleViewOrder = (orderId: string) => {
    toast.success(`Commande ${orderId} détaillée`);
  };
  
  const handleDownloadInvoice = (orderId: string) => {
    toast.success(`Facture de la commande ${orderId} téléchargée`);
  };
  
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Gestion des commandes</h1>
        <p className="text-gray-400">Consultez et gérez les commandes des clients</p>
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
                placeholder="Rechercher une commande ou un client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-neutral-700 border-none rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-neutral-700 border-none rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Tous statuts</option>
                <option value="En attente">En attente</option>
                <option value="En cours">En cours</option>
                <option value="Livré">Livré</option>
                <option value="Annulé">Annulé</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Orders List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Articles</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Statut</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="text-white">
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white">{order.customer}</div>
                      <div className="text-gray-400 text-sm">{order.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(order.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {order.total}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      order.status === 'Livré' 
                        ? 'bg-green-600 bg-opacity-20 text-green-500' 
                        : order.status === 'En cours' 
                          ? 'bg-blue-600 bg-opacity-20 text-blue-500'
                          : order.status === 'En attente'
                            ? 'bg-yellow-600 bg-opacity-20 text-yellow-500'
                            : 'bg-red-600 bg-opacity-20 text-red-500'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button 
                        className="p-2 bg-neutral-700 rounded-md text-white hover:bg-neutral-600 transition-colors"
                        onClick={() => handleViewOrder(order.id)}
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="p-2 bg-neutral-700 rounded-md text-white hover:bg-neutral-600 transition-colors"
                        onClick={() => handleDownloadInvoice(order.id)}
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                    Aucune commande trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-neutral-700 flex justify-between items-center">
          <div className="text-gray-400 text-sm">
            Affichage de 1 à {filteredOrders.length} sur {filteredOrders.length} commandes
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 bg-neutral-700 rounded text-white hover:bg-neutral-600 transition-colors">
              Précédent
            </button>
            <button className="px-3 py-1 bg-red-600 rounded text-white">
              1
            </button>
            <button className="px-3 py-1 bg-neutral-700 rounded text-white hover:bg-neutral-600 transition-colors">
              2
            </button>
            <button className="px-3 py-1 bg-neutral-700 rounded text-white hover:bg-neutral-600 transition-colors">
              Suivant
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;