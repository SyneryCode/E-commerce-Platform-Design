import { Star, Clock, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  madeInSyria: boolean;
  fastDelivery: boolean;
  city?: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  index?: number;
}

export function ProductCard({ product, onAddToCart, onViewDetails, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 122, 61, 0.15)" }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer flex flex-col h-full"
      onClick={() => onViewDetails(product)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.madeInSyria && (
          <div className="absolute top-3 right-3 bg-[#007A3D] text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 shadow-lg">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
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
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[#2A3B4D] line-clamp-2 min-h-[3rem] mb-3">{product.name}</h3>
        
        <div className="flex items-center gap-4 text-sm mb-3">
          <div className="flex items-center gap-1 text-[#D4AF37]">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-[#2A3B4D]">{product.rating}</span>
            <span className="text-gray-500">({product.reviews}+)</span>
          </div>
          
          {product.city && (
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{product.city}</span>
            </div>
          )}
        </div>

        {product.fastDelivery && (
          <div className="flex items-center gap-1.5 text-[#007A3D] text-sm mb-3">
            <Clock className="w-4 h-4" />
            <span>توصيل خلال ساعة</span>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full py-3 bg-gradient-to-r from-[#007A3D] to-[#006432] text-white rounded-xl hover:shadow-lg transition-all active:scale-95 mt-auto"
        >
          أضف إلى السلة
        </button>
      </div>
    </motion.div>
  );
}
