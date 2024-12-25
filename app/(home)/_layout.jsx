import { Tabs } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { colors } from "../../constants";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#C85C2A",
        tabBarInactiveTintColor: "#000000",
        tabBarStyle: {
          backgroundColor: colors.home.primary,
          height: 60,
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Beranda",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/logo.png")}
              style={{ width: 123, height: 104, marginBottom: 30 }}
            />
          ),
          href: "/",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-sharp" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 40,
    height: 40,
  },
});
