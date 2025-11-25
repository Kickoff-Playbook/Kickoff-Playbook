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

// Toggle bookmark (add/remove bookmark)
export const toggleBookmark = async (postId, userId) => {
  try {
    console.log(`🔖 Toggling bookmark for post ${postId}, user ${userId}`);

    const response = await tryMultipleURLs(`/toggle/bookmark/${postId}`, {
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

    const data = await response.json();
    console.log(`✅ Bookmark toggled:`, data);
    return data; // Returns { bookmarked: true/false, message: "..." }
  } catch (error) {
    console.error("❌ Error toggling bookmark:", error);
    throw error;
  }
};

// Get bookmarks for a specific post
export const getBookmarksByPost = async (postId, userId = null) => {
  try {
    console.log(`📚 Fetching bookmarks for post ${postId}, user ${userId}`);

    let url = `/get/bookmarks/${postId}`;
    if (userId) {
      url += `?user_id=${userId}`;
    }

    const response = await tryMultipleURLs(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ Bookmarks fetched:`, data);
    return data; // Returns { bookmark_count: number, user_bookmarked: boolean }
  } catch (error) {
    console.error("❌ Error fetching bookmarks:", error);
    throw error;
  }
};

// Get all bookmarked posts for a user
export const getUserBookmarks = async (userId) => {
  try {
    console.log(`📚 Fetching user bookmarks for user ${userId}`);

    const response = await tryMultipleURLs(`/get/user/bookmarks/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ User bookmarks fetched:`, data);
    return data; // Returns array of bookmarked posts
  } catch (error) {
    console.error("❌ Error fetching user bookmarks:", error);
    throw error;
  }
};

export default { toggleBookmark, getBookmarksByPost, getUserBookmarks };
