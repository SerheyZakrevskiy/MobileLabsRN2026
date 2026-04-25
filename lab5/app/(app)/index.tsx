import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Link, router } from "expo-router";
import { products } from "../../data/products";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    router.replace("/(auth)/login" as any);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Каталог товарів</Text>
            <Text style={styles.subtitle}>Лабораторна робота №5</Text>
          </View>

          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Вийти</Text>
          </Pressable>
        </View>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Link href={`/details/${item.id}` as any} asChild>
              <Pressable style={styles.card}>
                <Image source={item.image} style={styles.image} />

                <View style={styles.cardBody}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.price}>{item.price}$</Text>
                  <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
              </Pressable>
            </Link>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 190,
    backgroundColor: "#e5e7eb",
  },
  cardBody: {
    padding: 14,
  },
  productName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
});
