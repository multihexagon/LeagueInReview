import { useState } from "react"import { useState } from "react"

import { ChevronDown, ChevronUp } from "lucide-react"import { ChevronDown, ChevronUp } from "lucide-react"



interface Match {interface Match {

  champion: string  champion: string

  champion_img: string  champion_img: string

  win: boolean  win: boolean

  kills: number  kills: number

  deaths: number  deaths: number

  assists: number  assists: number

  kda: number  kda: number

  cs: number  cs: number

  vision_score: number  vision_score: number

  damage_dealt: number  damage_dealt: number

  gold_earned: number  gold_earned: number

  role: string  role: string

}}



interface RecentGamesProps {interface RecentGamesProps {

  matches: Match[]  matches: Match[]

}}



export function RecentGames({ matches }: RecentGamesProps) {export function RecentGames({ matches }: RecentGamesProps) {

  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

    

  const toggleExpanded = (index: number) => {  const toggleExpanded = (index: number) => {

    const newExpanded = new Set(expandedCards)    const newExpanded = new Set(expandedCards)

    if (newExpanded.has(index)) {    if (newExpanded.has(index)) {

      newExpanded.delete(index)      newExpanded.delete(index)

    } else {    } else {

      newExpanded.add(index)      newExpanded.add(index)

    }    }

    setExpandedCards(newExpanded)    setExpandedCards(newExpanded)

  }  }

    

  if (!matches || matches.length === 0) {  if (!matches || matches.length === 0) {

    return (    return (

      <div className="p-4">      <div className="p-4">

        <h2 className="text-2xl font-bold mb-4">Recent Games</h2>        <h2 className="text-2xl font-bold mb-4">Recent Games</h2>

        <div>No matches available</div>        <div>No matches available</div>

      </div>      </div>

    )    )

  }  }



  return (  return (

    <div className="p-4 space-y-4">    <div className="p-4 space-y-4">

      <h2 className="text-2xl font-bold">Recent Games</h2>      <h2 className="text-2xl font-bold">Recent Games</h2>

            

      {/* Control buttons */}      {/* Control buttons */}

      <div className="flex gap-2">      <div className="flex gap-2">

        <button        <button

          onClick={() => setExpandedCards(new Set(matches.map((_, i) => i)))}          onClick={() => setExpandedCards(new Set(matches.map((_, i) => i)))}

          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"

        >        >

          Expand All          Expand All

        </button>        </button>

        <button        <button

          onClick={() => setExpandedCards(new Set())}          onClick={() => setExpandedCards(new Set())}

          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"

        >        >

          Collapse All          Collapse All

        </button>        </button>

      </div>      </div>

      

      {matches.slice(0, 12).map((match, index) => {  // Estado para controlar qué tarjetas están expandidas

        const isExpanded = expandedCards.has(index)  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

          

        return (  // Funciones para lazy loading

          <div key={index} className={`border p-4 rounded-lg shadow ${  const loadMoreMatches = () => {

            match.win ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'    setVisibleMatches(prev => Math.min(prev + MATCHES_PER_PAGE, matches.length))

          }`}>  }

            {/* Header */}  

            <div   const showLessMatches = () => {

              className="flex items-center justify-between cursor-pointer"    setVisibleMatches(MATCHES_PER_PAGE)

              onClick={() => toggleExpanded(index)}    // Colapsar todas las tarjetas al mostrar menos

            >    setExpandedCards(new Set())

              <div className="flex items-center gap-3">  }

                <img   

                  src={match.champion_img}   // Obtener las partidas visibles

                  alt={match.champion}  const displayedMatches = matches.slice(0, visibleMatches)

                  className="w-12 h-12 rounded-full object-cover"  const hasMoreMatches = visibleMatches < matches.length

                  onError={(e) => {  const canShowLess = visibleMatches > MATCHES_PER_PAGE

                    (e.target as HTMLImageElement).src = "/placeholder.svg"  

                  }}  // Función para alternar expansión de tarjeta

                />  const toggleExpanded = (index: number) => {

                <div>    const newExpanded = new Set(expandedCards)

                  <h3 className="font-bold text-lg">{match.champion}</h3>    if (newExpanded.has(index)) {

                  <p className="text-sm text-gray-600">      newExpanded.delete(index)

                    {match.kills}/{match.deaths}/{match.assists} • KDA: {match.kda.toFixed(2)}    } else {

                  </p>      newExpanded.add(index)

                  <p className="text-xs text-gray-500">    }

                    {match.win ? '🏆 Victory' : '💀 Defeat'} • {match.role || 'Flex'}    setExpandedCards(newExpanded)

                  </p>  }

                </div>

              </div>  // Función para detectar partidas remake/AFK (todas las estadísticas en 0)

                const isRemakeOrAFK = (match: Match) => {

              <button    return match.kills === 0 && 

                onClick={(e) => {           match.deaths === 0 && 

                  e.stopPropagation()           match.assists === 0 && 

                  toggleExpanded(index)           match.damage_dealt === 0 && 

                }}           match.gold_earned === 0

                className="p-2 bg-blue-100 rounded hover:bg-blue-200"  }

              >

                {isExpanded ? <ChevronUp /> : <ChevronDown />}  // Función para determinar el color del KDA

              </button>  const getKDAColor = (match: Match) => {

            </div>    if (isRemakeOrAFK(match)) return "text-gray-400"

                if (match.kda >= 3) return "text-green-400"

            {/* Expandable content */}    if (match.kda >= 2) return "text-yellow-400"

            {isExpanded && (    if (match.kda >= 1) return "text-orange-400"

              <div className="mt-4 p-4 bg-white rounded border">    return "text-red-400"

                <h4 className="font-semibold mb-3">Match Details:</h4>  }

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">

                  <div>  // Función para determinar badge de rendimiento

                    <p className="font-medium text-gray-600">CS</p>  const getPerformanceBadge = (match: Match) => {

                    <p className="text-lg font-bold">{match.cs}</p>    if (isRemakeOrAFK(match)) return { text: "REMAKE", color: "bg-gray-500" }

                  </div>    if (match.kda >= 5) return { text: "EPIC", color: "bg-purple-500" }

                  <div>    if (match.kda >= 3) return { text: "EXCELLENT", color: "bg-green-500" }

                    <p className="font-medium text-gray-600">Vision Score</p>    if (match.kda >= 2) return { text: "GOOD", color: "bg-blue-500" }

                    <p className="text-lg font-bold">{match.vision_score}</p>    if (match.kda >= 1) return { text: "AVERAGE", color: "bg-yellow-500" }

                  </div>    return { text: "TOUGH", color: "bg-red-500" }

                  <div>  }

                    <p className="font-medium text-gray-600">Damage</p>

                    <p className="text-lg font-bold">{(match.damage_dealt / 1000).toFixed(1)}k</p>  return (

                  </div>    <section className="container mx-auto py-12">

                  <div>      <div className="text-center mb-8">

                    <p className="font-medium text-gray-600">Gold</p>        <h3 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">Match History</h3>

                    <p className="text-lg font-bold">{(match.gold_earned / 1000).toFixed(1)}k</p>        <p className="text-base text-muted-foreground mb-4">

                  </div>          Recent performance 

                </div>          <span className="text-primary font-medium">

                            ({displayedMatches.length} of {matches.length})

                <div className="mt-4 p-3 bg-gray-50 rounded">          </span>

                  <p className="text-sm">        </p>

                    <strong>Performance:</strong> {match.win ? 'Great job on this victory!' : 'Learn from this defeat and improve!'}        

                  </p>        {/* Botones de control */}

                  <p className="text-sm mt-1">        <div className="flex justify-center gap-2 flex-wrap">

                    <strong>KDA Analysis:</strong> {          <button

                      match.kda >= 3 ? 'Excellent performance!' :            onClick={() => setExpandedCards(new Set(displayedMatches.map((_, i) => i)))}

                      match.kda >= 2 ? 'Good performance!' :            className="px-3 py-1 bg-primary/20 hover:bg-primary/30 rounded-lg text-primary text-sm font-medium transition-colors duration-200"

                      match.kda >= 1 ? 'Average performance' :          >

                      'Focus on survival and assists'            Expand All

                    }          </button>

                  </p>          <button

                </div>            onClick={() => setExpandedCards(new Set())}

              </div>            className="px-3 py-1 bg-muted/20 hover:bg-muted/30 rounded-lg text-muted-foreground text-sm font-medium transition-colors duration-200"

            )}          >

          </div>            Collapse All

        )          </button>

      })}          {hasMoreMatches && (

                  <button

      {matches.length > 12 && (              onClick={loadMoreMatches}

        <div className="text-center text-gray-500">              className="px-3 py-1 bg-secondary/20 hover:bg-secondary/30 rounded-lg text-secondary text-sm font-medium transition-colors duration-200"

          Showing 12 of {matches.length} matches            >

        </div>              Load More ({Math.min(MATCHES_PER_PAGE, matches.length - visibleMatches)})

      )}            </button>

    </div>          )}

  )          {canShowLess && (

}            <button
              onClick={showLessMatches}
              className="px-3 py-1 bg-accent/20 hover:bg-accent/30 rounded-lg text-accent text-sm font-medium transition-colors duration-200"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
        {displayedMatches.map((match, index) => {
          const badge = getPerformanceBadge(match)
          const kdaColor = getKDAColor(match)
          const isExpanded = expandedCards.has(index)
          const isRemake = isRemakeOrAFK(match)
          
          // Determinar colores basado en si es remake/AFK o victoria/derrota
          const getMatchColors = () => {
            if (isRemake) {
              return "border-gray-500/30 bg-gradient-to-br from-gray-500/10 to-transparent"
            }
            return match.win 
              ? "border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent" 
              : "border-red-500/30 bg-gradient-to-br from-red-500/10 to-transparent"
          }
          
          return (
            <div
              key={index}
              className={`relative p-4 rounded-xl glass-card transition-all duration-300 ease-out ${
                getMatchColors()
              } hover:border-primary/40 hover:shadow-md ${
                isExpanded ? 'shadow-lg border-primary/30' : ''
              }`}
            >
              {/* Header simplificado */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded text-xs font-bold ${badge.color} text-white`}>
                    {badge.text}
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isRemake 
                      ? "bg-gray-500 text-white" 
                      : match.win 
                        ? "bg-green-500 text-white" 
                        : "bg-red-500 text-white"  
                  }`}>
                    {isRemake ? "R" : match.win ? "W" : "L"}
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    toggleExpanded(index)
                  }}
                  className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-all duration-300 z-10 hover:scale-110"
                >
                  <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : 'rotate-0'
                  }`} />
                </button>
              </div>

              {/* Header - Campeón */}
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <img
                    src={match.champion_img}
                    alt={match.champion}
                    className="w-12 h-12 rounded-lg object-cover border border-primary/30"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg"
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-background border border-primary/50 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{match.champ_level}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-foreground">{match.champion}</h4>
                  <p className="text-xs text-muted-foreground">
                    {match.role || "Flex"} • Lvl {match.champ_level}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-sm font-bold ${kdaColor}`}>
                      {match.kills}/{match.deaths}/{match.assists}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className={`text-sm font-bold ${kdaColor}`}>
                      {match.kda.toFixed(1)} KDA
                    </span>
                  </div>
                </div>
              </div>

              {/* Contenido colapsable */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className={`space-y-3 pt-3 transition-all duration-200 ${
                  isExpanded ? 'translate-y-0' : 'translate-y-2'
                }`}>
                {/* KDA Principal */}
                  <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-muted-foreground">KDA</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="w-3 h-3 text-muted-foreground/50 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{matchTooltips.kda}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span className={`text-sm font-bold ${kdaColor}`}>
                        {match.kda.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-center mb-2">
                      <span className="text-lg font-semibold text-foreground">
                        {match.kills}/{match.deaths}/{match.assists}
                      </span>
                    </div>
                    {/* Barra visual de KDA */}
                    <div className="w-full bg-border/30 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isRemake ? "bg-gray-400" :
                          match.kda >= 3 ? "bg-green-400" :
                          match.kda >= 2 ? "bg-yellow-400" :
                          match.kda >= 1 ? "bg-orange-400" : "bg-red-400"
                        }`}
                        style={{ width: `${isRemake ? 50 : Math.min(100, (match.kda / 5) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Mensaje especial para remakes/AFK */}
                  {isRemake && (
                    <div className="p-3 rounded-lg bg-gray-500/10 border border-gray-500/20 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Remake/AFK</span>
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Game ended early or had issues.
                      </p>
                    </div>
                  )}

                  {/* Stats Grid Principal */}
                  <div className="grid grid-cols-2 gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-center p-2 bg-background/30 rounded border border-border/20 cursor-help hover:bg-background/50 transition-colors">
                          <div className="flex items-center justify-center gap-1">
                            <p className="text-xs text-muted-foreground">Damage</p>
                            <HelpCircle className="w-3 h-3 text-muted-foreground/50" />
                          </div>
                          <p className="text-sm font-bold text-foreground">{(match.damage_dealt / 1000).toFixed(1)}k</p>
                          <p className="text-xs text-primary">{match.dpm.toFixed(0)} DPM</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{matchTooltips.damage}</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-center p-2 bg-background/30 rounded border border-border/20 cursor-help hover:bg-background/50 transition-colors">
                          <div className="flex items-center justify-center gap-1">
                            <p className="text-xs text-muted-foreground">Gold</p>
                            <HelpCircle className="w-3 h-3 text-muted-foreground/50" />
                          </div>
                          <p className="text-sm font-bold text-foreground">{(match.gold_earned / 1000).toFixed(1)}k</p>
                          <p className="text-xs text-secondary">{match.gpm.toFixed(0)} GPM</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{matchTooltips.gold}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Stats Secundarias */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="p-2 bg-background/20 rounded cursor-help hover:bg-background/30 transition-colors">
                          <div className="flex items-center justify-center gap-1">
                            <p className="text-xs text-muted-foreground">CS</p>
                            <HelpCircle className="w-2 h-2 text-muted-foreground/50" />
                          </div>
                          <p className="text-xs font-bold text-foreground">{match.cs}</p>
                          <p className="text-xs text-muted-foreground">{match.cs_per_min.toFixed(1)}/min</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{matchTooltips.cs}</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="p-2 bg-background/20 rounded cursor-help hover:bg-background/30 transition-colors">
                          <div className="flex items-center justify-center gap-1">
                            <p className="text-xs text-muted-foreground">Vision</p>
                            <HelpCircle className="w-2 h-2 text-muted-foreground/50" />
                          </div>
                          <p className="text-xs font-bold text-foreground">{match.vision_score}</p>
                          <p className="text-xs text-accent">Score</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{matchTooltips.vision}</p>
                      </TooltipContent>
                    </Tooltip>
                    <div className="p-2 bg-background/20 rounded">
                      <p className="text-xs text-muted-foreground">Dmg Taken</p>
                      <p className="text-xs font-bold text-foreground">{(match.damage_taken / 1000).toFixed(1)}k</p>
                      <p className="text-xs text-muted-foreground">Tank</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Información de progreso y botón adicional de "Ver más" */}
      {(hasMoreMatches || canShowLess) && (
        <div className="mt-8 text-center space-y-3">
          {/* Indicador de progreso */}
          <div className="w-full max-w-xs mx-auto">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Matches shown</span>
              <span>{displayedMatches.length} / {matches.length}</span>
            </div>
            <div className="w-full bg-border/30 rounded-full h-2">
              <div 
                className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(displayedMatches.length / matches.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Botones principales de navegación */}
          <div className="flex justify-center gap-3">
            {hasMoreMatches && (
              <button
                onClick={loadMoreMatches}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all duration-200"
              >
                Load More
                <span className="ml-1 text-sm opacity-80">
                  (+{Math.min(MATCHES_PER_PAGE, matches.length - visibleMatches)})
                </span>
              </button>
            )}
            {canShowLess && (
              <button
                onClick={showLessMatches}
                className="px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground font-medium rounded-lg transition-all duration-200"
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
