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

// Create a new comment
export const createComment = async (commentData) => {
  try {
    const response = await tryMultipleURLs("/create/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

// Get comments for a specific post
export const getCommentsByPost = async (postId) => {
  try {
    const response = await tryMultipleURLs(`/get/comments/${postId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (commentId) => {
  try {
    const response = await tryMultipleURLs(`/delete/comment/${commentId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export default { createComment, getCommentsByPost, deleteComment };
