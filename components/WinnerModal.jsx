import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function WinnerModal({
  firstPlayerScore,
  secondPlayerScore,
  replayMatch,
}) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/trophy.png")}
        style={styles.trophyImage}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.matchEndText}>Permainan Selesai!</Text>
        <Text style={styles.scoreText}>Skor Akhir</Text>
        <View style={styles.playerScoreContainer}>
          <View>
            <Text
              style={{ ...styles.playerText, borderBottomColor: "#FAFF9A" }}
            >
              Player 1
            </Text>
            <Text style={styles.playerScore}>{firstPlayerScore}</Text>
          </View>
          <View>
            <View>
              <Text
                style={{ ...styles.playerText, borderBottomColor: "#C85C2A" }}
              >
                Player 2
              </Text>
              <Text style={styles.playerScore}>{secondPlayerScore}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Image
              source={require("../assets/tile-menu.png")}
              style={{ width: 32, height: 32, objectFit: "contain" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/(home)")}
          >
            <Image source={require("../assets/home.png")} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => replayMatch()}>
            <Image
              source={require("../assets/repeat.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "rgba(154,196,255,0.6)",
    width: 375,
    height: 375,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 999,
  },
  trophyImage: {
    position: "absolute",
    top: -85,
  },
  contentContainer: {
    position: "absolute",
    backgroundColor: "rgba(154,196,255,0.6)",
    width: 300,
    height: 300,
    borderRadius: 15,
  },
  matchEndText: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: 700,
    color: "#FEF48C",
    marginTop: 16,
  },
  scoreText: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  },
  playerScoreContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingHorizontal: 36,
  },
  playerText: {
    color: "#FFFFFF",
    textAlign: "center",
    borderBottomWidth: 4,
    paddingBottom: 4,
  },
  playerScore: { color: "#FFFFFF", textAlign: "center", fontSize: 40 },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 36,
    paddingTop: 24,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 12,
  },
  icon: {
    width: 40,
    height: 40,
    objectFit: "contain",
  },
});
