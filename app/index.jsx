import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "expo-router";

export default function Index() {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleOnChangeText = (key, value) => {
    setLoginForm({ ...loginForm, [key]: value });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.background}
        colors={["#9AC6FF", "#5D68A1", "#002C5F"]}
      />
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.loginText}>Masuk</Text>
      <View style={styles.inputContainer}>
        <Input
          name="username"
          placeholder="Username"
          type="text"
          state={loginForm.username}
          handleOnChangeText={handleOnChangeText}
        />
        <Input
          name="password"
          placeholder="Password"
          state={loginForm.password}
          handleOnChangeText={handleOnChangeText}
          isPassword={true}
        />
      </View>
      <Button primary="#F9AA00" shadow="#9F715D" text="Masuk" />
      <Text style={styles.registerText}>
        Belum punya akun?{" "}
        <Link href="/register" style={styles.registerLink}>
          Buat akun baru
        </Link>
      </Text>
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
  },
  logo: {
    width: 200,
    height: 200,
  },
  loginText: {
    fontSize: 24,
    fontWeight: 700,
    color: "#FFFFFF",
    marginTop: 22,
  },
  inputContainer: {
    display: "flex",
    gap: 25,
    marginTop: 22,
    marginBottom: 31,
  },
  registerText: {
    marginTop: 18,
    color: "#FFFFFF",
  },
  registerLink: {
    color: "#F9AA00",
  },
});
