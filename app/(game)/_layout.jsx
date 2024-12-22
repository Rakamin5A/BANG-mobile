import { Stack } from "expo-router";
import { GameModeProvider } from "../../contexts/GameModeContext";

export default function Layout() {
  return (
    <GameModeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="rounds" options={{ headerShown: false }} />
        <Stack.Screen name="pve" options={{ headerShown: false }} />
        <Stack.Screen name="off-pvp" options={{ headerShown: false }} />
        <Stack.Screen name="on-pvp" options={{ headerShown: false }} />
      </Stack>
    </GameModeProvider>
  );
}
