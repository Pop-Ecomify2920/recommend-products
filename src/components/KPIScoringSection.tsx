import { TrendingUp, Target, Zap, BarChart3, Star, Award } from "lucide-react";

interface KPIScoringSectionProps {
  creator: {
    account_id: string;
    followers: number;
    engagement_rate: number;
    tier: string;
    language: string;
  };
}

interface KPIScore {
  name: string;
  value: number;
  maxValue: number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  delay: string;
}

export const KPIScoringSection = ({ creator }: KPIScoringSectionProps) => {
  // Mock KPI scores - these would come from your API
  const kpiScores: KPIScore[] = [
    {
      name: "Engagement Score",
      value: Math.round(creator.engagement_rate * 1000),
      maxValue: 100,
      description: "Basierend auf Interaktionsrate und Follower-Qualität",
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
      delay: "0ms"
    },
    {
      name: "Reach Score",
      value: Math.min(Math.round(creator.followers / 10000), 100),
      maxValue: 100,
      description: "Reichweite und Sichtbarkeit des Creators",
      icon: Target,
      color: "from-blue-500 to-blue-600",
      delay: "100ms"
    },
    {
      name: "Content Quality",
      value: Math.round(85 + Math.random() * 15),
      maxValue: 100,
      description: "Qualität und Konsistenz der Inhalte",
      icon: Star,
      color: "from-purple-500 to-purple-600",
      delay: "200ms"
    },
    {
      name: "Brand Alignment",
      value: Math.round(75 + Math.random() * 20),
      maxValue: 100,
      description: "Passung zur Markenidentität",
      icon: Award,
      color: "from-orange-500 to-orange-600",
      delay: "300ms"
    },
    {
      name: "Performance Score",
      value: Math.round(80 + Math.random() * 15),
      maxValue: 100,
      description: "Historische Performance-Metriken",
      icon: BarChart3,
      color: "from-rose-500 to-rose-600",
      delay: "400ms"
    },
    {
      name: "Innovation Index",
      value: Math.round(70 + Math.random() * 25),
      maxValue: 100,
      description: "Kreativität und Trend-Setting Potenzial",
      icon: Zap,
      color: "from-cyan-500 to-cyan-600",
      delay: "500ms"
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-2xl p-8 mb-8 animate-fade-in-up overflow-hidden group" style={{ boxShadow: 'var(--shadow-lg)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-hover rounded-xl flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">KPI Scorer-Module</h3>
            <p className="text-muted-foreground">Algorithmus-basierte Bewertung</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiScores.map((kpi, index) => {
            const percentage = (kpi.value / kpi.maxValue) * 100;
            const IconComponent = kpi.icon;
            
            return (
              <div
                key={index}
                className="relative bg-gradient-to-br from-secondary/70 to-secondary/40 backdrop-blur-sm rounded-xl p-6 transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 animate-scale-in group/kpi"
                style={{ 
                  animationDelay: kpi.delay,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover/kpi:opacity-100 rounded-xl transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${kpi.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-sm">{kpi.name}</h4>
                        <p className="text-xs text-muted-foreground">{kpi.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                      <div className="text-xs text-muted-foreground">/ {kpi.maxValue}</div>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="relative w-full h-3 bg-secondary/50 rounded-full overflow-hidden">
                    <div 
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r ${kpi.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: `${percentage}%`,
                        animationDelay: `${parseInt(kpi.delay) + 200}ms`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/kpi:translate-x-[100%] transition-transform duration-1000"></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i < Math.floor(percentage / 20) 
                              ? `bg-gradient-to-r ${kpi.color}` 
                              : 'bg-secondary/30'
                          }`}
                          style={{ animationDelay: `${parseInt(kpi.delay) + 300 + i * 100}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Score */}
        <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-primary-hover/10 rounded-xl border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-foreground">Gesamt-Score</h4>
              <p className="text-sm text-muted-foreground">Durchschnittliche KPI-Bewertung</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                {Math.round(kpiScores.reduce((acc, kpi) => acc + kpi.value, 0) / kpiScores.length)}
              </div>
              <div className="text-sm text-muted-foreground">von 100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
