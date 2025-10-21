import { X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Variant {
  "Product Image"?: string;
  "Product Name"?: string;
  "Product Size"?: string;
  "Size"?: string;
  "Product Color"?: string;
  "Color"?: string;
  "Product Price"?: number;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: {
    title?: string;
    group_id: string;
    currency?: string;
  } | null;
  variants: Variant[];
  isLoading?: boolean;
}

export const ProductModal = ({ isOpen, onClose, group, variants, isLoading = false }: ProductModalProps) => {
  if (!group) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto animate-scale-in bg-gradient-to-br from-card to-card/95 backdrop-blur-xl border-border/50" style={{ boxShadow: 'var(--shadow-xl)' }}>
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-[#FF6900] via-[#FF8C00] to-[#FF6900] bg-clip-text text-transparent animate-slide-in">
            {group.title || group.group_id}
          </DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-[#FF6900]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6900] to-[#FF8C00] rounded-full blur-lg opacity-30 animate-pulse"></div>
            </div>
            <p className="mt-4 text-lg font-semibold text-foreground animate-pulse">Lade Produktvarianten...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {variants.map((variant, idx) => {
            const image = variant["Product Image"];
            const name = variant["Product Name"] || group.title || group.group_id || "";
            const size = variant["Product Size"] || variant["Size"] || "";
            const color = variant["Product Color"] || variant["Color"] || "";
            const price = variant["Product Price"];
            const currency = group.currency || "";

            return (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate-fade-in-up cursor-pointer"
                style={{ 
                  animationDelay: `${idx * 50}ms`,
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 z-10 pointer-events-none"></div>
                
                {image && (
                  <div className="relative aspect-square bg-gradient-to-br from-secondary/80 to-secondary/40 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"
                      alt={name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                <div className="relative p-4 bg-gradient-to-br from-card/98 to-card/95">
                  <div className="font-semibold text-foreground mb-2 line-clamp-2 transition-colors group-hover:text-primary">
                    {name}
                  </div>
                  {(color || size) && (
                    <div className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground/40"></span>
                      {[color, size].filter(Boolean).join(" • ")}
                    </div>
                  )}
                  {price != null && (
                    <div className="text-xl font-bold bg-gradient-to-r from-[#FF6900] to-[#FF8C00] bg-clip-text text-transparent">
                      {currency}{price.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
