
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import type { CartItem } from '@/types';
import { X, Trash2, Plus, Minus, Gift, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch(e) {
        console.error("Failed to parse cart from localStorage", e);
        setCartItems([]);
      }
    }
    setIsLoading(false);
    
    // Listen for cart updates from other components
    const handleCartUpdate = () => {
      const updatedStoredCart = localStorage.getItem('cart');
      if (updatedStoredCart) {
        try {
          setCartItems(JSON.parse(updatedStoredCart));
        } catch (e) {
          console.error("Failed to parse updated cart", e);
        }
      }
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);

  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast({ title: "Item removed from cart." });
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.08; // Example tax rate
  const taxes = subtotal * taxRate;
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 10; // Free shipping over $50
  const total = subtotal + taxes + shipping;

  if (isLoading) {
    return <MainLayout><div className="text-center py-12">Loading your vibe...</div></MainLayout>;
  }

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold text-primary mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any vibes yet. Let's change that!</p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-8">Your Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map(item => (
            <Card key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 bg-card border-border relative overflow-hidden">
              <Link href={`/products/${item.id}`} className="block shrink-0">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={100}
                  height={120}
                  className="rounded-md object-cover aspect-[5/6]"
                  data-ai-hint={item.category === 'clothes' ? 'clothing item' : 'food product'}
                />
              </Link>
              <div className="flex-grow">
                <Link href={`/products/${item.id}`} className="block">
                    <h2 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">{item.name}</h2>
                </Link>
                <p className="text-sm text-muted-foreground">Price: ${item.price.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground capitalize">Category: {item.category}</p>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8">
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  min="1"
                  className="w-16 h-8 text-center"
                />
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="font-semibold text-lg text-primary sm:ml-4 mt-2 sm:mt-0 whitespace-nowrap">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive h-8 w-8">
                <Trash2 className="h-5 w-5" />
              </Button>
            </Card>
          ))}
        </div>

        <Card className="lg:col-span-1 p-6 space-y-6 bg-card border-border sticky top-24">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-semibold text-primary">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium text-foreground">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxes ({(taxRate * 100).toFixed(0)}%)</span>
              <span className="font-medium text-foreground">${taxes.toFixed(2)}</span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between text-xl font-bold">
              <span className="text-primary">Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Input type="text" placeholder="Enter promo code" className="h-10"/>
              <Button variant="outline" className="h-10 whitespace-nowrap hover:border-secondary hover:text-secondary">Apply Code</Button>
            </div>
          </CardContent>
          <CardFooter className="p-0">
            <Button size="lg" asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </CardFooter>
          <div className="text-center text-xs text-muted-foreground pt-2">
            <Gift className="inline h-4 w-4 mr-1 text-secondary" /> Secure checkout. Good vibes guaranteed.
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CartPage;
