import { CombatFeed } from "./components/CombatFeed";
import { Attacker } from "./components/Attacker";
import { Defender } from "./components/Defender";
import { CombatContextProvider } from "./context/combat";
import "./App.css";

function App() {
  return (
    <main className="flex flex-col items-center">
      <CombatContextProvider>
        <Attacker />
        <Defender />
        <CombatFeed />
      </CombatContextProvider>
    </main>
  );
}

export default App;
