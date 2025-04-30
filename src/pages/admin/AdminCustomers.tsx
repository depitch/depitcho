import { useState } from 'react';
import { Search, Filter, Eye, Mail } from 'lucide-react';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data for demonstration
  const customers = [
    { 
      id: 'USR-1001', 
      name: 'Amadou Diop', 
      email: 'amadou.diop@example.com',
      joinDate: '2023-01-15', 
      orders: 5, 
      totalSpent: '253,500 XOF',
      lastOrder: '2023-06-25'
    },
    { 
      id: 'USR-1002', 
      name: 'Fatou Ndiaye', 
      email: 'fatou.ndiaye@example.com',
      joinDate: '2023-02-03', 
      orders: 3, 
      totalSpent: '127,800 XOF',
      lastOrder: '2023-06-24'
    },
    { 
      id: 'USR-1003', 
      name: 'Ibrahim Sow', 
      email: 'ibrahim.sow@example.com',
      joinDate: '2023-02-18', 
      orders: 7, 
      totalSpent: '378,200 XOF',
      lastOrder: '2023-06-23'
    },
    { 
      id: 'USR-1004', 
      name: 'Mariam Touré', 
      email: 'mariam.toure@example.com',
      joinDate: '2023-03-07', 
      orders: 2, 
      totalSpent: '82,500 XOF',
      lastOrder: '2023-06-22'
    },
    { 
      id: 'USR-1005', 
      name: 'Ousmane Sarr', 
      email: 'ousmane.sarr@example.com',
      joinDate: '2023-03-24', 
      orders: 4, 
      totalSpent: '215,700 XOF',
      lastOrder: '2023-06-21'
    },
    { 
      id: 'USR-1006', 
      name: 'Aminata Diallo', 
      email: 'aminata.diallo@example.com',
      joinDate: '2023-04-11', 
      orders: 1, 
      totalSpent: '67,900 XOF',
      lastOrder: '2023-06-20'
    }
  ];
  
  const filteredCustomers = customers.filter(customer => {
    return (
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  const handleViewCustomer = (customerId: string) => {
    toast.success(`Profil client ${customerId} détaillé`);
  };
  
  const handleSendEmail = (customerEmail: string) => {
    toast.success(`Email envoyé à ${customerEmail}`);
  };
  
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Gestion des clients</h1>
        <p className="text-gray-400">Consultez et gérez les comptes clients</p>
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
                placeholder="Rechercher un client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-neutral-700 border-none rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>
        
        {/* Customers List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm">
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Inscription</th>
                <th className="px-6 py-3">Commandes</th>
                <th className="px-6 py-3">Total dépensé</th>
                <th className="px-6 py-3">Dernière commande</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="text-white">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white font-medium">{customer.name}</div>
                      <div className="text-gray-400 text-sm">{customer.email}</div>
                      <div className="text-gray-500 text-xs">{customer.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(customer.joinDate).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    {customer.orders}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {customer.totalSpent}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(customer.lastOrder).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button 
                        className="p-2 bg-neutral-700 rounded-md text-white hover:bg-neutral-600 transition-colors"
                        onClick={() => handleViewCustomer(customer.id)}
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="p-2 bg-neutral-700 rounded-md text-white hover:bg-neutral-600 transition-colors"
                        onClick={() => handleSendEmail(customer.email)}
                      >
                        <Mail size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    Aucun client trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-neutral-700 flex justify-between items-center">
          <div className="text-gray-400 text-sm">
            Affichage de 1 à {filteredCustomers.length} sur {filteredCustomers.length} clients
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

export default AdminCustomers;