import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logoBox}>
        <Text style={styles.logoText}>ЖП</Text>
      </View>
      <Text style={styles.appTitle}>FirstMobileApp</Text>
    </View>
  );
}

function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Прізвище Ім'я по-батькові, група</Text>
    </View>
  );
}

function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.screenTitle}>Новини</Text>

      {Array.from({ length: 8 }).map((_, index) => (
        <View style={styles.newsItem} key={index}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageIcon}>▧</Text>
          </View>

          <View style={styles.newsText}>
            <Text style={styles.newsTitle}>Заголовок новини</Text>
            <Text style={styles.newsDate}>Дата новини</Text>
            <Text style={styles.newsDescription}>Короткий текст новини</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function GalleryScreen() {
  return (
    <ScrollView contentContainerStyle={styles.gallery}>
      {Array.from({ length: 10 }).map((_, index) => (
        <View style={styles.galleryCard} key={index} />
      ))}
    </ScrollView>
  );
}

function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.formContent}>
      <Text style={styles.screenTitle}>Реєстрація</Text>

      <Text style={styles.label}>Електронна пошта</Text>
      <TextInput style={styles.input} keyboardType="email-address" />

      <Text style={styles.label}>Пароль</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Пароль (ще раз)</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Прізвище</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Ім'я</Text>
      <TextInput style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Зареєструватися</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function TabButton({ title, icon, active, onPress }) {
  return (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <Text
        style={[
          styles.tabIcon,
          active ? styles.activeText : styles.inactiveText,
        ]}
      >
        {icon}
      </Text>
      <Text
        style={[
          styles.tabText,
          active ? styles.activeText : styles.inactiveText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");

  return (
    <SafeAreaView style={styles.safe}>
      <Header />

      <View style={styles.tabs}>
        <TabButton
          title="Головна"
          icon="⌂"
          active={screen === "home"}
          onPress={() => setScreen("home")}
        />
        <TabButton
          title="Фотогалерея"
          icon="▧"
          active={screen === "gallery"}
          onPress={() => setScreen("gallery")}
        />
        <TabButton
          title="Профіль"
          icon="●"
          active={screen === "profile"}
          onPress={() => setScreen("profile")}
        />
      </View>

      <View style={styles.body}>
        {screen === "home" && <HomeScreen />}
        {screen === "gallery" && <GalleryScreen />}
        {screen === "profile" && <ProfileScreen />}
      </View>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 70,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logoBox: {
    width: 76,
    height: 38,
    borderRadius: 5,
    backgroundColor: "#eaf3ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 34,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0a84ff",
  },
  appTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },
  tabs: {
    height: 58,
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    fontSize: 23,
    lineHeight: 25,
  },
  tabText: {
    fontSize: 12,
    marginTop: 2,
  },
  activeText: {
    color: "#0a84ff",
  },
  inactiveText: {
    color: "#888",
  },
  body: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 26,
    paddingBottom: 20,
  },
  screenTitle: {
    marginTop: 18,
    marginBottom: 22,
    textAlign: "center",
    fontSize: 27,
    fontWeight: "500",
    color: "#222",
  },
  newsItem: {
    flexDirection: "row",
    marginBottom: 21,
    alignItems: "center",
  },
  imagePlaceholder: {
    width: 76,
    height: 76,
    backgroundColor: "#f4f4f4",
    borderWidth: 1,
    borderColor: "#e4e4e4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },
  imageIcon: {
    fontSize: 34,
    color: "#aaa",
  },
  newsText: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  newsDate: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
  newsDescription: {
    fontSize: 14,
    color: "#444",
    marginTop: 2,
  },
  gallery: {
    padding: 14,
    paddingBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  galleryCard: {
    width: "48%",
    height: 145,
    backgroundColor: "#fff",
    borderRadius: 4,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  formContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
    marginTop: 18,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 3,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 30,
    height: 50,
    borderRadius: 4,
    backgroundColor: "#0a84ff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  footer: {
    height: 32,
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#555",
  },
});
