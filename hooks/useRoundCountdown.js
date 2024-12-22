import { useEffect, useState } from "react";

import { calculateRoundResult, randomizeNumber } from "../utils";

const useRoundCountdown = (
  initialCountdown,
  isReady,
  firstPlayerChoice,
  secondPlayerChoice,
  setFirstPlayerChoice,
  setSecondPlayerChoice,
  setScore,
  firstPlayerScore,
  secondPlayerScore,
  isFirstPlayerTurn = null
) => {
  const [roundCountdown, setRoundCountdown] = useState(initialCountdown);
  const [showChoice, setShowChoice] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [countEnd, setCountEnd] = useState(false);

  useEffect(() => {
    if (roundCountdown <= 0) {
      if (!isFirstPlayerTurn) {
        setShowChoice(true);
        calculateRoundResult(
          firstPlayerChoice,
          secondPlayerChoice,
          setCurrentRound,
          setScore,
          firstPlayerScore,
          secondPlayerScore
        );
      }
      setCountEnd(true);
      return;
    }

    const interval = setInterval(() => {
      if (isReady) {
        setRoundCountdown((oldVal) => {
          const newVal = oldVal - 1;

          if (newVal === 0) {
            if (firstPlayerChoice === null) {
              setFirstPlayerChoice(randomizeNumber());
            }
            if (
              secondPlayerChoice === null &&
              (isFirstPlayerTurn === null || !isFirstPlayerTurn)
            ) {
              setSecondPlayerChoice(randomizeNumber());
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
    setRoundCountdown,
    setShowChoice,
    setCountEnd,
  };
};

export default useRoundCountdown;
