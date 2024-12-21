import { LinearGradient } from "expo-linear-gradient";
import { Image, StatusBar, StyleSheet, View } from "react-native";

import Button from "../../components/Button";
import { colors } from "../../constants";
import { router } from "expo-router";

export default function Index() {
  const handleStart = () => {
    router.push("/(game)");
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LinearGradient
        style={styles.background}
        colors={["#FCFF9A", "#FFBA4B", "#FD7F02"]}
      />
      <View></View>
      <Image source={require("../../assets/home.png")} style={styles.image} />
      <View style={styles.buttonContainer}>
        <Button
          primary={colors.home.primary}
          shadow={colors.home.secondary}
          color={colors.home.secondary}
          text="Mulai"
          handlePress={handleStart}
        />
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
  image: {
    width: 275,
    height: 280,
    objectFit: "cover",
    marginTop: 92,
  },
  buttonContainer: {
    width: 300,
    marginTop: 60,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 42,
  },
});
