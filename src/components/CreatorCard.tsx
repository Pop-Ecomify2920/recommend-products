import { RefreshCw } from "lucide-react";
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
  return (
    <div className="relative bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-2xl p-6 mb-8 animate-fade-in-up overflow-hidden group" style={{ boxShadow: 'var(--shadow-lg)' }}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1 w-full">
          <h2 className="text-3xl font-bold text-foreground mb-6 animate-slide-in">
            Creator: <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">{creator.account_id}</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Followers", value: formatNumber(creator.followers), color: "text-foreground", delay: "0ms" },
              { label: "Engagement", value: `${formatPercent(creator.engagement_rate)}%`, color: "text-primary", delay: "100ms" },
              { label: "Tier", value: creator.tier, color: "text-foreground", delay: "200ms" },
              { label: "Language", value: (creator.language || "N/A").toUpperCase(), color: "text-foreground", delay: "300ms" }
            ].map((stat, i) => (
              <div 
                key={i}
                className="relative bg-gradient-to-br from-secondary/70 to-secondary/40 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 animate-scale-in group/stat"
                style={{ 
                  animationDelay: stat.delay,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover/stat:opacity-100 rounded-xl transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                    {stat.label}
                  </div>
                  <div className={`text-2xl font-bold ${stat.color} transition-colors`}>
                    {stat.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button
          onClick={onRefresh}
          disabled={isLoading}
          className="relative bg-gradient-to-r from-primary to-primary-hover text-primary-foreground font-bold px-8 py-7 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group/btn animate-bounce-in shadow-lg hover:shadow-xl"
          style={{ 
            boxShadow: 'var(--shadow-primary)',
            animationDelay: '400ms'
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
          <RefreshCw className={`mr-2 h-5 w-5 relative z-10 ${isLoading ? "animate-spin" : "group-hover/btn:rotate-180 transition-transform duration-500"}`} />
          <span className="relative z-10">New Creator</span>
        </Button>
      </div>
    </div>
  );
};
