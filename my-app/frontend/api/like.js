import { Platform } from "react-native";
import { tryMultipleURLs } from "../utils/urlConfig";

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

// Toggle like on a post
export const toggleLike = async (postId, userId) => {
  try {
    const response = await tryMultipleURLs(`/toggle/like/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};

// Get likes for a specific post
export const getLikesByPost = async (postId, userId = null) => {
  try {
    let url = `/get/likes/${postId}`;
    if (userId) {
      url += `?user_id=${userId}`;
    }

    const response = await tryMultipleURLs(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching likes:", error);
    throw error;
  }
};

export default { toggleLike, getLikesByPost };
