import {
  ShoppingCart,
  Search,
  User,
  ShoppingBag,
  LogOut,
  Heart,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { isAuthenticated, getCurrentUsername, logout } from "~/utils/auth";
import { useWishlist } from "~/context/wishlist";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "~/components/ui/tooltip";

interface HeaderProps {
  cartItemCount?: number;
}

export function Header({ cartItemCount = 0 }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const authenticated = isAuthenticated();
  const username = getCurrentUsername();
  const { wishlistItemCount } = useWishlist();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/home"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/TTP_Logo.png"
              alt="TitanTechParts Logo"
              className="h-10 w-auto"
            />
            <span className="font-medium">TitanTechParts</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/home"
              className={`hover:text-primary transition-colors ${
                currentPath === "/home" ? "text-primary" : "text-foreground"
              }`}
            >
              Home
            </Link>
            <Link to="/about" className="about-link">
              About Us
            </Link>
            <Link
              to="/search"
              className={`hover:text-primary transition-colors ${
                currentPath === "/search" ? "text-primary" : "text-foreground"
              }`}
            >
              Shop
            </Link>
            {authenticated && (
              <Link
                to="/orders"
                className={`hover:text-primary transition-colors ${
                  currentPath === "/orders" ? "text-primary" : "text-foreground"
                }`}
              >
                Orders
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/search"
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent sideOffset={4}>Search</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/wishlist"
                  className="relative p-2 hover:bg-accent rounded-lg transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistItemCount}
                    </span>
                  )}
                </Link>
              </TooltipTrigger>
              <TooltipContent sideOffset={4}>Wishlist</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
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
              </TooltipTrigger>
              <TooltipContent sideOffset={4}>Cart</TooltipContent>
            </Tooltip>

            {/* Auth Section */}
            {authenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {username}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleLogout}
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                      aria-label="Logout"
                      title="Logout"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={4}>Logout</TooltipContent>
                </Tooltip>
              </div>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/login"
                    className="p-2 hover:bg-accent rounded-lg transition-colors"
                    aria-label="Profile"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>Profile</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
