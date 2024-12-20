import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Button({ primary, shadow, text }) {
  return (
    <TouchableOpacity>
      <View style={{ ...styles.shadow, backgroundColor: shadow }}>
        <View style={{ ...styles.primary, backgroundColor: primary }}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shadow: {
    height: 50,
    width: 200,
    borderRadius: 30,
  },
  primary: {
    height: 50,
    width: 200,
    borderRadius: 30,
    position: "absolute",
    bottom: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 500,
    marginVertical: "auto",
    textAlign: "center",
    color: "#FFFFFF",
  },
});
