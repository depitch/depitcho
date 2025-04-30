import { Link } from 'react-router-dom';
import { ShoppingBag, Users, Package, TrendingUp, DollarSign, Clock } from 'lucide-react';
import AdminLayout from './AdminLayout';

const AdminDashboard = () => {
  // Sample data for demonstration
  const stats = [
    { title: 'Ventes totales', value: '1,249,500 XOF', icon: <DollarSign className="text-green-500" />, change: '+12.5%' },
    { title: 'Commandes', value: '125', icon: <ShoppingBag className="text-blue-500" />, change: '+5.2%' },
    { title: 'Clients', value: '86', icon: <Users className="text-purple-500" />, change: '+8.7%' },
    { title: 'Produits', value: '48', icon: <Package className="text-yellow-500" />, change: '+3.1%' }
  ];
  
  const recentOrders = [
    { id: 'ORD-65432', customer: 'Amadou Diop', date: '2023-06-25', status: 'Livré', total: '129,800 XOF' },
    { id: 'ORD-65431', customer: 'Fatou Ndiaye', date: '2023-06-24', status: 'En cours', total: '75,500 XOF' },
    { id: 'ORD-65430', customer: 'Ibrahim Sow', date: '2023-06-23', status: 'En attente', total: '95,300 XOF' },
    { id: 'ORD-65429', customer: 'Mariam Touré', date: '2023-06-22', status: 'Livré', total: '52,000 XOF' },
    { id: 'ORD-65428', customer: 'Ousmane Sarr', date: '2023-06-21', status: 'Livré', total: '148,200 XOF' }
  ];
  
  const topProducts = [
    { name: 'Hoodie Urban Culture Noir', sales: 42, revenue: '293,958 XOF' },
    { name: 'T-shirt Streetlife Oversize', sales: 38, revenue: '151,962 XOF' },
    { name: 'Pantalon Cargo Streetstyle', sales: 27, revenue: '215,973 XOF' },
    { name: 'Snapback Urban Vibe', sales: 25, revenue: '74,975 XOF' }
  ];
  
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
        <p className="text-gray-400">Bienvenue dans votre interface d'administration.</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-neutral-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400">{stat.title}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
              <div className="p-2 bg-neutral-700 rounded-lg">
                {stat.icon}
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="text-green-500 mr-1" size={16} />
              <span className="text-green-500 text-sm">{stat.change}</span>
              <span className="text-gray-400 text-sm ml-1">vs le mois dernier</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-neutral-700">
              <h2 className="text-xl font-bold text-white">Commandes récentes</h2>
              <Link 
                to="/admin/commandes"
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                Voir tout
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm">
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">Client</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Statut</th>
                    <th className="px-6 py-3">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-700">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="text-white">
                      <td className="px-6 py-4">{order.id}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4">{new Date(order.date).toLocaleDateString('fr-FR')}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          order.status === 'Livré' 
                            ? 'bg-green-600 bg-opacity-20 text-green-500' 
                            : order.status === 'En cours' 
                              ? 'bg-blue-600 bg-opacity-20 text-blue-500'
                              : 'bg-yellow-600 bg-opacity-20 text-yellow-500'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Top Products */}
        <div>
          <div className="bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-neutral-700">
              <h2 className="text-xl font-bold text-white">Produits les plus vendus</h2>
              <Link 
                to="/admin/produits"
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                Voir tout
              </Link>
            </div>
            <div className="divide-y divide-neutral-700">
              {topProducts.map((product, index) => (
                <div key={index} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-medium truncate max-w-xs">{product.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{product.sales} ventes</p>
                    </div>
                    <p className="text-white font-bold">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-neutral-800 rounded-lg shadow-lg overflow-hidden mt-8">
            <div className="p-6 border-b border-neutral-700">
              <h2 className="text-xl font-bold text-white">Activité récente</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {[
                  { action: 'Nouvelle commande', time: 'Il y a 10 minutes' },
                  { action: 'Nouveau client', time: 'Il y a 2 heures' },
                  { action: 'Mise à jour de produit', time: 'Il y a 5 heures' },
                  { action: 'Commande livrée', time: 'Hier' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-2 bg-neutral-700 rounded-full mr-4">
                      <Clock size={16} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-white">{activity.action}</p>
                      <p className="text-gray-400 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;