import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useGame } from "@/context/GameContext";

export default function SettingsScreen() {
  const { theme, toggleTheme, resetGame } = useGame();

  const isDark = theme === "dark";

  return (
    <SafeAreaView style={[styles.screen, isDark && styles.screenDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>Settings</Text>

      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.label, isDark && styles.textDark]}>
          Current theme:
        </Text>
        <Text style={styles.value}>{theme === "light" ? "Light" : "Dark"}</Text>

        <Pressable style={styles.button} onPress={toggleTheme}>
          <Text style={styles.buttonText}>Switch theme</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.resetButton]}
          onPress={resetGame}
        >
          <Text style={styles.buttonText}>Reset progress</Text>
        </Pressable>
      </View>

      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.description, isDark && styles.textDark]}>
          This screen implements application settings: light/dark theme
          switching and game progress reset.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f3f4f6",
  },
  screenDark: {
    backgroundColor: "#0f172a",
  },
  title: {
    marginTop: 24,
    marginBottom: 20,
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  titleDark: {
    color: "#f8fafc",
  },
  card: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    marginBottom: 16,
  },
  cardDark: {
    backgroundColor: "#1e293b",
  },
  label: {
    fontSize: 16,
    color: "#374151",
  },
  textDark: {
    color: "#e2e8f0",
  },
  value: {
    marginTop: 8,
    marginBottom: 18,
    fontSize: 24,
    fontWeight: "800",
    color: "#0ea5e9",
  },
  button: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#0ea5e9",
    alignItems: "center",
    marginTop: 12,
  },
  resetButton: {
    backgroundColor: "#ef4444",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#374151",
  },
});
