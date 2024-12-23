import { Image, StyleSheet, View } from "react-native";

import BackButton from "../../components/BackButton";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/background-home.png")}
        style={styles.background}
      />
      <BackButton />
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
});
