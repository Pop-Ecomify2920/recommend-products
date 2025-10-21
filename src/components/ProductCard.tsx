import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

interface ProductCardProps {
  product: {
    group_id: string;
    title?: string;
    hero_image?: string;
    category?: string;
    region?: string;
    variants_count?: number;
    price_min?: number;
    price_max?: number;
    currency?: string;
    score: number | string;
  };
  onClick: () => void;
}

const formatPrice = (
  min?: number,
  max?: number,
  currency?: string
): string => {
  if (min == null && max == null) return "";
  const fmt = (v: number) => v.toFixed(2);
  const cur = currency?.trim() || "";
  
  if (min != null && max != null) {
    if (min === max) return `${cur}${fmt(min)}`;
    return `${cur}${fmt(min)} - ${cur}${fmt(max)}`;
  }
  return `${cur}${fmt(min ?? max!)}`;
};

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const price = formatPrice(product.price_min, product.price_max, product.currency);
  const details = [
    product.category,
    product.region,
    product.variants_count ? `${product.variants_count} variants` : null,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 z-10 pointer-events-none rounded-2xl"></div>
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <motion.img
          src={product.hero_image || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={product.title || product.group_id}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          loading="lazy"
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.6 }
          }}
        />
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Score Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          className="absolute top-3 right-3 bg-gradient-to-r from-[#FF6900] to-[#FF8C00] text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg"
        >
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-current" />
            <span>Score: {typeof product.score === "number" ? product.score.toFixed(3) : product.score}</span>
          </div>
        </motion.div>
      </div>
      
      {/* Content Section */}
      <div className="relative p-5 bg-white">
        {/* Product Title */}
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-[#FF6900] transition-colors duration-300"
        >
          {product.title || product.group_id}
        </motion.h3>
        
        {/* Product Details */}
        {details && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-sm text-gray-500 mb-4 line-clamp-1"
          >
            {details}
          </motion.p>
        )}
        
        {/* Price and Action */}
        {price && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-between items-center pt-3 border-t border-gray-100"
          >
            <span className="text-lg font-bold text-gray-800">{price}</span>
            <motion.div 
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                transition: { duration: 0.2 }
              }}
              className="w-10 h-10 rounded-full bg-[#FF6900]/10 flex items-center justify-center group-hover:bg-[#FF6900] transition-colors duration-300"
            >
              <ArrowRight className="h-4 w-4 text-[#FF6900] group-hover:text-white transition-colors duration-300" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
