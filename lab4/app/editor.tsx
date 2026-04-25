import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { readTextFile, saveTextFile } from "../src/services/fileService";

export default function EditorScreen() {
  const params = useLocalSearchParams();
  const path = String(params.path);
  const name = String(params.name);

  const [content, setContent] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const text = await readTextFile(path);
    setContent(text);
  }

  async function save() {
    await saveTextFile(path, content);
    Alert.alert("Готово", "Файл збережено");
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>

      <TextInput
        style={styles.editor}
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />

      <Pressable style={styles.button} onPress={save}>
        <Text style={styles.buttonText}>Зберегти зміни</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f6f8",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 14,
  },
  editor: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    marginTop: 14,
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
