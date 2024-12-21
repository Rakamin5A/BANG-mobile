import { LinearGradient } from "expo-linear-gradient";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  useAnimatedValue,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import WheelChoice from "../../components/WheelChoice";
import HandImage from "../../components/HandImage";
import { randomizeNumber } from "../../utils";
import { useGameMode } from "../../contexts/GameModeContext";

const NUM_OF_ROUNDS = 3;

export default function Pve() {
  const [isReady, setIsReady] = useState(false);
  const [showChoice, setShowChoice] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [botChoice, setBotChoice] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState({
    player: 0,
    bot: 0,
  });
  const { rounds } = useGameMode();
  const translateY = useAnimatedValue(500);

  const handleNextRound = () => {
    setPlayerChoice(null);
    setBotChoice(null);
    setShowChoice(false);
    setCountdown(5);
  };

  const handleReset = () => {
    handleNextRound();
    setScore({ player: 0, bot: 0 });
    setCurrentRound(0);
    setIsReady(false);
  };

  const handleResult = () => {
    if (playerChoice === botChoice) {
      setCurrentRound((prev) => prev);
    } else if (
      (playerChoice === 0 && botChoice === 2) ||
      (playerChoice === 1 && botChoice === 0) ||
      (playerChoice === 2 && botChoice === 1)
    ) {
      setScore((score) => ({ ...score, player: score.player + 1 }));
      setCurrentRound((prev) => prev + 1);
    } else {
      setScore((score) => ({ ...score, bot: score.bot + 1 }));
      setCurrentRound((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (countdown <= 0) {
      setShowChoice(true);
      handleResult();

      return;
    }

    if (countdown === 1) {
      setPlayerChoice(randomizeNumber());
    }

    const interval = setInterval(() => {
      if (isReady) {
        setCountdown((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, isReady]);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: showChoice ? 0 : 500,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showChoice]);

  useEffect(() => {
    setBotChoice(randomizeNumber());
  }, [playerChoice]);

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.background}
        colors={["#9AC6FF", "#5D68A1", "#002C5F"]}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          zIndex: 50,
        }}
      >
        <TouchableOpacity onPress={() => setIsReady(true)}>
          <Text>Ready</Text>
        </TouchableOpacity>
        <Text>{countdown}</Text>
        <TouchableOpacity onPress={() => handleNextRound()}>
          <Text>NEXT ROUND</Text>
        </TouchableOpacity>
        <Text>Player Score {score.player}</Text>
        <Text>Bot Score {score.bot}</Text>
        <TouchableOpacity
          onPress={() => {
            handleReset();
          }}
          style={{
            backgroundColor: "white",
            zIndex: 50,
          }}
        >
          <Text>Reset</Text>
        </TouchableOpacity>
        <Text>{currentRound >= NUM_OF_ROUNDS && "ROUND END"}</Text>
      </View>
      <WheelChoice setChoice={setPlayerChoice} />
      {showChoice && (
        <Animated.View
          style={{
            position: "absolute",
            bottom: -100,
            width: 250,
            height: 500,
            zIndex: 0,
            transform: [{ translateY: translateY }],
          }}
        >
          <HandImage choice={playerChoice} />
        </Animated.View>
      )}
      {showChoice && (
        <Animated.View
          style={{
            position: "absolute",
            top: -100,
            width: 250,
            height: 500,
            zIndex: 0,
            transform: [{ rotate: "180deg" }, { translateY: translateY }],
          }}
        >
          <HandImage choice={botChoice} />
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
});
