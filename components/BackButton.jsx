import { router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export default function BackButton({ handlePress = () => router.back() }) {
  return (
    <TouchableOpacity style={styles.chevronContainer} onPress={handlePress}>
      <Image
        source={require("../assets/chevron-back.png")}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chevronContainer: {
    position: "absolute",
    top: 32,
    left: 32,
  },
  chevron: {
    width: 40,
    height: 40,
  },
});
