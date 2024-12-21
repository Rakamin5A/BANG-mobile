import { LinearGradient } from "expo-linear-gradient";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

import Input from "../components/Input";
import Button from "../components/Button";
import { colors } from "../constants";

export default function Register() {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleOnChangeText = (key, value) => {
    setRegisterForm({ ...registerForm, [key]: value });
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LinearGradient
        style={styles.background}
        colors={["#9AC6FF", "#5D68A1", "#002C5F"]}
      />
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.registerText}>Daftar</Text>
      <View style={styles.wrapper}>
        <View style={styles.inputContainer}>
          <Input
            name="email"
            placeholder="Email"
            type="email-address"
            state={registerForm.email}
            handleOnChangeText={handleOnChangeText}
          />
          <Input
            name="username"
            placeholder="Username"
            state={registerForm.username}
            handleOnChangeText={handleOnChangeText}
          />
          <Input
            name="password"
            placeholder="Password"
            state={registerForm.password}
            handleOnChangeText={handleOnChangeText}
            isPassword={true}
          />
        </View>
        <Button
          primary={colors.auth.primary}
          shadow={colors.auth.secondary}
          text="Daftar"
        />
      </View>
      <Text style={styles.loginText}>
        Sudah punya akun?{" "}
        <Link href="/" style={styles.loginLink}>
          Masuk di sini
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
  registerText: {
    fontSize: 24,
    fontWeight: 700,
    color: "#FFFFFF",
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
  },
  loginText: {
    marginTop: 18,
    color: "#FFFFFF",
  },
  loginLink: {
    color: colors.auth.primary,
  },
});
