"use client"

import { motion } from "framer-motion"
import { Crown, Star, TrendingUp, Clock, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


interface ChampionRecommendationsProps {
  personalized_champion_recommendations: Array<{
    champion: string
    fit_score: string
    why_good_fit: string
    learning_curve: string
    expected_win_rate: string
  }>
}

export function ChampionRecommendations({ personalized_champion_recommendations }: ChampionRecommendationsProps) {
  if (!personalized_champion_recommendations || personalized_champion_recommendations.length === 0) {
    return null
  }

  const getLearningCurveColor = (curve: string) => {
    switch (curve.toLowerCase()) {
      case 'easy': return 'chart-2'
      case 'medium': return 'accent'
      case 'hard': return 'destructive'
      default: return 'muted'
    }
  }

  const getLearningCurveIcon = (curve: string) => {
    switch (curve.toLowerCase()) {
      case 'easy': return <Star className="h-4 w-4" />
      case 'medium': return <Target className="h-4 w-4" />
      case 'hard': return <Crown className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <section className="py-16 px-4 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Champion Recommendations</h2>
        <p className="text-xl text-muted-foreground">
          AI-selected champions that match your playstyle
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {personalized_champion_recommendations.map((champ, index) => {
          const fitScore = parseInt(champ.fit_score) || 0
          const learningColor = getLearningCurveColor(champ.learning_curve)
          const learningIcon = getLearningCurveIcon(champ.learning_curve)
          
          return (
            <motion.div
              key={champ.champion}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:border-primary/40 transition-all">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Crown className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{champ.champion}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          Fit Score: {champ.fit_score}/10
                        </Badge>
                        <Badge variant="outline" className={`text-xs text-${learningColor}`}>
                          <span className="mr-1">{learningIcon}</span>
                          {champ.learning_curve}
                        </Badge>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Fit Score Visual */}
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Compatibility</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 10 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < fitScore ? 'bg-primary' : 'bg-muted'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">{fitScore}/10</span>
                      </div>
                    </div>
                  </div>

                  {/* Why Good Fit */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Star className="h-4 w-4 text-accent" />
                      Why It's a Good Fit
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {champ.why_good_fit}
                    </p>
                  </div>

                  {/* Expected Win Rate */}
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-chart-2" />
                      <span className="font-semibold text-sm">Expected Performance</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {champ.expected_win_rate}
                    </p>
                  </div>

                  {/* Learning Curve Detail */}
                  <div className="p-3 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
                    <div className="flex items-center gap-2 mb-1">
                      {learningIcon}
                      <span className="font-semibold text-sm">Learning Curve</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {champ.learning_curve === 'Easy' && 'Quick to master, immediate impact'}
                      {champ.learning_curve === 'Medium' && 'Moderate investment, good returns'}
                      {champ.learning_curve === 'Hard' && 'High skill ceiling, rewarding mastery'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Additional Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12"
      >
        <Card className="p-6 bg-gradient-to-r from-secondary/5 to-accent/5 border-secondary/20">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <Target className="h-5 w-5 text-secondary" />
              Champion Selection Tips
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="p-3 rounded-lg bg-muted/30">
                <Star className="h-5 w-5 text-chart-2 mx-auto mb-2" />
                <p><strong>High Fit Score:</strong> Champions that match your current playstyle perfectly</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <TrendingUp className="h-5 w-5 text-accent mx-auto mb-2" />
                <p><strong>Expected Win Rate:</strong> Projected performance based on your skills</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                <p><strong>Learning Curve:</strong> Time investment needed to see results</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}