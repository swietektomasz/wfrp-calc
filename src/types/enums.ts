export enum Results {
  Miss = "miss",
  Hit = "hit",
  AttackerCrit = "attCrit",
  DefenderCrit = "defCrit",
  AttackerOops = "attOops",
  DefenderOops = "defOops",
  Tie = "tie",
  Nothing = "nothing",
}

export enum CombatantContextActionType {
  SetCombatants = "setCombatants",
  SetAttacker = "setAttacker",
  SetDefender = "setDefender",
  SaveCombatant = "saveCombatant",
}
