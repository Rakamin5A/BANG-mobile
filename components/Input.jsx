import { StyleSheet, TextInput } from "react-native";

export default function Input({
  name,
  placeholder,
  state,
  handleOnChangeText,
}) {
  return (
    <TextInput
      value={state}
      placeholder={placeholder}
      placeholderTextColor="#FFCFAC"
      style={styles.input}
      onChangeText={(value) => handleOnChangeText(name, value)}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "#FFCFAC",
    borderRadius: 15,
    paddingLeft: 10,
    width: 315,
  },
});
