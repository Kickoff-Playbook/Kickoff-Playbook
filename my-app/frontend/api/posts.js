import { Platform } from "react-native";
import { tryMultipleURLs } from "../utils/urlConfig";

// Get the correct base URL based on platform
const getBaseURL = () => {
  if (__DEV__) {
    if (Platform.OS === "ios") {
      // iOS Simulator - use the actual IP address that works
      return "http://192.168.1.74:8080";
    } else if (Platform.OS === "android") {
      // Android emulator needs 10.0.2.2 to access host machine's localhost
      return "http://10.0.2.2:8080";
    }
  }
  // Production URL would go here - updated IP
  return "http://192.168.1.74:8080";
};

// Delete a post
export const deletePost = async (postId, userId) => {
  try {
    const response = await tryMultipleURLs(
      `/delete/post/${postId}?user_id=${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    // DELETE typically returns no content (204), so we don't try to parse JSON
    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
