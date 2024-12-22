import { StyleSheet, TextInput } from "react-native";

export default function Input({
  name,
  placeholder,
  type = "default",
  isPassword = false,
  state,
  handleOnChangeText,
}) {
  return (
    <TextInput
      value={state}
      placeholder={placeholder}
      placeholderTextColor="#FFCFAC"
      keyboardType={type}
      autoCapitalize="none"
      style={styles.input}
      onChangeText={(value) => handleOnChangeText(name, value)}
      secureTextEntry={isPassword}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    color: "white",
    borderWidth: 2,
    borderColor: "#F8C557",
    borderRadius: 15,
    paddingLeft: 10,
    width: "100%",
    padding: 16,
  },
});
