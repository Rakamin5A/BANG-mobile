export const randomizeNumber = () => {
  const noise = Math.floor(Math.random() * 0.5);
  const num = Math.floor(Math.random() * 3 + noise);

  return num;
};

export const calculateRoundResult = (
  firstPlayer,
  secondPlayer,
  setCurrentRound,
  setScore,
  firstPlayerScore,
  secondPlayerScore
) => {
  if (firstPlayer === secondPlayer) {
    setCurrentRound((prev) => prev);
  } else if (
    (firstPlayer === 0 && secondPlayer === 2) ||
    (firstPlayer === 1 && secondPlayer === 0) ||
    (firstPlayer === 2 && secondPlayer === 1)
  ) {
    setScore((score) => ({
      ...score,
      [firstPlayerScore]: score[firstPlayerScore] + 1,
    }));
    setCurrentRound((prev) => prev + 1);
  } else {
    setScore((score) => ({
      ...score,
      [secondPlayerScore]: score[secondPlayerScore] + 1,
    }));
    setCurrentRound((prev) => prev + 1);
  }
};

export const nextRound = (
  setFirstPlayerChoice,
  setSecondPlayerChoice,
  setShowChoice,
  setRoundCountdown
) => {
  setFirstPlayerChoice(null);
  setSecondPlayerChoice(null);
  setShowChoice(false);
  setRoundCountdown(5);
};
