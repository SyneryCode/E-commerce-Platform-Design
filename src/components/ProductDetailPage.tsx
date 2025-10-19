import { motion } from "motion/react";
import { Product, ProductCard } from "./ProductCard";
import { Star, Clock, MapPin, ChevronRight, Info } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
  onAddToCart: (product: Product) => void;
  onNavigate: (page: string, data?: any) => void;
}

export function ProductDetailPage({ product, relatedProducts, onAddToCart, onNavigate }: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);

  const frequentlyBought = relatedProducts.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => onNavigate('home')} className="hover:text-[#007A3D]">
              الرئيسية
            </button>
            <ChevronRight className="w-4 h-4 rotate-180" />
            <button onClick={() => onNavigate('categories')} className="hover:text-[#007A3D]">
              {product.category}
            </button>
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span className="text-[#2A3B4D]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-xl">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.madeInSyria && (
              <div className="absolute top-4 right-4 bg-[#007A3D] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <circle cx="10" cy="10" r="3" />
                  <circle cx="10" cy="6" r="1.5" opacity="0.6" />
                  <circle cx="13.5" cy="8" r="1.5" opacity="0.6" />
                  <circle cx="13.5" cy="12" r="1.5" opacity="0.6" />
                  <circle cx="10" cy="14" r="1.5" opacity="0.6" />
                  <circle cx="6.5" cy="12" r="1.5" opacity="0.6" />
                  <circle cx="6.5" cy="8" r="1.5" opacity="0.6" />
                </svg>
                <span>صنع في سوريا</span>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-[#2A3B4D] mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-[#D4AF37] text-[#D4AF37]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[#2A3B4D]">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews}+ تقييم)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                {product.fastDelivery && (
                  <div className="flex items-center gap-2 text-[#007A3D] bg-[#007A3D]/10 px-4 py-2 rounded-lg">
                    <Clock className="w-5 h-5" />
                    <span>توصيل خلال ساعة</span>
                  </div>
                )}
                {product.city && (
                  <div className="flex items-center gap-2 text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
                    <MapPin className="w-5 h-5" />
                    <span>من {product.city}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Story */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 text-[#007A3D] hover:underline">
                  <Info className="w-5 h-5" />
                  <span>قصة المنتج</span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>قصة {product.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-gray-700 leading-relaxed">
                    {product.name} هو منتج سوري أصيل يُصنع بأيدي حرفيين محليين باستخدام
                    طرق تقليدية موروثة عبر الأجيال. كل قطعة تحمل جزءًا من التراث السوري
                    العريق والحب الذي يضعه صانعوها في كل تفصيل.
                  </p>
                  <div className="bg-[#007A3D]/5 p-4 rounded-lg">
                    <h4 className="text-[#007A3D] mb-2">الفوائد</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• منتج طبيعي 100% خالٍ من المواد الكيميائية</li>
                      <li>• يدعم الحرفيين المحليين والاقتصاد السوري</li>
                      <li>• معتمد من وزارة الصناعة السورية</li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Description */}
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="leading-relaxed">
                منتج سوري أصيل من أجود المواد الطبيعية. يتميز بجودته العالية ونقائه،
                ويُصنع وفق المعايير التقليدية التي توارثناها عبر الأجيال. مثالي للاستخدام
                اليومي ويضمن لك تجربة أصيلة من قلب سوريا.
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-[#2A3B4D]">الكمية:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-[#007A3D] flex items-center justify-center transition-colors"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-[#2A3B4D]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-[#007A3D] flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    onAddToCart(product);
                  }
                }}
                className="w-full py-4 bg-gradient-to-r from-[#007A3D] to-[#006432] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                أضف إلى السلة
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Frequently Bought Together */}
        {frequentlyBought.length > 0 && (
          <section className="mt-16 pt-16 border-t border-gray-200">
            <h2 className="text-[#2A3B4D] mb-6">يُشترى معه عادةً</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {frequentlyBought.map((p, index) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={onAddToCart}
                  onViewDetails={(product) => onNavigate('product', product)}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 3 && (
          <section className="mt-16 pt-16 border-t border-gray-200">
            <h2 className="text-[#2A3B4D] mb-6">منتجات مشابهة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(3, 7).map((p, index) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={onAddToCart}
                  onViewDetails={(product) => onNavigate('product', product)}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
