import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { db } from "./firebase"; // Firestore instance
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

export default function MainPage({ navigation }) {
  const [reminders, setReminders] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const plantImages = [
    require("./assets/plant.png"), // First image (open eyes)
    require("./assets/plant_done.png"), // Second image (closed eyes)
  ];

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "plants"), (snapshot) => {
      const fetchedReminders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReminders(fetchedReminders);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % plantImages.length); // Cycle through images
    }, 500); // Change every 500ms
    return () => clearInterval(interval); // Cleanup interval
  }, []);

  const toggleCompletion = async (id, currentStatus) => {
    try {
      const plantRef = doc(db, "plants", id);
      await updateDoc(plantRef, { completed: !currentStatus });
    } catch (error) {
      console.error("Error updating plant status: ", error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[styles.reminderItem, item.completed && styles.reminderItemCompleted]}
    >
      <TouchableOpacity
        style={[styles.circleButton, item.completed && styles.circleButtonCompleted]}
        onPress={() => toggleCompletion(item.id, item.completed)}
      >
        {item.completed && <Text style={styles.checkmark}>✔</Text>}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.reminderDetailsContainer}
        onPress={() => navigation.navigate("Edit", { plant: item })}
      >
        <Text
          style={[styles.reminderName, item.completed && styles.reminderTextCompleted]}
        >
          {item.name}
        </Text>
        <Text
          style={[styles.reminderDetails, item.completed && styles.reminderTextCompleted]}
        >
          📍 {item.room}
        </Text>
        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <Text
              style={[styles.tagText, item.completed && styles.reminderTextCompleted]}
            >
              ☀️ {item.light}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text
              style={[styles.tagText, item.completed && styles.reminderTextCompleted]}
            >
              💧 {item.water}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  if (reminders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Plants 🌱</Text>
        <View style={styles.allDoneContent}>
          <Image
            source={plantImages[imageIndex]}
            style={styles.allDoneImage}
          />
          <Text style={styles.allDoneTitle}>All Done! 🎉</Text>
          <Text style={styles.allDoneDescription}>All Reminders Completed</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddReminder")}
        >
          <Text style={styles.addButtonText}>+ New Reminder</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Plants 🌱</Text>
      <Text style={styles.sectionTitle}>Today</Text>
      <FlatList
        data={reminders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddReminder")}
      >
        <Text style={styles.addButtonText}>+ New Reminder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F3EC",
    padding: 20,
  },
  allDoneContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  allDoneImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  allDoneTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  allDoneDescription: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    paddingTop:50,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 100,
  },
  reminderItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  reminderItemCompleted: {
    opacity: 0.5,
  },
  circleButton: {
    width: 22,
    height: 22,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  circleButtonCompleted: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
  },
  reminderDetailsContainer: {
    flex: 1,
  },
  reminderName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  reminderDetails: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  reminderTextCompleted: {
    color: "#999",
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  tag: {
    backgroundColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
  tagText: {
    fontSize: 12,
    color: "#555",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});