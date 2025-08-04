import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  URL_CONFIGS,
  getBackendURLs,
  saveWorkingURLConfig,
  tryMultipleURLs,
} from "../utils/urlConfig";

export default async function HandleSignUp(userData) {
  console.log("handleSignUp function called"); // Debug log

  const user = {
    firstname: userData.firstName,
    lastname: userData.lastName,
    username: userData.username,
    location: userData.location,
    userage: parseInt(userData.userAge, 10),
    email: userData.email,
    phonenumber: userData.phoneNum,
    password: userData.password,
  };

  console.log(`Platform: ${Platform.OS}`);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  try {
    console.log(`User data:`, JSON.stringify(user, null, 2));

    const response = await tryMultipleURLs("/users", fetchOptions);
    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Signup failed with status ${response.status}: ${errorText}`);
      return { success: false, error: errorText };
    }

    const data = await response.json();

    // Store user data in AsyncStorage for persistence
    try {
      await AsyncStorage.setItem("user", JSON.stringify(data));
      await AsyncStorage.setItem("isAuthenticated", "true");
      console.log("✅ User data stored in AsyncStorage successfully");
    } catch (storageError) {
      console.log("⚠️ AsyncStorage error:", storageError.message);
      // Continue anyway - the signup was successful
    }

    console.log(`Signup successful! Status: ${response.status}`);
    console.log(`Response data:`, data);

    return { success: true, data };
  } catch (error) {
    console.log(`Signup failed with error: ${error.message}`);
    return { success: false, error: error.message };
  }
}
