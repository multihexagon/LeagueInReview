# 🎨 Enhanced UI Components

This document describes the advanced visual components created to enhance the League of Legends AI Insights application.

## 📋 Component Overview

### 1. **ParticleBackground** (`particle-background.tsx`)

Interactive canvas-based particle system with connection lines.

**Features:**

- Animated floating particles
- Dynamic connection lines between nearby particles
- Mouse interaction (particles follow cursor)
- Responsive canvas sizing
- Configurable particle count and properties

**Usage:**

```tsx
<ParticleBackground />
```

---

### 2. **AnimatedStat** (`animated-stat.tsx`)

Animated statistic display with counter animation.

**Props:**

- `value: number` - The numeric value to display
- `label: string` - Label for the statistic
- `suffix?: string` - Optional suffix (e.g., "%", "LP")
- `icon?: React.ReactNode` - Optional icon
- `color?: string` - Color theme
- `duration?: number` - Animation duration

**Usage:**

```tsx
<AnimatedStat
  label="Win Rate"
  value={73}
  suffix="%"
  icon="📈"
  color="primary"
/>
```

---

### 3. **InteractiveTimeline** (`interactive-timeline.tsx`)

Expandable timeline with different priority levels.

**Props:**

- `items: TimelineItem[]` - Array of timeline items

**TimelineItem Interface:**

```tsx
interface TimelineItem {
  id: string;
  title: string;
  description: string;
  timeline: string;
  type: "immediate" | "short" | "medium" | "long";
  completed?: boolean;
}
```

**Usage:**

```tsx
<InteractiveTimeline items={timelineItems} />
```

---

### 4. **PerformanceHeatmap** (`performance-heatmap.tsx`)

GitHub-style heatmap for activity/performance visualization.

**Props:**

- `data: HeatmapData[]` - Array of data points
- `title: string` - Component title

**HeatmapData Interface:**

```tsx
interface HeatmapData {
  day: number;
  month: number;
  value: number;
  games: number;
  winRate: number;
}
```

**Usage:**

```tsx
<PerformanceHeatmap data={heatmapData} title="Activity Heatmap" />
```

---

### 5. **SkillRadar** (`skill-radar.tsx`)

Interactive radar chart for skill visualization.

**Props:**

- `skills: SkillData[]` - Array of skills with current and potential values
- `title: string` - Chart title

**SkillData Interface:**

```tsx
interface SkillData {
  skill: string;
  current: number;
  potential: number;
  color: string;
}
```

**Usage:**

```tsx
<SkillRadar skills={skillsData} title="Skill Analysis" />
```

---

### 6. **MatchTimeline** (`match-timeline.tsx`)

Interactive match history with filtering and expansion.

**Props:**

- `matches: MatchData[]` - Array of match data
- `title: string` - Component title

**MatchData Interface:**

```tsx
interface MatchData {
  id: string;
  result: "win" | "loss";
  champion: string;
  kda: string;
  duration: string;
  rank: string;
  performance: number;
  timestamp: string;
  highlights: string[];
}
```

**Usage:**

```tsx
<MatchTimeline matches={matchData} title="Recent Matches" />
```

---

### 7. **AchievementShowcase** (`achievement-showcase.tsx`)

3D achievement cards with rarity system and effects.

**Props:**

- `achievements: Achievement[]` - Array of achievements
- `title: string` - Component title

**Achievement Interface:**

```tsx
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  progress: number;
  maxProgress: number;
  unlockedAt?: string;
  reward?: string;
}
```

**Rarity System:**

- **Common:** Gray theme, basic animations
- **Rare:** Blue theme, subtle glow
- **Epic:** Purple theme, enhanced effects
- **Legendary:** Gold theme, particle effects, shine animation

**Usage:**

```tsx
<AchievementShowcase achievements={achievementData} title="Achievements" />
```

---

## 🎨 Enhanced CSS Utilities

Added to `styles/globals.css`:

### Shimmer Effect

```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.shimmer {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

### Floating Animation

```css
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

### Animated Borders

```css
@keyframes border-glow {
  0%,
  100% {
    border-color: rgba(var(--primary), 0.2);
  }
  50% {
    border-color: rgba(var(--primary), 0.8);
  }
}

.animate-border {
  animation: border-glow 2s ease-in-out infinite;
}
```

---

## 🚀 Integration Guide

### 1. Basic Integration

```tsx
import { ParticleBackground } from "@/components/particle-background";
import { AnimatedStat } from "@/components/animated-stat";

export function MyComponent() {
  return (
    <div className="relative">
      <ParticleBackground />
      <div className="relative z-10">
        <AnimatedStat label="Total Games" value={150} icon="🎮" />
      </div>
    </div>
  );
}
```

### 2. Performance Considerations

- Use `React.memo()` for components with heavy animations
- Implement `useCallback()` for event handlers
- Consider lazy loading for off-screen components
- Use `will-change` CSS property for animated elements

### 3. Accessibility

- All components include proper ARIA labels
- Keyboard navigation supported where applicable
- Reduced motion respected via `prefers-reduced-motion`
- High contrast mode compatibility

### 4. Responsive Design

- All components are mobile-first responsive
- Touch-friendly interactions on mobile devices
- Dynamic grid layouts that adapt to screen size
- Optimized animations for different screen sizes

---

## 🎯 Usage Examples

### Complete Dashboard Integration

```tsx
export function EnhancedDashboard({ playerData }: { playerData: PlayerData }) {
  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AnimatedStat label="Current LP" value={playerData.lp} icon="⭐" />
          <AnimatedStat
            label="Win Rate"
            value={playerData.winRate}
            suffix="%"
            icon="📈"
          />
        </div>

        {/* Skills Analysis */}
        <SkillRadar skills={playerData.skills} title="Skill Analysis" />

        {/* Performance Tracking */}
        <PerformanceHeatmap
          data={playerData.activityData}
          title="Activity Heatmap"
        />

        {/* Improvement Plan */}
        <div className="p-6 rounded-2xl bg-card border border-border/50">
          <h3 className="text-xl font-bold mb-6">Improvement Roadmap</h3>
          <InteractiveTimeline items={playerData.improvementPlan} />
        </div>

        {/* Recent Matches */}
        <MatchTimeline
          matches={playerData.recentMatches}
          title="Match History"
        />

        {/* Achievements */}
        <AchievementShowcase
          achievements={playerData.achievements}
          title="Achievement Gallery"
        />
      </div>
    </div>
  );
}
```

---

## 🔧 Customization

### Theme Integration

All components support theme customization through CSS variables:

```css
:root {
  --primary: 220 90% 56%;
  --secondary: 210 40% 28%;
  --accent: 200 100% 70%;
  --chart-1: 173 58% 39%;
  --chart-2: 12 76% 61%;
  --chart-3: 197 37% 24%;
}
```

### Animation Customization

Modify animation durations and easing in component props or CSS:

```tsx
<AnimatedStat
  value={100}
  label="Score"
  duration={3} // Custom animation duration
/>
```

---

## 📱 Mobile Optimization

All components include mobile-specific optimizations:

- Touch-friendly hit targets (minimum 44px)
- Swipe gestures where appropriate
- Reduced animation complexity on mobile
- Optimized particle counts for performance
- Responsive typography and spacing

---

## 🎪 Demo Component

Use `VisualShowcase` component to see all components in action:

```tsx
import { VisualShowcase } from "@/components/visual-showcase";

export default function DemoPage() {
  return <VisualShowcase />;
}
```

This provides a complete demonstration of all enhanced UI components with sample data and integration examples.
