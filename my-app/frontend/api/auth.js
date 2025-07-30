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

// Fallback URLs to try if primary fails
const getFallbackURLs = () => {
  const urls = [];
  if (Platform.OS === "ios") {
    urls.push("http://10.0.13.209:8080");
    urls.push("http://localhost:8080");
    urls.push("http://127.0.0.1:8080");
  } else if (Platform.OS === "android") {
    urls.push("http://10.0.2.2:8080");
    urls.push("http://10.0.13.209:8080");
  }
  return urls;
};

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

  const baseURL = getBaseURL();
  const url = `${baseURL}/users`;

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

  try {
    console.log(`Trying URL: ${url}`);
    console.log(`User data:`, JSON.stringify(user, null, 2));

    const response = await fetch(url, fetchOptions);
    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Signup failed with status ${response.status}: ${errorText}`);
      return { success: false, error: errorText };
    }

    const data = await response.json();
    console.log(`Success with URL: ${url}, Status: ${response.status}`);
    console.log(`Response data:`, data);

    return { success: true, data };
  } catch (error) {
    console.log(`Failed with URL: ${url}, Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}
