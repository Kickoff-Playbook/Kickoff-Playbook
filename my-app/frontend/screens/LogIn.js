import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  useNavigation,
  createStaticNavigation,
} from "@react-navigation/native";
import HandleLogIn from "../api/loginuser";
import { useAuth } from "../contexts/AuthContext";

export default function LogInPage() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //
  const onHandleLogInPress = async () => {
    // Add input validation
    if (!usernameOrEmail.trim()) {
      Alert.alert("Error", "Please enter your username or email");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Error", "Please enter your password");
      return;
    }

    setIsLoading(true);

    try {
      console.log(
        "onHandleLogInPress called, HandleLogIn type:",
        typeof HandleLogIn
      );

      // Determine if input is email or username
      const isEmail = usernameOrEmail.includes("@");
      const userData = {
        username: isEmail ? "" : usernameOrEmail.trim(),
        email: isEmail ? usernameOrEmail.trim() : "",
        password: password.trim(),
      };

      console.log("Attempting to login user...");
      const result = await HandleLogIn(userData);

      if (result && result.success) {
        console.log("Login successful!");
        console.log("User data:", result.data);

        // Use AuthContext to set authentication state
        const authResult = await login(result.data);

        if (authResult.success) {
          Alert.alert("Success", "Welcome back to Kickoff Playbook!");
          // Navigation will be handled automatically by App.js based on auth state
        } else {
          Alert.alert("Error", "Failed to save login data");
        }
      } else {
        console.log("Login failed:", result?.error || "Unknown error");
        Alert.alert("Login Failed", result?.error || "Invalid credentials");
      }
    } catch (error) {
      console.log("Error in onLoginPress:", error.message);
      Alert.alert("Error", "An unexpected error occurred: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  //
  return (
    <>
      <View style={styles.form}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Back at it? Lets make this a good one{" "}
          </Text>
        </View>
        {/* username  or email  */}
        <View style={{ marginTop: 10 }}>
          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChangeText={setUsernameOrEmail}
          />
        </View>
        {/*  password */}
        <View style={{ marginTop: 10 }}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        {/* Button */}
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={onHandleLogInPress}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

        {/* form end  */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  form: { flex: 1, backgroundColor: "#e9eef3ff", paddingHorizontal: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#010001ff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    width: 250,
    alignSelf: "center",
    backgroundColor: "#e6e1dbff",
    fontSize: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  header: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#1f867aff", // Green, or any color you like
    borderRadius: 25, // Makes the button rounded
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 20,
    marginBottom: 30,
    width: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
