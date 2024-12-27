import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";

import BackButton from "../../components/BackButton";
import useAxios from "../../hooks/useAxios";
import { getSecureStore } from "../../utils";

function StatCard({ label, value }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export default function Profile() {
  const [token, setToken] = useState("");
  const [stats, setStats] = useState({
    totalMatches: 0,
    totalWins: 0,
    winRate: "",
    winStreak: 0,
  });
  const { response, sendRequest } = useAxios();

  const getToken = async () => {
    const result = await getSecureStore("token");

    setToken(result);
  };

  const calculateTotalMatches = () => {
    return (
      parseInt(response?.data?.stats.winnings) +
      parseInt(response?.data?.stats.loses)
    );
  };

  const calculateWinRate = () => {
    const result =
      parseInt(response?.data?.stats.winnings) / calculateTotalMatches();

    if (calculateTotalMatches() !== 0) return `${result}%`;

    return "0%";
  };

  useLayoutEffect(() => {
    getToken();
  }, []);

  useLayoutEffect(() => {
    sendRequest({
      method: "GET",
      url: "/auth/profile",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  useEffect(() => {
    setStats({
      totalMatches: calculateTotalMatches(),
      totalWins: parseInt(response?.data?.stats.winnings),
      winRate: calculateWinRate(),
      winStreak: parseInt(response?.data?.stats.longest_win_streak),
    });
  }, [response]);

  console.log(
    "STATS",
    parseInt(response?.data?.stats.winnings) /
      (parseInt(response?.data?.stats.winnings) +
        parseInt(response?.data?.stats.winnings))
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/background-home.png")}
        style={styles.background}
      />
      <BackButton />
      <Text style={styles.name}>{response?.data?.nama}</Text>
      <View>
        <Image
          source={require("../../assets/avatar.png")}
          style={styles.avatar}
        />
        <TouchableOpacity disabled={true}>
          <Image
            source={require("../../assets/camera.png")}
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.stats}>Statistik Pertandingan</Text>
      <View style={styles.card}>
        <StatCard label="Pertandingan" value={stats.totalMatches} />
        <StatCard label="Menang" value={stats.totalWins} />
        <StatCard label="Persentase Menang" value={stats.winRate} />
        <StatCard label="Kemenangan Beruntun" value={stats.winStreak} />
      </View>
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
    objectFit: "cover",
    width: "auto",
  },
  name: { fontSize: 20, fontWeight: 700 },
  avatar: {
    width: 225,
    height: 225,
    marginTop: 20,
  },
  cameraIcon: {
    position: "absolute",
    right: 20,
    bottom: -20,
    width: 50,
    height: 50,
    opacity: 0.5,
  },
  stats: { fontSize: 20, fontWeight: 700, marginTop: 60 },
  card: {
    backgroundColor: "#C85C2A",
    paddingVertical: 24,
    paddingHorizontal: 40,
    borderRadius: 15,
    width: "90%",
    marginTop: 14,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    justifyContent: "center",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    width: 135,
  },
  label: { textAlign: "center", fontWeight: 700, fontSize: 14 },
  statValue: {
    textAlign: "center",
    fontWeight: 700,
    color: "#C85C2A",
    marginTop: 16,
    fontSize: 24,
  },
});
