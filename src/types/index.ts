
import type { LucideIcon } from 'lucide-react';

export type Category = "clothes" | "food";

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  images: string[]; // URLs to images
  stock: number;
  reviews?: Review[];
  tags?: string[];
  sku?: string;
  details?: Record<string, string>; // e.g. material, size, ingredients
  averageRating?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
  active?: boolean; // For current page highlighting
  children?: NavItem[]; // For sub-menus
}

export interface Collection {
  id: string;
  title: string;
  description?: string;
  handle: string; // URL slug
  products: Product[];
}

export interface PromotionalBannerData {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  imageHint?: string;
  ctaText?: string;
  ctaLink?: string;
}
