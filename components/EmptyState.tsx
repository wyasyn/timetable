// src/components/EmptyState.tsx
import React from "react";
import { View } from "react-native";
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
    <View className="flex-1 items-center justify-center text-white">
      <IconButton icon="timetable" size={64} iconColor={colors.surface} />
      <Text className="text-lg my-8" style={{ color: colors.surface }}>
        {message}
      </Text>
      {onAction && (
        <Button mode="contained" onPress={onAction}>
          {actionLabel}
        </Button>
      )}
    </View>
  );
}
