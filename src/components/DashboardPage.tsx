import { motion } from "motion/react";
import { Package, Heart, MapPin, ShoppingBag, Calendar, RotateCcw } from "lucide-react";
import { Product, ProductCard } from "./ProductCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DashboardPageProps {
  user: any;
  onNavigate: (page: string, data?: any) => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function DashboardPage({ user, onNavigate, products, onAddToCart }: DashboardPageProps) {
  const recentOrders = [
    {
      id: "1",
      date: "2025-10-10",
      items: 5,
      status: "تم التوصيل",
      statusColor: "text-[#007A3D] bg-[#007A3D]/10",
    },
    {
      id: "2",
      date: "2025-10-05",
      items: 3,
      status: "قيد التوصيل",
      statusColor: "text-blue-600 bg-blue-50",
    },
    {
      id: "3",
      date: "2025-09-28",
      items: 7,
      status: "تم التوصيل",
      statusColor: "text-[#007A3D] bg-[#007A3D]/10",
    },
  ];

  const favorites = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-l from-[#007A3D] to-[#006432] text-white rounded-2xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L35 20 L30 30 L25 20 Z M30 30 L35 40 L30 50 L25 40 Z' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />
          </div>
          <div className="relative">
            <h1 className="text-3xl mb-2">أهلاً {user?.name || 'بك'} 👋</h1>
            <p className="text-white/90">نتمنى لك تجربة تسوق ممتعة في سوقنا</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <section>
              <h2 className="text-[#2A3B4D] mb-4">إجراءات سريعة</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onNavigate('categories')}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-center space-y-3"
                >
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#007A3D] to-[#006432] rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-[#2A3B4D]">تصفح المنتجات</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {/* scroll to favorites */}}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-center space-y-3"
                >
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#D4AF37] to-[#c49b28] rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-[#2A3B4D]">المفضلة</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-center space-y-3 relative overflow-hidden"
                >
                  <div className="absolute top-2 left-2">
                    <span className="bg-[#D4AF37] text-[#2A3B4D] text-xs px-2 py-1 rounded-full">
                      عيد الفطر
                    </span>
                  </div>
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#2A3B4D] to-[#1a2838] rounded-full flex items-center justify-center">
                    <RotateCcw className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-[#2A3B4D]">أعد طلب سلة العيد</p>
                </motion.button>
              </div>
            </section>

            {/* Recent Orders */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#2A3B4D]">طلباتي الأخيرة</h2>
                <button className="text-[#007A3D] hover:underline">عرض الكل</button>
              </div>
              
              <div className="space-y-3">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-[#007A3D]" />
                        </div>
                        <div>
                          <p className="text-[#2A3B4D]">طلب #{order.id}</p>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {order.date}
                            </span>
                            <span>{order.items} منتجات</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Favorites */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-[#D4AF37]" />
                <h2 className="text-[#2A3B4D]">المفضلة</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {favorites.map((product, index) => (
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
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm space-y-4"
            >
              <h3 className="text-[#2A3B4D] pb-4 border-b border-gray-200">معلومات الحساب</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#007A3D]/10 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-[#007A3D]" />
                  </div>
                  <div>
                    <p className="text-gray-500">إجمالي الطلبات</p>
                    <p className="text-[#2A3B4D]">15 طلب</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-gray-500">المفضلة</p>
                    <p className="text-[#2A3B4D]">{favorites.length} منتج</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#007A3D]/5 to-[#D4AF37]/5 rounded-2xl p-6 border border-[#007A3D]/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#007A3D]" />
                <h3 className="text-[#2A3B4D]">توصيات خاصة</h3>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGl2ZSUyMG9pbCUyMGJvdHRsZXxlbnwxfHx8fDE3NjAzODI3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="زيت زيتون"
                    className="w-full aspect-square object-cover rounded-lg mb-3"
                  />
                  <p className="text-sm text-[#2A3B4D] mb-2">لأنك من دمشق، جرب:</p>
                  <p className="text-[#007A3D]">زيت الزيتون الحلبي البكر</p>
                  <button
                    onClick={() => onNavigate('product', products[0])}
                    className="w-full mt-3 py-2 bg-[#007A3D] text-white rounded-lg hover:bg-[#006432] transition-colors text-sm"
                  >
                    اكتشف المنتج
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
