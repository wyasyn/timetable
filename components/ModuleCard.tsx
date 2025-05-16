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
    className="bg-slate-800 text-slate-100 py-6 px-3 rounded-lg mt-3"
  >
    <Text className="text-stone-100 text-lg">{module.name}</Text>
    <Text className="text-stone-400">
      {module.date} {module.time}
    </Text>
  </TouchableOpacity>
);

export default ModuleCard;
