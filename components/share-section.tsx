"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Share2, Twitter, Download } from "lucide-react"

interface ShareSectionProps {
  recap: {
    strengths: string
    next_match_tip: string
    confidence: string
    style?: string
    trends?: string[]
    improvements?: { issue: string; drill: string }[]
    recommended_roles?: string[]
  }
  playerName?: string
  summary?: {
    games: number
    win_rate: number
    avg_kda: number
  }
  matches?: Array<{
    champion: string
    role: string
    kills: number
    deaths: number
    assists: number
    kda: number
    cs: number
    cs_per_min: number
    win: boolean
    damage_dealt: number
    gold_earned: number
  }>
}

export function ShareSection({ recap, playerName = "Summoner", summary, matches }: ShareSectionProps) {
  if (!recap) return null
  
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  // Generate enhanced shareable content using all recap data
  const shareText = `🏆 Check out my League of Legends Rift Rewind!\n\n` +
    `${playerName}'s Season Summary:\n` +
    `• ${summary ? Math.round(summary.win_rate * 100) : 0}% Win Rate (${summary?.games || 0} games)\n` +
    `• ${summary?.avg_kda.toFixed(1) || 0} Average KDA\n` +
    `• Play Style: ${recap.style ? recap.style.charAt(0).toUpperCase() + recap.style.slice(1) : 'Analyzed'}\n` +
    (recap.recommended_roles && recap.recommended_roles.length > 0 ? 
      `• Best Roles: ${recap.recommended_roles.join(', ')}\n` : '') +
    `• Key Strengths: ${recap.strengths}\n` +
    (recap.trends && recap.trends.length > 0 ? 
      `• Current Trend: ${recap.trends[0]}\n` : '') +
    `\n💡 Coach Tip: ${recap.next_match_tip}\n\n` +
    `Get your own AI-powered Rift Rewind at: ${window.location.origin}`

  const shareUrl = window.location.href

  // Share functions
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
    window.open(twitterUrl, '_blank', 'width=550,height=420')
  }

  const handleDownloadPDF = async () => {
    // Import the simple PDF generator
    const { generateSimplePDF } = await import('../lib/pdf-generator-simple')
    const playerData = {
      playerName,
      recap,
      summary,
      matches
    }
    await generateSimplePDF(playerData, setDownloading)
  }

  const shareCards = [
    {
      title: "Your Rift Year",
      description: `${recap.style ? recap.style.charAt(0).toUpperCase() + recap.style.slice(1) + ' Player • ' : ''}${recap.confidence} Confidence`,
      gradient: "from-primary to-accent",
      icon: Share2,
      action: handleCopyLink,
      actionText: copied ? "Copied!" : "Copy Link"
    },
    {
      title: recap.trends && recap.trends.length > 0 ? "Performance Trends" : "Main Strengths",
      description: recap.trends && recap.trends.length > 0 ? 
        recap.trends.slice(0, 2).join(" • ") : 
        recap.strengths,
      gradient: "from-accent to-secondary",
      icon: Twitter,
      action: handleTwitterShare,
      actionText: "Share on Twitter"
    },
    {
      title: recap.recommended_roles && recap.recommended_roles.length > 0 ? "Best Roles" : "Improvement Tip",
      description: recap.recommended_roles && recap.recommended_roles.length > 0 ? 
        recap.recommended_roles.join(" • ") : 
        recap.next_match_tip,
      gradient: "from-secondary to-primary",
      icon: Download,
      action: handleDownloadPDF,
      actionText: downloading ? "Generating..." : "Download PDF"
    },
  ]

  return (
    <section className="py-32 px-4 container mx-auto" data-section="share">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl md:text-7xl font-black mb-6 gradient-text">Share Your Rewind</h2>
        <p className="text-xl md:text-2xl text-muted-foreground">Show the world your League journey</p>
      </motion.div>

      {/* Share cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {shareCards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl glass-card group cursor-pointer"
              onClick={card.action}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

              <div className="relative z-10 p-8">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-foreground/10 to-foreground/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black text-foreground mb-3">{card.title}</h3>
                <p className="text-base text-foreground/80 mb-6 line-clamp-2 leading-relaxed">
                  {card.description}
                </p>

                {/* Action button */}
                <button
                  className="w-full py-3 px-6 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-xl transition-colors border border-primary/20 hover:border-primary/40"
                  disabled={downloading && card.icon === Download}
                >
                  {card.actionText}
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center"
      >
        <p className="text-lg text-muted-foreground mb-2">Powered by AI • Built for Summoners</p>
        <p className="text-sm text-muted-foreground/60">Your journey deserves to be shared</p>
      </motion.div>
    </section>
  )
}