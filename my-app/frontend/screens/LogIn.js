import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import {
  useNavigation,
  createStaticNavigation,
} from "@react-navigation/native";
//
import SignUpPage from "./SignUp";
//
export default function LogInPage() {
  //
  return (
    <>
      <View>
        <View>
          <Text> Back at it? Lets make this a good one </Text>
        </View>
        {/* username  or email  */}
        <View>
          <TextInput placeholder="Username or Email" />
        </View>
        {/*  password */}
        <View>
          <TextInput placeholder="Password" />
        </View>

        {/* form end  */}
      </View>
    </>
  );
}
