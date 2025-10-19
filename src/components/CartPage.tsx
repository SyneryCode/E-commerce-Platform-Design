import { motion, AnimatePresence } from "motion/react";
import { Product } from "./ProductCard";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CartItem extends Product {
  quantity: number;
}

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigate: (page: string) => void;
}

export function CartPage({ cartItems, onUpdateQuantity, onRemoveItem, onNavigate }: CartPageProps) {
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-[#2A3B4D]">سلتك فارغة</h2>
          <p className="text-gray-600">ابدأ التسوق واكتشف منتجاتنا السورية الأصيلة</p>
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-3 bg-gradient-to-r from-[#007A3D] to-[#006432] text-white rounded-xl hover:shadow-lg transition-all"
          >
            تصفح المنتجات
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="w-8 h-8 text-[#007A3D]" />
          <h1 className="text-[#2A3B4D]">سلة التسوق</h1>
          <span className="text-gray-500">({cartItems.length} منتج)</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-6">
                    <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[#2A3B4D] mb-2">{item.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          {item.madeInSyria && (
                            <span className="text-xs bg-[#007A3D]/10 text-[#007A3D] px-2 py-1 rounded-full">
                              صنع في سوريا
                            </span>
                          )}
                          {item.fastDelivery && (
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                              توصيل سريع
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-[#007A3D] flex items-center justify-center transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-[#2A3B4D]">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-[#007A3D] flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm sticky top-24 space-y-6"
            >
              <h3 className="text-[#2A3B4D] pb-4 border-b border-gray-200">ملخص الطلب</h3>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>عدد المنتجات</span>
                  <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>التوصيل</span>
                  <span className="text-[#007A3D]">مجاني</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="bg-gradient-to-r from-[#007A3D]/10 to-[#D4AF37]/10 p-4 rounded-xl mb-4">
                  <p className="text-sm text-[#2A3B4D] text-center">
                    💚 الأسعار تُحدد عند التواصل معك
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('checkout')}
                  className="w-full py-4 bg-gradient-to-r from-[#007A3D] to-[#006432] text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>متابعة إلى الدفع</span>
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </motion.button>

                <button
                  onClick={() => onNavigate('home')}
                  className="w-full mt-3 py-3 text-[#007A3D] hover:bg-gray-50 rounded-xl transition-colors"
                >
                  متابعة التسوق
                </button>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>توصيل سريع وآمن</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>دفع نقدي عند الاستلام</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>ضمان الجودة والأصالة</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
