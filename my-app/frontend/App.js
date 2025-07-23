import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

// imported app pages
import NavigationBar from "./Navigation/AppNavBar";

//
export default function App() {
  return <NavigationBar />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
