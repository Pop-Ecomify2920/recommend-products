import { useState, useEffect } from "react";
import { Sparkles, Target } from "lucide-react";
import { CreatorCard } from "@/components/CreatorCard";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { useToast } from "@/hooks/use-toast";

// API configuration - will be replaced with actual endpoints
const API_BASE = "";

interface Creator {
  account_id: string;
  followers: number;
  engagement_rate: number;
  tier: string;
  language: string;
  has_content: boolean;
}

interface Recommendation {
  group_id: string;
  title?: string;
  hero_image?: string;
  category?: string;
  region?: string;
  variants_count?: number;
  price_min?: number;
  price_max?: number;
  currency?: string;
  score: number;
}

const Index = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [currentCreator, setCurrentCreator] = useState<Creator | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [variants, setVariants] = useState<any[]>([]);
  const { toast } = useToast();

  // Mock data for demonstration - replace with actual API calls
  const mockCreators: Creator[] = [
    {
      account_id: "fashion_influencer_01",
      followers: 1250000,
      engagement_rate: 0.0485,
      tier: "Premium",
      language: "en",
      has_content: true,
    },
    {
      account_id: "style_guru_22",
      followers: 890000,
      engagement_rate: 0.0623,
      tier: "Elite",
      language: "de",
      has_content: true,
    },
    {
      account_id: "trendsetter_99",
      followers: 2100000,
      engagement_rate: 0.0391,
      tier: "Premium",
      language: "en",
      has_content: true,
    },
  ];

  const mockRecommendations: Recommendation[] = [
    {
      group_id: "sneakers_001",
      title: "Premium Running Sneakers",
      hero_image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      category: "Footwear",
      region: "EU",
      variants_count: 12,
      price_min: 89.99,
      price_max: 129.99,
      currency: "€",
      score: 0.942,
    },
    {
      group_id: "jacket_042",
      title: "Designer Winter Jacket",
      hero_image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
      category: "Outerwear",
      region: "EU",
      variants_count: 8,
      price_min: 149.99,
      price_max: 199.99,
      currency: "€",
      score: 0.918,
    },
    {
      group_id: "sneakers_001",
      title: "Premium Running Sneakers",
      hero_image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      category: "Footwear",
      region: "EU",
      variants_count: 12,
      price_min: 89.99,
      price_max: 129.99,
      currency: "€",
      score: 0.942,
    },
    {
      group_id: "dress_133",
      title: "Elegant Summer Dress",
      hero_image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
      category: "Dresses",
      region: "EU",
      variants_count: 15,
      price_min: 59.99,
      price_max: 89.99,
      currency: "€",
      score: 0.895,
    },
    {
      group_id: "jeans_089",
      title: "Classic Denim Jeans",
      hero_image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
      category: "Bottoms",
      region: "EU",
      variants_count: 20,
      price_min: 69.99,
      price_max: 99.99,
      currency: "€",
      score: 0.887,
    },
    {
      group_id: "bag_255",
      title: "Leather Handbag Collection",
      hero_image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
      category: "Accessories",
      region: "EU",
      variants_count: 6,
      price_min: 119.99,
      price_max: 179.99,
      currency: "€",
      score: 0.871,
    },
    {
      group_id: "jeans_089",
      title: "Classic Denim Jeans",
      hero_image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
      category: "Bottoms",
      region: "EU",
      variants_count: 20,
      price_min: 69.99,
      price_max: 99.99,
      currency: "€",
      score: 0.887,
    },
    {
      group_id: "bag_255",
      title: "Leather Handbag Collection",
      hero_image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
      category: "Accessories",
      region: "EU",
      variants_count: 6,
      price_min: 119.99,
      price_max: 179.99,
      currency: "€",
      score: 0.871,
    },
  ];

  const fetchRandomCreator = async () => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Use mock data
    const randomCreator = mockCreators[Math.floor(Math.random() * mockCreators.length)];
    setCurrentCreator(randomCreator);
    setRecommendations(mockRecommendations);
    setIsLoading(false);
  };

  const handleOpenGroup = async (groupId: string) => {
    // Mock variant data
    const mockVariants = Array.from({ length: 6 }, (_, i) => ({
      "Product Image": `https://images.unsplash.com/photo-${1542291026 + i}-7eec264c27ff?w=300&h=300&fit=crop`,
      "Product Name": `Variant ${i + 1}`,
      "Size": ["S", "M", "L", "XL"][i % 4],
      "Color": ["Black", "White", "Blue", "Red"][i % 4],
      "Product Price": 89.99 + i * 10,
    }));

    const mockGroup = recommendations.find((r) => r.group_id === groupId);
    
    setSelectedGroup(mockGroup);
    setVariants(mockVariants);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchRandomCreator();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Hero Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-primary via-[hsl(20_100%_52%)] to-primary text-primary-foreground py-16 shadow-2xl animate-fade-in">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-4 animate-bounce-in">
            <Target className="h-12 w-12 md:h-14 md:w-14 animate-float" />
            <h1 className="text-5xl md:text-7xl font-black tracking-tight" style={{fontFamily:"cursive"}}>Product Recommendations</h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-xl animate-slide-in" style={{ animationDelay: '200ms' }}>
            <Sparkles className="h-6 w-6 animate-glow" />
            <p className="text-primary-foreground/95 font-medium">AI-Powered Creator-Product Matching System</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <LoadingSkeleton />
        ) : currentCreator ? (
          <>
            <CreatorCard
              creator={currentCreator}
              onRefresh={fetchRandomCreator}
              isLoading={isLoading}
            />

            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <h2 className="text-3xl font-black text-foreground mb-3 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Recommended Products
              </h2>
              <p className="text-lg text-muted-foreground font-medium">
                Top matches based on creator profile and engagement metrics
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendations.map((product, idx) => (
                <div
                  key={product.group_id}
                  style={{ animationDelay: `${400 + idx * 100}ms` }}
                >
                  <ProductCard
                    product={product}
                    onClick={() => handleOpenGroup(product.group_id)}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No creator data available</p>
          </div>
        )}
      </main>

      {/* Product Variants Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        group={selectedGroup}
        variants={variants}
      />

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-secondary/50 to-secondary/30 backdrop-blur-sm border-t border-border/50 py-8 mt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-sm text-muted-foreground font-medium animate-fade-in" style={{fontSize:"15px", color:"#000000"}}>
            Powered by AI • Ready for API Integration • Zalando Style
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
