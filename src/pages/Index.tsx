import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Target, Loader2, AlertCircle, Brain, Zap, ArrowRight } from "lucide-react";
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
      {/* Professional Hero Header with Advanced Animations */}
      <motion.header 
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative overflow-hidden bg-gradient-to-br from-[#FF6900] via-[#FF6900] to-[#FF8C00] text-white py-24 shadow-2xl"
      >
        {/* Sophisticated animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary floating orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute -top-32 -left-32 w-96 h-96 bg-white/15 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1.1, 1, 1.1],
              rotate: [360, 180, 0],
              opacity: [0.4, 0.7, 0.4],
              x: [0, -40, 0],
              y: [0, 20, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/15 rounded-full blur-3xl"
          />
          
          {/* Secondary floating elements */}
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-2xl"
          />
          <motion.div 
            animate={{ 
              x: [0, -80, 0],
              y: [0, 40, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 3
            }}
            className="absolute top-1/3 right-1/4 w-48 h-48 bg-white/8 rounded-full blur-xl"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Main logo section with sophisticated animations */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex items-center justify-center gap-6 mb-8"
          >
            {/* Animated icon container */}
            <motion.div 
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 0 rgba(255, 255, 255, 0.3)",
                  "0 0 20px rgba(255, 255, 255, 0.5)",
                  "0 0 0 rgba(255, 255, 255, 0.3)"
                ]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-2xl"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <Target className="h-10 w-10 text-white" />
              </motion.div>
            </motion.div>
            
            {/* Main title with gradient animation */}
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-black tracking-tight"
              style={{fontFamily:"system-ui, -apple-system, sans-serif"}}
            >
              <motion.span
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                LIKETIK X ZALANDO
              </motion.span>
            </motion.h1>
          </motion.div>
          
          {/* Subtitle with sophisticated animations */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="flex items-center justify-center gap-4 text-2xl"
          >
            {/* Left animated icon */}
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 15, 0],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Zap className="h-8 w-8 text-yellow-300 drop-shadow-lg" />
            </motion.div>
            
            {/* Main subtitle text */}
            <motion.p 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-white/95 font-semibold text-center max-w-4xl leading-relaxed"
            >
              ML-gestützte Produkt-Moderations-Pipeline zur Shop-Kunden-Kopplung
            </motion.p>
            
            {/* Right animated icon */}
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -15, 0],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Sparkles className="h-8 w-8 text-pink-300 drop-shadow-lg" />
            </motion.div>
          </motion.div>
          
          {/* Additional decorative elements */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center mt-8"
          >
            <motion.div
              animate={{ 
                x: [0, 20, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="flex items-center gap-2 text-white/70 text-sm font-medium"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
              <span>Powered by Advanced AI Technology</span>
            </motion.div>
          </motion.div>
          </div>
      </motion.header>

      {/* Main Content with Professional Animations */}
      <main className="container mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
        {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-24"
            >
              <motion.div 
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative w-24 h-24"
              >
                <Loader2 className="h-24 w-24 text-[#FF6900]" />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-[#FF6900] to-[#FF8C00] rounded-full blur-xl"
                />
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-2xl font-semibold text-foreground"
              >
                Lade neue Empfehlungen...
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex space-x-3"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                    className="w-4 h-4 bg-gradient-to-r from-[#FF6900] to-[#FF8C00] rounded-full"
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-24"
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative"
              >
                <AlertCircle className="h-20 w-20 text-red-500" />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-lg"
                />
              </motion.div>
              
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-2xl font-bold text-foreground"
              >
                Fehler beim Laden
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-muted-foreground text-center max-w-md"
              >
                {error}
              </motion.p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchRandomCreator}
                className="mt-8 bg-gradient-to-r from-[#FF6900] to-[#FF8C00] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                Erneut versuchen
              </motion.button>
            </motion.div>
        ) : currentCreator ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
            <CreatorCard
              creator={currentCreator}
              onRefresh={fetchRandomCreator}
              isLoading={isLoading}
            />
              </motion.div>

          {/* Products first */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-12"
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF6900] via-[#FF8C00] to-[#FF6900] bg-clip-text text-transparent"
            >
              Kurierte Produkte
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xl text-muted-foreground font-medium"
            >
              Matches basierend auf KPI Scorer-Modulen
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {recommendations.map((product, idx) => (
              <motion.div
                key={product.group_id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 1.2 + idx * 0.1,
                  duration: 0.6,
                  ease: "easeOut"
                }}
              >
                <ProductCard
                  product={product}
                  onClick={() => handleOpenGroup(product.group_id)}
                />
              </motion.div>
            ))}
          </motion.div>


          {/* KPIs after products */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <KPIScoringSection creator={currentCreator} />
          </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="no-data"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center py-24"
            >
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground"
              >
                Keine Creator-Daten verfügbar
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Product Variants Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        group={selectedGroup}
        variants={variants}
        isLoading={modalLoading}
      />

      {/* Professional Footer with Advanced Animations */}
      <motion.footer 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="relative bg-gradient-to-br from-[#FF6900]/10 to-[#FF8C00]/5 backdrop-blur-sm border-t border-[#FF6900]/20 py-16 mt-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6900]/5 via-transparent to-[#FF6900]/5"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-0 left-0 w-32 h-32 bg-[#FF6900]/10 rounded-full blur-2xl"
          />
          <motion.div 
            animate={{ 
              x: [0, -80, 0],
              y: [0, 30, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-0 right-0 w-40 h-40 bg-[#FF8C00]/10 rounded-full blur-2xl"
          />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.div 
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-12 h-12 bg-gradient-to-r from-[#FF6900] to-[#FF8C00] rounded-2xl flex items-center justify-center shadow-lg"
            >
              <motion.div
                animate={{ 
                  rotate: [0, -360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <Target className="h-6 w-6 text-white" />
              </motion.div>
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.9, duration: 0.6 }}
              className="text-2xl font-bold bg-gradient-to-r from-[#FF6900] to-[#FF8C00] bg-clip-text text-transparent"
            >
              LIKETIK X ZALANDO
            </motion.span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
            className="text-muted-foreground font-medium"
          >
            ML-gestützte Produkt-Moderations-Pipeline • API-Integration bereit • Premium Design
          </motion.p>
          
          {/* Additional decorative elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.8 }}
            className="mt-6 flex justify-center"
          >
            <motion.div
              animate={{ 
                x: [0, 20, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="flex items-center gap-2 text-[#FF6900]/60 text-sm font-medium"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
              <span>Powered by Advanced AI Technology</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
