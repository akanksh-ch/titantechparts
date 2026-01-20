import { ShoppingCart, Search, User, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router';

interface HeaderProps {
  cartItemCount?: number;
}

export function Header({ cartItemCount = 0 }: HeaderProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/home"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="bg-primary rounded-full p-2">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-medium">ShopHub</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/home"
              className={`hover:text-primary transition-colors ${
                currentPath === '/home' ? 'text-primary' : 'text-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`hover:text-primary transition-colors ${
                currentPath === '/search' ? 'text-primary' : 'text-foreground'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/orders"
              className={`hover:text-primary transition-colors ${
                currentPath === '/orders' ? 'text-primary' : 'text-foreground'
              }`}
            >
              Orders
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/search"
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              to="/checkout"
              className="relative p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link
              to="/login"
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}