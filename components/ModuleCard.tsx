import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Module } from "../types/module";

interface Props {
  module: Module;
  onPress: () => void;
}

const ModuleCard: React.FC<Props> = ({ module, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-card py-6 px-6 rounded-2xl mt-3"
  >
    <Text className="text-foreground text-2xl font-semibold">
      {module.name}
    </Text>
    <Text className="text-muted">
      {module.date} {module.time}
    </Text>
  </TouchableOpacity>
);

export default ModuleCard;
