import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';
import { products } from '../data/products';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      image: "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "La nouvelle collection est arrivée",
      subtitle: "Découvrez les dernières tendances streetwear",
      ctaText: "Acheter maintenant",
      ctaLink: "/boutique?newArrivals=true"
    },
    {
      image: "https://images.pexels.com/photos/4016579/pexels-photo-4016579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Style urbain, attitude authentique",
      subtitle: "Exprimez votre personnalité avec notre collection exclusive",
      ctaText: "Explorer",
      ctaLink: "/boutique"
    }
  ];
  
  const featuredProducts = products.filter(product => product.featured);
  const newArrivals = products.filter(product => product.newArrival);
  const discountedProducts = products.filter(product => product.discount);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);
  
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="container mx-auto px-4 h-full flex flex-col justify-center">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8">
                  {slide.subtitle}
                </p>
                <Link to={slide.ctaLink}>
                  <Button size="lg">
                    {slide.ctaText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Hero slide indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white scale-110' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-neutral-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Catégories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'T-shirts', image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'tshirts' },
              { name: 'Hoodies', image: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'hoodies' },
              { name: 'Pantalons', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'pants' },
              { name: 'Accessoires', image: 'https://images.pexels.com/photos/1078973/pexels-photo-1078973.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'accessories' },
              { name: 'Chaussures', image: 'https://images.pexels.com/photos/2421374/pexels-photo-2421374.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'shoes' }
            ].map((category, index) => (
              <Link 
                key={index} 
                to={`/boutique?category=${category.category}`} 
                className="relative overflow-hidden rounded-lg group"
              >
                <div className="aspect-square">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-lg md:text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Produits à la Une</h2>
            <Link to="/boutique?featured=true" className="text-red-500 hover:text-red-600 flex items-center">
              Voir tout <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Promo Banner */}
      <section className="py-16 bg-gradient-to-r from-red-900 to-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Obtenez <span className="text-red-500">20% de réduction</span><br /> sur votre première commande
              </h2>
              <p className="text-gray-300 mb-6">
                Inscrivez-vous à notre newsletter et recevez un code promo exclusif pour votre première commande.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="px-4 py-3 rounded-l-md bg-white text-black focus:outline-none w-full max-w-xs"
                />
                <Button className="rounded-l-none">S'inscrire</Button>
              </div>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Promo"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-16 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Nouveautés</h2>
            <Link to="/boutique?newArrivals=true" className="text-red-500 hover:text-red-600 flex items-center">
              Voir tout <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Instagram Feed */}
      <section className="py-16 bg-neutral-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Instagram</h2>
          <p className="text-gray-400 text-center mb-8">Suivez-nous @urbanwear</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "https://images.pexels.com/photos/7691087/pexels-photo-7691087.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/2531151/pexels-photo-2531151.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/6311171/pexels-photo-6311171.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/6763793/pexels-photo-6763793.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/6311659/pexels-photo-6311659.jpeg?auto=compress&cs=tinysrgb&w=800"
            ].map((image, index) => (
              <a 
                key={index} 
                href="#" 
                className="block aspect-square overflow-hidden relative group"
              >
                <img 
                  src={image} 
                  alt={`Instagram post ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white">Voir sur Instagram</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;