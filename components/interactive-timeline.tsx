"use client"

import { motion } from "framer-motion"
import { Clock, CheckCircle, AlertTriangle, Target } from "lucide-react"
import { useState } from "react"

interface TimelineItem {
  id: string
  title: string
  description: string
  timeline: string
  type: 'immediate' | 'short' | 'medium' | 'long'
  completed?: boolean
}

interface InteractiveTimelineProps {
  items: TimelineItem[]
}

export function InteractiveTimeline({ items }: InteractiveTimelineProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const getItemColor = (type: string) => {
    switch (type) {
      case 'immediate': return 'destructive'
      case 'short': return 'chart-1'
      case 'medium': return 'chart-3'
      case 'long': return 'primary'
      default: return 'muted'
    }
  }

  const getItemIcon = (type: string, completed?: boolean) => {
    if (completed) return CheckCircle
    switch (type) {
      case 'immediate': return AlertTriangle
      case 'short': return Target
      case 'medium': return Clock
      case 'long': return Target
      default: return Clock
    }
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary opacity-30" />
      
      <div className="space-y-6">
        {items.map((item, index) => {
          const Icon = getItemIcon(item.type, item.completed)
          const color = getItemColor(item.type)
          const isSelected = selectedItem === item.id
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-start gap-6 group cursor-pointer"
              onClick={() => setSelectedItem(isSelected ? null : item.id)}
            >
              {/* Timeline dot */}
              <motion.div
                className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-${color} to-${color}/50 border-4 border-background flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                whileHover={{ scale: 1.1 }}
                animate={isSelected ? { scale: 1.15 } : {}}
              >
                <Icon className={`w-6 h-6 text-white`} />
                
                {/* Pulse animation for immediate items */}
                {item.type === 'immediate' && !item.completed && (
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-${color}`}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
              
              {/* Content */}
              <motion.div
                className={`flex-1 p-6 rounded-2xl bg-gradient-to-br from-${color}/5 to-transparent border border-${color}/20 hover:border-${color}/40 transition-all ${
                  isSelected ? `bg-${color}/10 border-${color}/50` : ''
                }`}
                animate={isSelected ? { scale: 1.02 } : {}}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${color}/10 text-${color} border border-${color}/20`}>
                    {item.timeline}
                  </span>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                
                {/* Expanded content */}
                <motion.div
                  initial={false}
                  animate={{ height: isSelected ? "auto" : 0, opacity: isSelected ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-border/30">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-foreground">Priority: </span>
                        <span className={`capitalize text-${color}`}>{item.type}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">Status: </span>
                        <span className={item.completed ? "text-chart-2" : "text-muted-foreground"}>
                          {item.completed ? "Completed" : "In Progress"}
                        </span>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-2">
                        <span>Progress</span>
                        <span>{item.completed ? "100%" : "0%"}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r from-${color} to-${color}/70`}
                          initial={{ width: 0 }}
                          animate={{ width: item.completed ? "100%" : "0%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}