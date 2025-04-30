import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères')
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Connexion réussie');
      navigate('/');
    } catch (error) {
      toast.error('Échec de la connexion. Veuillez vérifier vos identifiants.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-neutral-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Connexion</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 bg-neutral-700 border-neutral-600 rounded focus:ring-red-500"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                  Se souvenir de moi
                </label>
              </div>
              <a href="#" className="text-sm text-red-500 hover:text-red-400">
                Mot de passe oublié?
              </a>
            </div>
            
            <Button type="submit" fullWidth isLoading={isLoading}>
              Se connecter
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Pas encore de compte?{' '}
              <Link to="/inscription" className="text-red-500 hover:text-red-400">
                Créer un compte
              </Link>
            </p>
          </div>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-neutral-800 text-gray-400">Ou connectez-vous avec</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" fullWidth>
                Google
              </Button>
              <Button variant="outline" fullWidth>
                Facebook
              </Button>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-gray-400 text-center">
            <p>
              Pour tester, utilisez:<br />
              Admin: admin@example.com / admin123<br />
              ou inscrivez-vous pour un compte client
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;