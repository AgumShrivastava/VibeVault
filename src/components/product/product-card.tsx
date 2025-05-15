
"use client";
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart, Eye } from 'lucide-react';
import ReviewStars from './review-stars';
import { useToast } from '@/hooks/use-toast'; // Assuming useToast is for notifications

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toast } = useToast();

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent link navigation if button is inside Link
    // Basic client-side cart logic (can be improved with Context/ Zustand)
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cart.findIndex((item: Product) => item.id === product.id);
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    
    toast({
      title: `${product.name} added to cart!`,
      description: "Check your cart to proceed to checkout.",
      variant: 'default',
    });
    // Optionally, dispatch an event to update cart icon in header
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };


  return (
    <Card className="w-full overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col h-full bg-card">
      <Link href={`/products/${product.id}`} className="block">
        <CardHeader className="p-0">
          <div className="aspect-[3/4] relative overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={product.category === 'clothes' ? 'fashion model' : 'food item'}
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`} className="block">
          <CardTitle className="text-lg font-semibold hover:text-primary transition-colors truncate">
            {product.name}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1 h-10 overflow-hidden text-ellipsis">
            {product.description}
          </CardDescription>
        </Link>
        {product.averageRating && (
          <div className="mt-2">
            <ReviewStars rating={product.averageRating} reviewCount={product.reviews?.length} />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild className="hover:border-primary hover:text-primary">
             <Link href={`/products/${product.id}`}>
                <Eye className="mr-2 h-4 w-4" /> View
             </Link>
          </Button>
          <Button variant="default" size="sm" onClick={handleAddToCart} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
