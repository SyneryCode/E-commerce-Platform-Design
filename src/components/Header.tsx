import { Logo } from "./Logo";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  cartCount: number;
  onNavigate: (page: string) => void;
  currentPage: string;
  onSearchChange?: (value: string) => void;
  searchValue?: string;
}

export function Header({ cartCount, onNavigate, currentPage, onSearchChange, searchValue = "" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex-shrink-0">
            <Logo />
          </button>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className={`relative w-full transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                placeholder="ابحث عن منتجات سورية..."
                className="w-full px-6 py-3 pr-12 rounded-full bg-gray-50 border-2 border-transparent focus:border-[#007A3D] focus:bg-white transition-all outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onNavigate('login')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <User className="w-5 h-5 text-[#2A3B4D]" />
              <span className="text-[#2A3B4D]">حسابي</span>
            </button>
            
            <button
              onClick={() => onNavigate('cart')}
              className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#007A3D] to-[#006432] text-white rounded-lg hover:shadow-lg transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>السلة</span>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#2A3B4D] text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="ابحث عن منتجات سورية..."
              className="w-full px-6 py-3 pr-12 rounded-full bg-gray-50 border-2 border-transparent focus:border-[#007A3D] focus:bg-white transition-all outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-4 space-y-2">
              <button
                onClick={() => {
                  onNavigate('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50"
              >
                <User className="w-5 h-5 text-[#2A3B4D]" />
                <span>حسابي</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('cart');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-[#007A3D] text-white rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5" />
                  <span>السلة</span>
                </div>
                {cartCount > 0 && (
                  <span className="bg-[#D4AF37] text-[#2A3B4D] text-xs px-2 py-1 rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
