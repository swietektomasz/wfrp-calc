import { COMBATANTS_STORAGE_KEY } from "../constants";
import { Combatant } from "../types";

export const save = (combatants: Combatant[]) => {
  localStorage.setItem(COMBATANTS_STORAGE_KEY, JSON.stringify(combatants));
};

export const load = () => {
  const combatants: Combatant[] = JSON.parse(localStorage.getItem(COMBATANTS_STORAGE_KEY) ?? "[]");
  return combatants;
};
