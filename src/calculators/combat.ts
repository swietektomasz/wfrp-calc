import { Results } from "../types/enums";

export function initial(
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
  }

  if (attackerSL > defenderSL) {
    results.push(Results.Hit);
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
  if (roll === 1) return true;
  if (roll === 100) return false;
  if (roll <= skill) {
    return true;
  }

  if (roll > skill) {
    return false;
  }

  return false;
}
