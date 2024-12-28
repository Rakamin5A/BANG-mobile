import { Stack } from "expo-router";
import { GameModeProvider } from "../../contexts/GameModeContext";
import { OngoingGameProvider } from "../../contexts/OngoingGameContext";

export default function Layout() {
  return (
    <GameModeProvider>
      <OngoingGameProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="rounds" options={{ headerShown: false }} />
          <Stack.Screen name="pve" options={{ headerShown: false }} />
          <Stack.Screen name="off-pvp" options={{ headerShown: false }} />
          <Stack.Screen name="on-pvp" options={{ headerShown: false }} />
        </Stack>
      </OngoingGameProvider>
    </GameModeProvider>
  );
}
