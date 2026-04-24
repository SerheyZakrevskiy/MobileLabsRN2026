import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";

const generateNews = (start, count) => {
  return Array.from({ length: count }, (_, index) => {
    const id = start + index;

    return {
      id: id.toString(),
      title: `Новина ${id}`,
      description: `Короткий опис новини номер ${id}. Це тестовий елемент для демонстрації FlatList.`,
      image: `https://picsum.photos/300/200?random=${id}`,
    };
  });
};

export default function MainScreen({ navigation }) {
  const [news, setNews] = useState(generateNews(1, 15));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setNews(generateNews(1, 15));
      setRefreshing(false);
    }, 1000);
  };

  const loadMore = () => {
    if (loadingMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      setNews((prev) => [...prev, ...generateNews(prev.length + 1, 10)]);
      setLoadingMore(false);
    }, 1000);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Details", { news: item, title: item.title })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={news}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Список новин</Text>
          <Text style={styles.headerText}>
            FlatList з Pull-to-Refresh та Infinite Scroll
          </Text>
        </View>
      }
      ListFooterComponent={
        loadingMore ? (
          <View style={styles.footer}>
            <ActivityIndicator size="small" />
            <Text style={styles.footerText}>Завантаження...</Text>
          </View>
        ) : (
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Прокрутіть вниз для завантаження нових даних
            </Text>
          </View>
        )
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      initialNumToRender={8}
      maxToRenderPerBatch={6}
      windowSize={5}
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
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
  },
  headerText: {
    fontSize: 14,
    color: "#666",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 160,
  },
  cardContent: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  separator: {
    height: 14,
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    marginTop: 6,
    color: "#777",
  },
});
