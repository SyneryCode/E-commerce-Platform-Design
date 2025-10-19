import { motion } from "motion/react";
import { Product, ProductCard } from "./ProductCard";
import { Filter, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { GeometricPattern } from "./GeometricPattern";

interface CategoriesPageProps {
  products: Product[];
  selectedCategory?: string;
  onAddToCart: (product: Product) => void;
  onNavigate: (page: string, data?: any) => void;
}

export function CategoriesPage({ products, selectedCategory, onAddToCart, onNavigate }: CategoriesPageProps) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory || "الكل");
  const [sortBy, setSortBy] = useState("featured");

  const categories = [
    { name: "الكل", count: products.length },
    { name: "منظفات", count: Math.floor(products.length * 0.2) },
    { name: "بهارات", count: Math.floor(products.length * 0.15) },
    { name: "لحوم", count: Math.floor(products.length * 0.12) },
    { name: "ألبان", count: Math.floor(products.length * 0.18) },
    { name: "حلويات", count: Math.floor(products.length * 0.15) },
    { name: "صابون حلبي", count: Math.floor(products.length * 0.1) },
    { name: "زيوت", count: Math.floor(products.length * 0.1) },
  ];

  const filteredProducts = activeCategory === "الكل" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-l from-[#007A3D] to-[#006432] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L35 20 L30 30 L25 20 Z M30 30 L35 40 L30 50 L25 40 Z' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl mb-3"
          >
            تصفح منتجاتنا
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/90"
          >
            اكتشف أفضل المنتجات السورية الأصيلة
          </motion.p>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <GeometricPattern />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5 text-[#007A3D]" />
                  <h3 className="text-[#2A3B4D]">الفئات</h3>
                </div>
                
                <div className="space-y-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.name}
                      whileHover={{ x: 5 }}
                      onClick={() => setActiveCategory(category.name)}
                      className={`w-full text-right px-4 py-3 rounded-lg transition-all ${
                        activeCategory === category.name
                          ? 'bg-gradient-to-r from-[#007A3D] to-[#006432] text-white'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className={`text-sm ${
                          activeCategory === category.name ? 'text-white/80' : 'text-gray-400'
                        }`}>
                          {category.count}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <SlidersHorizontal className="w-5 h-5 text-[#007A3D]" />
                  <h3 className="text-[#2A3B4D]">الترتيب</h3>
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-[#007A3D] focus:outline-none transition-colors"
                >
                  <option value="featured">مميز</option>
                  <option value="rating">الأعلى تقييمًا</option>
                  <option value="newest">الأحدث</option>
                </select>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-br from-[#007A3D]/5 to-[#D4AF37]/5 p-4 rounded-lg">
                  <p className="text-sm text-[#2A3B4D]">
                    ✨ {filteredProducts.length} منتج متوفر
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[#2A3B4D]">
                {activeCategory === "الكل" ? "جميع المنتجات" : activeCategory}
              </h2>
              <p className="text-gray-600">
                {filteredProducts.length} منتج
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onViewDetails={(p) => onNavigate('product', p)}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Filter className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-[#2A3B4D] mb-2">لا توجد منتجات</h3>
                <p className="text-gray-600">جرب تصفح فئة أخرى</p>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
