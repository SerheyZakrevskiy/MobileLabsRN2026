import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getItemInfo } from "../src/services/fileService";
import { formatBytes, formatDate, getFileExtension } from "../src/utils/format";

export default function InfoScreen() {
  const params = useLocalSearchParams();
  const path = String(params.path);
  const name = String(params.name);

  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    getItemInfo(path).then(setInfo);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Детальна інформація</Text>

      <View style={styles.card}>
        <Text style={styles.row}>Назва: {name}</Text>
        <Text style={styles.row}>
          Тип: {info?.isDirectory ? "Папка" : getFileExtension(name)}
        </Text>
        <Text style={styles.row}>Розмір: {formatBytes(info?.size || 0)}</Text>
        <Text style={styles.row}>
          Дата модифікації: {formatDate(info?.modificationTime)}
        </Text>
        <Text style={styles.path}>Шлях: {path}</Text>
      </View>
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
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    elevation: 3,
  },
  row: {
    fontSize: 16,
    marginBottom: 12,
  },
  path: {
    fontSize: 13,
    color: "#555",
    marginTop: 10,
  },
});
