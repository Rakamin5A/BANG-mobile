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

export default function OffPvp() {
  const [firstPlayerTurn, setFirstPlayerTurn] = useState(true);
  const [firstPlayerChoice, setFirstPlayerChoice] = useState(null);
  const [secondPlayerChoice, setSecondPlayerChoice] = useState(null);
  const [score, setScore] = useState({
    firstPlayer: 0,
    secondPlayer: 0,
  });
  const { rounds } = useGameMode();
  const translateY = useAnimatedValue(500);
  const { countdown: gameCountdown, isReady, resetCountdown } = useCountdown(3);
  const {
    roundCountdown,
    currentRound,
    showChoice,
    countEnd,
    setRoundCountdown,
    setShowChoice,
    setCountEnd,
  } = useRoundCountdown(
    5,
    isReady,
    firstPlayerChoice,
    secondPlayerChoice,
    setFirstPlayerChoice,
    setSecondPlayerChoice,
    setScore,
    "firstPlayer",
    "secondPlayer",
    firstPlayerTurn
  );

  const handleFirstPlayer = (choice) => {
    setFirstPlayerChoice(choice);
  };

  const handleSecondPlayer = (choice) => {
    setSecondPlayerChoice(choice);
  };

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: showChoice ? 0 : 500,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showChoice]);

  useEffect(() => {
    if (countEnd && firstPlayerTurn) {
      setFirstPlayerTurn(false);
      setRoundCountdown(5);
      setCountEnd(false);
    }
  }, [countEnd]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.background}
        colors={["#9AC6FF", "#5D68A1", "#002C5F"]}
      />
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <View style={styles.countdownContainer}>
        {!isReady && <Text style={styles.gameCountdown}>{gameCountdown}</Text>}
        {isReady && (
          <View>
            <Text style={styles.roundCountdown}>Giliranmu!</Text>
            <Text style={styles.roundCountdown}>{roundCountdown}</Text>
          </View>
        )}
      </View>
      <Text>
        FP: {score.firstPlayer} SP: {score.secondPlayer}
      </Text>
      {firstPlayerTurn && isReady && (
        <WheelChoice setChoice={handleFirstPlayer} />
      )}
      {!firstPlayerTurn && !showChoice && (
        <View style={styles.oppositeWheel}>
          <WheelChoice setChoice={handleSecondPlayer} isOpposite={true} />
        </View>
      )}
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
          <HandImage choice={firstPlayerChoice} />
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
          <HandImage choice={secondPlayerChoice} />
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
  oppositeWheel: {
    position: "absolute",
    top: 0,
    transform: [{ rotate: "180deg" }],
  },
});
