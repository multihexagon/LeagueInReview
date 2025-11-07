import { EnhancedTooltip } from "@/components/ui/enhanced-tooltip"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { AnimatedStat } from "@/components/animated-stat"
import { motion } from "framer-motion"

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
    <section className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-12 text-center gradient-text">Performance Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          <AnimatedStat
            label="Win Rate"
            value={Math.round(summary.win_rate * 100)}
            suffix="%"
            icon="🏆"
            color="primary"
            duration={2}
          />
          <AnimatedStat
            label="KDA Ratio"
            value={Math.round(summary.avg_kda * 100) / 100}
            icon="⚔️"
            color="accent"
            duration={2.2}
          />
          <AnimatedStat
            label="CS/min"
            value={Math.round(summary.avg_cs_per_min * 100) / 100}
            icon="⚡"
            color="secondary"
            duration={2.4}
          />
          <AnimatedStat
            label="Damage/min"
            value={Math.round(summary.avg_dpm)}
            icon="💥"
            color="chart-1"
            duration={2.6}
          />
          <AnimatedStat 
            label="Avg Gold" 
            value={Math.round(summary.avg_gold)}
            icon="💰"
            color="chart-2"
            duration={2.8}
          />
        </div>
      </motion.div>
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
