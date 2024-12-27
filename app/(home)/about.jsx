import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";

export default function About() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require("../../assets/background-home.png")}
        style={styles.background}
      />
      <Text style={styles.aboutText}>TENTANG KAMI</Text>
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
  aboutText: {
    fontSize: 30,
    color: "#FFFFFF",
    fontWeight: 700,
  },
});
