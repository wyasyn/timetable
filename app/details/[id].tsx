// app/details/[id].tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView } from "react-native";
import {
  ActivityIndicator,
  Button,
  RadioButton,
  Text,
} from "react-native-paper";
import { useModules } from "../../context/ModuleContext";
import { Module } from "../../types/module";

export default function ModuleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { modules, isLoading, removeModule, changeStatus, reload } =
    useModules();

  const [module, setModule] = useState<Module | null>(null);

  // Load or refresh the current module
  const loadModule = () => {
    const m = modules.find((m) => m.id === Number(id)) || null;
    setModule(m);
  };

  useEffect(() => {
    loadModule();
  }, [modules, id]);

  const onDelete = () => {
    Alert.alert("Delete Module", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await removeModule(Number(id));
          router.back();
        },
      },
    ]);
  };

  const onToggleStatus = async () => {
    if (!module) return;
    const newStatus: Module["status"] =
      module.status === "pending" ? "completed" : "pending";
    await changeStatus(module.id, newStatus);
    // reload modules and close or refresh view
    await reload();
  };

  if (isLoading || !module) {
    return <ActivityIndicator style={{ marginTop: 32 }} />;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text variant="headlineSmall" style={{ marginBottom: 12 }}>
        {module.name}
      </Text>
      <Text>Date: {module.date}</Text>
      <Text>Time: {module.time}</Text>
      <Text>Location: {module.location}</Text>
      <Text>Supervisor: {module.supervisor}</Text>
      {module.notes?.length ? (
        <Text style={{ marginTop: 8 }}>Notes: {module.notes}</Text>
      ) : null}

      <RadioButton.Group onValueChange={onToggleStatus} value={module.status}>
        <RadioButton.Item label="Pending" value="pending" />
        <RadioButton.Item label="Completed" value="completed" />
      </RadioButton.Group>

      <Button
        mode="contained"
        onPress={onToggleStatus}
        style={{ marginVertical: 12 }}
      >
        {module.status === "pending" ? "Mark Completed" : "Mark Pending"}
      </Button>

      <Button
        mode="outlined"
        onPress={onDelete}
        textColor="red"
        style={{ marginBottom: 32 }}
      >
        Delete Module
      </Button>
    </ScrollView>
  );
}
