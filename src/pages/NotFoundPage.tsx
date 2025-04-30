import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-9xl font-bold text-red-600">404</h1>
        <h2 className="text-3xl font-bold text-white mt-4 mb-6">Page non trouvée</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/">
          <Button>
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;