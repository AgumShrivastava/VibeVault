
"use client";

import Link from 'next/link';
import { Search, ShoppingCart, UserCircle, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/ui/logo';
import type { NavItem } from '@/types';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState, useEffect } from 'react';

const mainNavItems: NavItem[] = [
  { href: '/products?category=clothes', label: 'Clothes' },
  { href: '/products?category=food', label: 'Food' },
  { href: '/products', label: 'All Products' },
];

const accountNavItems: NavItem[] = [
  { href: '/account/profile', label: 'Profile' },
  { href: '/account/orders', label: 'My Orders' },
  { href: '/account/returns', label: 'Returns' },
];

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0); // Placeholder for cart count

  useEffect(() => {
    // Simulate fetching cart item count
    // In a real app, this would come from a cart context or API
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const cart = JSON.parse(storedCart);
        setCartItemCount(cart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
        setCartItemCount(0);
      }
    }
  }, []);


  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        pathname === href || (href !== '/' && pathname.startsWith(href))
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {label}
    </Link>
  );
  
  const AccountDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-foreground hover:text-primary">
          <UserCircle className="h-6 w-6" />
          <span className="sr-only">Account</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {accountNavItems.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/login">Login / Sign Up</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
          {mainNavItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="hidden sm:flex items-center space-x-2 bg-card p-1 rounded-md">
            <Input type="search" placeholder="Search products..." className="h-8 w-40 lg:w-64 border-0 focus:ring-0 bg-transparent" />
            <Button type="submit" variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          
          <AccountDropdown />

          <Button asChild variant="ghost" size="icon" className="relative text-foreground hover:text-primary">
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Logo />
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                       <X className="h-6 w-6" />
                     </Button>
                  </SheetClose>
                </div>
                
                <Input type="search" placeholder="Search products..." className="h-10 mb-4" />

                <nav className="flex flex-col space-y-3 flex-grow">
                  {mainNavItems.map((item) => (
                    <NavLink key={item.href} href={item.href} label={item.label} />
                  ))}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted flex justify-between items-center w-full">
                      Account <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      {accountNavItems.map((item) => (
                        <DropdownMenuItem key={item.href} asChild>
                          <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}>{item.label}</Link>
                        </DropdownMenuItem>
                      ))}
                       <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                           <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login / Sign Up</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
