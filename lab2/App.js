import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MainScreen from "./screens/MainScreen";
import DetailsScreen from "./screens/DetailsScreen";
import ContactsScreen from "./screens/ContactsScreen";
import CustomDrawer from "./components/CustomDrawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ title: "Новини" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({ title: route.params?.title || "Деталі" })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen
          name="News"
          component={StackNavigator}
          options={{ title: "Новини" }}
        />
        <Drawer.Screen
          name="Contacts"
          component={ContactsScreen}
          options={{ title: "Контакти" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
