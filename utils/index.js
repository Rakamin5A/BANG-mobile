export const randomizeNumber = () => {
  const noise = Math.floor(Math.random() * 0.5);
  const num = Math.floor(Math.random() * 3 + noise);

  return num;
};

export const calculateRoundResult = (
  choice,
  setCurrentRound,
  setScore,
  firstPlayer,
  secondPlayer
) => {
  if (choice[firstPlayer] === choice[secondPlayer]) {
    setCurrentRound((prev) => prev);

    return { player: 3, choice: 3 };
  } else if (
    (choice[firstPlayer] === 0 && choice[secondPlayer] === 2) ||
    (choice[firstPlayer] === 1 && choice[secondPlayer] === 0) ||
    (choice[firstPlayer] === 2 && choice[secondPlayer] === 1)
  ) {
    setScore((prev) => ({
      ...prev,
      [firstPlayer]: prev[firstPlayer] + 1,
    }));
    setCurrentRound((prev) => prev + 1);

    return { player: 1, choice: choice[firstPlayer] };
  } else {
    setScore((prev) => ({
      ...prev,
      [secondPlayer]: prev[secondPlayer] + 1,
    }));
    setCurrentRound((prev) => prev + 1);

    return { player: 2, choice: choice[secondPlayer] };
  }
};

export const nextRound = (
  setChoice,
  setShowChoice,
  setRoundCountdown,
  firstPlayer,
  secondPlayer
) => {
  setChoice({ [firstPlayer]: null, [secondPlayer]: null });
  setShowChoice(false);
  setRoundCountdown(5);
};

export const replayMatch = (
  setChoice,
  setShowChoice,
  setGameCountdown,
  setRoundCountdown,
  setIsReady,
  setScore,
  setCurrentRound,
  setScoreIndicator,
  firstPlayer,
  secondPlayer
) => {
  setChoice({ [firstPlayer]: null, [secondPlayer]: null });
  setShowChoice(false);
  setGameCountdown(3);
  setRoundCountdown(5);
  setIsReady(false);
  setScore({
    [firstPlayer]: 0,
    [secondPlayer]: 0,
  });
  setCurrentRound(0);
  setScoreIndicator({});
};
