import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { z } from "zod";

import Input from "../components/Input";
import Button from "../components/Button";
import { colors } from "../constants";

const LOGIN_SCHEMA = z.object({
  username: z.string().min(1, { message: "Username tidak boleh kosong" }),
  password: z.string().min(1, { message: "Password tidak boleh kosong" }),
});

export default function Index() {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleOnChangeText = (key, value) => {
    setLoginForm({ ...loginForm, [key]: value });

    try {
      LOGIN_SCHEMA.pick({ key: true }).parse({ [key]: value });
      setErrors((prev) => ({ ...prev, [key]: "" }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [key]: error.errors[0].message }));
    }
  };

  const login = async () => {
    try {
      LOGIN_SCHEMA.parse(loginForm);
      router.push("/(home)");
    } catch (error) {
      const errors = {};

      error.errors.forEach((error) => {
        errors[error.path] = error.message;
      });

      setErrors(errors);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require("../assets/background-login.png")}
        style={styles.background}
      />
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.loginText}>Masuk</Text>
      <View style={styles.mainWrapper}>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Input
              name="username"
              placeholder="Username"
              type="text"
              state={loginForm.username}
              handleOnChangeText={handleOnChangeText}
            />
            {errors?.username && (
              <Text style={styles.errorMessage}>{errors.username}</Text>
            )}
          </View>
          <View style={styles.inputWrapper}>
            <Input
              name="password"
              placeholder="Password"
              state={loginForm.password}
              handleOnChangeText={handleOnChangeText}
              isPassword={true}
            />
            {errors?.password && (
              <Text style={styles.errorMessage}>{errors.password}</Text>
            )}
          </View>
        </View>
        <Button
          primary={colors.auth.primary}
          shadow={colors.auth.secondary}
          text="Masuk"
          handlePress={login}
        />
      </View>
      <Text style={styles.registerText}>
        Belum punya akun?{" "}
        <Link href="/register" style={styles.registerLink}>
          <Text>Buat akun baru</Text>
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
  mainWrapper: {
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
  inputWrapper: {
    gap: 8,
  },
  errorMessage: {
    color: "#FF7F7F",
    fontWeight: 700,
  },
  registerText: {
    marginTop: 18,
    color: "#FFFFFF",
  },
  registerLink: {
    color: colors.auth.primary,
    textDecorationLine: "underline",
  },
});
