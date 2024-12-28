import { createContext, useContext, useState } from "react";

const OngoingGameContext = createContext();

export const OngoingGameProvider = ({ children }) => {
  const [gameId, setGameId] = useState(null);
  const [isHost, setIsHost] = useState(false);

  return (
    <OngoingGameContext.Provider
      value={{ gameId, isHost, setGameId, setIsHost }}
    >
      {children}
    </OngoingGameContext.Provider>
  );
};

export const useOngoingGame = () => useContext(OngoingGameContext);
