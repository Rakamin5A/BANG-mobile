import { LinearGradient } from "expo-linear-gradient";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";

import Input from "../components/Input";
import Button from "../components/Button";
import { colors } from "../constants";

export default function Index() {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleOnChangeText = (key, value) => {
    setLoginForm({ ...loginForm, [key]: value });
  };

  const handleLogin = () => {
    router.replace("/(home)");
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LinearGradient
        style={styles.background}
        colors={["#9AC6FF", "#5D68A1", "#002C5F"]}
      />
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.loginText}>Masuk</Text>
      <View style={styles.wrapper}>
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
        <Button
          primary={colors.auth.primary}
          shadow={colors.auth.secondary}
          text="Masuk"
          handlePress={handleLogin}
        />
      </View>
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
  wrapper: {
    width: "100%",
    paddingHorizontal: 60,
  },
  inputContainer: {
    display: "flex",
    gap: 25,
    marginTop: 22,
    marginBottom: 31,
    width: "100%",
  },
  registerText: {
    marginTop: 18,
    color: "#FFFFFF",
  },
  registerLink: {
    color: colors.auth.primary,
  },
});
