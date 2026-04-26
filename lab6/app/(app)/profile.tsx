import { Text, View, TouchableOpacity } from "react-native";
import { auth } from "../../src/config/firebase";
import { signOut } from "firebase/auth";
import { router } from "expo-router";

export default function Profile() {
  const user = auth.currentUser;

  const logout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Ви увійшли як:</Text>
      <Text>{user?.email}</Text>

      <TouchableOpacity onPress={logout} style={{ marginTop: 20 }}>
        <Text>Вийти</Text>
      </TouchableOpacity>
    </View>
  );
}
