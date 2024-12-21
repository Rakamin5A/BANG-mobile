import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { colors } from "../../constants";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#19918F",
        tabBarStyle: {
          backgroundColor: colors.home.primary,
          paddingTop: 5,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
