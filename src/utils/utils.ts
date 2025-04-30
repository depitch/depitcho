import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF'
  }).format(price);
}

export const paymentMethods = [
  { id: 'wave', name: 'Wave', icon: '💸' },
  { id: 'orange', name: 'Orange Money', icon: '🔶' },
  { id: 'moov', name: 'Moov Money', icon: '📱' },
  { id: 'mtn', name: 'MTN Money', icon: '💰' }
];