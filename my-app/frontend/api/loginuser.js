import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  URL_CONFIGS,
  getBackendURLs,
  saveWorkingURLConfig,
  tryMultipleURLs,
} from "../utils/urlConfig";

export default async function HandleLogIn(userData) {
  console.log("HandleLogIn function called"); // Debug log

  // Validate input data
  if (
    !userData ||
    (!userData.username && !userData.email) ||
    !userData.password
  ) {
    return {
      success: false,
      error: "Username/email and password are required",
    };
  }

  const user = {
    username: userData.username || "",
    email: userData.email || "",
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

    const response = await tryMultipleURLs("/users/login", fetchOptions);

    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Login failed with status ${response.status}: ${errorText}`);

      // Handle specific error cases
      if (response.status === 401) {
        return { success: false, error: "Invalid username/email or password" };
      } else if (response.status >= 500) {
        return {
          success: false,
          error: "Server error - please try again later",
        };
      }

      return { success: false, error: errorText || "Login failed" };
    }

    const data = await response.json();

    // Store user data in AsyncStorage for persistence
    try {
      await AsyncStorage.setItem("user", JSON.stringify(data));
      await AsyncStorage.setItem("isAuthenticated", "true");
      console.log("✅ Login: User data stored in AsyncStorage successfully");
    } catch (storageError) {
      console.log("⚠️ Login AsyncStorage error:", storageError.message);
      // Continue anyway - the login was successful
    }

    console.log(`Login success! Status: ${response.status}`);
    console.log(`Response data:`, data);

    return { success: true, data };
  } catch (error) {
    console.log(`Login failed with all URLs, Error: ${error.message}`);

    // Handle specific error types
    if (error.message.includes("timeout")) {
      return {
        success: false,
        error: "Connection timeout - please check your internet connection",
      };
    } else if (error.message.includes("Network request failed")) {
      return {
        success: false,
        error: "Network error - please check your connection and try again",
      };
    }

    return { success: false, error: error.message };
  }
}
