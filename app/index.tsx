// app/index.tsx
import EmptyState from "@/components/EmptyState";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
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
    <View className="flex-1 bg-background text-muted-foreground pt-20 px-3">
      <Text className="text-4xl mb-8 text-stone-200 font-semibold">
        Timetable
      </Text>
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
            contentContainerStyle={{ paddingBottom: 80, gap: 10 }}
          />
          <FAB
            className="absolute right-4 bottom-4 bg-primary"
            icon="plus"
            color="white"
            onPress={() => router.push("/add")}
          />
        </>
      )}
    </View>
  );
}
