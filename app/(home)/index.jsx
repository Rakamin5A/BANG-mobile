import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Button from "../../components/Button";
import { colors } from "../../constants";
import { router } from "expo-router";

export default function Index() {
  const handleStart = () => {
    router.push("/(game)");
  };

  const handleLogout = () => {
    router.dismissAll();
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require("../../assets/background-home.png")}
        style={styles.background}
      />
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Image
            source={require("../../assets/avatar.png")}
            style={{ width: 80, height: 80 }}
          />
          <Text style={styles.username}>Username</Text>
        </View>
        <TouchableOpacity onPress={() => handleLogout()}>
          <Image
            source={require("../../assets/logout.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardHeading}>
          Selamat datang di arena Bang! Berikut panduan main di arena kami.
        </Text>
        <View style={styles.guideContainer}>
          <View style={styles.guide}>
            <Image source={require("../../assets/home-rock.png")} />
            <Text style={styles.guideText}>menang melawan</Text>
            <Image source={require("../../assets/home-scissors.png")} />
          </View>
          <View style={styles.guide}>
            <Image source={require("../../assets/home-scissors.png")} />
            <Text style={styles.guideText}>menang melawan</Text>
            <Image source={require("../../assets/home-paper.png")} />
          </View>
          <View style={styles.guide}>
            <Image source={require("../../assets/home-paper.png")} />
            <Text style={styles.guideText}>menang melawan</Text>
            <Image source={require("../../assets/home-rock.png")} />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          primary={colors.home.primary}
          shadow={colors.home.secondary}
          color={colors.home.secondary}
          text="Mulai Bermain"
          handlePress={handleStart}
        />
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
    width: "auto",
  },
  header: {
    position: "absolute",
    top: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  avatar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  username: {
    fontWeight: 700,
  },
  card: {
    backgroundColor: "#C85C2A",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: "85%",
    marginTop: 100,
  },
  cardHeading: {
    color: "#FFAE00",
    fontWeight: 700,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 50,
  },
  guideContainer: {
    display: "flex",
    gap: 20,
  },
  guide: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "auto",
    gap: 30,
  },
  guideText: {
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 17,
  },
  buttonContainer: {
    width: 300,
    marginTop: 60,
  },
});
