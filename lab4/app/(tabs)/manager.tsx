import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { router } from "expo-router";
import {
  ROOT_DIR,
  createFolder,
  createTextFile,
  deleteItem,
  getItemInfo,
  initFileSystem,
  readDirectory,
} from "../../src/services/fileService";

type Item = {
  name: string;
  path: string;
  isDirectory: boolean;
};

export default function FileManagerScreen() {
  const [currentPath, setCurrentPath] = useState(ROOT_DIR);
  const [items, setItems] = useState<Item[]>([]);
  const [modalType, setModalType] = useState<"folder" | "file" | null>(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  useFocusEffect(
    useCallback(() => {
      load();
    }, [currentPath]),
  );

  async function load() {
    await initFileSystem();

    const names = await readDirectory(currentPath);
    const result: Item[] = [];

    for (const itemName of names) {
      const itemPath = currentPath + itemName;
      const info = await getItemInfo(itemPath);
      result.push({
        name: itemName,
        path: itemPath,
        isDirectory: Boolean(info.isDirectory),
      });
    }

    result.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });

    setItems(result);
  }

  function openItem(item: Item) {
    if (item.isDirectory) {
      setCurrentPath(item.path + "/");
      return;
    }

    if (item.name.endsWith(".txt")) {
      router.push({
        pathname: "/editor",
        params: {
          path: item.path,
          name: item.name,
        },
      });
      return;
    }

    Alert.alert("Файл", "Перегляд доступний тільки для .txt файлів");
  }

  function goUp() {
    if (currentPath === ROOT_DIR) return;

    const withoutSlash = currentPath.slice(0, -1);
    const parent = withoutSlash.substring(0, withoutSlash.lastIndexOf("/") + 1);

    if (parent.startsWith(ROOT_DIR)) {
      setCurrentPath(parent);
    } else {
      setCurrentPath(ROOT_DIR);
    }
  }

  async function handleCreate() {
    if (!name.trim()) {
      Alert.alert("Помилка", "Введіть назву");
      return;
    }

    if (modalType === "folder") {
      await createFolder(currentPath, name.trim());
    }

    if (modalType === "file") {
      await createTextFile(currentPath, name.trim(), content);
    }

    setName("");
    setContent("");
    setModalType(null);
    await load();
  }

  function confirmDelete(item: Item) {
    Alert.alert("Підтвердження", `Видалити "${item.name}"?`, [
      { text: "Скасувати", style: "cancel" },
      {
        text: "Видалити",
        style: "destructive",
        onPress: async () => {
          await deleteItem(item.path);
          await load();
        },
      },
    ]);
  }

  function openInfo(item: Item) {
    router.push({
      pathname: "/info",
      params: {
        path: item.path,
        name: item.name,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Файловий менеджер</Text>
      <Text style={styles.path}>
        {currentPath.replace(ROOT_DIR, "Root / ")}
      </Text>

      <View style={styles.actions}>
        <Pressable style={styles.smallButton} onPress={goUp}>
          <Text style={styles.buttonText}>Вгору</Text>
        </Pressable>

        <Pressable
          style={styles.smallButton}
          onPress={() => setModalType("folder")}
        >
          <Text style={styles.buttonText}>Папка</Text>
        </Pressable>

        <Pressable
          style={styles.smallButton}
          onPress={() => setModalType("file")}
        >
          <Text style={styles.buttonText}>Файл</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.path}
        ListEmptyComponent={<Text style={styles.empty}>Папка порожня</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable style={styles.itemMain} onPress={() => openItem(item)}>
              <Text style={styles.itemName}>
                {item.isDirectory ? "📁 " : "📄 "}
                {item.name}
              </Text>
            </Pressable>

            <Pressable style={styles.infoButton} onPress={() => openInfo(item)}>
              <Text style={styles.infoText}>Info</Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={() => confirmDelete(item)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />

      <Modal visible={modalType !== null} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              {modalType === "folder" ? "Нова папка" : "Новий текстовий файл"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Назва"
              value={name}
              onChangeText={setName}
            />

            {modalType === "file" && (
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Початковий вміст"
                value={content}
                onChangeText={setContent}
                multiline
              />
            )}

            <Pressable style={styles.button} onPress={handleCreate}>
              <Text style={styles.buttonText}>Створити</Text>
            </Pressable>

            <Pressable
              style={styles.cancelButton}
              onPress={() => setModalType(null)}
            >
              <Text style={styles.cancelText}>Скасувати</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  path: {
    fontSize: 13,
    color: "#555",
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },
  smallButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
  item: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  itemMain: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
  },
  infoButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  infoText: {
    color: "#2563eb",
    fontWeight: "700",
  },
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  deleteText: {
    color: "#dc2626",
    fontWeight: "700",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  cancelButton: {
    padding: 12,
    marginTop: 8,
  },
  cancelText: {
    textAlign: "center",
    color: "#555",
    fontWeight: "700",
  },
});
