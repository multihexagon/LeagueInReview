"use client"

import { useState } from "react"
import { SummonerSearch } from "@/components/summoner-search"
import { HeroSection } from "@/components/hero-section"
import { StatsOverview } from "@/components/stats-overview"
import { TipsAdvice } from "@/components/tips-advice"
import { ChampionShowcase } from "@/components/champion-showcase"
import { AIInsights } from "@/components/ai-insights"
import { WinConditionAnalysis } from "@/components/win-condition-analysis"
import { ChampionRecommendations } from "@/components/champion-recommendations"
import { DailyPracticeRoutine } from "@/components/daily-practice-routine"
import { HighlightsSection } from "@/components/highlights-section"
import { RecentGames } from "@/components/recent-games"
import { VsComparison } from "@/components/vs-comparison"
import { ShareSection } from "@/components/share-section"
import { ProgressionAnalysis } from "@/components/progression-analysis"
import { ParticleBackground } from "@/components/particle-background"
import { AnimatedStat } from "@/components/animated-stat"
import { SkillRadar } from "@/components/skill-radar"
import { MatchTimeline } from "@/components/match-timeline"

export default function Home() {
  const [playerData, setPlayerData] = useState<any>(null)

  const handleDataFetched = (data: any) => {
    console.log("✅ Data recibida:", data)
    setPlayerData(data)
  }

  // Transformar datos para componentes visuales avanzados
  const getSkillRadarData = (recap: any) => {
    if (!recap?.skill_ceiling_assessment) return []
    
    const skills = recap.skill_ceiling_assessment
    return [
      { skill: "Mechanics", current: skills.mechanics?.current || 5, potential: skills.mechanics?.potential || 8, color: "#8B5CF6" },
      { skill: "Map Awareness", current: skills.map_awareness?.current || 5, potential: skills.map_awareness?.potential || 8, color: "#06B6D4" },
      { skill: "Team Fighting", current: skills.team_fighting?.current || 5, potential: skills.team_fighting?.potential || 8, color: "#10B981" },
      { skill: "Laning", current: skills.laning?.current || 5, potential: skills.laning?.potential || 8, color: "#F59E0B" },
      { skill: "Vision Control", current: skills.vision_control?.current || 5, potential: skills.vision_control?.potential || 8, color: "#EF4444" },
      { skill: "Decision Making", current: skills.decision_making?.current || 5, potential: skills.decision_making?.potential || 8, color: "#EC4899" }
    ]
  }

  const getMatchTimelineData = (matches: any[]) => {
    if (!matches || matches.length === 0) return []
    
    return matches.slice(0, 15).map((match, index) => ({
      id: `match-${index}`,
      result: (match.win ? 'win' : 'loss') as 'win' | 'loss',
      champion: match.champion,
      championImage: match.champion_img,
      kda: `${match.kills}/${match.deaths}/${match.assists}`,
      duration: match.game_duration || `${Math.floor(Math.random() * 20 + 20)}min`,
      rank: "Ranked Solo/Duo",
      performance: Math.round(((match.kills + match.assists) / Math.max(match.deaths, 1)) * 20),
      timestamp: `${index + 1}h ago`,
      highlights: [
        match.win ? "Victory achieved" : "Defeat - learning opportunity",
        `${match.kills} kills, ${match.assists} assists`,
        `Played ${match.champion}`,
        match.kda >= 2 ? "Great KDA performance" : "Room for improvement",
        match.cs >= 150 ? "Excellent farming" : "Focus on CS"
      ]
    }))
  }

  // Obtener el campeón más jugado
  const getTopChampion = (matches: any[]) => {
    if (!matches || matches.length === 0) return null
    
    const championCount = matches.reduce((acc, match) => {
      if (!acc[match.champion]) {
        acc[match.champion] = {
          name: match.champion,
          image: match.champion_img, // Usar icono pequeño en HeroSection
          splashImage: match.champion_splash, // Imagen splash para futuros usos
          games: 0
        }
      }
      acc[match.champion].games += 1
      return acc
    }, {} as Record<string, any>)

    return Object.values(championCount)
      .sort((a: any, b: any) => b.games - a.games)[0] as any
  }

  return (
    <main className="min-h-screen relative">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Content with z-index to appear above particles */}
      <div className="relative z-10">
        {/* Siempre visible */}
        <SummonerSearch onDataFetched={handleDataFetched} />

      {/* Solo visible si hay datos */}
      {playerData && (
        <>
          <HeroSection 
            summary={playerData.summary} 
            topChampion={getTopChampion(playerData.matches)}
            recap={playerData.recap}
          />
          
          <StatsOverview summary={playerData.summary} />
          <ChampionShowcase matches={playerData.matches} />
          
          {/* AI Analysis Section */}
          <AIInsights recap={playerData.recap} />
          
          {/* Enhanced Skill Radar */}
          {playerData.recap?.skill_ceiling_assessment && (
            <section className="py-12 px-4">
              <div className="container mx-auto">
                <SkillRadar 
                  skills={getSkillRadarData(playerData.recap)}
                  title="🎯 Skill Analysis Radar"
                />
              </div>
            </section>
          )}
          
          {/* Win Condition Analysis */}
          {playerData.recap?.win_condition_analysis && (
            <WinConditionAnalysis win_condition_analysis={playerData.recap.win_condition_analysis} />
          )}
          
          {/* Champion Recommendations */}
          {playerData.recap?.personalized_champion_recommendations && (
            <ChampionRecommendations personalized_champion_recommendations={playerData.recap.personalized_champion_recommendations} />
          )}
          
          {/* Daily Practice Routine */}
          {playerData.recap?.daily_practice_routine && (
            <DailyPracticeRoutine 
              daily_practice_routine={playerData.recap.daily_practice_routine}
              habits_to_break={playerData.recap.habits_to_break}
            />
          )}
          
          <HighlightsSection 
            recap={playerData.recap} 
            matches={playerData.matches}
            summary={playerData.summary}
          />
          
          {/* Enhanced Match Timeline */}
          <section className="py-12 px-4">
            <div className="container mx-auto">
              <MatchTimeline 
                matches={getMatchTimelineData(playerData.matches)}
                title="Recent Games"
              />
            </div>
          </section>
          <ProgressionAnalysis 
            matches={playerData.matches}
            playerName={playerData.summary?.summoner_name || "Summoner"}
          />
          <VsComparison 
            summary={playerData.summary} 
            playerName={playerData.summary?.summoner_name || "You"}
            topChampion={getTopChampion(playerData.matches)}
            recap={playerData.recap}
          />
          <TipsAdvice recap={playerData.recap} />
          <ShareSection 
            recap={playerData.recap}
            playerName={playerData.summary?.summoner_name || "Summoner"}
            summary={playerData.summary}
            matches={playerData.matches}
          />
        </>
      )}
      </div>
    </main>
  )
}
