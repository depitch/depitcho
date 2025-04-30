import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Home, ShoppingBag, Users, Package, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const navItems = [
    { icon: <Home size={20} />, name: 'Tableau de bord', path: '/admin' },
    { icon: <Package size={20} />, name: 'Produits', path: '/admin/produits' },
    { icon: <ShoppingBag size={20} />, name: 'Commandes', path: '/admin/commandes' },
    { icon: <Users size={20} />, name: 'Clients', path: '/admin/clients' }
  ];
  
  return (
    <div className="min-h-screen pt-16 pb-8 bg-neutral-900">
      {/* Mobile Sidebar Toggle */}
      <div className="fixed top-20 left-4 z-40 lg:hidden">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-neutral-800 rounded-md text-white"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 pt-16 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 z-30 w-64 bg-neutral-800 overflow-y-auto transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-white">Administration</h2>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-neutral-700'
                  }`
                }
                end={item.path === '/admin'}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
            
            <div className="pt-6 mt-6 border-t border-neutral-700">
              <NavLink
                to="/admin/settings"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-neutral-700'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <span className="mr-3"><Settings size={20} /></span>
                <span>Paramètres</span>
              </NavLink>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 rounded-md text-gray-300 hover:bg-neutral-700 transition-colors"
              >
                <span className="mr-3"><LogOut size={20} /></span>
                <span>Déconnexion</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;