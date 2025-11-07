"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  progress: number
  maxProgress: number
  unlockedAt?: string
  reward?: string
}

interface AchievementShowcaseProps {
  achievements: Achievement[]
  title: string
}

const rarityConfig = {
  common: {
    gradient: 'from-gray-400 to-gray-600',
    glow: 'shadow-gray-400/20',
    border: 'border-gray-400/30',
    particle: '#9CA3AF'
  },
  rare: {
    gradient: 'from-blue-400 to-blue-600',
    glow: 'shadow-blue-400/30',
    border: 'border-blue-400/30',
    particle: '#60A5FA'
  },
  epic: {
    gradient: 'from-purple-400 to-purple-600',
    glow: 'shadow-purple-400/30',
    border: 'border-purple-400/30',
    particle: '#A78BFA'
  },
  legendary: {
    gradient: 'from-yellow-400 to-orange-500',
    glow: 'shadow-yellow-400/40',
    border: 'border-yellow-400/30',
    particle: '#FBBF24'
  }
}

export function AchievementShowcase({ achievements, title }: AchievementShowcaseProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'unlocked') return achievement.progress >= achievement.maxProgress
    if (filter === 'locked') return achievement.progress < achievement.maxProgress
    return true
  })

  const isUnlocked = (achievement: Achievement) => achievement.progress >= achievement.maxProgress

  return (
    <div className="p-6 rounded-2xl bg-card border border-border/50">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">{title}</h3>
        
        {/* Filter buttons */}
        <div className="flex gap-2">
          {['all', 'unlocked', 'locked'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption as typeof filter)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                filter === filterOption
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {filterOption === 'all' ? 'Todos' : 
               filterOption === 'unlocked' ? 'Desbloqueados' : 'Bloqueados'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement, index) => {
          const config = rarityConfig[achievement.rarity]
          const unlocked = isUnlocked(achievement)
          const progressPercentage = (achievement.progress / achievement.maxProgress) * 100
          
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                unlocked 
                  ? `bg-gradient-to-br ${config.gradient} ${config.glow} shadow-lg ${config.border}`
                  : 'bg-card/50 border-border/50 hover:border-border'
              }`}
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
              onClick={() => setSelectedAchievement(
                selectedAchievement === achievement.id ? null : achievement.id
              )}
            >
              {/* Shine effect for unlocked achievements */}
              {unlocked && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{ transform: 'skewX(-45deg)' }}
                />
              )}
              
              {/* Achievement content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className={`text-3xl p-2 rounded-lg ${
                    unlocked ? 'bg-white/20' : 'bg-muted/50'
                  }`}>
                    {unlocked ? achievement.icon : '🔒'}
                  </div>
                  
                  {/* Rarity indicator */}
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    unlocked 
                      ? 'bg-white/20 text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {achievement.rarity.toUpperCase()}
                  </div>
                </div>
                
                <h4 className={`font-bold mb-2 ${
                  unlocked ? 'text-white' : 'text-foreground'
                }`}>
                  {achievement.title}
                </h4>
                
                <p className={`text-sm mb-3 ${
                  unlocked ? 'text-white/80' : 'text-muted-foreground'
                }`}>
                  {achievement.description}
                </p>
                
                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className={unlocked ? 'text-white/80' : 'text-muted-foreground'}>
                      Progreso
                    </span>
                    <span className={unlocked ? 'text-white' : 'text-foreground'}>
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${
                    unlocked ? 'bg-white/20' : 'bg-muted'
                  }`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full rounded-full ${
                        unlocked 
                          ? 'bg-white' 
                          : 'bg-gradient-to-r from-primary to-primary/60'
                      }`}
                    />
                  </div>
                </div>
                
                {/* Unlock date */}
                {achievement.unlockedAt && (
                  <div className="text-xs text-white/60">
                    Desbloqueado: {achievement.unlockedAt}
                  </div>
                )}
                
                {/* Reward */}
                {achievement.reward && unlocked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-2 p-2 rounded-lg bg-white/10 border border-white/20"
                  >
                    <div className="text-xs text-white/80 font-semibold">
                      Recompensa: {achievement.reward}
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Floating particles for legendary achievements */}
              {achievement.rarity === 'legendary' && unlocked && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [-5, 5, -5],
                        opacity: [0.4, 1, 0.4],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
      
      {/* Summary stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {Object.entries(rarityConfig).map(([rarity, config]) => {
          const count = achievements.filter(a => a.rarity === rarity && isUnlocked(a)).length
          const total = achievements.filter(a => a.rarity === rarity).length
          
          return (
            <div
              key={rarity}
              className={`p-3 rounded-lg border ${config.border} bg-gradient-to-br ${config.gradient} bg-opacity-10`}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">{count}/{total}</div>
                <div className="text-sm opacity-80 capitalize">{rarity}</div>
              </div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}