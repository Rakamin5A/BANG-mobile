import { useEffect, useState } from "react";

import { calculateRoundResult, randomizeNumber } from "../utils";

const useRoundCountdown = (
  initialCountdown,
  isReady,
  choice,
  setChoice,
  setScore,
  firstPlayer,
  secondPlayer,
  isFirstPlayerTurn = null
) => {
  const [roundCountdown, setRoundCountdown] = useState(initialCountdown);
  const [showChoice, setShowChoice] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [countEnd, setCountEnd] = useState(false);
  const [winner, setWinner] = useState({
    player: null,
    choice: null,
  });
  const [scoreIndicator, setScoreIndicator] = useState({});

  useEffect(() => {
    if (roundCountdown <= 0) {
      if (!isFirstPlayerTurn) {
        setShowChoice(true);
        const winner = calculateRoundResult(
          choice,
          setCurrentRound,
          setScore,
          firstPlayer,
          secondPlayer
        );

        setWinner({ player: winner?.player, choice: winner?.choice });

        if (winner.player < 3)
          setScoreIndicator((prev) => ({
            ...prev,
            [currentRound]: winner.player,
          }));
      }
      setCountEnd(true);
      return;
    }

    const interval = setInterval(() => {
      if (isReady) {
        setRoundCountdown((oldVal) => {
          const newVal = oldVal - 1;

          if (newVal === 0) {
            if (choice[firstPlayer] === null) {
              setChoice((prev) => ({
                ...prev,
                [firstPlayer]: randomizeNumber(),
              }));
            }
            if (
              choice[secondPlayer] === null &&
              (isFirstPlayerTurn === null || !isFirstPlayerTurn)
            ) {
              setChoice((prev) => ({
                ...prev,
                [secondPlayer]: randomizeNumber(),
              }));
            }
          }

          return newVal;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [roundCountdown, isReady]);

  return {
    roundCountdown,
    currentRound,
    showChoice,
    countEnd,
    winner,
    scoreIndicator,
    setRoundCountdown,
    setShowChoice,
    setCountEnd,
    setCurrentRound,
    setScoreIndicator,
  };
};

export default useRoundCountdown;
