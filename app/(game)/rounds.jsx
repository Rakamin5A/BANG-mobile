import { LinearGradient } from "expo-linear-gradient";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";

import Button from "../../components/Button";
import { colors } from "../../constants";
import BackButton from "../../components/BackButton";
import { useGameMode } from "../../contexts/GameModeContext";
import { router } from "expo-router";

const ROUNDS = [3, 5, 7];

export default function Rounds() {
  const { mode, setRounds } = useGameMode();

  const handleRounds = (round) => {
    router.push(mode);
    setRounds(round);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LinearGradient
        style={styles.background}
        colors={["#FCFF9A", "#FFBA4B", "#FD7F02"]}
      />
      <BackButton />
      <View style={styles.buttonContainer}>
        <Text style={styles.roundsText}>Berapa kali kamu ingin suit?</Text>
        {ROUNDS.map((item, index) => (
          <Button
            key={index}
            primary={colors.home.primary}
            shadow={colors.home.secondary}
            color={colors.home.secondary}
            text={item}
            handlePress={() => handleRounds(item)}
          />
        ))}
      </View>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
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
  roundsText: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 36,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: 30,
    paddingHorizontal: 45,
    marginTop: 195,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 160,
  },
});
