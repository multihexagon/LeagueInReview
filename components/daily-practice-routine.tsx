"use client"

import { motion } from "framer-motion"
import { 
  Flame, 
  Zap, 
  Target, 
  FileText, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  BarChart3
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DailyPracticeRoutineProps {
  daily_practice_routine: {
    warm_up: string
    skill_drill: string
    ranked_focus: string
    post_game: string
  }
  habits_to_break?: Array<{
    bad_habit: string
    evidence: string
    replacement_habit: string
    tracking_metric: string
  }>
}

export function DailyPracticeRoutine({ daily_practice_routine, habits_to_break }: DailyPracticeRoutineProps) {
  if (!daily_practice_routine) return null

  const routineSteps = [
    {
      icon: Flame,
      title: "Warm-up",
      description: daily_practice_routine.warm_up,
      color: "chart-1",
      time: "5-10 min",
      phase: "Pre-Game"
    },
    {
      icon: Zap,
      title: "Skill Drill",
      description: daily_practice_routine.skill_drill,
      color: "chart-3",
      time: "10-15 min",
      phase: "Practice"
    },
    {
      icon: Target,
      title: "Ranked Focus",
      description: daily_practice_routine.ranked_focus,
      color: "primary",
      time: "During Games",
      phase: "In-Game"
    },
    {
      icon: FileText,
      title: "Post-Game Review",
      description: daily_practice_routine.post_game,
      color: "secondary",
      time: "5 min",
      phase: "Post-Game"
    }
  ]

  return (
    <section className="py-16 px-4 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Daily Practice Routine</h2>
        <p className="text-xl text-muted-foreground">
          Your personalized training schedule for consistent improvement
        </p>
      </motion.div>

      {/* Practice Steps */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {routineSteps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={`h-full bg-gradient-to-br from-${step.color}/5 to-transparent border-${step.color}/20 hover:border-${step.color}/40 transition-all`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-${step.color}/10`}>
                      <Icon className={`h-5 w-5 text-${step.color}`} />
                    </div>
                    <div className="flex-1">
                      <Badge variant="outline" className="text-xs mb-1">
                        {step.phase}
                      </Badge>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{step.time}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Habits to Break Section */}
      {habits_to_break && habits_to_break.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            Habits to Break
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {habits_to_break.map((habit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-destructive/5 to-transparent border-destructive/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-destructive/10">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">{habit.bad_habit}</h4>
                        <Badge variant="destructive" className="text-xs">
                          Priority Fix
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Evidence */}
                    <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-semibold">Evidence</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{habit.evidence}</p>
                    </div>

                    {/* Replacement */}
                    <div className="p-3 rounded-lg bg-chart-2/10 border border-chart-2/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-chart-2" />
                        <span className="text-sm font-semibold text-chart-2">Replace With</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{habit.replacement_habit}</p>
                    </div>

                    {/* Tracking Metric */}
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">Track Progress</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{habit.tracking_metric}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Implementation Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="p-6 bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <Target className="h-5 w-5 text-accent" />
              Implementation Tips
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="p-3 rounded-lg bg-muted/30">
                <Clock className="h-5 w-5 text-chart-1 mx-auto mb-2" />
                <p><strong>Consistency:</strong> Follow this routine daily for 2-3 weeks to build habits</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <TrendingUp className="h-5 w-5 text-chart-2 mx-auto mb-2" />
                <p><strong>Progress:</strong> Track improvements in your focus areas weekly</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <Target className="h-5 w-5 text-primary mx-auto mb-2" />
                <p><strong>Adaptation:</strong> Adjust routine based on your improvement areas</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}