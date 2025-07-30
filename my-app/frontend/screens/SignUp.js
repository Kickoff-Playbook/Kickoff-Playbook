import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  useNavigation,
  createStaticNavigation,
} from "@react-navigation/native";

//

import HandleSignUp from "../api/auth";
//
export default function SignUpPage() {
  //
  const nav = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [userAge, setUserAge] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  //
  const onSignUpPress = async () => {
    try {
      console.log(
        "onSignUpPress called, HandleSignUp type:",
        typeof HandleSignUp
      );

      const userData = {
        firstName,
        lastName,
        username,
        location,
        userAge,
        email,
        phoneNum,
        password,
      };

      console.log("Attempting to sign up user...");
      const result = await HandleSignUp(userData);

      if (result && result.success) {
        console.log("Sign up successful!");
        console.log("User data:", result.data);
        alert("User created successfully!");
      } else {
        console.log("Sign up failed:", result?.error || "Unknown error");
        alert("Error: " + (result?.error || "Unknown error"));
      }
    } catch (error) {
      console.log("Error in onSignUpPress:", error.message);
      alert("An unexpected error occurred: " + error.message);
    }
  };
  //
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={60}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Create an Account to Get Started
            </Text>
          </View>
          {/* first name box  */}
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              returnKeyType="next"
            />
          </View>
          {/* last name box */}
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              returnKeyType="next"
            />
          </View>
          {/* username */}
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              returnKeyType="next"
              autoCapitalize="none"
            />
          </View>
          {/* location */}
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="State"
              value={location}
              onChangeText={setLocation}
              returnKeyType="next"
            />
          </View>
          {/* user age  */}
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Age"
              value={userAge}
              onChangeText={setUserAge}
              returnKeyType="next"
              keyboardType="numeric"
            />
          </View>
          {/* email */}
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              returnKeyType="next"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {/* phone number */}
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNum}
              onChangeText={setPhoneNum}
              returnKeyType="next"
              keyboardType="phone-pad"
            />
          </View>
          {/* password */}
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="done"
              autoCapitalize="none"
            />
          </View>
          {/* button  */}
          <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
//
// Style Sheet for login page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9eef3ff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Extra space for keyboard
  },
  form: {
    flex: 1,
    backgroundColor: "#e9eef3ff",
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
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
});
