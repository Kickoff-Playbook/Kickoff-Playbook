import { Platform } from "react-native";

// Get the correct base URL based on platform
const getBaseURL = () => {
  if (__DEV__) {
    if (Platform.OS === "ios") {
      // iOS Simulator - use the actual IP address that works
      return "http://192.168.1.73:8080";
    } else if (Platform.OS === "android") {
      // Android emulator needs 10.0.2.2 to access host machine's localhost
      return "http://10.0.2.2:8080";
    }
  }
  // Production URL would go here - updated IP
  return "http://192.168.1.73:8080";
};
