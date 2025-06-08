import { createContext, useContext, ReactNode, useReducer, ActionDispatch } from "react";
import { COMBATANTS_STORAGE_KEY } from "../constants";
import { Combatant } from "../types";
import { CombatantContextActionType, Results } from "../types/enums";
import { load } from "../helpers/combatantStorage";

type CombatContextAction = {
  type: CombatantContextActionType;
  payload: Combatant;
};

type CombatState = {
  attacker: Combatant;
  defender: Combatant;
  combatants: Combatant[];
  results: Results[];
};

const defaultCombatant: Combatant = {
  lastRoll: 0,
  name: "",
  skill: 0,
  id: "",
};

const savedCombatants = localStorage.getItem(COMBATANTS_STORAGE_KEY);
const initialCombatState: CombatState = {
  combatants: savedCombatants ? JSON.parse(savedCombatants) : [],
  attacker: defaultCombatant,
  defender: defaultCombatant,
  results: [],
};

const CombatantStateContext = createContext(initialCombatState);
const CombatantDispatchContext = createContext<ActionDispatch<[action: CombatContextAction]> | null>(null);

export const combatantReducer = (state: CombatState, action: CombatContextAction) => {
  const existingCombatant = state.combatants.find((cmb) => cmb.id === action.payload.id);

  switch (action.type) {
    case CombatantContextActionType.SetCombatants:
      const combatants = load();
      return { ...state, combatants };
    case CombatantContextActionType.SetAttacker:
      return {
        ...state,
        attacker: action.payload,
        combatants: existingCombatant ? [...state.combatants, existingCombatant] : [...state.combatants],
      };
    case CombatantContextActionType.SetDefender:
      return { ...state, defender: action.payload };
    default: {
      throw Error(`Unknown action type: ${action.type}`);
    }
  }
};

export const CombatContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(combatantReducer, initialCombatState);

  return (
    <CombatantStateContext.Provider value={state}>
      <CombatantDispatchContext.Provider value={dispatch}>{children}</CombatantDispatchContext.Provider>
    </CombatantStateContext.Provider>
  );
};

export const useCombatStateContext = () => {
  const context = useContext(CombatantStateContext);

  if (!context) throw Error("CombatStateContext needs to be wrapped in a Provider");

  return context;
};

export const useCombatDispatchContext = () => {
  const context = useContext(CombatantDispatchContext);

  if (!context) throw Error("CombatDispatchContext needs to be wrapped in a Provider");

  return context;
};
