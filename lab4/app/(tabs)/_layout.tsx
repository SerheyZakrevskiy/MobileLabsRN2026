import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Головна",
        }}
      />
      <Tabs.Screen
        name="manager"
        options={{
          title: "Файли",
        }}
      />
    </Tabs>
  );
}
