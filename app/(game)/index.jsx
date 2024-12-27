import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import Button from "../../components/Button";
import { colors } from "../../constants";
import BackButton from "../../components/BackButton";
import { useGameMode } from "../../contexts/GameModeContext";

const MODE = [
  {
    text: "VS Komputer",
    mode: "pve",
  },
  {
    text: "VS Teman (1 Device)",
    mode: "off-pvp",
  },
  {
    text: "VS Teman (2 Devices)",
    mode: "on-pvp",
  },
];

export default function Index() {
  const { setMode } = useGameMode();

  const handleMode = (mode) => {
    setMode(mode);
    router.push("/rounds");
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require("../../assets/background-home.png")}
        style={styles.background}
      />
      <BackButton />
      <View style={styles.buttonContainer}>
        <Text style={styles.modeText}>Pilih Mode Permainan</Text>
        {MODE.map((item, index) => (
          <Button
            key={index}
            primary={colors.home.primary}
            shadow={colors.home.secondary}
            color={colors.home.secondary}
            text={item.text}
            handlePress={() => handleMode(item.mode)}
          />
        ))}
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
  buttonContainer: {
    width: "100%",
    gap: 30,
    paddingHorizontal: 45,
  },
  modeText: {
    color: colors.home.secondary,
    fontSize: 26,
    textAlign: "center",
    fontWeight: 700,
    marginBottom: 36,
  },
});
