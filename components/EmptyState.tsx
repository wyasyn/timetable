// src/components/EmptyState.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";

interface EmptyStateProps {
  message?: string;
  onAction?: () => void;
  actionLabel?: string;
}

export default function EmptyState({
  message = "No modules found.",
  onAction,
  actionLabel = "Add Module",
}: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <IconButton
        icon="timetable"
        size={64}
        iconColor={colors.onSurfaceDisabled}
        style={styles.icon}
      />
      <Text style={[styles.message, { color: colors.onSurfaceDisabled }]}>
        {message}
      </Text>
      {onAction && (
        <Button mode="contained" onPress={onAction} style={styles.button}>
          {actionLabel}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  icon: {
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    marginTop: 8,
  },
});
