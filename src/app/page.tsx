
import MainLayout from '@/components/layout/main-layout';
import ProductCard from '@/components/product/product-card';
import PromotionalBanner from '@/components/product/promotional-banner';
import { mockCollections, mockPromotionalBanners, mockProducts } from '@/lib/mock-data';
import type { Product, Collection } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

const HomePage = () => {
  const featuredBanner = mockPromotionalBanners[0];
  const trendingCollection = mockCollections.find(c => c.handle === 'trending-now') || { title: "Trending Now", products: mockProducts.slice(0,4).sort(() => 0.5 - Math.random()) };
  const newArrivals = mockProducts.slice(Math.max(0, mockProducts.length - 4)).reverse(); // Get last 4, newest first

  return (
    <MainLayout>
      {featuredBanner && <PromotionalBanner banner={featuredBanner} />}

      <section className="my-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center">
            <Sparkles className="w-8 h-8 mr-3 text-primary" />
            New Drops
          </h2>
          <Button variant="link" asChild className="text-primary hover:text-accent">
            <Link href="/products?sort=newest">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {trendingCollection && trendingCollection.products.length > 0 && (
        <section className="my-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold flex items-center">
              <Zap className="w-8 h-8 mr-3 text-secondary" />
              {trendingCollection.title}
            </h2>
            <Button variant="link" asChild className="text-secondary hover:text-accent">
              <Link href="/products?sort=popular">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCollection.products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
      
      {mockPromotionalBanners[1] && <PromotionalBanner banner={mockPromotionalBanners[1]} />}

      <section className="my-12">
        <div className="text-center p-8 bg-card rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-primary mb-4">Join the Vibe</h2>
            <p className="text-muted-foreground mb-6">Sign up for exclusive deals, early access to drops, and more!</p>
            <div className="flex justify-center">
                <input type="email" placeholder="Enter your email" className="p-3 rounded-l-md border border-border focus:ring-primary focus:border-primary text-foreground bg-input w-full max-w-sm" />
                <Button type="submit" className="rounded-l-none bg-primary hover:bg-primary/90 text-primary-foreground">Subscribe</Button>
            </div>
        </div>
      </section>

    </MainLayout>
  );
};

export default HomePage;
