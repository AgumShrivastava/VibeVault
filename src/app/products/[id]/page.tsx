
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MainLayout from '@/components/layout/main-layout';
import { getProductById, mockProducts } from '@/lib/mock-data';
import type { Product, Review } from '@/types';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import ReviewStars from '@/components/product/review-stars';
import ProductCard from '@/components/product/product-card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProductPageParams {
  id: string;
}

const ProductDetailPage = ({ params }: { params: ProductPageParams }) => {
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Form states for new review
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');


  useEffect(() => {
    const fetchedProduct = getProductById(params.id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      // Fetch related products (simple logic: same category, not self)
      setRelatedProducts(
        mockProducts
          .filter(p => p.category === fetchedProduct.category && p.id !== fetchedProduct.id)
          .slice(0, 4)
      );
    }
  }, [params.id]);

  if (!product) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold">Product not found.</h1>
        </div>
      </MainLayout>
    );
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cart.findIndex((item: Product) => item.id === product.id);
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    toast({
      title: `${product.name} (x${quantity}) added to cart!`,
      description: "Your vibe is leveling up.",
    });
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment || reviewRating < 1 || reviewRating > 5) {
        toast({ title: "Incomplete Review", description: "Please fill all fields and select a rating.", variant: "destructive"});
        return;
    }
    const newReview: Review = {
        id: `review-${Date.now()}`,
        author: reviewAuthor,
        rating: reviewRating,
        comment: reviewComment,
        date: new Date().toISOString().split('T')[0],
    };
    // In a real app, this would be an API call. Here we just update local state.
    setProduct(prevProduct => prevProduct ? ({
        ...prevProduct,
        reviews: [...(prevProduct.reviews || []), newReview]
    }) : null);

    toast({ title: "Review Submitted!", description: "Thanks for sharing your vibe!" });
    setReviewAuthor('');
    setReviewComment('');
    setReviewRating(5);
  };


  return (
    <MainLayout>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Image Gallery */}
        <div className="space-y-4 sticky top-20">
          <div className="relative aspect-square rounded-lg overflow-hidden border border-border bg-card shadow-md">
            <Image
              src={product.images[selectedImageIndex]}
              alt={`${product.name} - image ${selectedImageIndex + 1}`}
              layout="fill"
              objectFit="contain"
              className="transition-opacity duration-300"
              data-ai-hint={product.category === 'clothes' ? 'clothing item detail' : 'food product detail'}
            />
             {product.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 text-foreground"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 text-foreground"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index ? 'border-primary ring-2 ring-primary' : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${index + 1}`} layout="fill" objectFit="cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-primary">{product.name}</h1>
          
          {product.averageRating && (
            <div className="flex items-center gap-2">
              <ReviewStars rating={product.averageRating} reviewCount={product.reviews?.length} starSize={20} />
            </div>
          )}

          <p className="text-3xl font-bold text-foreground">₹{product.price.toFixed(2)}</p>
          
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4">
            <Label htmlFor="quantity" className="text-sm font-medium">Quantity:</Label>
            <Input 
              type="number" 
              id="quantity" 
              value={quantity} 
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value,10) || 1))} 
              min="1" 
              max={product.stock}
              className="w-20 h-10"
            />
            <Button size="lg" onClick={handleAddToCart} className="bg-primary hover:bg-primary/90 text-primary-foreground flex-grow sm:flex-grow-0">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>
          {product.stock < 10 && product.stock > 0 && (
            <p className="text-sm text-destructive">Only {product.stock} left in stock! Grab it fast!</p>
          )}
          {product.stock === 0 && (
             <p className="text-sm text-destructive">Out of stock!</p>
          )}

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews?.length || 0})</TabsTrigger>
              {product.category === 'food' && <TabsTrigger value="nutrition">Nutrition</TabsTrigger>}
            </TabsList>
            <TabsContent value="details" className="mt-4 p-4 bg-card rounded-md border">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong className="text-foreground">SKU:</strong> {product.sku || 'N/A'}</li>
                <li><strong className="text-foreground">Category:</strong> <span className="capitalize">{product.category}</span></li>
                {product.tags && <li><strong className="text-foreground">Tags:</strong> {product.tags.join(', ')}</li>}
                {product.details && Object.entries(product.details).map(([key, value]) => (
                  <li key={key}><strong className="text-foreground capitalize">{key}:</strong> {value}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4 p-4 bg-card rounded-md border">
              <h3 className="text-xl font-semibold mb-4 text-primary">Customer Reviews</h3>
              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-6">
                  {product.reviews.map(review => (
                    <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-semibold text-foreground">{review.author}</h4>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <ReviewStars rating={review.rating} starSize={16}/>
                      <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                       <div className="mt-2 flex gap-2">
                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary"><ThumbsUp size={14} className="mr-1"/> Helpful</Button>
                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-destructive"><ThumbsDown size={14} className="mr-1"/> Not Helpful</Button>
                        </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No reviews yet. Be the first to share your vibe!</p>
              )}
              <Separator className="my-6" />
              <h3 className="text-lg font-semibold mb-3 text-primary">Leave a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="reviewAuthor">Name</Label>
                  <Input id="reviewAuthor" value={reviewAuthor} onChange={e => setReviewAuthor(e.target.value)} placeholder="Your Name" required />
                </div>
                <div>
                  <Label htmlFor="reviewRating">Rating</Label>
                  <div className="flex">
                    {[1,2,3,4,5].map(star => (
                      <Button key={star} type="button" variant="ghost" size="icon" onClick={() => setReviewRating(star)} className={`hover:text-primary ${reviewRating >= star ? 'text-primary' : 'text-muted-foreground'}`}>
                        <Star fill={reviewRating >= star ? 'currentColor' : 'none'} className="h-5 w-5" />
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="reviewComment">Comment</Label>
                  <Textarea id="reviewComment" value={reviewComment} onChange={e => setReviewComment(e.target.value)} placeholder="Share your thoughts..." required />
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Submit Review</Button>
              </form>
            </TabsContent>
            {product.category === 'food' && 
              <TabsContent value="nutrition" className="mt-4 p-4 bg-card rounded-md border">
                <p className="text-sm text-muted-foreground">Nutritional information placeholder. Ingredients: Sugar, Spice, and Everything Nice (plus Chemical X for that extra vibe).</p>
              </TabsContent>
            }
          </Tabs>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-12 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold mb-6 text-center text-secondary">You Might Also Vibe With</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default ProductDetailPage;
