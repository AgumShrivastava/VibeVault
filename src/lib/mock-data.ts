
import type { Product, Collection, PromotionalBannerData, Review, Category } from '@/types';

const generateReviews = (productId: string): Review[] => {
  const reviewCount = Math.floor(Math.random() * 5) + 1;
  const reviews: Review[] = [];
  const authors = ["GamerGuyX", "StyleQueen", "FoodieFiend", "AnonymousUser", "VibeChecker"];
  for (let i = 0; i < reviewCount; i++) {
    reviews.push({
      id: `${productId}-review-${i + 1}`,
      author: authors[Math.floor(Math.random() * authors.length)],
      rating: Math.floor(Math.random() * 3) + 3, // 3 to 5 stars
      comment: "This is pretty dope! Would totally recommend to a friend. " + "Lorem ipsum dolor sit amet, consectetur adipiscing elit.".repeat(Math.floor(Math.random() * 2)),
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  }
  return reviews;
};

const calculateAverageRating = (reviews?: Review[]): number | undefined => {
  if (!reviews || reviews.length === 0) return undefined;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return parseFloat((totalRating / reviews.length).toFixed(1));
};

const products_initial_data: Omit<Product, 'reviews' | 'averageRating'>[] = [
  {
    id: 'cloth-001',
    name: 'Neon Drip Hoodie',
    description: 'Ultra-comfy hoodie with a splash of neon green. Perfect for late-night vibes.',
    price: 69.99,
    category: 'clothes',
    images: ['https://placehold.co/600x800/1A1A1A/39FF14?text=NeonHoodie1', 'https://placehold.co/600x800/1A1A1A/39FF14?text=NeonHoodie2'],
    stock: 50,
    tags: ['hoodie', 'neon', 'streetwear'],
    sku: 'VV-HD-NG-001',
    details: { size: 'M, L, XL', material: '80% Cotton, 20% Polyester' },
  },
  {
    id: 'cloth-002',
    name: 'Glitch Graphic Tee',
    description: 'Statement tee with a unique glitch art design. Stand out from the crowd.',
    price: 29.99,
    category: 'clothes',
    images: ['https://placehold.co/600x800/1A1A1A/8F00FF?text=GlitchTee1', 'https://placehold.co/600x800/1A1A1A/8F00FF?text=GlitchTee2'],
    stock: 100,
    tags: ['t-shirt', 'graphic', 'edgy'],
    sku: 'VV-TS-GL-002',
    details: { size: 'S, M, L', material: '100% Organic Cotton' },
  },
  {
    id: 'cloth-003',
    name: 'Cyberpunk Cargo Pants',
    description: 'Futuristic cargo pants with multiple pockets and techwear aesthetic.',
    price: 89.99,
    category: 'clothes',
    images: ['https://placehold.co/600x800/1A1A1A/FFFFFF?text=CargoPants1', 'https://placehold.co/600x800/1A1A1A/FFFFFF?text=CargoPants2'],
    stock: 30,
    tags: ['pants', 'cargo', 'techwear'],
    sku: 'VV-PT-CB-003',
    details: { size: 'S, M, L', material: 'Nylon Blend' },
  },
  {
    id: 'cloth-004',
    name: 'Digital Camo Tee',
    description: 'A stylish t-shirt with a modern digital camouflage pattern. Blend in, stand out.',
    price: 34.99,
    category: 'clothes',
    images: [
      'https://placehold.co/600x800.png',
      'https://placehold.co/600x800.png'
    ],
    stock: 75,
    tags: ['t-shirt', 'camo', 'streetwear', 'digital'],
    sku: 'VV-TS-DC-004',
    details: { size: 'S, M, L, XL', material: '95% Cotton, 5% Spandex' },
  },
  {
    id: 'food-001',
    name: 'Spicy Ramen Kit (2 Servings)',
    description: 'Challenge your taste buds with this fiery ramen kit. Includes noodles, broth, and toppings.',
    price: 15.99,
    category: 'food',
    images: ['https://placehold.co/600x400/1A1A1A/FF0000?text=SpicyRamen', 'https://placehold.co/600x400/1A1A1A/FF0000?text=RamenIngredients'],
    stock: 200,
    tags: ['ramen', 'spicy', 'asian food'],
    sku: 'VV-FD-RM-001',
    details: { allergens: 'Wheat, Soy', netWeight: '450g' },
  },
  {
    id: 'food-002',
    name: 'Gamer Fuel Energy Drink (6 Pack)',
    description: 'Stay energized during long gaming sessions with this electric purple energy drink.',
    price: 12.99,
    category: 'food',
    images: ['https://placehold.co/600x400/1A1A1A/8F00FF?text=EnergyDrink', 'https://placehold.co/600x400/1A1A1A/8F00FF?text=EnergyDrinkPack'],
    stock: 150,
    tags: ['energy drink', 'gaming', 'beverage'],
    sku: 'VV-FD-ED-002',
    details: { flavor: 'Electric Berry', volume: '6 x 250ml' },
  },
  {
    id: 'food-003',
    name: 'Artisanal Boba Tea Kit',
    description: 'Craft your own delicious boba tea at home. Includes tea, pearls, and straws.',
    price: 24.99,
    category: 'food',
    images: ['https://placehold.co/600x400/1A1A1A/39FF14?text=BobaKit', 'https://placehold.co/600x400/1A1A1A/39FF14?text=BobaIngredients'],
    stock: 80,
    tags: ['boba', 'bubble tea', 'diy kit'],
    sku: 'VV-FD-BT-003',
    details: { flavorsIncluded: 'Classic Milk Tea, Taro', servings: 'Approx. 5' },
  },
];

const productsWithFullData: Product[] = products_initial_data.map(p => {
  const reviews = generateReviews(p.id);
  return { ...p, reviews, averageRating: calculateAverageRating(reviews) };
});

export const mockProducts: Product[] = productsWithFullData;

export const mockCollections: Collection[] = [
  {
    id: 'col-001',
    title: 'Fresh Drops',
    handle: 'fresh-drops',
    products: mockProducts.slice(0, 4), // Increased to show new product if it's at the start or use .filter
  },
  {
    id: 'col-002',
    title: 'Trending Now',
    handle: 'trending-now',
    products: [...mockProducts].sort(() => 0.5 - Math.random()).slice(0, 4), // Ensure enough products for variety
  },
  {
    id: 'col-003',
    title: 'Snack Attack',
    handle: 'snack-attack',
    products: mockProducts.filter(p => p.category === 'food'),
  },
];

export const mockPromotionalBanners: PromotionalBannerData[] = [
  {
    id: 'banner-001',
    title: 'VIBE VAULT IS LIVE!',
    subtitle: 'Your one-stop shop for the freshest gear & munchies. 🚀',
    imageUrl: 'https://placehold.co/1200x400.png',
    imageHint: "abstract geometric",
    ctaText: 'Explore Now',
    ctaLink: '/products',
  },
  {
    id: 'banner-002',
    title: 'LEVEL UP YOUR STYLE',
    subtitle: 'Exclusive clothing drops weekly. Don\'t miss out!',
    imageUrl: 'https://placehold.co/1200x400.png',
    imageHint: "fashion model",
    ctaText: 'Shop Clothes',
    ctaLink: '/products?category=clothes',
  },
];

export const getProductById = (id: string): Product | undefined => mockProducts.find(p => p.id === id);

export const getProductsByCategory = (category: Category): Product[] => mockProducts.filter(p => p.category === category);

export const getAllProducts = (): Product[] => mockProducts;
