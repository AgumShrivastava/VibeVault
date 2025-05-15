
"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { CartItem } from '@/types'; // Assuming you have CartItem type
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, CreditCard, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeAccordion, setActiveAccordion] = useState("shipping");

  useEffect(() => {
    // Load cart from localStorage (or context/state management)
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch(e) {
         console.error("Failed to parse cart from localStorage for checkout", e);
      }
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.08; // Example tax rate
  const taxes = subtotal * taxRate;
  const shippingCost = subtotal > 50 || subtotal === 0 ? 0 : 10; // Assuming 50 is now INR
  const total = subtotal + taxes + shippingCost;

  // Form state (simplified)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'India', // Default to India
    paymentMethod: 'card', // 'card', 'paypal'
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission logic (e.g., API call to payment gateway and order creation)
    alert('Order placed successfully! (This is a demo)');
    localStorage.removeItem('cart'); // Clear cart after successful order
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    // Redirect to an order confirmation page
    // router.push('/order-confirmation?orderId=...');
  };
  
  if (cartItems.length === 0 && subtotal === 0) {
     return (
      <MainLayout>
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold text-primary mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Cannot proceed to checkout without items.</p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-8 text-center">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-2 space-y-6">
          <Accordion type="single" collapsible defaultValue="shipping" value={activeAccordion} onValueChange={setActiveAccordion} className="w-full">
            <AccordionItem value="shipping" className="border-border bg-card rounded-lg overflow-hidden">
              <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-primary hover:no-underline">
                <div className="flex items-center"><Truck className="mr-3 h-6 w-6"/>Shipping Address</div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} required /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label htmlFor="firstName">First Name</Label><Input id="firstName" name="firstName" placeholder="Vibe" value={formData.firstName} onChange={handleInputChange} required /></div>
                  <div><Label htmlFor="lastName">Last Name</Label><Input id="lastName" name="lastName" placeholder="Master" value={formData.lastName} onChange={handleInputChange} required /></div>
                </div>
                <div><Label htmlFor="address">Address</Label><Input id="address" name="address" placeholder="123 Vibe Street" value={formData.address} onChange={handleInputChange} required /></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><Label htmlFor="city">City</Label><Input id="city" name="city" placeholder="Vibeville" value={formData.city} onChange={handleInputChange} required /></div>
                  <div><Label htmlFor="postalCode">Postal Code</Label><Input id="postalCode" name="postalCode" placeholder="PIN Code" value={formData.postalCode} onChange={handleInputChange} required /></div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <select id="country" name="country" value={formData.country} onChange={handleInputChange} className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                        <option>India</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                    </select>
                  </div>
                </div>
                <Button onClick={() => setActiveAccordion("payment")} className="w-full sm:w-auto mt-2 bg-primary text-primary-foreground hover:bg-primary/90">Continue to Payment</Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment" className="border-border bg-card rounded-lg overflow-hidden mt-4">
              <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-primary hover:no-underline">
                 <div className="flex items-center"><CreditCard className="mr-3 h-6 w-6"/>Payment Details</div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0 space-y-4">
                <RadioGroup defaultValue="card" name="paymentMethod" value={formData.paymentMethod} onValueChange={(value) => setFormData(prev => ({...prev, paymentMethod: value}))} className="mb-4">
                  <div className="flex items-center space-x-2 p-3 border rounded-md bg-background"><RadioGroupItem value="card" id="card" /><Label htmlFor="card">Credit/Debit Card</Label></div>
                  <div className="flex items-center space-x-2 p-3 border rounded-md bg-background"><RadioGroupItem value="upi" id="upi" /><Label htmlFor="upi">UPI (Demo)</Label></div>
                  <div className="flex items-center space-x-2 p-3 border rounded-md bg-background"><RadioGroupItem value="paypal" id="paypal" disabled /><Label htmlFor="paypal">PayPal (Unavailable)</Label></div>
                </RadioGroup>
                {formData.paymentMethod === 'card' && (
                  <>
                    <div><Label htmlFor="cardNumber">Card Number</Label><Input id="cardNumber" name="cardNumber" placeholder="•••• •••• •••• ••••" value={formData.cardNumber} onChange={handleInputChange} /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label htmlFor="expiryDate">Expiry Date</Label><Input id="expiryDate" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleInputChange} /></div>
                      <div><Label htmlFor="cvc">CVC</Label><Input id="cvc" name="cvc" placeholder="•••" value={formData.cvc} onChange={handleInputChange} /></div>
                    </div>
                  </>
                )}
                 {formData.paymentMethod === 'upi' && (
                  <>
                    <div><Label htmlFor="upiId">UPI ID</Label><Input id="upiId" name="upiId" placeholder="yourname@okhdfcbank" onChange={handleInputChange} /></div>
                  </>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6">
            <Lock className="mr-2 h-5 w-5" /> Place Order Securely
          </Button>
        </form>

        {/* Order Summary */}
        <Card className="lg:col-span-1 p-6 space-y-4 bg-card border-border sticky top-24">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-semibold text-primary">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-3">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between text-sm py-2 border-b border-border/50 last:border-none">
                <div className="flex items-center gap-3">
                  <Image src={item.images[0]} alt={item.name} width={40} height={50} className="rounded object-cover aspect-[4/5]" />
                  <div>
                    <p className="text-foreground font-medium">{item.name} <span className="text-xs text-muted-foreground">(x{item.quantity})</span></p>
                    <p className="text-xs text-muted-foreground">₹{item.price.toFixed(2)} each</p>
                  </div>
                </div>
                <p className="text-foreground font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <Separator className="my-3" />
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-medium text-foreground">₹{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="font-medium text-foreground">{shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Taxes</span><span className="font-medium text-foreground">₹{taxes.toFixed(2)}</span></div>
            <Separator className="my-3" />
            <div className="flex justify-between text-xl font-bold"><span className="text-primary">Total</span><span className="text-primary">₹{total.toFixed(2)}</span></div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
