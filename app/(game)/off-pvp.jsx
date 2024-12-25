import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
  useAnimatedValue,
  Image,
  Text,
} from "react-native";

import WheelChoice from "../../components/WheelChoice";
import HandImage from "../../components/HandImage";
import { useGameMode } from "../../contexts/GameModeContext";
import useCountdown from "../../hooks/useCountdown";
import useRoundCountdown from "../../hooks/useRoundCountdown";
import { nextRound } from "../../utils";
import WinnerImage from "../../components/WinnerImage";
import WinnerModal from "../../components/WinnerModal";
import ScoreIndicator from "../../components/ScoreIndicator";

export default function OffPvp() {
  const [firstPlayerTurn, setFirstPlayerTurn] = useState(true);
  const [choice, setChoice] = useState({
    firstPlayer: null,
    secondPlayer: null,
  });
  const [score, setScore] = useState({
    firstPlayer: 0,
    secondPlayer: 0,
  });
  const { rounds } = useGameMode();
  const translateY = useAnimatedValue(500);
  const { gameCountdown, isReady, setGameCountdown, setIsReady } =
    useCountdown(3);
  const {
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
  } = useRoundCountdown(
    5,
    isReady,
    choice,
    setChoice,
    setScore,
    "firstPlayer",
    "secondPlayer",
    firstPlayerTurn
  );

  const handleFirstPlayer = (choice) => {
    setChoice((prev) => ({ ...prev, firstPlayer: choice }));
  };

  const handleSecondPlayer = (choice) => {
    setChoice((prev) => ({ ...prev, secondPlayer: choice }));
  };

  const handleReplayMatch = () => {
    replayMatch(
      setChoice,
      setShowChoice,
      setGameCountdown,
      setRoundCountdown,
      setIsReady,
      setScore,
      setCurrentRound,
      setScoreIndicator,
      "firstPlayer",
      "secondPlayer"
    );
  };

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: showChoice ? 0 : 500,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (showChoice && currentRound < rounds) {
      setGameCountdown(3);
    }
  }, [showChoice]);

  useEffect(() => {
    if (countEnd && currentRound < rounds) {
      setFirstPlayerTurn((prev) => !prev);
      setRoundCountdown(5);
      setCountEnd(false);
    }
  }, [countEnd]);

  useEffect(() => {
    // console.log(isReady, gameCountdown, currentRound, rounds);
    if (isReady && gameCountdown === 0 && currentRound < rounds) {
      nextRound(
        setChoice,
        setShowChoice,
        setRoundCountdown,
        "firstPlayer",
        "secondPlayer"
      );
    }
  }, [gameCountdown]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.background}
        colors={["#9AC6FF", "#5D68A1", "#002C5F"]}
      />
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <View style={styles.countdownContainer}>
        {!isReady && <Text style={styles.gameCountdown}>{gameCountdown}</Text>}
        {isReady && !showChoice && (
          <View>
            <Text style={styles.roundCountdown}>Giliranmu!</Text>
            <Text style={styles.roundCountdown}>{roundCountdown}</Text>
          </View>
        )}
      </View>
      {showChoice && currentRound < rounds && (
        <View
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            zIndex: 999,
          }}
        >
          <WinnerImage choice={winner.choice} />
        </View>
      )}
      {showChoice && currentRound === rounds && (
        <WinnerModal
          firstPlayerScore={score.firstPlayer}
          secondPlayerScore={score.secondPlayer}
          replayMatch={handleReplayMatch}
        />
      )}
      {firstPlayerTurn && isReady && !showChoice && (
        <WheelChoice setChoice={handleFirstPlayer} />
      )}
      {!firstPlayerTurn && !showChoice && (
        <View style={styles.oppositeWheel}>
          <WheelChoice setChoice={handleSecondPlayer} isOpposite={true} />
        </View>
      )}
      {currentRound < rounds && isReady && (
        <ScoreIndicator
          rounds={rounds}
          scoreIndicator={scoreIndicator}
          isFirstPlayer={true}
        />
      )}
      {showChoice && (
        <Animated.View
          style={{
            ...styles.firstPlayerHandContainer,
            transform: [{ translateY: translateY }],
          }}
        >
          <HandImage choice={choice.firstPlayer} />
        </Animated.View>
      )}
      {currentRound < rounds && isReady && (
        <ScoreIndicator
          rounds={rounds}
          scoreIndicator={scoreIndicator}
          isFirstPlayer={false}
        />
      )}
      {showChoice && (
        <Animated.View
          style={{
            ...styles.secondPlayerHandContainer,
            transform: [{ rotate: "180deg" }, { translateY: translateY }],
          }}
        >
          <HandImage choice={choice.secondPlayer} />
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    height: "100%",
  },
  logo: {
    opacity: 0.06,
    width: 190,
    height: 190,
    marginVertical: "auto",
    position: "absolute",
  },
  countdownContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 50,
  },
  gameCountdown: {
    fontWeight: 700,
    color: "#FFFFFF",
    fontSize: 48,
  },
  roundCountdown: {
    fontWeight: 700,
    color: "#FFFFFF",
    fontSize: 36,
    textAlign: "center",
  },
  winnerImageContainer: {
    position: "absolute",
    width: 400,
    height: 400,
    zIndex: 999,
  },
  oppositeWheel: {
    position: "absolute",
    top: 0,
    transform: [{ rotate: "180deg" }],
  },
  firstPlayerHandContainer: {
    position: "absolute",
    bottom: -100,
    width: 230,
    height: 460,
    zIndex: 0,
  },
  secondPlayerHandContainer: {
    position: "absolute",
    top: -100,
    width: 250,
    height: 500,
    zIndex: 0,
  },
});
