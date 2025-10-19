import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { CategoriesPage } from "./components/CategoriesPage";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { CartPage } from "./components/CartPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { LoginPage } from "./components/LoginPage";
import { DashboardPage } from "./components/DashboardPage";
import { Product } from "./components/ProductCard";
import { motion, AnimatePresence } from "motion/react";
import { toast, Toaster } from "sonner@2.0.3";

interface CartItem extends Product {
  quantity: number;
}

// Mock products data
const generateProducts = (): Product[] => {
  const products = [
    {
      id: "1",
      name: "زيت زيتون بكر من حلب",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGl2ZSUyMG9pbCUyMGJvdHRsZXxlbnwxfHx8fDE3NjAzODI3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 234,
      madeInSyria: true,
      fastDelivery: true,
      city: "حلب",
      category: "زيوت",
    },
    {
      id: "2",
      name: "صابون غار حلبي أصلي",
      image: "https://images.unsplash.com/photo-1630942047135-0c65700df966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2FwJTIwbmF0dXJhbHxlbnwxfHx8fDE3NjA0NTUxMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviews: 412,
      madeInSyria: true,
      fastDelivery: true,
      city: "حلب",
      category: "صابون حلبي",
    },
    {
      id: "3",
      name: "زعتر أخضر طبيعي",
      image: "https://images.unsplash.com/photo-1674003487145-80ee8ef3d174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzYwNDU1MTA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviews: 189,
      madeInSyria: true,
      fastDelivery: false,
      city: "دمشق",
      category: "بهارات",
    },
    {
      id: "4",
      name: "عسل طبيعي من حمص",
      image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25leSUyMGphcnxlbnwxfHx8fDE3NjA0NTM5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 301,
      madeInSyria: true,
      fastDelivery: true,
      city: "حمص",
      category: "حلويات",
    },
    {
      id: "5",
      name: "حلاوة طحينية دمشقية",
      image: "https://images.unsplash.com/photo-1707151550757-fd379e80d1d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzeXJpYW4lMjBmb29kfGVufDF8fHx8MTc2MDQ1NTEwN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      reviews: 156,
      madeInSyria: true,
      fastDelivery: true,
      city: "دمشق",
      category: "حلويات",
    },
    {
      id: "6",
      name: "زيتون أسود من حمص",
      image: "https://images.unsplash.com/photo-1571040370099-62a83ea5feda?w=500",
      rating: 4.8,
      reviews: 278,
      madeInSyria: true,
      fastDelivery: false,
      city: "حمص",
      category: "منظفات",
    },
    {
      id: "7",
      name: "كبة حلبية مجمدة",
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500",
      rating: 4.7,
      reviews: 198,
      madeInSyria: true,
      fastDelivery: true,
      city: "حلب",
      category: "لحوم",
    },
    {
      id: "8",
      name: "لبنة بلدية طازجة",
      image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500",
      rating: 4.9,
      reviews: 445,
      madeInSyria: true,
      fastDelivery: true,
      city: "دمشق",
      category: "ألبان",
    },
    {
      id: "9",
      name: "فستق حلبي محمص",
      image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500",
      rating: 4.8,
      reviews: 367,
      madeInSyria: true,
      fastDelivery: false,
      city: "حلب",
      category: "حلويات",
    },
    {
      id: "10",
      name: "معمول بالفستق",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500",
      rating: 4.9,
      reviews: 512,
      madeInSyria: true,
      fastDelivery: true,
      city: "دمشق",
      category: "حلويات",
    },
    {
      id: "11",
      name: "مربى المشمش الدمشقي",
      image: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=500",
      rating: 4.7,
      reviews: 223,
      madeInSyria: true,
      fastDelivery: true,
      city: "دمشق",
      category: "حلويات",
    },
    {
      id: "12",
      name: "سماق حموي",
      image: "https://images.unsplash.com/photo-1596040033229-a0b3b83b3584?w=500",
      rating: 4.6,
      reviews: 134,
      madeInSyria: true,
      fastDelivery: false,
      city: "حماة",
      category: "بهارات",
    },
  ];
  return products;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [pageData, setPageData] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const [products] = useState<Product[]>(generateProducts());

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page);
    setPageData(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    toast.success("تمت الإضافة إلى السلة", {
      description: product.name,
      duration: 2000,
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      setCart((prev) => prev.filter((item) => item.id !== productId));
      toast.info("تم إزالة المنتج من السلة");
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    toast.error("تم إزالة المنتج من السلة");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Search filtering
  const filteredProducts = searchValue.trim()
    ? products.filter((p) =>
        p.name.includes(searchValue) ||
        p.category.includes(searchValue) ||
        p.city?.includes(searchValue)
      )
    : products;

  useEffect(() => {
    if (searchValue.trim() && currentPage !== 'categories') {
      handleNavigate('categories');
    }
  }, [searchValue]);

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" richColors />
      
      <Header
        cartCount={cartCount}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        onSearchChange={setSearchValue}
        searchValue={searchValue}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentPage === "home" && (
            <HomePage
              products={products}
              onAddToCart={handleAddToCart}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === "categories" && (
            <CategoriesPage
              products={searchValue.trim() ? filteredProducts : products}
              selectedCategory={pageData}
              onAddToCart={handleAddToCart}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === "product" && pageData && (
            <ProductDetailPage
              product={pageData}
              relatedProducts={products.filter((p) => p.id !== pageData.id)}
              onAddToCart={handleAddToCart}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === "cart" && (
            <CartPage
              cartItems={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === "checkout" && (
            <CheckoutPage
              cartItemsCount={cartCount}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === "login" && (
            <LoginPage
              onNavigate={handleNavigate}
              onLogin={setUser}
            />
          )}

          {currentPage === "dashboard" && (
            <DashboardPage
              user={user}
              onNavigate={handleNavigate}
              products={products}
              onAddToCart={handleAddToCart}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-[#2A3B4D] text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-[#D4AF37] mb-4">سوقنا</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                سوق إلكتروني سوري يعيد تعريف تجربة التسوق المحلية. نربط الحرفيين
                السوريين بالمستهلكين مباشرة، مع الحفاظ على الجودة والأصالة.
              </p>
            </div>

            <div>
              <h4 className="text-[#D4AF37] mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-white/80">
                <li>
                  <button onClick={() => handleNavigate('home')} className="hover:text-white transition-colors">
                    الرئيسية
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('categories')} className="hover:text-white transition-colors">
                    المنتجات
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('login')} className="hover:text-white transition-colors">
                    حسابي
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#D4AF37] mb-4">تواصل معنا</h4>
              <ul className="space-y-2 text-white/80">
                <li>دمشق، سوريا</li>
                <li>info@souqna.sy</li>
                <li>+963 11 123 4567</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60">
            <p>© 2025 سوقنا. جميع الحقوق محفوظة.</p>
            <p className="mt-2 text-sm">صُنع بحب في سوريا 🇸🇾</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
