import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";

import Button from "../../components/Button";
import { colors } from "../../constants";
import BackButton from "../../components/BackButton";
import { useGameMode } from "../../contexts/GameModeContext";
import useAxios from "../../hooks/useAxios";
import { getSecureStore } from "../../utils";
import { useOngoingGame } from "../../contexts/OngoingGameContext";

const ROUNDS = [3, 5, 7];

function JoinRoom({ getCurrentUser }) {
  const [roomId, setRoomId] = useState();

  const handleSubmit = async () => {};

  return (
    <View style={joinStyles.card}>
      <Text style={joinStyles.text}>Bergabung ke Ruangan</Text>
      <TextInput
        value={roomId}
        onChangeText={(value) => setRoomId(value)}
        placeholder="Room ID"
        placeholderTextColor="#C85C2A"
        style={joinStyles.input}
      />
      <View>
        <Button
          primary={colors.home.primary}
          shadow={colors.home.secondary}
          color={colors.home.secondary}
          text="Bergabung"
          handlePress={handleSubmit}
        />
      </View>
    </View>
  );
}

function WaitingRoom({
  token,
  gameId,
  roomId,
  currentUserId,
  getGameById,
  setGameIdContext,
  setIsHost,
}) {
  const [isConnected, setIsConnected] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/games/connect`,
        { id_game: gameId, player_1: currentUserId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response?.status === 200) {
        setIsConnected(true);
      }
    } catch (error) {}
  };

  const checkOtherPlayer = async () => {
    try {
      const response = await getGameById({
        method: "GET",
        url: `/games/${gameId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.status === 200 && response?.data?.player_2 !== null) {
        setGameIdContext(gameId);
        setIsHost(true);
        setIsConnected(false);
        router.push("on-pvp");
      }
    } catch (error) {}
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected) checkOtherPlayer();
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <View style={joinStyles.card}>
      <Text style={joinStyles.text}>ID Ruangan</Text>
      <View style={waitingStyles.roomIdContainer}>
        <Text style={waitingStyles.roomId}>{roomId}</Text>
      </View>
      <View>
        <Button
          primary={colors.home.primary}
          shadow={colors.home.secondary}
          color={colors.home.secondary}
          text="Bergabung"
          handlePress={handleSubmit}
        />
      </View>
    </View>
  );
}

export default function Rounds() {
  const [roomId, setRoomId] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [token, setToken] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const { sendRequest: getCurrentUser } = useAxios();
  const { sendRequest: getGameById } = useAxios();
  const { mode, setRounds } = useGameMode();
  const { setGameId: setGameIdContext, setIsHost } = useOngoingGame();

  const getToken = async () => {
    const result = await getSecureStore("token");
    setToken(result);
  };

  const createGame = async (rounds) => {
    if (mode !== "on-pvp") {
      setRounds(rounds);
      router.push(mode);
    } else {
      try {
        const user = await getCurrentUser({
          method: "GET",
          url: "/auth/profile",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCurrentUserId(user?.data?.id);

        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_BASE_URL}/games`,
          {
            player_1: user?.data.id,
            type: "pvp_online",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          setRoomId(response.data.code);
          setGameId(response.data.id);
          setRounds(rounds);
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require("../../assets/background-home.png")}
        style={styles.background}
      />
      <BackButton />
      {roomId === null && (
        <View style={styles.buttonContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.roundsText}>
              {mode !== "on-pvp"
                ? "Berapa putaran kamu ingin bermain?"
                : "Buat Ruangan Baru"}
            </Text>
            <Text style={styles.roundsSubtext}>
              {mode === "on-pvp" && "Pilih ronde"}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            {ROUNDS.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => createGame(item)}
              >
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      {mode === "on-pvp" && roomId === null && <JoinRoom />}
      {roomId !== null && (
        <WaitingRoom
          token={token}
          gameId={gameId}
          roomId={roomId}
          currentUserId={currentUserId}
          getGameById={getGameById}
          getCurrentUser={getCurrentUser}
          setGameIdContext={setGameIdContext}
          setIsHost={setIsHost}
        />
      )}
    </View>
  );
}

const joinStyles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 28,
    paddingVertical: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    elevation: 10,
    width: "80%",
  },
  text: {
    fontWeight: 700,
    color: colors.home.secondary,
    fontSize: 20,
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(249,170,0,0.3)",
    marginBottom: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontWeight: 700,
    color: "#C85C2A",
  },
});

const waitingStyles = StyleSheet.create({
  roomIdContainer: {
    backgroundColor: "rgba(249,170,0,0.3)",
    marginBottom: 30,
    borderRadius: 10,
    padding: 10,
    fontWeight: 700,
    color: "#C85C2A",
  },
  roomId: { color: "#C85C2A", fontWeight: 700, fontSize: 20 },
});

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
    width: "auto",
  },
  textContainer: {
    gap: 8,
  },
  roundsText: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: "center",
    color: colors.home.secondary,
  },
  roundsSubtext: {
    fontSize: 14,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: 700,
    color: colors.home.secondary,
  },
  buttonContainer: {
    width: "80%",
    gap: 30,
    paddingHorizontal: 45,
    marginBottom: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 28,
    paddingVertical: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    elevation: 10,
    width: "80%",
  },
  buttonWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#FDE6B3",
    width: 65,
    height: 65,
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: colors.auth.primary,
    fontWeight: 700,
    textAlign: "center",
    fontSize: 20,
  },
});
