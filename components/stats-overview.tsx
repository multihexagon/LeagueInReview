import { EnhancedTooltip } from "@/components/ui/enhanced-tooltip"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface StatsOverviewProps {
  summary: {
    win_rate: number
    avg_kda: number
    avg_cs_per_min: number
    avg_dpm: number
    avg_gold: number
  }
}


const statsTooltips = {
  winrate: "Your win percentage. 60%+ is excellent, 50-60% is good, below 50% needs improvement",
  kda: "Kills + Assists / Deaths. 2.0+ is excellent, 1.0-2.0 is average, below 1.0 needs survival work",
  cs: "Minions killed per minute. 7+ is excellent, 5-7 is good, below 5 practice farming in training tool",
  damage: "Damage to champions per minute. Varies by role: ADC/Mid 600+, Top/Jungle 400+, Support 200+",
  gold: "Average gold per game. Related to farming, kills and objectives. More gold = more items = more power"
}

export function StatsOverview({ summary }: StatsOverviewProps) {
  if (!summary) return null

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 mt-6 text-center">General Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
        <Stat 
          label="Winrate" 
          value={`${(summary.win_rate * 100).toFixed(0)}%`}
          tooltip={statsTooltips.winrate}
        />
        <Stat 
          label="KDA" 
          value={summary.avg_kda.toFixed(2)}
          tooltip={statsTooltips.kda}
        />
        <Stat 
          label="CS/min" 
          value={summary.avg_cs_per_min.toFixed(2)}
          tooltip={statsTooltips.cs}
        />
        <Stat 
          label="Damage/min" 
          value={summary.avg_dpm.toFixed(0)}
          tooltip={statsTooltips.damage}
        />
        <Stat 
          label="Gold" 
          value={summary.avg_gold.toFixed(0)}
          tooltip={statsTooltips.gold}
        />
      </div>
    </section>
  )
}

interface StatProps {
  label: string
  value: string | number
  tooltip?: string
}

function Stat({ label, value, tooltip }: StatProps) {
  if (tooltip) {
    return (
      <EnhancedTooltip content={tooltip} variant="inline" showIcon={false} delay={100}>
        <div className="p-8 rounded-2xl bg-card text-center shadow hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-help min-h-[140px] flex flex-col justify-center w-full max-w-[200px] mx-auto">
          <p className="text-4xl font-bold mb-3">{value}</p>
          <p className="text-base text-muted-foreground font-medium">{label}</p>
        </div>
      </EnhancedTooltip>
    )
  }

  return (
    <div className="p-8 rounded-2xl bg-card text-center shadow hover:shadow-lg transition-shadow min-h-[140px] flex flex-col justify-center w-full max-w-[200px] mx-auto">
      <p className="text-4xl font-bold mb-3">{value}</p>
      <p className="text-base text-muted-foreground font-medium">{label}</p>
    </div>
  )
}
