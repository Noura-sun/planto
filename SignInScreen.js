import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      navigation.replace("MainPage"); // Redirect to MainPage after login
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      
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

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
      
      <Text style={styles.footerText}>
        Don't have an account?{" "}
        <Text onPress={() => navigation.navigate("SignUp")} style={styles.link}>
          Sign Up
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
  signInButton: {
    width: "100%",
    backgroundColor: "#000", // Black button
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  signInButtonText: {
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
