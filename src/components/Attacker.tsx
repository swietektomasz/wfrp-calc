import { useCombatDispatchContext, useCombatStateContext } from "../context/combat";
import { CombatantContextActionType } from "../types/enums";
import { RollInput } from "./RollInput";
import { SavedCombatants } from "./SavedCombatants";
import { StatInput } from "./StatInput";
import { Combatant } from "../types";

export const Attacker = () => {
  const { attacker } = useCombatStateContext();
  const dispatch = useCombatDispatchContext();

  const setAttackerSkill = (skill: number) => {
    dispatch({ payload: { ...attacker, skill }, type: CombatantContextActionType.SetAttacker });
  };

  const setAttackerRoll = (lastRoll: number) => {
    dispatch({ payload: { ...attacker, lastRoll }, type: CombatantContextActionType.SetAttacker });
  };

  const setCombatant = (combatant: Combatant) => {
    dispatch({ payload: combatant, type: CombatantContextActionType.SetAttacker });
  };

  return (
    <div className="flex items-center">
      <StatInput value={attacker.skill} setter={setAttackerSkill} label="Attacker Skill" />
      <RollInput value={attacker.lastRoll} setter={setAttackerRoll} label="Attacker Roll" />
      <SavedCombatants setCombatant={setCombatant} />
    </div>
  );
};
