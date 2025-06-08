import { ChangeEvent, useEffect, useState } from "react";
import { useCombatStateContext } from "../context/combat";
import { Combatant } from "../types";
import { save } from "../helpers/combatantStorage";

type SavedCombatantsProps = {
  setCombatant: (combatant: Combatant) => void;
};

export const SavedCombatants = ({ setCombatant }: SavedCombatantsProps) => {
  const [name, setName] = useState("");
  const { combatants } = useCombatStateContext();

  useEffect(() => {
    return () => save(combatants);
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const existingCombatant = combatants.find((cmb) => (cmb.name = e.target.value));

    if (existingCombatant) setCombatant(existingCombatant);

    setName(e.target.value);
  };

  return (
    <div className="flex items-center m-2">
      <div>
        <input
          className="border-2 rounded-sm p-2 m-2 text-center h-12 focus:bg-amber-100 focus:outline-0"
          type="text"
          name="name"
          list="combatants"
          onChange={handleChange}
          value={name}
        />
        <datalist id="combatants">
          {combatants.map((combatant) => (
            <option key={combatant.id} value={combatant.name} />
          ))}
        </datalist>
      </div>
    </div>
  );
};
