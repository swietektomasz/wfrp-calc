import { CombatantContextActionType, Results } from "../types/enums";
import results from "../assets/results.json";
import { useEffect, useState } from "react";
import { initial } from "../calculators/combat";
import { useCombatDispatchContext, useCombatStateContext } from "../context/combat";

export const CombatFeed = () => {
  const [result, setResult] = useState<Results[]>([]);
  const { attacker, defender } = useCombatStateContext();
  const dispatch = useCombatDispatchContext();

  useEffect(() => {
    dispatch({ type: CombatantContextActionType.SetCombatants, payload: attacker });
  }, []);

  const getResultMessages = (): string[] => {
    if (!result) return ["Jeszcze nic"];

    return result.map((res) => results[res]);
  };

  const handleResult = () => {
    const combat = initial(
      { roll: attacker.lastRoll, skill: attacker.skill },
      { roll: defender.lastRoll, skill: defender.skill }
    );

    setResult(combat);
  };

  return (
    <div>
      <button className="w-24 border-2 rounded-sm p-2" onClick={() => handleResult()} type="submit">
        Fight!
      </button>
      <div className="border-2 p-2 rounded-sm flex flex-col m-2">
        {getResultMessages().map((message) => (
          <div className="bg-amber-200 my-1 p-3 rounded-sm" key={message}>
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};
