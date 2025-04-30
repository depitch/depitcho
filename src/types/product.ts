export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'tshirts' | 'hoodies' | 'pants' | 'accessories' | 'shoes';
  sizes: string[];
  inStock: boolean;
  featured?: boolean;
  newArrival?: boolean;
  discount?: number;
  createdAt: Date;
}