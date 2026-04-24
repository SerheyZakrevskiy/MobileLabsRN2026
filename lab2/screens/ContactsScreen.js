import React from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";

const DATA = [
  {
    title: "A",
    data: ["Андрій", "Анна", "Артем"],
  },
  {
    title: "B",
    data: ["Богдан", "Борис"],
  },
  {
    title: "C",
    data: ["Віктор", "Валерія"],
  },
];

export default function ContactsScreen() {
  return (
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f2f4f8",
  },
  header: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  headerText: {
    fontWeight: "700",
    fontSize: 16,
  },
  item: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
  },
  separator: {
    height: 8,
  },
});
