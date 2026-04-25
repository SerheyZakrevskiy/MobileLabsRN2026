import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useGame } from "@/context/GameContext";

export default function GameScreen() {
  const {
    stats,
    theme,
    registerTap,
    registerDoubleTap,
    registerLongPress,
    registerDrag,
    registerFlingLeft,
    registerFlingRight,
    registerPinch,
  } = useGame();

  const isDark = theme === "dark";

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const singleTap = Gesture.Tap()
    .numberOfTaps(1)
    .onEnd(() => {
      runOnJS(registerTap)();
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(registerDoubleTap)();
    });

  const longPress = Gesture.LongPress()
    .minDuration(3000)
    .onEnd(() => {
      runOnJS(registerLongPress)();
    });

  const pan = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
    })
    .onEnd(() => {
      runOnJS(registerDrag)();
    });

  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      runOnJS(registerFlingRight)();
    });

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      runOnJS(registerFlingLeft)();
    });

  const pinch = Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value;
    })
    .onUpdate((event) => {
      scale.value = Math.max(
        0.7,
        Math.min(savedScale.value * event.scale, 1.6),
      );
    })
    .onEnd(() => {
      runOnJS(registerPinch)();
    });

  const gesture = Gesture.Simultaneous(
    pan,
    pinch,
    flingRight,
    flingLeft,
    Gesture.Exclusive(longPress, doubleTap, singleTap),
  );

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <SafeAreaView style={[styles.screen, isDark && styles.screenDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>
        Gesture Clicker
      </Text>

      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={styles.label}>SCORE</Text>
        <Text style={styles.score}>{stats.score}</Text>
      </View>

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.button, animatedButtonStyle]}>
          <Text style={styles.buttonEmoji}>👆</Text>
          <Text style={styles.buttonText}>TAP ME</Text>
        </Animated.View>
      </GestureDetector>

      <View style={[styles.infoCard, isDark && styles.cardDark]}>
        <Text style={[styles.infoText, isDark && styles.textDark]}>
          Tap: +1 point
        </Text>
        <Text style={[styles.infoText, isDark && styles.textDark]}>
          Double tap: +2 points
        </Text>
        <Text style={[styles.infoText, isDark && styles.textDark]}>
          Long press 3 sec: +5 points
        </Text>
        <Text style={[styles.infoText, isDark && styles.textDark]}>
          Swipe left/right: random points
        </Text>
        <Text style={[styles.infoText, isDark && styles.textDark]}>
          Pinch: resize object and +3 points
        </Text>
        <Text style={[styles.infoText, isDark && styles.textDark]}>
          Drag: move object
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f3f4f6",
  },
  screenDark: {
    backgroundColor: "#0f172a",
  },
  title: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  titleDark: {
    color: "#f8fafc",
  },
  card: {
    width: 170,
    padding: 24,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    alignItems: "center",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  cardDark: {
    backgroundColor: "#1e293b",
  },
  label: {
    fontSize: 12,
    color: "#94a3b8",
    letterSpacing: 1,
  },
  score: {
    marginTop: 8,
    fontSize: 44,
    fontWeight: "800",
    color: "#0ea5e9",
  },
  button: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#0ea5e9",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 6,
    borderColor: "#bae6fd",
  },
  buttonEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 16,
  },
  infoCard: {
    width: "100%",
    marginTop: 40,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#ffffff",
  },
  infoText: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 8,
  },
  textDark: {
    color: "#e2e8f0",
  },
});
