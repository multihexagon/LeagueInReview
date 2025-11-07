"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface HeatmapData {
  day: number
  month: number
  value: number
  games: number
  winRate: number
}

interface PerformanceHeatmapProps {
  data: HeatmapData[]
  title: string
}

export function PerformanceHeatmap({ data, title }: PerformanceHeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<HeatmapData | null>(null)
  
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
  
  const days = ['Mon', 'Wed', 'Fri', 'Sun']
  
  const getColorIntensity = (value: number) => {
    if (value === 0) return 'bg-muted/20'
    if (value < 0.3) return 'bg-chart-1/30'
    if (value < 0.5) return 'bg-chart-1/50'
    if (value < 0.7) return 'bg-chart-2/50'
    if (value < 0.8) return 'bg-chart-2/70'
    return 'bg-chart-2/90'
  }
  
  const getTooltipContent = (cell: HeatmapData) => (
    <div className="p-3 bg-popover border border-border rounded-lg shadow-lg">
      <div className="font-semibold">{months[cell.month]} {cell.day}</div>
      <div className="text-sm text-muted-foreground">
        {cell.games} games • {Math.round(cell.winRate * 100)}% WR
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        Performance: {Math.round(cell.value * 100)}%
      </div>
    </div>
  )

  return (
    <div className="p-6 rounded-2xl bg-card border border-border/50">
      <h3 className="text-xl font-bold mb-6">{title}</h3>
      
      <div className="relative">
        {/* Month labels */}
        <div className="flex gap-1 mb-2 ml-12">
          {months.map((month, index) => (
            <div key={month} className="w-4 text-xs text-muted-foreground text-center">
              {index % 3 === 0 && month}
            </div>
          ))}
        </div>
        
        {/* Heatmap grid */}
        <div className="flex gap-2">
          {/* Day labels */}
          <div className="flex flex-col gap-1 justify-center">
            {days.map(day => (
              <div key={day} className="h-4 text-xs text-muted-foreground text-right pr-2 w-10">
                {day}
              </div>
            ))}
          </div>
          
          {/* Grid */}
          <div className="grid grid-cols-12 gap-1">
            {Array.from({ length: 48 }, (_, i) => {
              const month = Math.floor(i / 4)
              const day = (i % 4) + 1
              const cellData = data.find(d => d.month === month && d.day === day) || {
                day, month, value: 0, games: 0, winRate: 0
              }
              
              return (
                <motion.div
                  key={`${month}-${day}`}
                  className={`w-4 h-4 rounded-sm cursor-pointer border border-border/20 ${getColorIntensity(cellData.value)}`}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  onHoverStart={() => setHoveredCell(cellData)}
                  onHoverEnd={() => setHoveredCell(null)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.01 }}
                />
              )
            })}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <span>Less active</span>
          <div className="flex gap-1">
            {['bg-muted/20', 'bg-chart-1/30', 'bg-chart-1/50', 'bg-chart-2/50', 'bg-chart-2/90'].map((color, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${color} border border-border/20`} />
            ))}
          </div>
          <span>More active</span>
        </div>
        
        {/* Tooltip */}
        {hoveredCell && (
          <motion.div
            className="absolute z-20 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              left: `${(hoveredCell.month * 4 + hoveredCell.day) * 20 + 60}px`,
              top: -80
            }}
          >
            {getTooltipContent(hoveredCell)}
          </motion.div>
        )}
      </div>
    </div>
  )
}