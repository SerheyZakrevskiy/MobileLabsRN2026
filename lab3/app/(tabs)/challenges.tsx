import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useGame } from "@/context/GameContext";

export default function ChallengesScreen() {
  const { stats, theme } = useGame();

  const isDark = theme === "dark";

  const tasks = [
    {
      title: "Зробити 10 кліків",
      done: stats.taps >= 10,
      progress: `${stats.taps}/10`,
    },
    {
      title: "Зробити подвійний клік 5 разів",
      done: stats.doubleTaps >= 5,
      progress: `${stats.doubleTaps}/5`,
    },
    {
      title: "Утримувати обʼєкт 3 секунди",
      done: stats.longPressDone,
      progress: stats.longPressDone ? "done" : "not done",
    },
    {
      title: "Перетягнути обʼєкт",
      done: stats.dragged,
      progress: stats.dragged ? "done" : "not done",
    },
    {
      title: "Зробити свайп вправо",
      done: stats.flingRight,
      progress: stats.flingRight ? "done" : "not done",
    },
    {
      title: "Зробити свайп вліво",
      done: stats.flingLeft,
      progress: stats.flingLeft ? "done" : "not done",
    },
    {
      title: "Змінити розмір обʼєкта",
      done: stats.pinched,
      progress: stats.pinched ? "done" : "not done",
    },
    {
      title: "Отримати 100 очок",
      done: stats.score >= 100,
      progress: `${stats.score}/100`,
    },
    {
      title: "Власне завдання: набрати 50 очок",
      done: stats.score >= 50,
      progress: `${stats.score}/50`,
    },
  ];

  return (
    <SafeAreaView style={[styles.screen, isDark && styles.screenDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>Tasks</Text>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
      >
        {tasks.map((task, index) => (
          <View
            key={index}
            style={[styles.taskCard, isDark && styles.taskCardDark]}
          >
            <View style={styles.taskHeader}>
              <Text style={[styles.taskTitle, isDark && styles.textDark]}>
                {task.title}
              </Text>
              <Text style={task.done ? styles.done : styles.pending}>
                {task.done ? "Done" : "Pending"}
              </Text>
            </View>

            <Text style={[styles.progress, isDark && styles.progressDark]}>
              Progress: {task.progress}
            </Text>
          </View>
        ))}
      </ScrollView>
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
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 30,
  },
  taskCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    marginBottom: 12,
  },
  taskCardDark: {
    backgroundColor: "#1e293b",
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  textDark: {
    color: "#e2e8f0",
  },
  done: {
    color: "#22c55e",
    fontWeight: "700",
  },
  pending: {
    color: "#f97316",
    fontWeight: "700",
  },
  progress: {
    marginTop: 8,
    color: "#6b7280",
  },
  progressDark: {
    color: "#94a3b8",
  },
});
