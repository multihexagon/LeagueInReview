"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface MatchData {
  id: string
  result?: 'win' | 'loss'
  champion: string
  championImage?: string
  kda: string
  duration: string
  rank: string
  performance?: number
  timestamp?: string
  highlights: string[]
}

interface MatchTimelineProps {
  matches: MatchData[]
  title: string
}

export function MatchTimeline({ matches, title }: MatchTimelineProps) {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'win' | 'loss'>('all')

  const filteredMatches = matches.filter(match => 
    filter === 'all' || match.result === filter
  )

  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return 'text-green-400 bg-green-400/20'
    if (performance >= 60) return 'text-yellow-400 bg-yellow-400/20'
    return 'text-red-400 bg-red-400/20'
  }

  const getResultIcon = (result: 'win' | 'loss' | undefined) => {
    if (!result) return '❓'
    return result === 'win' ? '🏆' : '💀'
  }

  return (
    <div className="p-4 rounded-xl bg-card border border-border/50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        
        {/* Filter buttons */}
        <div className="flex gap-2">
          {['all', 'win', 'loss'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption as typeof filter)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                filter === filterOption
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {filterOption === 'all' ? 'Todas' : filterOption === 'win' ? 'Wins' : 'Losses'}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
        
        <div className="space-y-4">
          <AnimatePresence>
            {filteredMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className={`absolute left-4 w-4 h-4 rounded-full border-2 z-10 ${
                  match.result === 'win' 
                    ? 'bg-green-500 border-green-400' 
                    : 'bg-red-500 border-red-400'
                }`} />
                
                {/* Match card */}
                <motion.div
                  className={`ml-12 p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                    selectedMatch === match.id
                      ? 'border-primary bg-primary/5 scale-[1.02]'
                      : 'border-border/50 bg-card/50 hover:border-border hover:bg-card/80'
                  }`}
                  onClick={() => setSelectedMatch(
                    selectedMatch === match.id ? null : match.id
                  )}
                  whileHover={{ y: -2 }}
                  layoutId={`match-${match.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {match.championImage ? (
                          <img
                            src={match.championImage}
                            alt={match.champion}
                            className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder.svg"
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                            {getResultIcon(match.result)}
                          </div>
                        )}
                        {/* Indicador de victoria/derrota en la esquina */}
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                          match.result === 'win' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {match.result === 'win' ? 'W' : 'L'}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {match.champion}
                          <Badge variant={match.result === 'win' ? 'default' : 'destructive'}>
                            {match.result?.toUpperCase() || 'UNKNOWN'}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {match.kda} • {match.duration} • {match.rank}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium cursor-help ${getPerformanceColor(match.performance || 0)}`}>
                            {match.performance || 0}%
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-sm">
                            <div className="font-medium mb-1">Performance Score</div>
                            <div className="text-xs text-muted-foreground">
                              Formula: ((Kills + Assists) / Deaths) × 20
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              • 300%+ = Exceptional<br/>
                              • 200-299% = Excellent<br/>
                              • 100-199% = Good<br/>
                              • 50-99% = Average<br/>
                              • 0-49% = Needs improvement
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      <div className="text-xs text-muted-foreground">
                        {match.timestamp || 'Unknown'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded details */}
                  <AnimatePresence>
                    {selectedMatch === match.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-border/50"
                      >
                        <h4 className="font-medium mb-2 text-sm">Momentos Destacados:</h4>
                        <div className="space-y-2">
                          {match.highlights.map((highlight, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center gap-2 text-sm"
                            >
                              <div className="w-2 h-2 rounded-full bg-primary/60" />
                              {highlight}
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Performance breakdown */}
                        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center p-2 rounded bg-muted/50">
                            <div className="font-medium">Farm</div>
                            <div className="text-muted-foreground">CS/min</div>
                          </div>
                          <div className="text-center p-2 rounded bg-muted/50">
                            <div className="font-medium">Vision</div>
                            <div className="text-muted-foreground">Score</div>
                          </div>
                          <div className="text-center p-2 rounded bg-muted/50">
                            <div className="font-medium">Damage</div>
                            <div className="text-muted-foreground">% Team</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
        >
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">
                {filteredMatches.filter(m => m.result === 'win').length}
              </div>
              <div className="text-sm text-muted-foreground">Victorias</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">
                {filteredMatches.filter(m => m.result === 'loss').length}
              </div>
              <div className="text-sm text-muted-foreground">Losses</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {Math.round(
                  filteredMatches.reduce((sum, m) => sum + (m.performance || 0), 0) / filteredMatches.length
                )}%
              </div>
              <div className="text-sm text-muted-foreground">Average performance</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                {Math.round(
                  (filteredMatches.filter(m => m.result === 'win').length / Math.max(filteredMatches.length, 1)) * 100
                )}%
              </div>
              <div className="text-sm text-muted-foreground">Winrate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}