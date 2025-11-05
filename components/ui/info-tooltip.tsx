"use client"

import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface InfoTooltipProps {
  content: string
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

export function InfoTooltip({ content, children, side = "top", className = "" }: InfoTooltipProps) {
  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <div className={`inline-flex items-center gap-1 group cursor-help ${className}`}>
          {children}
          <HelpCircle className="w-4 h-4 text-muted-foreground/60 hover:text-primary transition-all duration-200 hover:scale-110 group-hover:text-primary" />
        </div>
      </TooltipTrigger>
      <TooltipContent side={side} className="max-w-sm">
        <p className="text-sm leading-relaxed">{content}</p>
      </TooltipContent>
    </Tooltip>
  )
}

// Predefined tooltips for common League of Legends metrics
export const gameTooltips = {
  winRate: "Your win percentage. 60%+ is excellent, 50-60% is good, below 50% needs improvement",
  kda: "Kill/Death/Assist ratio. 2.0+ is excellent, 1.0-2.0 is average, below 1.0 needs survival work",
  csPerMin: "Minions killed per minute. 7+ is excellent, 5-7 is good, below 5 practice farming in training tool",
  visionScore: "Vision Score - wards placed and destroyed. 40+ is excellent, 20-40 is good, below 20 needs more wards",
  damagePerMin: "Damage to champions per minute. Varies by role: ADC/Mid 600+, Top/Jungle 400+, Support 200+",
  goldEarned: "Average gold per game. Related to farming, kills and objectives. More gold = more items = more power",
  killParticipation: "Percentage of team kills you participated in. 70%+ is excellent for most roles",
  averageKills: "Average eliminations per game. Varies by role and playstyle",
  averageDeaths: "Average deaths per game. Fewer deaths = better positioning and survival",
  averageAssists: "Average assists per game. More assists = better teamwork",
  firstBlood: "Percentage of games where you got first blood. Good indicator of early game presence",
  multikills: "Multiple eliminations (Double kills, Triple kills, etc.). Indicator of carry potential",
  objectiveControl: "Participation in major objectives (Dragons, Baron, Towers). Key to winning games"
}

// Componente específico para métricas de juego con tooltips predefinidos
interface GameMetricTooltipProps {
  metric: keyof typeof gameTooltips
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

export function GameMetricTooltip({ metric, children, side = "top", className = "" }: GameMetricTooltipProps) {
  return (
    <InfoTooltip content={gameTooltips[metric]} side={side} className={className}>
      {children}
    </InfoTooltip>
  )
}