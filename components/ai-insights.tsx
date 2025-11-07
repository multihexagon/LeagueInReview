"use client"

import { motion } from "framer-motion"
import { Brain, TrendingUp, Target, AlertTriangle, Lightbulb, BookOpen, HelpCircle, Crown, CheckCircle, Users, MessageSquare, Clock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


interface AIInsightsProps {
  recap: {
    executive_summary: string
    win_condition_analysis: {
      what_player_does_well_in_wins: string[]
      what_goes_wrong_in_losses: string[]
      key_difference: string
    }
    skill_ceiling_assessment: {
      current_level: string
      mechanical_ceiling: string
      game_knowledge_ceiling: string
      limiting_factor: string
      realistic_peak: string
    }
    improvement_roadmap: {
      immediate_priority: {
        focus: string
        reason: string
        expected_result: string
        timeline: string
      }
      next_priorities: Array<{
        focus: string
        reason: string
        timeline: string
      }>
    }
    personalized_champion_recommendations: Array<{
      champion: string
      fit_score: string
      why_good_fit: string
      learning_curve: string
      expected_win_rate: string
    }>
    habits_to_break: Array<{
      bad_habit: string
      evidence: string
      replacement_habit: string
      tracking_metric: string
    }>
    daily_practice_routine: {
      warm_up: string
      skill_drill: string
      ranked_focus: string
      post_game: string
    }
    red_flags: string[]
    green_flags: string[]
    coach_notes: string
  }
}

// Informative tooltips for each type of insight
const insightTooltips = {
  executive_summary: "AI's overall assessment of your performance and potential areas for growth",
  skill_ceiling: "Analysis of your current rank potential based on mechanical and strategic skills",
  red_flags: "Critical areas that are limiting your climb and need immediate attention",
  green_flags: "Your strongest assets that you should continue to leverage in ranked games",
  coach_notes: "Professional coaching insights tailored specifically to your gameplay patterns",
  win_conditions: "What separates your wins from losses - key patterns identified by AI analysis"
}

export function AIInsights({ recap }: AIInsightsProps) {
  if (!recap) return null

  // Main insights usando la nueva estructura
  const insights = [
    // Executive Summary - siempre el primero
    {
      icon: Brain,
      title: "Executive Summary",
      description: recap.executive_summary,
      highlight: "AI Assessment",
      color: "primary",
      type: "executive" as const
    },

    // Skill Ceiling Assessment
    {
      icon: Target,
      title: "Skill Ceiling Analysis",
      description: `Current Level: ${recap.skill_ceiling_assessment.current_level}. Realistic Peak: ${recap.skill_ceiling_assessment.realistic_peak}. Limiting Factor: ${recap.skill_ceiling_assessment.limiting_factor}`,
      highlight: "Potential Analysis",
      color: "chart-1",
      type: "ceiling" as const
    },

    // Red Flags - áreas críticas
    ...(recap.red_flags && recap.red_flags.length > 0 ? [{
      icon: AlertTriangle,
      title: "Critical Issues",
      description: `Areas limiting your climb: ${recap.red_flags.join(', ')}. These need immediate attention to unlock your potential.`,
      highlight: "Needs Focus",
      color: "destructive",
      type: "red_flags" as const
    }] : []),

    // Green Flags - fortalezas
    ...(recap.green_flags && recap.green_flags.length > 0 ? [{
      icon: CheckCircle,
      title: "Key Strengths",
      description: `Your advantages: ${recap.green_flags.join(', ')}. Continue leveraging these in ranked games.`,
      highlight: "Keep It Up",
      color: "chart-2",
      type: "green_flags" as const
    }] : []),

    // Win Condition Analysis
    {
      icon: Users,
      title: "Win Conditions",
      description: `Key Difference: ${recap.win_condition_analysis.key_difference}. In wins you excel at: ${recap.win_condition_analysis.what_player_does_well_in_wins.join(', ')}.`,
      highlight: "Victory Pattern",
      color: "chart-4",
      type: "win_analysis" as const
    },

    // Coach Notes
    {
      icon: MessageSquare,
      title: "Coach Notes",
      description: recap.coach_notes,
      highlight: "Professional Insight",
      color: "secondary",
      type: "coach" as const
    },
  ].slice(0, 6) // Máximo 6 insights

  return (
    <section className="py-24 px-4 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">AI-Powered Insights</h2>
        <p className="text-xl text-muted-foreground">
          Comprehensive AI-powered analysis of your gameplay
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon
          const colorClass = `text-${insight.color}`
          const bgColorClass = `bg-${insight.color}/10`
          const borderColorClass = `border-${insight.color}/20`
          
          return (
            <motion.div
              key={`${insight.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 bg-card border border-border/50 hover:border-primary/50 transition-all group h-full shadow-sm">
                <div className="flex items-start gap-6 h-full">
                  <div className={`w-16 h-16 rounded-xl ${bgColorClass} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${colorClass}`} />
                  </div>
                  <div className="flex-1 min-h-0">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold">{insight.title}</h3>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-5 h-5 text-muted-foreground hover:text-primary cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-sm text-sm">
                            {insight.type === 'executive' && insightTooltips.executive_summary}
                            {insight.type === 'ceiling' && insightTooltips.skill_ceiling}
                            {insight.type === 'red_flags' && insightTooltips.red_flags}
                            {insight.type === 'green_flags' && insightTooltips.green_flags}
                            {insight.type === 'win_analysis' && insightTooltips.win_conditions}
                            {insight.type === 'coach' && insightTooltips.coach_notes}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="text-foreground mb-6 leading-relaxed text-base">
                      {insight.description}
                    </p>
                    

                    
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      {insight.highlight}
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Improvement Roadmap Section */}
      {recap.improvement_roadmap && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold mb-12 text-center">Improvement Roadmap</h3>
          
          {/* Immediate Priority */}
          <div className="mb-12">
            <div className="p-8 rounded-2xl bg-gradient-to-r from-destructive/5 to-primary/5 border border-primary/20">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl bg-primary/10">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h4 className="text-2xl font-semibold">Immediate Priority</h4>
                    <span className="px-3 py-2 text-sm bg-destructive/20 text-destructive rounded-lg font-medium">
                      {recap.improvement_roadmap.immediate_priority.timeline}
                    </span>
                  </div>
                  <h5 className="text-xl font-medium text-primary mb-4">
                    {recap.improvement_roadmap.immediate_priority.focus}
                  </h5>
                  <p className="text-foreground mb-3 text-base leading-relaxed">
                    <strong>Why:</strong> {recap.improvement_roadmap.immediate_priority.reason}
                  </p>
                  <p className="text-foreground text-base leading-relaxed">
                    <strong>Expected Result:</strong> {recap.improvement_roadmap.immediate_priority.expected_result}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Priorities */}
          {recap.improvement_roadmap.next_priorities && recap.improvement_roadmap.next_priorities.length > 0 && (
            <div className="grid md:grid-cols-2 gap-10">
              {recap.improvement_roadmap.next_priorities.map((priority, index) => (
                <div key={index} className="p-10 rounded-2xl bg-card/50 border border-border/30">
                  <div className="flex items-start gap-6">
                    <div className="p-4 rounded-lg bg-chart-3/10">
                      <TrendingUp className="h-7 w-7 text-chart-3" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h5 className="text-xl font-semibold">{priority.focus}</h5>
                        <span className="px-3 py-2 text-sm bg-muted text-muted-foreground rounded-lg">
                          {priority.timeline}
                        </span>
                      </div>
                      <p className="text-base text-foreground leading-relaxed">{priority.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Habits to Break Section */}
      {recap.habits_to_break && recap.habits_to_break.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 p-10 rounded-2xl bg-card/50 border border-border/50"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-destructive" />
            Habits to Break
          </h3>
          <div className="space-y-6">
            {recap.habits_to_break.map((habit, index) => (
              <div key={index} className="p-6 rounded-lg bg-muted/30 border border-destructive/20">
                <div className="flex items-start gap-5">
                  <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-destructive">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground mb-3">{habit.bad_habit}</h4>
                    <p className="text-base text-foreground mb-4 leading-relaxed">
                      <strong>Evidence:</strong> {habit.evidence}
                    </p>
                    <p className="text-base text-chart-2 mb-3 leading-relaxed">
                      <strong>Replace with:</strong> {habit.replacement_habit}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Track:</strong> {habit.tracking_metric}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Daily Practice Routine Section */}
      {recap.daily_practice_routine && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 p-10 rounded-2xl bg-card/50 border border-border/50"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-accent" />
            Daily Practice Routine
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg bg-muted/30">
              <h4 className="text-lg font-semibold text-primary mb-4">🔥 Warm-up</h4>
              <p className="text-base text-foreground leading-relaxed">{recap.daily_practice_routine.warm_up}</p>
            </div>
            <div className="p-6 rounded-lg bg-muted/30">
              <h4 className="text-lg font-semibold text-chart-3 mb-4">⚡ Skill Drill</h4>
              <p className="text-base text-foreground leading-relaxed">{recap.daily_practice_routine.skill_drill}</p>
            </div>
            <div className="p-6 rounded-lg bg-muted/30">
              <h4 className="text-lg font-semibold text-accent mb-4">🎯 Ranked Focus</h4>
              <p className="text-base text-foreground leading-relaxed">{recap.daily_practice_routine.ranked_focus}</p>
            </div>
            <div className="p-6 rounded-lg bg-muted/30">
              <h4 className="text-lg font-semibold text-secondary mb-4">📝 Post-Game</h4>
              <p className="text-base text-foreground leading-relaxed">{recap.daily_practice_routine.post_game}</p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}