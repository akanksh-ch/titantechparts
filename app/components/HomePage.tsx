import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '~/components/figma/ImageWithFallback';

interface HomePageProps {
  onAddToCart: (product: any) => void;
}

const featuredProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 129.99,
    rating: 4.5,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY4NzE4NTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Audio'
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 299.99,
    rating: 4.8,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNofGVufDF8fHx8MTc2ODcxNDM1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Wearables'
  },
  {
    id: 3,
    name: 'Laptop Pro 15"',
    price: 1299.99,
    rating: 4.7,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3Njg4MjU3MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Computers'
  },
  {
    id: 4,
    name: 'Professional Camera',
    price: 899.99,
    rating: 4.9,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1579535984712-92fffbbaa266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3Njg3NjQ5NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Photography'
  },
  {
    id: 5,
    name: 'Running Shoes',
    price: 89.99,
    rating: 4.6,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXN8ZW58MXx8fHwxNzY4NzY2MDYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Sports'
  },
  {
    id: 6,
    name: 'Travel Backpack',
    price: 59.99,
    rating: 4.4,
    reviews: 678,
    image: 'https://images.unsplash.com/photo-1680039211156-66c721b87625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGJhZ3xlbnwxfHx8fDE3Njg3NDUzNDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Accessories'
  }
];

const categories = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports',
  'Books',
  'Toys'
];

export function HomePage({ onAddToCart }: HomePageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="mb-4">Welcome to ShopHub</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover amazing products at unbeatable prices. Shop the latest trends and enjoy fast, free shipping on orders over $50.
            </p>
            <Link
              to="/search"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              to="/search"
              className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors text-center"
            >
              <span>{category}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2>Featured Products</h2>
          <Link
            to="/search"
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                <h3 className="mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl">${product.price}</span>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-12 text-center text-primary-foreground">
          <h2 className="mb-4 text-primary-foreground">Limited Time Offer</h2>
          <p className="text-lg mb-6 opacity-90">Get 20% off on your first purchase. Use code: WELCOME20</p>
          <Link
            to="/search"
            className="bg-primary-foreground text-primary px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}