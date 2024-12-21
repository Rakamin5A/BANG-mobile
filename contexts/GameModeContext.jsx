import { createContext, useContext, useState } from "react";

const GameModeContext = createContext();

export const GameModeProvider = ({ children }) => {
  const [rounds, setRounds] = useState(0);
  const [mode, setMode] = useState("");

  return (
    <GameModeContext.Provider value={{ rounds, setRounds, mode, setMode }}>
      {children}
    </GameModeContext.Provider>
  );
};

export const useGameMode = () => useContext(GameModeContext);
