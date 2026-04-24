import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function DetailsScreen({ route }) {
  const { news } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: news.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.description}>{news.description}</Text>

        <Text style={styles.fullText}>
          Це детальний опис обраної новини. На цьому екрані демонструється
          передача параметрів між екранами за допомогою React Navigation.
          Заголовок екрана формується динамічно на основі переданих даних.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f4f8",
    padding: 16,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  fullText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
  },
});
