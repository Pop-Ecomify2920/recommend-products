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
    <div
      onClick={onClick}
      className="group relative bg-gradient-to-br from-card to-card/90 border border-border/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
      style={{ 
        boxShadow: 'var(--shadow-md)',
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 z-10 pointer-events-none"></div>
      
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-secondary/80 to-secondary/40" style={{ boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.3)', height: '320px' }}>
        <img
          src={product.hero_image || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={product.title || product.group_id}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground text-xs font-bold px-4 py-2 rounded-full transform transition-all duration-300 group-hover:scale-110 animate-bounce-in" style={{ boxShadow: 'var(--shadow-primary)', animationDelay: '100ms', marginRight: '100px', }}>
          Score: {typeof product.score === "number" ? product.score.toFixed(3) : product.score}
        </div>
      </div>
      
      <div className="relative p-5 bg-gradient-to-br from-card/95 to-card/98 backdrop-blur-sm" style={{ boxShadow: 'irgba(0, 0, 0, 0.1) 0px 3px 25px inset', background:"#ff660003" }}>
        <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-hover group-hover:bg-clip-text" style={{ fontSize: '22px' }}>
          {product.title || product.group_id}
        </h3>
        {details && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-1 transition-colors duration-300 group-hover:text-muted-foreground/80">
            {details}
          </p>
        )}
        {price && (
          <div className="flex justify-between items-center pt-2 border-t border-border/30">
            <span className="text-l font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">{price}</span>
            <div className="w-12 h-8 rounded-full bg-primary/10 flex items-center justify-center transform transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-12">
              <span className="text-primary group-hover:text-primary-foreground transition-colors duration-300" style={{marginBottom: "3px", fontSize:"22px"}}>→</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
