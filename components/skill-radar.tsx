"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface SkillData {
  skill: string
  current: number
  potential: number
  color: string
}

interface SkillRadarProps {
  skills: SkillData[]
  title: string
}

export function SkillRadar({ skills, title }: SkillRadarProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  
  const center = 150
  const maxRadius = 120
  const angleStep = (2 * Math.PI) / skills.length

  const getPointPosition = (index: number, value: number) => {
    const angle = index * angleStep - Math.PI / 2
    const radius = (value / 10) * maxRadius
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle)
    }
  }

  const createPath = (values: number[]) => {
    const points = values.map((value, index) => getPointPosition(index, value))
    const pathData = points.reduce((path, point, index) => {
      const command = index === 0 ? 'M' : 'L'
      return `${path} ${command} ${point.x} ${point.y}`
    }, '')
    return `${pathData} Z`
  }

  return (
    <div className="p-6 rounded-2xl bg-card border border-border/50">
      <h3 className="text-xl font-bold mb-6 text-center">{title}</h3>
      
      <div className="flex flex-col items-center">
        <svg width="300" height="300" className="mb-6">
          {/* Grid circles */}
          {[2, 4, 6, 8, 10].map((level) => (
            <circle
              key={level}
              cx={center}
              cy={center}
              r={(level / 10) * maxRadius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}
          
          {/* Grid lines */}
          {skills.map((_, index) => {
            const angle = index * angleStep - Math.PI / 2
            const endX = center + maxRadius * Math.cos(angle)
            const endY = center + maxRadius * Math.sin(angle)
            
            return (
              <line
                key={index}
                x1={center}
                y1={center}
                x2={endX}
                y2={endY}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            )
          })}
          
          {/* Potential area (outer) */}
          <motion.path
            d={createPath(skills.map(s => s.potential))}
            fill="rgba(59, 130, 246, 0.1)"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          
          {/* Current skill area */}
          <motion.path
            d={createPath(skills.map(s => s.current))}
            fill="rgba(139, 92, 246, 0.2)"
            stroke="rgba(139, 92, 246, 0.6)"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />
          
          {/* Skill points */}
          {skills.map((skill, index) => {
            const currentPos = getPointPosition(index, skill.current)
            const potentialPos = getPointPosition(index, skill.potential)
            const isHovered = hoveredSkill === skill.skill
            
            return (
              <g key={skill.skill}>
                {/* Potential point */}
                <circle
                  cx={potentialPos.x}
                  cy={potentialPos.y}
                  r="4"
                  fill="rgba(59, 130, 246, 0.6)"
                  stroke="rgba(59, 130, 246, 1)"
                  strokeWidth="2"
                />
                
                {/* Current point */}
                <motion.circle
                  cx={currentPos.x}
                  cy={currentPos.y}
                  r={isHovered ? "8" : "6"}
                  fill={skill.color}
                  stroke="#fff"
                  strokeWidth="2"
                  style={{ cursor: 'pointer' }}
                  whileHover={{ scale: 1.2 }}
                  onHoverStart={() => setHoveredSkill(skill.skill)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                />
                
                {/* Skill labels */}
                <text
                  x={getPointPosition(index, 11).x}
                  y={getPointPosition(index, 11).y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-semibold fill-foreground"
                >
                  {skill.skill}
                </text>
              </g>
            )
          })}
        </svg>
        
        {/* Legend */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            <span>Current Level</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-blue-300"></div>
            <span>Potential</span>
          </div>
        </div>
        
        {/* Skill details */}
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-lg bg-popover border border-border"
          >
            {(() => {
              const skill = skills.find(s => s.skill === hoveredSkill)
              return skill ? (
                <div className="text-center">
                  <h4 className="font-semibold">{skill.skill}</h4>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>Current: {skill.current}/10</span>
                    <span>Potential: {skill.potential}/10</span>
                  </div>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${(skill.current / skill.potential) * 100}%` }}
                    />
                  </div>
                </div>
              ) : null
            })()}
          </motion.div>
        )}
      </div>
    </div>
  )
}