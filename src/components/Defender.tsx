import { useCombatDispatchContext, useCombatStateContext } from "../context/combat";
import { CombatantContextActionType } from "../types/enums";
import { RollInput } from "./RollInput";
import { SavedCombatants } from "./SavedCombatants";
import { StatInput } from "./StatInput";
import { Combatant } from "../types";

export const Defender = () => {
  const { defender } = useCombatStateContext();
  const dispatch = useCombatDispatchContext();

  const setAttackerSkill = (skill: number) => {
    dispatch({ payload: { ...defender, skill }, type: CombatantContextActionType.SetDefender });
  };

  const setAttackerRoll = (lastRoll: number) => {
    dispatch({ payload: { ...defender, lastRoll }, type: CombatantContextActionType.SetDefender });
  };

  const setCombatant = (combatant: Combatant) => {
    dispatch({ payload: combatant, type: CombatantContextActionType.SetDefender });
  };

  return (
    <div className="flex items-center">
      <StatInput value={defender.skill} setter={setAttackerSkill} label="Defender Skill" />
      <RollInput value={defender.lastRoll} setter={setAttackerRoll} label="Defender Roll" />
      <SavedCombatants setCombatant={setCombatant} />
    </div>
  );
};
