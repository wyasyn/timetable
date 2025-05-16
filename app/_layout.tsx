import { Stack } from "expo-router";
import React from "react";
import Providers from "./_providers";
import "./global.css";

// Root layout must default-export a React component
export default function Layout() {
  return (
    <Providers>
      <Stack
        initialRouteName="index"
        screenOptions={{ headerTitleAlign: "center", headerShown: false }}
      >
        <Stack.Screen name="index" options={{ title: "Timetable" }} />
        <Stack.Screen name="add" options={{ title: "Add Module" }} />
        <Stack.Screen
          name="details/[id]"
          options={{ title: "Module Details" }}
        />
      </Stack>
    </Providers>
  );
}
