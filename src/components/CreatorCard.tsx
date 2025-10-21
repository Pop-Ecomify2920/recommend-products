import { motion } from "framer-motion";
import { RefreshCw, User, TrendingUp, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreatorCardProps {
  creator: {
    account_id: string;
    followers: number;
    engagement_rate: number;
    tier: string;
    language: string;
  };
  onRefresh: () => void;
  isLoading?: boolean;
}

const formatNumber = (n: number): string => {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toString();
};

const formatPercent = (v: number): string => (v * 100).toFixed(2);

export const CreatorCard = ({ creator, onRefresh, isLoading }: CreatorCardProps) => {
  const stats = [
    { 
      label: "Follower", 
      value: formatNumber(creator.followers), 
      icon: User,
      color: "text-gray-800", 
      delay: 0.1
    },
    { 
      label: "Engagement", 
      value: `${formatPercent(creator.engagement_rate)}%`, 
      icon: TrendingUp,
      color: "text-[#FF6900]", 
      delay: 0.2
    },
    { 
      label: "Tier", 
      value: creator.tier, 
      icon: Award,
      color: "text-gray-800", 
      delay: 0.3
    },
    { 
      label: "Sprache", 
      value: (creator.language || "N/A").toUpperCase(), 
      icon: Globe,
      color: "text-gray-800", 
      delay: 0.4
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-white border border-gray-200 rounded-2xl p-8 mb-8 overflow-hidden group shadow-lg"
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6900]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="flex-1 w-full">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-gray-800 mb-8"
          >
            Creator: <span className="bg-gradient-to-r from-[#FF6900] to-[#FF8C00] bg-clip-text text-transparent">{creator.account_id}</span>
          </motion.h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: stat.delay, 
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group/stat"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/stat:translate-x-[100%] transition-transform duration-1000 rounded-xl"></div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: i * 0.5
                        }}
                        className="w-8 h-8 bg-gradient-to-r from-[#FF6900] to-[#FF8C00] rounded-lg flex items-center justify-center shadow-md"
                      >
                        <IconComponent className="h-4 w-4 text-white" />
                      </motion.div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                        {stat.label}
                      </div>
                    </div>
                    <div className={`text-2xl font-bold ${stat.color} transition-colors`}>
                      {stat.value}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRefresh}
            disabled={isLoading}
            className="relative bg-gradient-to-r from-[#FF6900] to-[#FF8C00] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group/btn shadow-lg hover:shadow-xl"
            style={{ 
              boxShadow: '0 10px 25px rgba(255, 105, 0, 0.3)'
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
            <motion.div
              animate={isLoading ? { rotate: 360 } : {}}
              transition={isLoading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
              className="mr-3 h-5 w-5 relative z-10 inline-block"
            >
              <RefreshCw className="h-5 w-5" />
            </motion.div>
            <span className="relative z-10">Neuer Creator</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};
