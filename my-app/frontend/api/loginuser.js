import { Platform } from "react-native";

// Get the correct base URL based on platform
const getBaseURL = () => {
  if (__DEV__) {
    if (Platform.OS === "ios") {
      // iOS Simulator - use the actual IP address that works
      return "http://10.0.13.209:8080";
    } else if (Platform.OS === "android") {
      // Android emulator needs 10.0.2.2 to access host machine's localhost
      return "http://10.0.2.2:8080";
    }
  }
  // Production URL would go here - updated IP
  return "http://10.0.13.209:8080";
};

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

  const baseURL = getBaseURL();
  const url = `${baseURL}/users/login`; // Changed from /users to /users/login

  console.log(`Platform: ${Platform.OS}`);
  console.log(`Base URL: ${baseURL}`);
  console.log(`Full URL: ${url}`);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  // Add timeout to prevent hanging requests
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error("Request timeout - please check your connection")),
      10000
    )
  );

  try {
    console.log(`Trying URL: ${url}`);
    console.log(`User data:`, JSON.stringify(user, null, 2));

    const response = await Promise.race([
      fetch(url, fetchOptions),
      timeoutPromise,
    ]);

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
    console.log(`Login success with URL: ${url}, Status: ${response.status}`);
    console.log(`Response data:`, data);

    return { success: true, data };
  } catch (error) {
    console.log(`Login failed with URL: ${url}, Error: ${error.message}`);

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
