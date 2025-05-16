// app/add.tsx
import BackButton from "@/components/BackButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useModules } from "../context/ModuleContext";
import { ModuleStatus } from "../types/module";

export default function AddModuleScreen() {
  const router = useRouter();
  const { createModule, isLoading } = useModules();

  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [location, setLocation] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [notes, setNotes] = useState("");
  const status: ModuleStatus = "pending";

  const onSave = async () => {
    await createModule({
      name,
      date: date.toISOString().split("T")[0],
      time: time.toTimeString().slice(0, 5),
      location,
      supervisor,
      notes,
      status,
    });
    router.back();
  };

  return (
    <View className="flex-1 py-14 bg-background text-muted-foreground">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, minHeight: "100%" }}
      >
        <BackButton />
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          className="bg-secondary text-lg rounded-lg px-4 py-2 mb-6  placeholder:text-stone-300"
        />
        <View className="flex-row justify-between items-center gap-4 mb-6">
          <Text className="text-white text-lg">
            {date.toLocaleDateString()}
          </Text>
          <Button
            color={"#5409DA"}
            title={"Pick a date"}
            onPress={() => setShowDate(true)}
          />
        </View>

        {showDate && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(_, d) => {
              setShowDate(false);
              d && setDate(d);
            }}
          />
        )}

        <View className="flex-row justify-between items-center gap-4 mb-6">
          <Text className="text-white text-lg">
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Button
            color={"#5409DA"}
            title="Pick Time"
            onPress={() => setShowTime(true)}
          />
        </View>

        {showTime && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(_, t) => {
              setShowTime(false);
              t && setTime(t);
            }}
          />
        )}

        <TextInput
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          className="bg-secondary text-lg rounded-lg px-4 py-2 mb-6  placeholder:text-stone-300"
        />
        <TextInput
          placeholder="Supervisor"
          value={supervisor}
          onChangeText={setSupervisor}
          className="bg-secondary text-lg rounded-lg px-4 py-2 mb-6  placeholder:text-stone-300"
        />
        <TextInput
          placeholder="Notes"
          value={notes}
          onChangeText={setNotes}
          multiline
          className="bg-secondary text-lg rounded-lg px-4 py-2 mb-6  placeholder:text-stone-300"
        />

        {isLoading ? (
          <ActivityIndicator size="large" style={{ marginTop: 16 }} />
        ) : (
          <Button color={"#5409DA"} title="Save" onPress={onSave} />
        )}
      </ScrollView>
    </View>
  );
}
