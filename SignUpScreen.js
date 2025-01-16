import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
      navigation.replace("MainPage"); // Redirect to MainPage after account creation
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      {/* Full Name Label and Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor="#888"
        />
      </View>

      {/* Email Label and Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#888"
          keyboardType="email-address"
        />
      </View>

      {/* Password Label and Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#888"
        />
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      
      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text
          onPress={() => navigation.navigate("SignIn")}
          style={styles.link}
        >
          Sign In
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFE8D5", // Pastel green background
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  signUpButton: {
    width: "100%",
    backgroundColor: "#000", // Black button
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
  },
  link: {
    color: "#000", // Black link for consistency
    fontWeight: "bold",
  },
});
