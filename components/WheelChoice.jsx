import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { colors } from "../constants";

export default function WheelChoice({ setChoice }) {
  return (
    <View style={styles.container}>
      <View style={styles.outerCircle}>
        <TouchableOpacity
          style={{ ...styles.choice, top: 65, left: 20 }}
          onPress={() => setChoice(0)}
        >
          <Image
            source={require("../assets/choice-rock.png")}
            style={styles.choiceIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.choice,
            top: 10,
            width: "100%",
            flex: 1,
            alignItems: "center",
          }}
          onPress={() => setChoice(1)}
        >
          <Image
            source={require("../assets/choice-paper.png")}
            style={styles.choiceIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.choice, top: 65, right: 20 }}
          onPress={() => setChoice(2)}
        >
          <Image
            source={require("../assets/choice-scissors.png")}
            style={styles.choiceIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.innerCircle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  outerCircle: {
    position: "relative",
    backgroundColor: "rgba(217,217,217,0.5)",
    width: 280,
    height: 280,
    borderRadius: "100%",
    bottom: -140,
    borderWidth: 2,
    borderColor: "black",
    marginTop: "auto",
  },
  innerCircle: {
    position: "absolute",
    backgroundColor: colors.auth.primary,
    width: 140,
    height: 140,
    borderRadius: "100%",
    bottom: -70,
    borderWidth: 2,
    borderColor: "black",
  },
  choice: {
    position: "absolute",
  },
  choiceIcon: {
    width: 50,
    height: 50,
    objectFit: "contain",
  },
});
