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
    style={{ padding: 16, borderBottomWidth: 1 }}
  >
    <Text style={{ fontSize: 18 }}>{module.name}</Text>
    <Text>
      {module.date} {module.time}
    </Text>
  </TouchableOpacity>
);

export default ModuleCard;
