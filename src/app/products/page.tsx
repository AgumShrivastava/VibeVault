
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';
import ProductCard from '@/components/product/product-card';
import { getAllProducts } from '@/lib/mock-data';
import type { Product, Category } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Filter, X, ListFilter, SearchIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as Category | null;
  const initialSearchQuery = searchParams.get('q') || '';

  const allProducts = useMemo(() => getAllProducts(), []);
  
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(initialCategory ? [initialCategory] : []);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]); // Max price from products
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    if (allProducts.length > 0) {
      const maxPrice = Math.max(...allProducts.map(p => p.price), 0);
      setPriceRange([0, Math.ceil(maxPrice / 10) * 10 + 10]); // Set initial max price dynamically
    }
  }, [allProducts]);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        // Add more sort options like 'newest' or 'rating' if data supports
        return 0; // Default: relevance (no change from filter)
      });
  }, [searchTerm, selectedCategories, priceRange, sortBy, allProducts]);

  const FilterControls = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 text-lg text-primary">Categories</h3>
        <div className="space-y-2">
          {(['clothes', 'food'] as Category[]).map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={`cat-${category}`} className="capitalize cursor-pointer">{category}</Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3 text-lg text-primary">Price Range</h3>
        <Slider
          defaultValue={[priceRange[0], priceRange[1]]}
          min={0}
          max={Math.max(...allProducts.map(p => p.price), 0) + 10} // Dynamic max
          step={5}
          onValueCommit={(value) => setPriceRange(value as [number, number])}
          className="my-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
       <Button onClick={() => {setSelectedCategories([]); setPriceRange([0, Math.max(...allProducts.map(p => p.price), 0) + 10]); setSearchTerm('')}} variant="outline" className="w-full">
        <X className="mr-2 h-4 w-4" /> Clear Filters
      </Button>
    </div>
  );

  return (
    <MainLayout>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary">
          {initialCategory ? `${initialCategory.charAt(0).toUpperCase() + initialCategory.slice(1)} Collection` : 'All Products'}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Discover the freshest vibes. Filter by category, price, and more.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Filters */}
        <aside className="hidden md:block w-full md:w-1/4 lg:w-1/5 space-y-6 p-4 bg-card rounded-lg shadow-sm self-start sticky top-20">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><Filter className="mr-2 h-6 w-6 text-primary"/>Filters</h2>
          <FilterControls />
        </aside>

        {/* Products Grid */}
        <main className="w-full md:w-3/4 lg:w-4/5">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full sm:max-w-xs">
               <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
               <Input
                type="search"
                placeholder="Search in collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Mobile Filters Trigger */}
              <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="outline">
                    <ListFilter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[300px] sm:w-[400px] bg-background p-4">
                  <SheetHeader>
                    <SheetTitle className="text-primary flex items-center"><Filter className="mr-2 h-5 w-5"/>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <FilterControls />
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit" className="w-full">Apply Filters</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-2xl font-semibold text-muted-foreground">No products match your criteria.</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search term.</p>
            </div>
          )}
        </main>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;

