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
import { getSecureStore, nextRound, replayMatch } from "../../utils";
import { useGameMode } from "../../contexts/GameModeContext";
import useCountdown from "../../hooks/useCountdown";
import useRoundCountdown from "../../hooks/useRoundCountdown";
import WinnerImage from "../../components/WinnerImage";
import ScoreIndicator from "../../components/ScoreIndicator";
import WinnerModal from "../../components/WinnerModal";
import { useOngoingGame } from "../../contexts/OngoingGameContext";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

export default function OnPvp() {
  const [token, setToken] = useState("");
  const [choice, setChoice] = useState({
    firstPlayer: null,
    secondPlayer: null,
  });
  const [score, setScore] = useState({
    firstPlayer: 0,
    secondPlayer: 0,
  });
  const { rounds } = useGameMode();
  const { gameId, isHost } = useOngoingGame();
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
    "firstPlayer",
    "secondPlayer"
  );
  const { sendRequest: getCurrentUser } = useAxios();

  const getToken = async () => {
    const result = await getSecureStore("token");
    setToken(result);
  };

  const handleChoice = (choice) => {
    setChoice((prev) => ({ ...prev, player: choice }));
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

  const sendPlayerChoice = async (choice, matchId = null) => {
    if (isHost) {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URL}/matches`,
        { id_game: gameId, player_1_selection: choice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      const response = await axios.patch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/matches/${matchId}`,
        { id_game: gameId, player_2_selection: choice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token)
      getCurrentUser({
        method: "GET",
        url: "/auth/profile",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  }, [token]);

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
      nextRound(
        setChoice,
        setShowChoice,
        setRoundCountdown,
        "firstPlayer",
        "secondPlayer"
      );
    }
  }, [gameCountdown]);

  // useEffect(() => {
  //   const interval = setInterval(() => {}, 1000);

  //   return () => clearInterval(interval);
  // }, []);

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
      {showChoice && currentRound < rounds && (
        <View style={styles.winnerImageContainer}>
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
      {isReady && !showChoice && <WheelChoice setChoice={handleChoice} />}
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
  winnerImageContainer: {
    position: "absolute",
    width: 400,
    height: 400,
    zIndex: 999,
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
    width: 230,
    height: 460,
    zIndex: 0,
  },
});
