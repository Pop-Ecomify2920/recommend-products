import { useState, useEffect } from "react";
import { Sparkles, Target, Loader2, AlertCircle } from "lucide-react";
import { CreatorCard } from "@/components/CreatorCard";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { KPIScoringSection } from "@/components/KPIScoringSection";
import { useToast } from "@/hooks/use-toast";
import { 
  RecommendationAPI, 
  type Creator, 
  type Recommendation, 
  type ProductGroup, 
  type ProductVariant 
} from "@/services/api";

const Index = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [currentCreator, setCurrentCreator] = useState<Creator | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ProductGroup | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [modalLoading, setModalLoading] = useState(false);
  const { toast } = useToast();

  // API Integration Functions
  const fetchRandomCreator = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { creator, recommendations } = await RecommendationAPI.getRandomCreatorWithRecommendations();
      setCurrentCreator(creator);
      setRecommendations(recommendations);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
      setError(errorMessage);
      toast({
        title: "Fehler beim Laden",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenGroup = async (groupId: string) => {
    setModalLoading(true);
    setModalOpen(true);
    
    try {
      const { group, variants } = await RecommendationAPI.getProductGroup(groupId);
      setSelectedGroup(group);
      setVariants(variants);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load product details';
      toast({
        title: "Fehler beim Laden",
        description: errorMessage,
        variant: "destructive",
      });
      setModalOpen(false);
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomCreator();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Hero Header - Zalando Style */}
      <header className="relative overflow-hidden bg-gradient-to-r from-[#FF6900] via-[#FF6900] to-[#FF8C00] text-white py-20 shadow-2xl animate-fade-in">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6 animate-bounce-in">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Target className="h-8 w-8 animate-float" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight" style={{fontFamily:"system-ui, -apple-system, sans-serif"}}>
              ZALANDO
            </h1>
          </div>
          <div className="flex items-center justify-center gap-3 text-2xl animate-slide-in" style={{ animationDelay: '200ms' }}>
            <Sparkles className="h-7 w-7 animate-glow" />
            <p className="text-white/95 font-semibold">ML-gestützte Produkt-Moderations-Pipeline zur Shop-Kunden-Kopplung</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <Loader2 className="h-16 w-16 animate-spin text-[#FF6900]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6900] to-[#FF8C00] rounded-full blur-lg opacity-30 animate-pulse"></div>
            </div>
            <p className="mt-6 text-xl font-semibold text-foreground animate-pulse">Lade neue Empfehlungen...</p>
            <div className="mt-4 flex space-x-2">
              <div className="w-3 h-3 bg-[#FF6900] rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-[#FF6900] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-[#FF6900] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <AlertCircle className="h-16 w-16 text-red-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full blur-lg opacity-20 animate-pulse"></div>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-foreground">Fehler beim Laden</h3>
            <p className="mt-2 text-muted-foreground text-center max-w-md">{error}</p>
            <button
              onClick={fetchRandomCreator}
              className="mt-6 bg-gradient-to-r from-[#FF6900] to-[#FF8C00] text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Erneut versuchen
            </button>
          </div>
        ) : currentCreator ? (
          <>
            <CreatorCard
              creator={currentCreator}
              onRefresh={fetchRandomCreator}
              isLoading={isLoading}
            />

            {/* KPI Scoring Section */}
            <KPIScoringSection creator={currentCreator} />

            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <h2 className="text-3xl font-black text-foreground mb-3 bg-gradient-to-r from-[#FF6900] via-[#FF8C00] to-[#FF6900] bg-clip-text text-transparent">
                Kurierte Produkte
              </h2>
              <p className="text-lg text-muted-foreground font-medium">
                Matches basierend auf KPI Scorer-Modulen
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
            <p className="text-muted-foreground text-lg">Keine Creator-Daten verfügbar</p>
          </div>
        )}
      </main>

      {/* Product Variants Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        group={selectedGroup}
        variants={variants}
        isLoading={modalLoading}
      />

      {/* Footer - Zalando Style */}
      <footer className="relative bg-gradient-to-br from-[#FF6900]/10 to-[#FF8C00]/5 backdrop-blur-sm border-t border-[#FF6900]/20 py-12 mt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6900]/5 via-transparent to-[#FF6900]/5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-[#FF6900] to-[#FF8C00] rounded-lg flex items-center justify-center">
              <Target className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-[#FF6900]">ZALANDO</span>
          </div>
          <p className="text-sm text-muted-foreground font-medium animate-fade-in">
            ML-gestützte Produkt-Moderations-Pipeline • API-Integration bereit • Zalando Branding
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
