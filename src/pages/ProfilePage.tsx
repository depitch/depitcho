import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ShoppingBag, User, MapPin, LogOut } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const profileSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide').optional(),
  phone: z.string().min(8, 'Numéro de téléphone invalide').optional(),
  address: z.string().min(5, 'L\'adresse doit contenir au moins 5 caractères').optional(),
  city: z.string().min(2, 'La ville doit contenir au moins 2 caractères').optional()
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: ''
    }
  });
  
  const mockOrders = [
    { 
      id: 'ORD-12345', 
      date: '2023-05-15', 
      status: 'Livré', 
      total: 159.97,
      items: [
        { name: 'T-shirt Streetlife Oversize', size: 'L', quantity: 1, price: 39.99 },
        { name: 'Hoodie Urban Culture Noir', size: 'M', quantity: 1, price: 69.99 },
        { name: 'Casquette Snapback Urban Vibe', size: 'Unique', quantity: 1, price: 29.99 }
      ]
    },
    { 
      id: 'ORD-67890', 
      date: '2023-06-22', 
      status: 'En cours de livraison', 
      total: 89.99,
      items: [
        { name: 'Pantalon Cargo Streetstyle', size: 'M', quantity: 1, price: 79.99 },
        { name: 'Bonnet Streetwear Urbain', size: 'Unique', quantity: 1, price: 24.99 }
      ]
    }
  ];
  
  const onSubmit = (data: ProfileFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Profil mis à jour avec succès');
      setIsLoading(false);
      setIsEditing(false);
    }, 1000);
  };
  
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-6">Mon compte</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <div className="bg-neutral-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center">
                  <User size={24} className="text-gray-400" />
                </div>
                <div className="ml-3">
                  <div className="text-white font-medium">{user?.name}</div>
                  <div className="text-gray-400 text-sm">{user?.email}</div>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-300 hover:bg-neutral-700'
                  }`}
                >
                  <User size={18} className="mr-2" />
                  Profil
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                    activeTab === 'orders' 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-300 hover:bg-neutral-700'
                  }`}
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Commandes
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                    activeTab === 'addresses' 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-300 hover:bg-neutral-700'
                  }`}
                >
                  <MapPin size={18} className="mr-2" />
                  Adresses
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center px-3 py-2 rounded-md text-gray-300 hover:bg-neutral-700 transition-colors"
                >
                  <LogOut size={18} className="mr-2" />
                  Déconnexion
                </button>
              </nav>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="bg-neutral-800 rounded-lg shadow-lg p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Informations personnelles</h2>
                    {!isEditing && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        Modifier
                      </Button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="space-y-4 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                            Nom complet
                          </label>
                          <input
                            id="name"
                            type="text"
                            {...register('name')}
                            className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                            Téléphone
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            {...register('phone')}
                            className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-3 justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Annuler
                        </Button>
                        <Button
                          type="submit"
                          isLoading={isLoading}
                        >
                          Enregistrer
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-gray-400 text-sm">Nom complet</h3>
                        <p className="text-white">{user?.name}</p>
                      </div>
                      <div>
                        <h3 className="text-gray-400 text-sm">Email</h3>
                        <p className="text-white">{user?.email}</p>
                      </div>
                      <div>
                        <h3 className="text-gray-400 text-sm">Téléphone</h3>
                        <p className="text-white">Non renseigné</p>
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <>
                  <h2 className="text-xl font-bold text-white mb-6">Mes commandes</h2>
                  
                  {mockOrders.length > 0 ? (
                    <div className="space-y-6">
                      {mockOrders.map((order) => (
                        <div key={order.id} className="bg-neutral-700 rounded-lg overflow-hidden">
                          <div className="bg-neutral-600 p-4 flex flex-col md:flex-row justify-between md:items-center">
                            <div>
                              <span className="text-gray-300 text-sm">Commande #{order.id}</span>
                              <div className="flex items-center mt-1">
                                <span className="text-white font-medium mr-2">
                                  {new Date(order.date).toLocaleDateString('fr-FR')}
                                </span>
                                <span className={`text-sm px-2 py-0.5 rounded-full ${
                                  order.status === 'Livré' 
                                    ? 'bg-green-600 bg-opacity-20 text-green-500' 
                                    : 'bg-yellow-600 bg-opacity-20 text-yellow-500'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <span className="text-gray-300 text-sm">Total</span>
                              <p className="text-white font-bold">
                                {new Intl.NumberFormat('fr-FR', {
                                  style: 'currency',
                                  currency: 'XOF'
                                }).format(order.total)}
                              </p>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-white font-medium mb-3">Articles</h3>
                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between">
                                  <div className="text-gray-300">
                                    {item.quantity}x {item.name} <span className="text-gray-500">(Taille: {item.size})</span>
                                  </div>
                                  <div className="text-white">
                                    {new Intl.NumberFormat('fr-FR', {
                                      style: 'currency',
                                      currency: 'XOF'
                                    }).format(item.price * item.quantity)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-700 rounded-full mb-4">
                        <ShoppingBag size={28} className="text-gray-400" />
                      </div>
                      <h3 className="text-white font-medium mb-2">Aucune commande</h3>
                      <p className="text-gray-400 mb-4">
                        Vous n'avez pas encore passé de commande.
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => navigate('/boutique')}
                      >
                        Commencer vos achats
                      </Button>
                    </div>
                  )}
                </>
              )}
              
              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <>
                  <h2 className="text-xl font-bold text-white mb-6">Mes adresses</h2>
                  
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-700 rounded-full mb-4">
                      <MapPin size={28} className="text-gray-400" />
                    </div>
                    <h3 className="text-white font-medium mb-2">Aucune adresse</h3>
                    <p className="text-gray-400 mb-4">
                      Vous n'avez pas encore ajouté d'adresse.
                    </p>
                    <Button>
                      Ajouter une adresse
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;