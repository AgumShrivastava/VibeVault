
import Link from 'next/link';
import { Github, Twitter, Instagram } from 'lucide-react';
import Logo from '@/components/ui/logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/40 text-card-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-3 lg:col-span-1 mb-6 lg:mb-0">
            <Logo className="mb-4" />
            <p className="text-sm text-muted-foreground">
              Your source for the freshest Gen-Z trends in fashion and food.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products?category=clothes" className="text-muted-foreground hover:text-foreground transition-colors">Clothes</Link></li>
              <li><Link href="/products?category=food" className="text-muted-foreground hover:text-foreground transition-colors">Food</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">New Arrivals</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">Trending</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">Account</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/account" className="text-muted-foreground hover:text-foreground transition-colors">My Account</Link></li>
              <li><Link href="/account/orders" className="text-muted-foreground hover:text-foreground transition-colors">Order History</Link></li>
              <li><Link href="/account/returns" className="text-muted-foreground hover:text-foreground transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/cart" className="text-muted-foreground hover:text-foreground transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQs</Link></li>
              <li className="flex space-x-3 pt-2">
                <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></Link>
                <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></Link>
                <Link href="#" aria-label="Github" className="text-muted-foreground hover:text-primary transition-colors"><Github size={20} /></Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Vibe Vault. All Rights Reserved. Built with <span className="text-primary">❤</span> by Gen Z for Gen Z.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
