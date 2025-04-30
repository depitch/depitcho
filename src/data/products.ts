import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'T-shirt Streetlife Oversize',
    description: 'T-shirt oversize avec imprimé graphique "Streetlife". Parfait pour un style décontracté et urbain. 100% coton de qualité premium.',
    price: 39.99,
    images: [
      'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'tshirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: true,
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Hoodie Urban Culture Noir',
    description: 'Hoodie noir avec logo "Urban Culture" brodé. Chaud et confortable avec une capuche doublée et poche kangourou. 80% coton, 20% polyester.',
    price: 69.99,
    images: [
      'https://images.pexels.com/photos/6311659/pexels-photo-6311659.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6311171/pexels-photo-6311171.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'hoodies',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    newArrival: true,
    createdAt: new Date('2023-02-10')
  },
  {
    id: '3',
    name: 'Pantalon Cargo Streetstyle',
    description: 'Pantalon cargo avec multiples poches et détails techniques. Coupe ample parfaite pour un look streetwear authentique. 98% coton, 2% élasthanne.',
    price: 79.99,
    images: [
      'https://images.pexels.com/photos/6764007/pexels-photo-6764007.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6764021/pexels-photo-6764021.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'pants',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    createdAt: new Date('2023-03-05')
  },
  {
    id: '4',
    name: 'Casquette Snapback Urban Vibe',
    description: 'Casquette snapback avec logo "Urban Vibe" brodé. Ajustable avec fermeture snapback et visière plate. Style urbain intemporel.',
    price: 29.99,
    images: [
      'https://images.pexels.com/photos/844867/pexels-photo-844867.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1078975/pexels-photo-1078975.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'accessories',
    sizes: ['Unique'],
    inStock: true,
    featured: true,
    createdAt: new Date('2023-04-15')
  },
  {
    id: '5',
    name: 'Sneakers StreetRunner',
    description: 'Sneakers basses au design urbain. Semelle amortissante et tige en matière synthétique respirante. Un classique du streetwear réinventé.',
    price: 89.99,
    images: [
      'https://images.pexels.com/photos/7534774/pexels-photo-7534774.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5868252/pexels-photo-5868252.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'shoes',
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    inStock: true,
    createdAt: new Date('2023-05-20')
  },
  {
    id: '6',
    name: 'T-shirt Graffiti Print',
    description: 'T-shirt noir avec impression graffiti artistique. Coupe regular fit avec col rond. 100% coton biologique.',
    price: 44.99,
    images: [
      'https://images.pexels.com/photos/7691098/pexels-photo-7691098.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6476260/pexels-photo-6476260.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'tshirts',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    discount: 20,
    createdAt: new Date('2023-06-10')
  },
  {
    id: '7',
    name: 'Hoodie Oversized Noir',
    description: 'Hoodie oversized noir avec détails réfléchissants. Look parfait pour les soirées urbaines. Matière douce et confortable.',
    price: 79.99,
    images: [
      'https://images.pexels.com/photos/14557887/pexels-photo-14557887.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6740736/pexels-photo-6740736.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    newArrival: true,
    createdAt: new Date('2023-07-05')
  },
  {
    id: '8',
    name: 'Bonnet Streetwear Urbain',
    description: 'Bonnet tricoté avec logo brodé. Parfait pour les journées froides tout en gardant un style urbain.',
    price: 24.99,
    images: [
      'C:\Users\HP EliteBook\Pictures\IMG-20250413-WA0010.jpg',
      'https://images.pexels.com/photos/3299386/pexels-photo-3299386.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'accessories',
    sizes: ['Unique'],
    inStock: true,
    featured: true,
    createdAt: new Date('2023-08-15')
  }
];