import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker"; // Import DropDownPicker
import { db } from "./firebase"; // Firestore instance
import { collection, addDoc } from "firebase/firestore";

export default function AddReminderScreen({ navigation }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("Bedroom");
  const [light, setLight] = useState("Full Sun");
  const [water, setWater] = useState("20-50 ml");
  const [wateringDays, setWateringDays] = useState("Every day");

  const [roomOpen, setRoomOpen] = useState(false);
  const [lightOpen, setLightOpen] = useState(false);
  const [wateringDaysOpen, setWateringDaysOpen] = useState(false);
  const [waterOpen, setWaterOpen] = useState(false);

  const handleSave = async () => {
    try {
      await addDoc(collection(db, "plants"), {
        name,
        room,
        light,
        water,
        wateringDays,
        completed: false,
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error adding plant: ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Set Reminder</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Plant Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Plant Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#999"
      />

      {/* Room Dropdown */}
      <Text style={styles.label}>Room</Text>
      <DropDownPicker
        open={roomOpen}
        value={room}
        items={[
          { label: "Bedroom", value: "Bedroom" },
          { label: "Living Room", value: "Living Room" },
          { label: "Kitchen", value: "Kitchen" },
          { label: "Balcony", value: "Balcony" },
          { label: "Bathroom", value: "Bathroom" },
        ]}
        setOpen={setRoomOpen}
        setValue={setRoom}
        style={styles.dropdown}
        placeholder="Select Room"
        zIndex={3000}
        zIndexInverse={1000}
      />

      {/* Light Dropdown */}
      <Text style={styles.label}>Light</Text>
      <DropDownPicker
        open={lightOpen}
        value={light}
        items={[
          { label: "Full Sun", value: "Full Sun" },
          { label: "Partial Sun", value: "Partial Sun" },
          { label: "Low Light", value: "Low Light" },
        ]}
        setOpen={setLightOpen}
        setValue={setLight}
        style={styles.dropdown}
        placeholder="Select Light"
        zIndex={2000}
        zIndexInverse={2000}
      />

      {/* Watering Days Dropdown */}
      <Text style={styles.label}>Watering Days</Text>
      <DropDownPicker
        open={wateringDaysOpen}
        value={wateringDays}
        items={[
          { label: "Every day", value: "Every day" },
          { label: "Every 2 days", value: "Every 2 days" },
          { label: "Every 3 days", value: "Every 3 days" },
          { label: "Once a week", value: "Once a week" },
        ]}
        setOpen={setWateringDaysOpen}
        setValue={setWateringDays}
        style={styles.dropdown}
        placeholder="Select Days"
        zIndex={1000}
        zIndexInverse={3000}
      />

      {/* Water Dropdown */}
      <Text style={styles.label}>Water</Text>
      <DropDownPicker
        open={waterOpen}
        value={water}
        items={[
          { label: "20-50 ml", value: "20-50 ml" },
          { label: "50-100 ml", value: "50-100 ml" },
          { label: "100-200 ml", value: "100-200 ml" },
          { label: "200-300 ml", value: "200-300 ml" },
        ]}
        setOpen={setWaterOpen}
        setValue={setWater}
        style={styles.dropdown}
        placeholder="Select Water"
        zIndex={500}
        zIndexInverse={500}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F3EC",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cancelButton: {
    fontSize: 16,
    color: "#999",
  },
  saveButton: {
    fontSize: 16,
    color: "#4CAF50",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  dropdown: {
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
});
