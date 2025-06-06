import { useState } from "react";
import results from "./assets/results.json";
import "./App.css";

// 1. skill + modifiers - manual input, pass the end value
// 2. input rolls for attacker and defender
// 3. check if double rolled and if above or below skill
// 4. either hit and check location

enum Results {
  Miss = "miss",
  Hit = "hit",
  AttackerCrit = "attCrit",
  DefenderCrit = "defCrit",
  AttackerOops = "attOops",
  DefenderOops = "defOops",
  Tie = "tie",
  Nothing = "nothing",
}

function App() {
  const [attackerSkill, setAttackerSkill] = useState(0);
  const [attackerRoll, setAttackerRoll] = useState(0);

  const [defenderSkill, setDefenderSkill] = useState(0);
  const [defenderRoll, setDefenderRoll] = useState(0);

  const [result, setResult] = useState<Results[]>([]);

  const handleResult = () => {
    const combat = initial(
      { roll: attackerRoll, skill: attackerSkill },
      { roll: defenderRoll, skill: defenderSkill }
    );

    setResult(combat);
  };

  const formatResult = () => {
    if (!result) return "Jeszcze nic";
    const resultString = result.map((res) => results[res]);
    return resultString;
  };

  return (
    <main className="container">
      <div>{formatResult()}</div>
      <input
        placeholder="attacker stats"
        onChange={(e) => setAttackerSkill(Number(e.target.value))}
      />
      <input
        placeholder="attacker roll"
        onChange={(e) => setAttackerRoll(Number(e.target.value))}
        type="number"
        min={1}
        max={100}
      />
      <input
        placeholder="defender stats"
        onChange={(e) => setDefenderSkill(Number(e.target.value))}
      />
      <input
        placeholder="defender roll"
        onChange={(e) => setDefenderRoll(Number(e.target.value))}
        type="number"
        min={1}
        max={100}
      />
      <button onClick={() => handleResult()}>Fight!</button>
    </main>
  );
}

function initial(
  attacker: { skill: number; roll: number },
  defender: { skill: number; roll: number }
): Results[] {
  const results = [];

  if (isDouble(attacker.roll)) {
    const attackerCritResult = determineCrit(attacker.roll, attacker.skill);

    if (attackerCritResult) {
      results.push(Results.AttackerCrit);
    }

    if (!attackerCritResult) {
      results.push(Results.AttackerOops);
    }
  }

  if (isDouble(defender.roll)) {
    const defenderCritResult = determineCrit(defender.roll, defender.skill);

    if (defenderCritResult) {
      results.push(Results.DefenderCrit);
    }

    if (!defenderCritResult) {
      results.push(Results.DefenderOops);
    }
  }

  const attackerSL = Math.floor(attacker.skill - attacker.roll / 10);
  const defenderSL = Math.floor(defender.skill - defender.roll / 10);

  if (attackerSL < defenderSL) {
    results.push(Results.Miss);

    // miss
    // defender gains 1 advantage
    // attacker loses all advantage
  }

  if (attackerSL > defenderSL) {
    results.push(Results.Hit);
    // attacker gains 1 advantage
    // apply wounds (attackerSL - defenderSL) + SB + Weapon - (TB + AP)
    // if defender's wounds are 0, gains Prone and if not healed within TB rounds, gains Unconscious
    // if negative wounds, determineCrit again
  }

  if (attackerSL === defenderSL) {
    if (attacker.skill - attacker.roll > defender.skill - defender.roll) {
      results.push(Results.Hit);
    }

    if (attacker.skill - attacker.roll < defender.skill - defender.roll) {
      results.push(Results.Miss);
    }
  }

  if (attacker.roll === defender.roll && attacker.skill === defender.skill) {
    results.push(Results.Tie);
  }

  return results;
}

function isDouble(roll: number) {
  if (roll === 1) return true;
  if (roll === 100) return true;
  return roll.toString()[0] === roll.toString()[1];
}

function determineCrit(roll: number, skill: number): boolean {
  console.log(roll);
  if (roll === 1) return true;
  if (roll === 100) return false;
  if (roll <= skill) {
    return true;
    // roll d100 for hit location and d100 for outcome
    // lose wounds indicated by outcome, not modified
    // if critical deflection loose 1 ap from armor on that location
    // gain one critical wound + suffer any additional outcomes
    // if unconcious, at 0 wounds and critical wounds > TB => die
  }

  if (roll > skill) {
    return false;
    // Ooops! table
  }

  return false;
}

export default App;
