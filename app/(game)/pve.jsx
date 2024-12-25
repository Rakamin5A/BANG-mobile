import { LinearGradient } from "expo-linear-gradient";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import WheelChoice from "../../components/WheelChoice";
import HandImage from "../../components/HandImage";
import { nextRound, replayMatch } from "../../utils";
import { useGameMode } from "../../contexts/GameModeContext";
import useCountdown from "../../hooks/useCountdown";
import useRoundCountdown from "../../hooks/useRoundCountdown";
import WinnerImage from "../../components/WinnerImage";
import ScoreIndicator from "../../components/ScoreIndicator";
import WinnerModal from "../../components/WinnerModal";

export default function Pve() {
  const [choice, setChoice] = useState({
    player: null,
    bot: null,
  });
  const [score, setScore] = useState({
    player: 0,
    bot: 0,
  });
  const { rounds } = useGameMode();
  const translateY = useAnimatedValue(500);
  const { gameCountdown, isReady, setGameCountdown, setIsReady } =
    useCountdown(3);
  const {
    roundCountdown,
    currentRound,
    showChoice,
    winner,
    scoreIndicator,
    setRoundCountdown,
    setShowChoice,
    setCurrentRound,
    setScoreIndicator,
  } = useRoundCountdown(
    5,
    isReady,
    choice,
    setChoice,
    setScore,
    "player",
    "bot"
  );

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
      "player",
      "bot"
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
    if (isReady && gameCountdown === 0 && currentRound < rounds) {
      nextRound(setChoice, setShowChoice, setRoundCountdown, "player", "bot");
    }
  }, [gameCountdown]);

  console.log("SCORE", score);

  return (
    <View style={styles.container}>
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
      {showChoice && currentRound === rounds && (
        <WinnerModal
          firstPlayerScore={score.player}
          secondPlayerScore={score.bot}
          replayMatch={handleReplayMatch}
        />
      )}
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
      {isReady && !showChoice && <WheelChoice setChoice={setChoice} />}
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
            ...styles.playerHandContainer,
            transform: [{ translateY: translateY }],
          }}
        >
          <HandImage choice={choice.player} />
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
            ...styles.opponentHandContainer,
            transform: [{ rotate: "180deg" }, { translateY: translateY }],
          }}
        >
          <HandImage choice={choice.bot} />
        </Animated.View>
      )}
    </View>
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
  playerHandContainer: {
    position: "absolute",
    bottom: -100,
    width: 230,
    height: 460,
    zIndex: 0,
  },
  opponentHandContainer: {
    position: "absolute",
    top: -100,
    width: 230,
    height: 460,
    zIndex: 0,
  },
});
