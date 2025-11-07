"use client"

import { ParticleBackground } from "@/components/particle-background"
import { AnimatedStat } from "@/components/animated-stat"
import { InteractiveTimeline } from "@/components/interactive-timeline"
import { PerformanceHeatmap } from "@/components/performance-heatmap"
import { SkillRadar } from "@/components/skill-radar"
import { MatchTimeline } from "@/components/match-timeline"
import { AchievementShowcase } from "@/components/achievement-showcase"

// Datos de ejemplo para demostrar los componentes
const exampleSkills = [
  { skill: "Mechanics", current: 7, potential: 9, color: "#8B5CF6" },
  { skill: "Map Awareness", current: 6, potential: 8, color: "#06B6D4" },
  { skill: "Team Fighting", current: 8, potential: 9, color: "#10B981" },
  { skill: "Laning", current: 7, potential: 8, color: "#F59E0B" },
  { skill: "Vision Control", current: 5, potential: 8, color: "#EF4444" },
  { skill: "Objective Control", current: 6, potential: 9, color: "#EC4899" }
]

const exampleMatches = [
  {
    id: "1",
    result: "win" as const,
    champion: "Jinx",
    kda: "12/3/8",
    duration: "32:15",
    rank: "Gold II",
    performance: 85,
    timestamp: "2h ago",
    highlights: [
      "Excellent teamfight positioning",
      "Perfect ultimate timing in baron fight",
      "Strong laning phase with 8 CS/min"
    ]
  },
  {
    id: "2",
    result: "loss" as const,
    champion: "Caitlyn",
    kda: "6/7/4",
    duration: "28:45",
    rank: "Gold II",
    performance: 42,
    timestamp: "4h ago",
    highlights: [
      "Struggled with positioning in mid game",
      "Missed crucial ultimate in dragon fight",
      "Good early game farm"
    ]
  }
]

const exampleAchievements = [
  {
    id: "1",
    title: "Pentakill Master",
    description: "Get 5 pentakills in ranked games",
    icon: "⚡",
    rarity: "legendary" as const,
    progress: 5,
    maxProgress: 5,
    unlockedAt: "2024-01-15",
    reward: "Legendary Border"
  },
  {
    id: "2",
    title: "Vision Guardian",
    description: "Place 1000 wards in ranked games",
    icon: "👁️",
    rarity: "epic" as const,
    progress: 750,
    maxProgress: 1000,
    reward: "Epic Ward Skin"
  },
  {
    id: "3",
    title: "Comeback King",
    description: "Win 10 games after being 10k gold behind",
    icon: "👑",
    rarity: "rare" as const,
    progress: 10,
    maxProgress: 10,
    unlockedAt: "2024-01-10",
    reward: "Rare Emote"
  }
]

const exampleTimelineItems = [
  {
    id: "1",
    title: "Ranked Climb Started",
    description: "Begin your journey to Diamond. Started in Silver III, focused on fundamentals and champion mastery.",
    timeline: "Completed",
    type: "immediate" as const,
    completed: true
  },
  {
    id: "2",
    title: "Mechanics Improvement",
    description: "Master advanced combos and animation canceling. Currently practicing Riven combos and Yasuo mechanics in practice tool.",
    timeline: "In Progress",
    type: "short" as const,
    completed: false
  },
  {
    id: "3",
    title: "Diamond Promotion",
    description: "Reach Diamond tier. Goal set for end of March. Focus on macro play and team coordination.",
    timeline: "Upcoming",
    type: "long" as const,
    completed: false
  }
]

const exampleHeatmapData = [
  { day: 1, month: 0, value: 0.85, games: 12, winRate: 0.67 },
  { day: 2, month: 0, value: 0.92, games: 8, winRate: 0.75 },
  { day: 3, month: 0, value: 0.78, games: 15, winRate: 0.60 },
  { day: 1, month: 1, value: 0.88, games: 10, winRate: 0.70 },
  { day: 2, month: 1, value: 0.73, games: 6, winRate: 0.50 },
  { day: 3, month: 1, value: 0.95, games: 20, winRate: 0.85 },
  { day: 1, month: 2, value: 0.67, games: 14, winRate: 0.57 },
  { day: 2, month: 2, value: 0.84, games: 11, winRate: 0.73 },
  { day: 3, month: 2, value: 0.91, games: 9, winRate: 0.78 }
]

export function VisualShowcase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Particle Background */}
      <ParticleBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8 space-y-8">
        {/* Header with animated stats */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Enhanced UI Components Showcase
          </h1>
          <p className="text-muted-foreground mb-8">
            Componentes visuales avanzados para una experiencia inmersiva
          </p>
          
          {/* Animated Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <AnimatedStat
              label="Current Rank"
              value={2}
              icon="🏆"
              suffix=" (Gold II)"
            />
            <AnimatedStat
              label="LP"
              value={1847}
              icon="⭐"
            />
            <AnimatedStat
              label="Win Rate"
              value={73}
              icon="📈"
              suffix="%"
            />
            <AnimatedStat
              label="Games Played"
              value={142}
              icon="🎯"
            />
          </div>
        </div>

        {/* Skills Radar Chart */}
        <SkillRadar 
          skills={exampleSkills}
          title="Skill Analysis Radar"
        />

        {/* Performance Heatmap */}
        <PerformanceHeatmap
          data={exampleHeatmapData}
          title="Performance Heatmap"
        />

        {/* Interactive Timeline */}
        <div className="p-6 rounded-2xl bg-card border border-border/50">
          <h3 className="text-xl font-bold mb-6">Improvement Roadmap</h3>
          <InteractiveTimeline
            items={exampleTimelineItems}
          />
        </div>

        {/* Match Timeline */}
        <MatchTimeline
          matches={exampleMatches}
          title="Recent Match History"
        />

        {/* Achievement Showcase */}
        <AchievementShowcase
          achievements={exampleAchievements}
          title="Achievement Gallery"
        />

        {/* Integration Tips */}
        <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <h2 className="text-2xl font-bold mb-4">🚀 Integration Tips</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Performance Optimizations:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Use React.memo() for heavy components</li>
                <li>• Implement lazy loading for off-screen elements</li>
                <li>• Optimize animation frame rates</li>
                <li>• Cache computed values with useMemo()</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Responsive Design:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• All components include mobile breakpoints</li>
                <li>• Touch-friendly interactions on mobile</li>
                <li>• Reduced motion for accessibility</li>
                <li>• Dynamic grid layouts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}