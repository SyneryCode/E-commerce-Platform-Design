import { motion } from "motion/react";
import { ProductCard, Product } from "./ProductCard";
import { GeometricPattern } from "./GeometricPattern";
import { Clock, TrendingUp, Heart, Package, ChevronLeft, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onNavigate: (page: string, data?: any) => void;
}

export function HomePage({ products, onAddToCart, onNavigate }: HomePageProps) {
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const categories = [
    { name: "منظفات", icon: "🧼" },
    { name: "بهارات", icon: "🌶️" },
    { name: "لحوم", icon: "🥩" },
    { name: "ألبان", icon: "🥛" },
    { name: "حلويات", icon: "🍰" },
    { name: "صابون حلبي", icon: "🧴" },
    { name: "زيوت", icon: "���" },
    { name: "عسل", icon: "🍯" },
  ];

  const neighborhoodActivity = [
    { product: "صابون حلبي", count: 12, area: "دمشق" },
    { product: "زيت زيتون", count: 8, area: "حلب" },
    { product: "زعتر أخضر", count: 15, area: "دمشق" },
    { product: "عسل طبيعي", count: 6, area: "حمص" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-l from-[#007A3D] via-[#006432] to-[#007A3D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L35 20 L30 30 L25 20 Z M30 30 L35 40 L30 50 L25 40 Z' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-[900] leading-tight">
              منتجات سورية أصيلة
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              توصيل لباب منزلك خلال ساعة!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('categories')}
                className="px-8 py-4 bg-[#D4AF37] text-[#2A3B4D] rounded-xl shadow-xl hover:shadow-2xl transition-all"
              >
                تسوق الآن
              </motion.button>
              <div className="flex items-center gap-2 text-white/80">
                <Package className="w-5 h-5" />
                <span>أكثر من 10,000 طلب في سوريا هذا الشهر</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <GeometricPattern />
        </div>
      </section>

      {/* Categories Bar */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => onNavigate('categories', category.name)}
                className="flex-shrink-0 flex flex-col items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 hover:border-[#007A3D] hover:shadow-md transition-all"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-sm text-[#2A3B4D] whitespace-nowrap">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhood Activity */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-[#007A3D]" />
          <h2 className="text-[#2A3B4D]">طلبات جيراني اليوم</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {neighborhoodActivity.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#007A3D]/5 to-[#D4AF37]/5 border border-[#007A3D]/20 rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#2A3B4D]">{item.product}</p>
                  <p className="text-sm text-gray-500">{item.area}</p>
                </div>
                <div className="text-2xl font-bold text-[#007A3D]">{item.count}</div>
              </div>
              <p className="text-xs text-gray-500 mt-2">شخصًا اشتروا اليوم</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="relative">
        <GeometricPattern />
      </div>

      {/* Today's Deals */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="text-[#2A3B4D]">عروض اليوم</h2>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/10 px-4 py-2 rounded-full">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#2A3B4D] font-mono">
              {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
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
      </section>

      {/* Made with Love Section */}
      <section className="py-12 bg-gradient-to-b from-[#2A3B4D] to-[#1a2838] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-[#D4AF37]" />
            <h2>صنع بحب</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1550291662-826ab58d4e8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwd29ya3Nob3AlMjBjcmFmdHxlbnwxfHx8fDE3NjA0NDI4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="حرفي سوري"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center"
                >
                  <Play className="w-6 h-6 text-[#007A3D] mr-[-4px]" />
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl">تعرف على حرفيينا</h3>
              <p className="text-white/80 leading-relaxed">
                كل منتج في سوقنا له قصة. من أيدي الحرفيين السوريين إلى باب منزلك،
                نحمل تراث أجدادنا بفخر. شاهد كيف يُصنع صابون حلب الأصيل وزيت الزيتون
                البكر من أجود المحاصيل السورية.
              </p>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#2A3B4D] rounded-xl hover:shadow-lg transition-all">
                <span>اكتشف القصص</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="relative">
        <GeometricPattern />
      </div>

      {/* Featured Products */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        <h2 className="text-[#2A3B4D] mb-6">منتجات مميزة</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(4, 12).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gradient-to-b from-[#007A3D]/5 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[#2A3B4D] text-center mb-12">عملاؤنا السعداء</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg"
              >
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=400&h=400&fit=crop`}
                  alt={`عميل ${i}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8 text-[#2A3B4D]"
          >
            انضم إلى أكثر من 10,000 أسرة سورية تثق بسوقنا
          </motion.p>
        </div>
      </section>
    </div>
  );
}
