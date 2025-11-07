export interface Match {
  champion: string
  champion_img: string
  champion_splash: string
  role: string
  kills: number
  deaths: number
  assists: number
  kda: number
  cs: number
  cs_per_min: number
  vision_score: number
  damage_dealt: number
  damage_taken: number
  dpm: number
  gpm: number
  gold_earned: number
  champ_level: number
  win: boolean
}

export interface Summary {
  games: number
  avg_kills: number
  avg_deaths: number
  avg_assists: number
  avg_kda: number
  avg_cs: number
  avg_cs_per_min: number
  avg_vision: number
  avg_dpm: number
  avg_gpm: number
  avg_damage_dealt: number
  avg_damage_taken: number
  avg_gold: number
  avg_champ_level: number
  win_rate: number
}

export interface Recap {
  executive_summary: string
  win_condition_analysis: {
    what_player_does_well_in_wins: string[]
    what_goes_wrong_in_losses: string[]
    key_difference: string
  }
  skill_ceiling_assessment: {
    current_level: string
    mechanical_ceiling: string
    game_knowledge_ceiling: string
    limiting_factor: string
    realistic_peak: string
  }
  improvement_roadmap: {
    immediate_priority: {
      focus: string
      reason: string
      expected_result: string
      timeline: string
    }
    next_priorities: Array<{
      focus: string
      reason: string
      timeline: string
    }>
  }
  personalized_champion_recommendations: Array<{
    champion: string
    fit_score: string
    why_good_fit: string
    learning_curve: string
    expected_win_rate: string
  }>
  habits_to_break: Array<{
    bad_habit: string
    evidence: string
    replacement_habit: string
    tracking_metric: string
  }>
  daily_practice_routine: {
    warm_up: string
    skill_drill: string
    ranked_focus: string
    post_game: string
  }
  red_flags: string[]
  green_flags: string[]
  coach_notes: string
}

export interface PlayerData {
  puuid: string
  matches: Match[]
  summary: Summary
  recap: Recap
}