import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register } = useAuth();

  function handleRegister() {
    register();
    router.replace("/(app)" as any);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Реєстрація</Text>
        <Text style={styles.subtitle}>Створіть новий акаунт</Text>

        <TextInput style={styles.input} placeholder="Імʼя" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput style={styles.input} placeholder="Пароль" secureTextEntry />
        <TextInput
          style={styles.input}
          placeholder="Підтвердження паролю"
          secureTextEntry
        />

        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </Pressable>

        <Link href="/(auth)/login" asChild>
          <Pressable>
            <Text style={styles.link}>Вже є акаунт? Увійти</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f4f6f8" },
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 32, fontWeight: "700", marginBottom: 8, color: "#111827" },
  subtitle: { fontSize: 16, color: "#6b7280", marginBottom: 24 },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  link: {
    textAlign: "center",
    color: "#2563eb",
    fontWeight: "600",
    marginTop: 18,
  },
});
