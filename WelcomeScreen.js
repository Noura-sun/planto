import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function WelcomeScreen({ navigation }) {
  const [imageIndex, setImageIndex] = useState(0);

  const plantImages = [
    require("./assets/plant.png"), // First image (fully open eyes)
    require("./assets/plant_closed.png"), // Third image (closed eyes)
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % plantImages.length); // Cycle through images
    }, 500); // Change every 500ms
    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Plants 🌱</Text>
        <View style={styles.underline} />
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Image source={plantImages[imageIndex]} style={styles.image} />
        <Text style={styles.subtitle}>Start your plant journey!</Text>
        <Text style={styles.description}>
         ( Now all your plants will be in one place and we will help you take care of them :)
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.buttonText}>Set Plant Reminder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFE8D5",
  },
  titleContainer: {
    paddingTop: 80,
    paddingHorizontal: 20,
    marginBottom: -90,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  underline: {
    height: 1,
    backgroundColor: "#333",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});