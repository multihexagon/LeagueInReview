"use client"

import * as React from "react"
import { HelpCircle, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface EnhancedTooltipProps {
  content: string
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  className?: string
  variant?: "help" | "info" | "inline"
  showIcon?: boolean
  delay?: number
}

export function EnhancedTooltip({ 
  content, 
  children, 
  side = "top", 
  className = "",
  variant = "help",
  showIcon = true,
  delay = 150
}: EnhancedTooltipProps) {
  const IconComponent = variant === "info" ? Info : HelpCircle
  
  if (variant === "inline") {
    return (
      <Tooltip delayDuration={delay}>
        <TooltipTrigger asChild>
          <span className={cn(
            "inline-flex items-center gap-1 cursor-help underline decoration-dotted decoration-muted-foreground/50 hover:decoration-primary transition-colors",
            className
          )}>
            {children}
            {showIcon && (
              <IconComponent className="w-3.5 h-3.5 text-muted-foreground/60 hover:text-primary transition-all duration-200 hover:scale-110" />
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-sm">
          <p className="text-sm leading-relaxed">{content}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Tooltip delayDuration={delay}>
      <TooltipTrigger asChild>
        <div className={cn(
          "inline-flex items-center gap-2 group cursor-help",
          className
        )}>
          {children}
          {showIcon && (
            <div className="relative">
              <IconComponent className="w-4 h-4 text-muted-foreground/60 hover:text-primary transition-all duration-200 hover:scale-110" />
              <div className="absolute -inset-1 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side={side} className="max-w-sm">
        <div className="space-y-1">
          <p className="text-sm leading-relaxed">{content}</p>
          <div className="text-xs text-muted-foreground/80 pt-1 border-t border-border/50">
            Hover for help
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}

// Quick tooltip for stats and metrics
interface StatTooltipProps {
  label: string
  value: string | number
  tooltip: string
  className?: string
}

export function StatTooltip({ label, value, tooltip, className = "" }: StatTooltipProps) {
  return (
    <EnhancedTooltip content={tooltip} variant="inline" showIcon={false} delay={100}>
      <div className={cn("text-center", className)}>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </EnhancedTooltip>
  )
}