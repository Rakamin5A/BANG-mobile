import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Button({
  primary,
  shadow,
  color = "#FFFFFF",
  text,
  handlePress,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      style={{ ...styles.button, opacity: disabled && 0.5 }}
      disabled={disabled}
      onPress={handlePress}
    >
      <View style={{ ...styles.shadow, backgroundColor: shadow }}>
        <View style={{ ...styles.primary, backgroundColor: primary }}>
          <Text style={{ ...styles.text, color }}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
  },
  shadow: {
    height: 50,
    width: "100%",
    borderRadius: 30,
  },
  primary: {
    height: 50,
    width: "100%",
    borderRadius: 30,
    position: "absolute",
    bottom: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 500,
    marginVertical: "auto",
    textAlign: "center",
  },
});
