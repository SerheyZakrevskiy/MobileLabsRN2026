import "react-native-gesture-handler";

import { Slot } from "expo-router";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GameProvider } from "../context/GameContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <GameProvider>
        <Slot />
      </GameProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
