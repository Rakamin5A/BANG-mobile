import { LinearGradient } from "expo-linear-gradient";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { z } from "zod";
import axios from "axios";

import Input from "../components/Input";
import Button from "../components/Button";
import { colors } from "../constants";

const REGISTER_SCHEMA = z.object({
  username: z.string().min(2, { message: "Username tidak boleh kosong" }),
  password: z.string().min(2, { message: "Password tidak boleh kosong" }),
  nama: z.string().min(2, { message: "Nama tidak boleh kosong" }),
  email: z.string().email().min(2, { message: "Email tidak boleh kosong" }),
});

export default function Register() {
  const [registerForm, setRegisterForm] = useState({
    nama: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    nama: "",
    username: "",
    email: "",
    password: "",
  });

  const handleOnChangeText = (key, value) => {
    setRegisterForm({ ...registerForm, [key]: value });

    try {
      REGISTER_SCHEMA.pick({ key: true }).parse({ [key]: value });
      setErrors((prev) => ({ ...prev, [key]: "" }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [key]: error.errors[0].message }));
    }
  };

  const register = async () => {
    try {
      REGISTER_SCHEMA.parse(registerForm);

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URL}/auth/users`,
        registerForm
      );

      if (response.status === 201) {
        router.replace("/");
      }
    } catch (error) {
      console.log("ERROR", error);

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
      <LinearGradient
        style={styles.background}
        colors={["#9AC6FF", "#5D68A1", "#002C5F"]}
      />
      <Image
        source={require("../assets/background-register.png")}
        style={styles.background}
      />
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.registerText}>Daftar</Text>
      <View style={styles.mainWrapper}>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Input
              name="nama"
              placeholder="Nama"
              state={registerForm.nama}
              handleOnChangeText={handleOnChangeText}
            />
            {errors?.name && (
              <Text style={styles.errorMessage}>{errors.name}</Text>
            )}
          </View>
          <View style={styles.inputWrapper}>
            <Input
              name="username"
              placeholder="Username"
              state={registerForm.username}
              handleOnChangeText={handleOnChangeText}
            />
            {errors?.username && (
              <Text style={styles.errorMessage}>{errors.username}</Text>
            )}
          </View>
          <View style={styles.inputWrapper}>
            <Input
              name="email"
              placeholder="Email"
              type="email-address"
              state={registerForm.email}
              handleOnChangeText={handleOnChangeText}
            />
            {errors?.email && (
              <Text style={styles.errorMessage}>{errors.email}</Text>
            )}
          </View>
          <View style={styles.inputWrapper}>
            <Input
              name="password"
              placeholder="Password"
              state={registerForm.password}
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
          text="Daftar"
          handlePress={register}
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
  mainWrapper: {
    width: "100%",
    paddingHorizontal: 60,
  },
  inputContainer: {
    display: "flex",
    gap: 25,
    marginTop: 22,
    marginBottom: 31,
  },
  inputWrapper: {
    gap: 8,
  },
  errorMessage: {
    color: "#FF7F7F",
    fontWeight: 700,
  },
  loginText: {
    marginTop: 18,
    color: "#FFFFFF",
  },
  loginLink: {
    color: colors.auth.primary,
    textDecorationLine: "underline",
  },
});
