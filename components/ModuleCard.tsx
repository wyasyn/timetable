import { cn, formatDateShort } from "@/lib/utils";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Badge } from "react-native-paper";
import { Module } from "../types/module";

interface Props {
  module: Module;
  onPress: () => void;
}

const ModuleCard: React.FC<Props> = ({ module, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={cn(
      " py-6 px-6 rounded-2xl",
      module.status === "completed" ? "bg-stone-600" : "bg-secondary"
    )}
  >
    {module.status === "completed" && <Badge>Completed</Badge>}

    <Text className="text-white text-2xl capitalize font-semibold">
      {module.name}
    </Text>
    <View className="flex items-center justify-between gap-6 flex-row">
      <Text className="text-foreground text-lg font-semibold">
        {formatDateShort(new Date(module.date))}
      </Text>
      <Text className=" text-2xl font-bold text-primary">{module.time}</Text>
    </View>
  </TouchableOpacity>
);

export default ModuleCard;
