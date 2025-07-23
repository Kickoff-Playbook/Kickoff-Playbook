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
} from "react-native";
import {
  useNavigation,
  createStaticNavigation,
} from "@react-navigation/native";

//
import LogInPage from "./LogIn";
import { Platform } from "react-native";
//
export default function SignUpPage() {
  const nav = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [location, setLocation] = useState("");
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
              <Text>Create an Account to et Started</Text>
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
              <TextInput style={styles.input} placeholder="Last Name" />
            </View>
            {/* user age  */}
            <View style={{ marginTop: 10 }}>
              <TextInput style={styles.input} placeholder="Age" />
            </View>
            {/* username */}
            <View style={{ marginTop: 10 }}>
              <TextInput style={styles.input} placeholder="UserName" />
            </View>
            {/* password */}
            <View style={{ marginTop: 10 }}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
              />
            </View>
            {/* email */}
            <View style={{ marginTop: 10 }}>
              <TextInput style={styles.input} placeholder="Email" />
            </View>
            {/* phone number */}
            <View style={{ marginTop: 10 }}>
              <TextInput style={styles.input} placeholder=" Phone Number" />
            </View>
            {/* location */}
            <View style={{ marginTop: 10 }}>
              <TextInput style={styles.input} placeholder=" State" />
            </View>

            <Button style={styles.button} title="sign up" />

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
    // alignItems: "center",
    // alignSelf: "center",
    borderWidth: 0,
    borderColor: "#ced6dfff",
    // borderRadius: 30,
    padding: 12,
    // marginBottom: 15,
    // width: 250,
    alignSelf: "center",
    backgroundColor: "#d6e1e1ff",
  },
  form: {
    flex: 1,
    backgroundColor: "#5686d2ff",
  },
  //   scroll: {
  //     // flex: 1,
  //   },
});
