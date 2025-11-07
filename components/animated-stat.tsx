"use client"

import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface AnimatedStatProps {
  value: number
  label: string
  suffix?: string
  icon?: React.ReactNode
  color?: string
  duration?: number
}

export function AnimatedStat({ 
  value, 
  label, 
  suffix = "", 
  icon, 
  color = "primary",
  duration = 2 
}: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setDisplayValue(Math.floor(value * easeOutQuart))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      className={`p-6 rounded-2xl bg-gradient-to-br from-${color}/10 to-${color}/5 border border-${color}/20 hover:border-${color}/40 transition-all hover:scale-105 group cursor-pointer`}
    >
      <div className="flex items-center gap-4">
        {icon && (
          <div className={`p-3 rounded-xl bg-${color}/10 group-hover:bg-${color}/20 transition-colors`}>
            {icon}
          </div>
        )}
        <div>
          <motion.div 
            className={`text-3xl font-bold text-${color}`}
            animate={isInView ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3, delay: 1 }}
          >
            {displayValue.toLocaleString()}{suffix}
          </motion.div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r from-${color} to-${color}/70 rounded-full`}
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{ duration: duration, delay: 0.5 }}
        />
      </div>
    </motion.div>
  )
}