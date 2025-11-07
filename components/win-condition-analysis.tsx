"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Target, CheckCircle2, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WinConditionAnalysisProps {
  win_condition_analysis: {
    what_player_does_well_in_wins: string[]
    what_goes_wrong_in_losses: string[]
    key_difference: string
  }
}

export function WinConditionAnalysis({ win_condition_analysis }: WinConditionAnalysisProps) {
  if (!win_condition_analysis) return null

  return (
    <section className="py-16 px-4 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Win Condition Analysis</h2>
        <p className="text-xl text-muted-foreground">
          What separates your victories from defeats
        </p>
      </motion.div>

      {/* Key Difference - Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-12"
      >
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                Key Difference
                <Badge variant="outline" className="text-xs">Critical Insight</Badge>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {win_condition_analysis.key_difference}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Wins vs Losses Comparison */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* What You Do Well in Wins */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="h-full bg-gradient-to-br from-chart-2/5 to-transparent border-chart-2/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-chart-2/10">
                  <TrendingUp className="h-6 w-6 text-chart-2" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-chart-2">In Your Wins</h3>
                  <p className="text-sm text-muted-foreground font-normal">
                    What you excel at when victorious
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {win_condition_analysis.what_player_does_well_in_wins.map((strength, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-chart-2/10 border border-chart-2/20"
                  >
                    <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0" />
                    <span className="text-foreground font-medium capitalize">
                      {strength}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* What Goes Wrong in Losses */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="h-full bg-gradient-to-br from-destructive/5 to-transparent border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <TrendingDown className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-destructive">In Your Losses</h3>
                  <p className="text-sm text-muted-foreground font-normal">
                    Common issues when you lose
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {win_condition_analysis.what_goes_wrong_in_losses.map((weakness, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                  >
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                    <span className="text-foreground font-medium capitalize">
                      {weakness}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12"
      >
        <Card className="p-6 bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <Target className="h-5 w-5 text-accent" />
              Action Plan
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Focus on maintaining your winning habits while actively working to eliminate the patterns 
              that lead to losses. The key difference identified above should be your primary focus area.
            </p>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}