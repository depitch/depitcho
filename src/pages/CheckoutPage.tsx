import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice, paymentMethods } from '../utils/utils';
import toast from 'react-hot-toast';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
  address: z.string().min(5, 'L\'adresse doit contenir au moins 5 caractères'),
  city: z.string().min(2, 'La ville doit contenir au moins 2 caractères'),
  paymentMethod: z.enum(['wave', 'orange', 'moov', 'mtn']),
  saveInfo: z.boolean().optional()
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      paymentMethod: 'wave',
      saveInfo: true
    }
  });
  
  const selectedPaymentMethod = watch('paymentMethod');
  
  const estimatedShipping = items.length > 0 ? 1500 : 0;
  const total = totalPrice + estimatedShipping;
  
  const onSubmit = (data: CheckoutFormData) => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentComplete(true);
        clearCart();
        toast.success('Commande passée avec succès!');
      }, 2000);
    }
  };
  
  const handleBackToShop = () => {
    navigate('/boutique');
  };
  
  if (paymentComplete) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto bg-neutral-800 rounded-lg shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-500" size={40} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Commande confirmée!</h1>
            <p className="text-gray-300 mb-8">
              Merci pour votre commande. Nous vous avons envoyé un email de confirmation avec les détails de votre achat.
            </p>
            <div className="bg-neutral-700 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-white mb-2">Résumé de la commande</h2>
              <ul className="space-y-2 mb-4">
                <li className="flex justify-between">
                  <span className="text-gray-400">Numéro de commande:</span>
                  <span className="text-white font-medium">URB-{Math.floor(Math.random() * 10000)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white font-medium">{new Date().toLocaleDateString('fr-FR')}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Total:</span>
                  <span className="text-white font-medium">{formatPrice(total)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Paiement:</span>
                  <span className="text-white font-medium">
                    {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                  </span>
                </li>
              </ul>
            </div>
            <Button onClick={handleBackToShop}>
              Continuer mes achats
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Paiement</h1>
          
          {/* Checkout Steps */}
          <div className="flex items-center mb-8">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-red-500' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 1 ? 'border-red-500 bg-red-500 bg-opacity-10' : 'border-gray-500'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Livraison</span>
            </div>
            <div className={`w-12 h-0.5 mx-2 ${currentStep >= 2 ? 'bg-red-500' : 'bg-gray-500'}`}></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-red-500' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 2 ? 'border-red-500 bg-red-500 bg-opacity-10' : 'border-gray-500'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Paiement</span>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Form */}
            <div className="lg:w-2/3">
              <form onSubmit={handleSubmit(onSubmit)}>
                {currentStep === 1 ? (
                  <div className="bg-neutral-800 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Informations de livraison</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                          Prénom
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          {...register('firstName')}
                          className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                          Nom
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          {...register('lastName')}
                          className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
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
                          placeholder="Ex: 0123456789"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                          Adresse
                        </label>
                        <input
                          id="address"
                          type="text"
                          {...register('address')}
                          className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
                          Ville
                        </label>
                        <input
                          id="city"
                          type="text"
                          {...register('city')}
                          className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <input
                        id="saveInfo"
                        type="checkbox"
                        {...register('saveInfo')}
                        className="h-4 w-4 bg-neutral-700 border-neutral-600 rounded text-red-600 focus:ring-red-500"
                      />
                      <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-300">
                        Sauvegarder ces informations pour la prochaine fois
                      </label>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        Continuer vers le paiement
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-neutral-800 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Méthode de paiement</h2>
                    
                    <div className="space-y-3 mb-6">
                      {paymentMethods.map(method => (
                        <label 
                          key={method.id}
                          className={`block p-4 rounded-md border cursor-pointer transition-colors ${
                            selectedPaymentMethod === method.id 
                              ? 'border-red-500 bg-red-500 bg-opacity-5' 
                              : 'border-neutral-600 hover:border-white'
                          }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              value={method.id}
                              {...register('paymentMethod')}
                              className="hidden"
                            />
                            <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 border ${
                              selectedPaymentMethod === method.id ? 'border-red-500' : 'border-neutral-600'
                            }`}>
                              {selectedPaymentMethod === method.id && (
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              )}
                            </div>
                            <div className="flex items-center">
                              <span className="text-xl mr-2">{method.icon}</span>
                              <span className="text-white font-medium">{method.name}</span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                    
                    <div className="bg-neutral-700 p-4 rounded-md mb-6">
                      <div className="flex items-center mb-4">
                        <User size={20} className="text-gray-400 mr-2" />
                        <h3 className="text-white font-medium">Informations de livraison</h3>
                      </div>
                      <div className="text-gray-300 text-sm space-y-1">
                        <p>{watch('firstName')} {watch('lastName')}</p>
                        <p>{watch('email')}</p>
                        <p>{watch('phone')}</p>
                        <p>{watch('address')}, {watch('city')}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-red-500 text-sm mt-2 hover:text-red-400"
                      >
                        Modifier
                      </button>
                    </div>
                    
                    <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3 justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                      >
                        Retour
                      </Button>
                      <Button 
                        type="submit"
                        isLoading={isProcessing}
                      >
                        {isProcessing ? 'Traitement en cours...' : 'Confirmer la commande'}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-neutral-800 rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-4">Résumé de la commande</h2>
                
                <div className="max-h-60 overflow-y-auto mb-4">
                  {items.map(item => (
                    <div key={`${item.product.id}-${item.size}`} className="flex py-3 border-b border-neutral-700">
                      <div className="w-16 h-16 rounded overflow-hidden bg-neutral-700 mr-3">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {item.product.name}
                        </div>
                        <div className="text-gray-400 text-sm">
                          Taille: {item.size} | Qté: {item.quantity}
                        </div>
                        <div className="text-white font-bold">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 border-b border-neutral-700 pb-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sous-total</span>
                    <span className="text-white">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Frais de livraison</span>
                    <span className="text-white">{formatPrice(estimatedShipping)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between mb-4">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-white font-bold text-xl">{formatPrice(total)}</span>
                </div>
                
                <div className="text-sm text-gray-400">
                  En confirmant votre commande, vous acceptez nos <a href="#" className="text-red-500">conditions générales</a>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;