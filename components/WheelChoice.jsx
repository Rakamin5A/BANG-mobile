import {
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

import { colors } from "../constants";

const IMAGES = {
  0: require("../assets/random-black.png"),
  1: require("../assets/random-white.png"),
};

export default function WheelChoice({ setChoice, isOpposite }) {
  return (
    <View style={styles.container}>
      <View style={styles.outerCircle}>
        <TouchableHighlight
          style={{ ...styles.choice, top: 65, left: 20 }}
          underlayColor="#C8C8C8"
          onPress={() => setChoice(0)}
        >
          <Image
            source={require("../assets/choice-rock.png")}
            style={styles.choiceIcon}
          />
        </TouchableHighlight>
        <TouchableHighlight
          style={{
            ...styles.choice,
            top: 5,
            left: 125,
          }}
          underlayColor="#C8C8C8"
          onPress={() => setChoice(1)}
        >
          <Image
            source={require("../assets/choice-paper.png")}
            style={styles.choiceIcon}
          />
        </TouchableHighlight>
        <TouchableHighlight
          style={{ ...styles.choice, top: 65, right: 20 }}
          underlayColor="#C8C8C8"
          onPress={() => setChoice(2)}
        >
          <Image
            source={require("../assets/choice-scissors.png")}
            style={styles.choiceIcon}
          />
        </TouchableHighlight>
      </View>
      <View
        style={{
          ...styles.innerCircle,
          backgroundColor: !isOpposite ? colors.auth.primary : "#002C5F",
        }}
      >
        <TouchableOpacity>
          <Image
            source={!isOpposite ? IMAGES[0] : IMAGES[1]}
            style={{ ...styles.randomIcon, marginTop: 20 }}
          />
        </TouchableOpacity>
      </View>
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
    width: 320,
    height: 320,
    borderRadius: "100%",
    bottom: -160,
    borderWidth: 2,
    borderColor: "black",
    marginTop: "auto",
  },
  innerCircle: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: "100%",
    bottom: -80,
    borderWidth: 2,
    borderColor: "black",
  },
  randomIcon: {
    width: 40,
    height: 40,
    marginHorizontal: "auto",
  },
  choice: {
    position: "absolute",
    borderRadius: "100%",
    padding: 10,
  },
  choiceIcon: {
    width: 50,
    height: 50,
    objectFit: "contain",
  },
});
