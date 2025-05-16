// app/index.tsx
import EmptyState from "@/components/EmptyState";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, FAB } from "react-native-paper";
import ModuleCard from "../components/ModuleCard";
import { useModules } from "../context/ModuleContext";
import { Module } from "../types/module";

export default function HomeScreen() {
  const router = useRouter();
  const { modules, isLoading, reload } = useModules();

  // Initial load
  useEffect(() => {
    reload();
  }, []);

  return (
    <View className="bg-stone-900 text-slate-200 flex-1 pt-16 px-4">
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 16 }} size="large" />
      ) : modules.length === 0 ? (
        <EmptyState
          message="You don’t have any modules yet."
          actionLabel="Add your first module"
          onAction={() => router.push("/add")}
        />
      ) : (
        <>
          <FlatList
            data={modules}
            keyExtractor={(item: Module) => item.id.toString()}
            renderItem={({ item }) => (
              <ModuleCard
                module={item}
                onPress={() => router.push(`/details/${item.id}`)}
              />
            )}
            onRefresh={reload}
            refreshing={isLoading}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
          <FAB
            style={{
              position: "absolute",
              right: 16,
              bottom: 16,
            }}
            icon="plus"
            onPress={() => router.push("/add")}
          />
        </>
      )}
    </View>
  );
}
