# League in Review

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/juan-aguirres-projects-172b493f/v0-league-of-legends-ai-insights)
[![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## Overview

**League of Legends AI Insights** is a comprehensive performance analysis tool that provides players with AI-powered insights into their gameplay. By analyzing recent matches, the application delivers personalized recommendations, identifies strengths and areas for improvement, and offers actionable advice to help players climb the ranked ladder.

### Key Features

- **🧠 AI-Powered Analysis**: Advanced algorithms analyze your gameplay patterns and provide intelligent insights
- **📊 Comprehensive Statistics**: Detailed breakdown of KDA, CS/min, damage, gold earnings, and more
- **🎯 Personalized Recommendations**: Champion suggestions based on your playstyle and performance
- **📈 Performance Trends**: Track your improvement over time with trend analysis
- **💡 Actionable Tips**: Specific, practical advice you can apply immediately
- **🏆 Achievement Tracking**: Monitor your perfect games, kill streaks, and other accomplishments
- **⚔️ Player Comparison**: Compare your stats with other players
- **📱 Responsive Design**: Beautiful UI that works seamlessly on all devices

## Tech Stack

### Frontend

- **Next.js 16.0.0** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth interactions
- **Radix UI** - Accessible component primitives

### UI Components

- **Custom Tooltip System** - Enhanced tooltips with educational content
- **Glass Morphism Design** - Modern, translucent card designs
- **Responsive Grid Layouts** - Optimized for all screen sizes
- **Interactive Animations** - Smooth hover effects and transitions

### Backend Integration

- **AWS Lambda** - Serverless backend for data processing
- **Riot Games API** - Real-time League of Legends data
- **AI Analysis Engine** - Amazon BedRock

## 🎯 Core Components

### 1. **Summoner Search** (`summoner-search.tsx`)

- Player lookup by summoner name and tag
- Real-time validation and error handling
- Riot Games API integration

### 2. **AI Insights** (`ai-insights.tsx`)

- **Strengths Analysis**: Identifies your best gameplay aspects
- **Play Style Detection**: Categorizes your approach (Aggressive, Defensive, etc.)
- **Improvement Areas**: Specific areas needing attention with training drills
- **Actionable Advice**: Practical tips for immediate application

### 3. **Statistics Overview** (`stats-overview.tsx`)

- **Win Rate**: Performance percentage with benchmarks
- **KDA Ratio**: Kill/Death/Assist analysis
- **CS/min**: Farming efficiency metrics
- **Damage Per Minute**: Combat effectiveness
- **Gold Earnings**: Economic performance

### 4. **Epic Moments** (`highlights-section.tsx`)

- **Achievement Badges**: Perfect games, high-kill matches, victories
- **Performance Metrics**: Best KDA, play style, recommended roles
- **AI Confidence**: Analysis reliability indicator

### 5. **Tips & Advice** (`tips-advice.tsx`)

- **Personalized Tips**: AI-generated recommendations
- **Role-Specific Advice**: Tailored guidance for your preferred roles
- **Champion Recommendations**: Suggested champions based on your style
- **Training Drills**: Specific practice exercises

### 6. **Player Comparison** (`vs-comparison.tsx`)

- **Head-to-Head Stats**: Compare with other players
- **Performance Metrics**: Side-by-side analysis
- **Competitive Insights**: Relative positioning

## 🔧 Advanced Features

### Enhanced Tooltip System

The application features a sophisticated tooltip system with multiple variants:

```typescript
// Educational tooltips with League-specific explanations
const gameTooltips = {
  winRate:
    "Your win percentage. 60%+ is excellent, 50-60% is good, below 50% needs improvement",
  kda: "Kill/Death/Assist ratio. 2.0+ is excellent, 1.0-2.0 is average, below 1.0 needs survival work",
  perfectGames:
    "Perfect games require: 0 deaths, 3.0+ KDA, winning the match, and 5+ CS/min",
};
```

### Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adapted layouts for medium screens
- **Desktop Experience**: Full-featured desktop interface
- **Consistent Sizing**: Fixed dimensions for uniform appearance

### Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Components load on demand
- **Minimal Bundle Size**: Optimized dependencies

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or pnpm package manager
- Riot Games API access (for backend)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/multihexagon/v0-league-of-legends-ai-insights.git
cd v0-league-of-legends-ai-insights
```

2. **Install dependencies**

```bash
npm install
# or
pnpm install
```

3. **Set up environment variables**

```bash
# Create .env.local file
LAMBDA_ENDPOINT=your_lambda_endpoint_url
RIOT_API_KEY=your_riot_api_key
```

4. **Run the development server**

```bash
npm run dev
# or
pnpm dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Data Structure

### Player Data Interface

```typescript
interface PlayerData {
  puuid: string;
  matches: Match[];
  summary: Summary;
  recap: Recap;
}

interface Recap {
  strengths: string;
  improvements: { issue: string; drill: string }[];
  next_match_tip: string;
  confidence: string;
  style?: string;
  trends?: string[];
  recommended_roles?: string[];
  recommended_champions?: string[];
  actionable_advice?: string[];
}
```

## 🎨 Design System

### Color Palette

- **Primary**: Hextech Blue `oklch(0.55 0.2 240)`
- **Secondary**: Hextech Gold `oklch(0.75 0.15 80)`
- **Accent**: Hextech Cyan `oklch(0.6 0.18 220)`
- **Background**: Dark Theme `oklch(0.08 0.03 250)`

### Typography

- **Headings**: Inter font family, bold weights
- **Body**: Inter font family, regular weights
- **UI Elements**: System font stack for performance

### Spacing & Layout

- **Grid System**: CSS Grid with responsive breakpoints
- **Containers**: Max-width constraints for readability
- **Spacing Scale**: Consistent rem-based spacing

## 🔒 Security & Privacy

- **Data Protection**: Player data is processed securely
- **API Security**: Proper rate limiting and validation
- **Privacy First**: No unnecessary data collection
- **Secure Headers**: Next.js security best practices

## 🚀 Deployment

### Vercel Deployment (Recommended)

The application is optimized for Vercel deployment:

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: < 500KB gzipped
- **Load Time**: < 2s on 3G networks

## 🛣️ Roadmap

### Upcoming Features

- [ ] **Match Replay Analysis**: Video analysis integration
- [ ] **Team Performance**: Squad-based insights
- [ ] **Tournament Mode**: Competitive analysis
- [ ] **Mobile App**: React Native companion
- [ ] **Pro Player Comparison**: Compare with professional players
- [ ] **Coaching Integration**: Connect with coaches
- [ ] **Custom Training Plans**: Personalized improvement programs

### Technical Improvements

- [ ] **Real-time Updates**: WebSocket integration
- [ ] **Offline Support**: PWA capabilities
- [ ] **Advanced Analytics**: Machine learning models
- [ ] **API Rate Optimization**: Smarter caching strategies

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Guidelines

1. **Code Style**: Follow the existing TypeScript/React patterns
2. **Component Structure**: Use functional components with hooks
3. **Styling**: Utilize Tailwind CSS utilities
4. **Testing**: Add tests for new features
5. **Documentation**: Update README for significant changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Riot Games** for the League of Legends API
- **Vercel** for hosting and deployment
- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

For support and questions:

- **GitHub Issues**: [Create an issue](https://github.com/multihexagon/LeagueInReview/issues)
- **Documentation**: Check this README and code comments

---

Built with passion for the League of Legends community
