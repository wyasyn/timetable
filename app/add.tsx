// app/add.tsx
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
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
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          className="bg-secondary text-white"
        />

        <Button mode="outlined" onPress={() => setShowDate(true)}>
          Pick Date
        </Button>
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
        <TextInput
          label="Selected Date"
          value={date.toLocaleDateString()}
          editable={false}
          style={{ marginVertical: 12 }}
        />

        <Button mode="outlined" onPress={() => setShowTime(true)}>
          Pick Time
        </Button>
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
          label="Selected Time"
          value={time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          editable={false}
          style={{ marginVertical: 12 }}
        />

        <TextInput
          label="Location"
          value={location}
          onChangeText={setLocation}
          style={{ marginBottom: 12 }}
        />
        <TextInput
          label="Supervisor"
          value={supervisor}
          onChangeText={setSupervisor}
          style={{ marginBottom: 12 }}
        />
        <TextInput
          label="Notes"
          value={notes}
          onChangeText={setNotes}
          multiline
          style={{ marginBottom: 16 }}
        />

        {isLoading ? (
          <ActivityIndicator size="large" style={{ marginTop: 16 }} />
        ) : (
          <Button mode="contained" onPress={onSave}>
            Save
          </Button>
        )}
      </ScrollView>
    </View>
  );
}
