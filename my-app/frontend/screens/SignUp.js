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

import { Platform } from "react-native";
// this function allows for new users to be created

//
export default function SignUpPage() {
  const handleSignUp = async () => {
    const user = {
      firstname: firstName,
      lastname: lastName,
      location: location,
      userage: parseInt(userAge, 10),
      email: email,
      phonenumber: phoneNum,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User data:", data);
        // Handle success (e.g., navigate to login or show a message)
        alert("User created successfully!");
      } else {
        // Handle error
        const errorText = await response.text();
        alert("Error: " + errorText);
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  //
  const nav = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [userAge, setUserAge] = useState("");
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  //
  return (
    <>
      <View style={styles.form}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={{ marginTop: 30 }}>
              <Text>Create an Account to Started</Text>
            </View>
            {/* first name box  */}
            <View style={{ marginTop: 10 }}>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            {/* last name box */}
            <View style={{ marginTop: 10 }}>
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChange={setLastName}
              />
            </View>
            {/* location */}
            <View style={{ marginTop: 10 }}>
              <TextInput
                style={styles.input}
                placeholder=" State"
                value={location}
                onChange={setLocation}
              />
            </View>
            {/* user age  */}
            <View style={{ marginTop: 10 }}>
              <TextInput
                style={styles.input}
                placeholder="Age"
                value={userAge}
                onChange={setUserAge}
              />
            </View>
            {/* username */}
            {/* <View style={{ marginTop: 10 }}>
              <TextInput
                style={styles.input}
                placeholder="UserName"
                value={username}
                onChange={setUsername}
              />
            </View> */}
            {/* email */}
            <View style={{ marginTop: 10 }}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChange={setEmail}
              />
            </View>
            {/* phone number */}
            <View style={{ marginTop: 10 }}>
              <TextInput
                style={styles.input}
                placeholder=" Phone Number"
                value={phoneNum}
                onChange={setPhoneNum}
              />
            </View>
            {/* password */}
            <View style={{ marginTop: 10 }}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChange={setPassword}
                secureTextEntry
              />
            </View>
            {/* 
            <Button
              style={styles.button}
              title="sign up"
              onPress={handleSignUp}
            /> */}
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up </Text>
            </TouchableOpacity>

            {/* form end */}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </>
  );
}
//
// Style Sheet for login page
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#010001ff",
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
    width: 250,
    alignSelf: "center",
    backgroundColor: "#e6e1dbff",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#1f867aff", // Green, or any color you like
    borderRadius: 25, // Makes the button rounded
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginBottom: 15,
    width: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: { fontWeight: "bold", fontSize: 16, textAlign: "center" },
  form: {
    flex: 1,
    backgroundColor: "#e9eef3ff",
  },
  //   scroll: {
  //     // flex: 1,
  //   },
});
