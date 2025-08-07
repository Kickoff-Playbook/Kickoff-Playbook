import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  ActivityIndicator,
  RefreshControl,
  Platform,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from "../contexts/AuthContext";
import {
  URL_CONFIGS,
  getBackendURLs,
  saveWorkingURLConfig,
  switchURLConfig,
  tryMultipleURLs,
  getCurrentURLConfig,
} from "../utils/urlConfig";
import {
  createComment,
  getCommentsByPost,
  deleteComment,
} from "../api/comment";
import { toggleLike, getLikesByPost } from "../api/like";
import { toggleBookmark, getBookmarksByPost } from "../api/bookmark";
import { uploadImage, convertImageToBase64 } from "../api/upload";
import { deletePost } from "../api/posts";

// Individual Post Item Component
function PostItem({ post, onCommentPress, onLikePress, onBookmarkPress, onDeletePress, currentUser }) {
  // Debug log for image URL
  if (post.image_url) {
    console.log("PostItem rendering with image_url:", post.image_url);
  }

  // Check if current user is the post creator
  const isPostCreator = currentUser && (currentUser.id === post.user_id || currentUser.id === post.UserID);

  // Format timestamp to readable format
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Unknown time";

    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.postContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.usernameOne}>
          {post.username || post.user_name || `User ${post.user_id}`}
        </Text>
        <View style={styles.headerRight}>
          <Text style={styles.timestamp}>{formatTimestamp(post.created_at)}</Text>
          {isPostCreator && (
            <TouchableOpacity
              style={styles.deletePostButton}
              onPress={() => onDeletePress(post)}
            >
              <Ionicons name="trash-outline" size={16} color="#ff4444" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content */}
      <Text style={styles.contentText}>{post.content}</Text>

      {/* Post Image */}
      {post.image_url && (
        <Image
          source={{ uri: post.image_url }}
          style={styles.postImage}
          resizeMode="cover"
          onError={(error) => {
            console.error("Image failed to load:", post.image_url, error.nativeEvent.error);
          }}
          onLoad={() => {
            console.log("Image loaded successfully:", post.image_url);
          }}
        />
      )}
      {post.image_url && (
        <Text style={styles.debugText}>Debug: Image URL exists: {post.image_url}</Text>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.action}
          onPress={() => onLikePress(post)}
        >
          <Ionicons
            name={post.isLiked ? "heart" : "heart-outline"}
            size={20}
            color={post.isLiked ? "#ff4444" : "#007bff"}
          />
          <Text style={[styles.actionText, post.isLiked && styles.likedText]}>
            {post.likeCount || 0} {post.likeCount === 1 ? "Like" : "Likes"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.action}
          onPress={() => onBookmarkPress(post)}
        >
          <Ionicons
            name={post.isBookmarked ? "bookmark" : "bookmark-outline"}
            size={20}
            color={post.isBookmarked ? "#ffa500" : "#007bff"}
          />
          <Text
            style={[
              styles.actionText,
              post.isBookmarked && styles.bookmarkedText,
            ]}
          >
            Bookmark
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.action}
          onPress={() => onCommentPress(post)}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#007bff" />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Individual Comment Item Component
function CommentItem({ comment, onDeleteComment }) {
  // Format timestamp to readable format
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Unknown time";

    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.commentItem}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentUsername}>
          {comment.username || comment.user_name || `User ${comment.user_id}`}
        </Text>
        <View style={styles.commentHeaderRight}>
          <Text style={styles.commentTimestamp}>
            {formatTimestamp(comment.created_at)}
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDeleteComment(comment.id)}
          >
            <Ionicons name="trash-outline" size={16} color="#ff4444" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.commentContent}>{comment.content}</Text>
      {comment.image_url && (
        <Image
          source={{ uri: comment.image_url }}
          style={styles.commentImage}
        />
      )}
    </View>
  );
}

//
export default function PostPage() {
  const { user } = useAuth(); // Get current user from context
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [currentURLConfig, setCurrentURLConfig] = useState("auto");
  const [showURLSwitcher, setShowURLSwitcher] = useState(false);

  // Comment modal states - simplified to single modal
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  // Load current URL configuration on component mount
  useEffect(() => {
    loadCurrentURLConfig();
  }, []);

  const loadCurrentURLConfig = async () => {
    try {
      const savedConfig = await AsyncStorage.getItem("currentURLConfig");
      if (savedConfig) {
        setCurrentURLConfig(savedConfig);
      }
    } catch (error) {
      console.log("Error loading URL config:", error);
    }
  };

  // Function to switch URL configuration
  const handleURLSwitch = async (configKey) => {
    const success = await switchURLConfig(configKey);
    if (success) {
      setCurrentURLConfig(configKey);
      setShowURLSwitcher(false);
      // Refresh posts with new URL configuration
      setLoading(true);
      fetchPosts();
      Alert.alert(
        "URL Configuration Changed",
        `Switched to: ${URL_CONFIGS[configKey]?.name}`,
        [{ text: "OK" }]
      );
    }
  };

  // Fetch posts from your backend
  const fetchPosts = async () => {
    try {
      const response = await tryMultipleURLs("/get/posts");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched posts:", data); // Debug log

      // Check if posts have image_url
      data.forEach((post, index) => {
        if (post.image_url) {
          console.log(`Post ${index} has image_url:`, post.image_url);
        }
      });

      // Fetch like and bookmark information for each post
      const postsWithLikesAndBookmarks = await Promise.all(
        (data || []).map(async (post) => {
          try {
            const [likes, bookmarks] = await Promise.all([
              getLikesByPost(post.id, user?.id || 1),
              getBookmarksByPost(post.id, user?.id || 1),
            ]);
            return {
              ...post,
              likeCount: likes.like_count || 0,
              isLiked: likes.user_liked || false,
              bookmarkCount: bookmarks.bookmark_count || 0,
              isBookmarked: bookmarks.user_bookmarked || false,
            };
          } catch (err) {
            console.error(
              `Error fetching likes/bookmarks for post ${post.id}:`,
              err
            );
            return {
              ...post,
              likeCount: 0,
              isLiked: false,
              bookmarkCount: 0,
              isBookmarked: false,
            };
          }
        })
      );

      setPosts(postsWithLikesAndBookmarks); // Ensure it's always an array with like and bookmark data
      setError(null);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  // Handle creating a new post
  const handleCreatePost = async () => {
    if (!newPostContent.trim() && !newPostImage) {
      alert("Please enter some content or select an image for your post");
      return;
    }

    try {
      setUploadingImage(true);
      
      let imageUrl = "";
      
      // Upload image if one is selected
      if (newPostImage) {
        try {
          console.log("Converting image to base64...");
          const base64Image = await convertImageToBase64(newPostImage);
          
          console.log("Uploading image...");
          imageUrl = await uploadImage(base64Image, `post_${Date.now()}.jpg`);
          console.log("Image uploaded successfully:", imageUrl);
        } catch (imageError) {
          console.error("Failed to upload image:", imageError);
          Alert.alert("Upload Error", "Failed to upload image. Post will be created without the image.");
          imageUrl = ""; // Continue without image
        }
      }

      const postData = {
        user_id: user?.id || 1, // Use authenticated user ID
        username: user?.username || "Anonymous", // Include username
        content: newPostContent.trim(),
        image_url: imageUrl, // Use uploaded image URL
      };

      console.log("Creating post with data:", postData);

      const response = await tryMultipleURLs("/create/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Post creation response:", result);

      // Reset form and close modal
      setNewPostContent("");
      setNewPostImage(null);
      setShowCreateModal(false);

      // Refresh posts to show the new one
      fetchPosts();

      console.log("Post created successfully");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle opening comment modal
  const handleCommentPress = async (post) => {
    setSelectedPost(post);
    setCommentContent("");
    setSelectedImage(null);
    setLoadingComments(true);
    setShowCommentModal(true);

    try {
      const postComments = await getCommentsByPost(post.id);
      setComments(postComments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Don't show error alert, just show empty comments
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  // Handle image selection for create post
  const handlePostImageSelect = () => {
    Alert.alert("Select Image", "Choose an option", [
      { text: "Cancel", style: "cancel" },
      { text: "Camera", onPress: () => openPostImagePicker("camera") },
      { text: "Photo Library", onPress: () => openPostImagePicker("library") },
    ]);
  };

  // Open image picker for create post
  const openPostImagePicker = async (source) => {
    try {
      // Request permissions
      if (source === "camera") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Camera permission is required to take photos');
          return;
        }
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Photo library permission is required to select photos');
          return;
        }
      }

      // Configure picker options
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      };

      let result;
      if (source === "camera") {
        result = await ImagePicker.launchCameraAsync(options);
      } else {
        result = await ImagePicker.launchImageLibraryAsync(options);
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setNewPostImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  // Remove selected image for create post
  const removePostSelectedImage = () => {
    setNewPostImage(null);
  };

  // Handle image selection
  const handleImageSelect = () => {
    Alert.alert("Select Image", "Choose an option", [
      { text: "Cancel", style: "cancel" },
      { text: "Camera", onPress: () => openImagePicker("camera") },
      { text: "Photo Library", onPress: () => openImagePicker("library") },
    ]);
  };

  // Open image picker for comments
  const openImagePicker = async (source) => {
    try {
      // Request permissions
      if (source === "camera") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Camera permission is required to take photos');
          return;
        }
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Photo library permission is required to select photos');
          return;
        }
      }

      // Configure picker options
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      };

      let result;
      if (source === "camera") {
        result = await ImagePicker.launchCameraAsync(options);
      } else {
        result = await ImagePicker.launchImageLibraryAsync(options);
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  // Remove selected image
  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  // Handle submitting comment
  const handleSubmitComment = async () => {
    if (!commentContent.trim() && !selectedImage) {
      Alert.alert("Error", "Please enter a comment or select an image");
      return;
    }

    try {
      let imageUrl = "";
      
      // Upload image if one is selected
      if (selectedImage) {
        try {
          console.log("Converting comment image to base64...");
          const base64Image = await convertImageToBase64(selectedImage);
          
          console.log("Uploading comment image...");
          imageUrl = await uploadImage(base64Image, `comment_${Date.now()}.jpg`);
          console.log("Comment image uploaded successfully:", imageUrl);
        } catch (imageError) {
          console.error("Failed to upload comment image:", imageError);
          Alert.alert("Upload Error", "Failed to upload image. Comment will be created without the image.");
          imageUrl = ""; // Continue without image
        }
      }

      const commentData = {
        post_id: selectedPost.id,
        user_id: user?.id || 1,
        username: user?.username || "Anonymous",
        content: commentContent.trim(),
        image_url: imageUrl,
      };

      console.log("Submitting comment:", commentData);

      const newComment = await createComment(commentData);
      console.log("Comment created:", newComment);

      // Reset form
      setCommentContent("");
      setSelectedImage(null);

      // Refresh comments to show the new one
      const updatedComments = await getCommentsByPost(selectedPost.id);
      setComments(updatedComments || []);

      Alert.alert("Success", "Comment posted successfully!");
    } catch (err) {
      console.error("Error posting comment:", err);
      Alert.alert("Error", "Failed to post comment. Please try again.");
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    Alert.alert(
      "Delete Comment",
      "Are you sure you want to delete this comment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteComment(commentId);

              // Refresh comments to remove the deleted one
              const updatedComments = await getCommentsByPost(selectedPost.id);
              setComments(updatedComments || []);

              Alert.alert("Success", "Comment deleted successfully!");
            } catch (err) {
              console.error("Error deleting comment:", err);
              Alert.alert(
                "Error",
                "Failed to delete comment. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  // Handle liking/unliking a post
  const handleLikePress = async (post) => {
    try {
      const result = await toggleLike(post.id, user?.id || 1);

      // Update the posts state to reflect the like status
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id
            ? {
                ...p,
                isLiked: result.liked,
                likeCount: result.liked
                  ? (p.likeCount || 0) + 1
                  : Math.max((p.likeCount || 0) - 1, 0),
              }
            : p
        )
      );
    } catch (err) {
      console.error("Error toggling like:", err);
      Alert.alert("Error", "Failed to update like. Please try again.");
    }
  };

  // Handle bookmarking/unbookmarking a post
  const handleBookmarkPress = async (post) => {
    try {
      const result = await toggleBookmark(post.id, user?.id || 1);

      // Update the posts state to reflect the bookmark status
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id
            ? {
                ...p,
                isBookmarked: result.bookmarked,
              }
            : p
        )
      );
    } catch (err) {
      console.error("Error toggling bookmark:", err);
      Alert.alert("Error", "Failed to update bookmark. Please try again.");
    }
  };

  // Handle deleting a post
  const handleDeletePress = async (post) => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePost(post.id, user?.id || 1);

              // Remove the deleted post from the posts state
              setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));

              Alert.alert("Success", "Post deleted successfully!");
            } catch (err) {
              console.error("Error deleting post:", err);
              Alert.alert(
                "Error",
                err.message || "Failed to delete post. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  // Fetch posts when component mounts

  // Fetch posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1f867aff" />
        <Text style={styles.loadingText}>Loading posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchPosts}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItem
            post={item}
            onCommentPress={handleCommentPress}
            onLikePress={handleLikePress}
            onBookmarkPress={handleBookmarkPress}
            onDeletePress={handleDeletePress}
            currentUser={user}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No posts available</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReachedThreshold={0.1}
        // onEndReached={() => {
        //   // Future: Load more posts for pagination
        //   console.log('Load more posts');
        // }}
      />
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowCreateModal(true)}
        onLongPress={() => setShowURLSwitcher(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* URL Switcher Modal */}
      <Modal
        visible={showURLSwitcher}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowURLSwitcher(false)}
      >
        <View style={styles.urlModalContainer}>
          <View style={styles.urlModalHeader}>
            <TouchableOpacity onPress={() => setShowURLSwitcher(false)}>
              <Text style={styles.modalCancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Switch Backend URL</Text>
            <View style={{ width: 60 }} />
          </View>

          <View style={styles.urlModalContent}>
            <Text style={styles.urlModalDescription}>
              Current: {URL_CONFIGS[currentURLConfig]?.name}
            </Text>

            {Object.entries(URL_CONFIGS).map(([key, config]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.urlOption,
                  currentURLConfig === key && styles.urlOptionActive,
                ]}
                onPress={() => handleURLSwitch(key)}
              >
                <Text
                  style={[
                    styles.urlOptionText,
                    currentURLConfig === key && styles.urlOptionTextActive,
                  ]}
                >
                  {config.name}
                </Text>
                <Text style={styles.urlOptionURL}>{config.urls[0]}</Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.urlModalTip}>
              💡 Tip: Long press the + button to access this switcher
            </Text>
          </View>
        </View>
      </Modal>

      {/* Create Post Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => {
                setShowCreateModal(false);
                setNewPostContent("");
                setNewPostImage(null);
              }}
            >
              <Text style={styles.modalCancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Create Post</Text>
            <TouchableOpacity 
              onPress={handleCreatePost}
              disabled={uploadingImage || (!newPostContent.trim() && !newPostImage)}
            >
              <Text
                style={[
                  styles.modalPostButton,
                  (uploadingImage || (!newPostContent.trim() && !newPostImage)) &&
                    styles.disabledButtonText,
                ]}
              >
                {uploadingImage ? "Uploading..." : "Post"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            {uploadingImage && (
              <View style={styles.uploadingContainer}>
                <ActivityIndicator size="small" color="#007AFF" />
                <Text style={styles.uploadingText}>Uploading image...</Text>
              </View>
            )}
            
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.postInput}
                placeholder="What's on your mind about sports betting?"
                value={newPostContent}
                onChangeText={setNewPostContent}
                multiline
                maxLength={500}
                autoFocus
                editable={!uploadingImage}
              />
            </View>
            <Text style={styles.characterCount}>
              {newPostContent.length}/500
            </Text>

            {/* Image Upload Section */}
            <View style={styles.imageSection}>
              <TouchableOpacity
                style={styles.imageSelectButton}
                onPress={handlePostImageSelect}
              >
                <Ionicons name="image-outline" size={20} color="#007AFF" />
                <Text style={styles.imageSelectText}>Add Photo</Text>
              </TouchableOpacity>

              {/* Selected Image Preview */}
              {newPostImage && (
                <View style={styles.selectedImageContainer}>
                  <Image
                    source={{ uri: newPostImage }}
                    style={styles.selectedImage}
                  />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={removePostSelectedImage}
                  >
                    <Ionicons name="close-circle" size={20} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* Comment Modal - Combined View and Create */}
      <Modal
        visible={showCommentModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowCommentModal(false)}
      >
        <View style={styles.commentModalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCommentModal(false)}>
              <Text style={styles.modalCancelButton}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Comments</Text>
            <TouchableOpacity
              onPress={handleSubmitComment}
              disabled={!commentContent.trim() && !selectedImage}
            >
              <Text
                style={[
                  styles.modalPostButton,
                  !commentContent.trim() &&
                    !selectedImage &&
                    styles.disabledButtonText,
                ]}
              >
                Post
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.commentModalContent}>
            {/* Original Post Preview */}
            {selectedPost && (
              <View style={styles.originalPostPreview}>
                <Text style={styles.originalPostUsername}>
                  {selectedPost.username ||
                    selectedPost.user_name ||
                    `User ${selectedPost.user_id}`}
                </Text>
                <Text style={styles.originalPostContent} numberOfLines={3}>
                  {selectedPost.content}
                </Text>
              </View>
            )}

            {/* Existing Comments Section */}
            <View style={styles.commentsSection}>
              <Text style={styles.commentsSectionTitle}>
                Comments ({comments.length})
              </Text>

              {loadingComments ? (
                <View style={styles.loadingCommentsContainer}>
                  <ActivityIndicator size="small" color="#007AFF" />
                  <Text style={styles.loadingCommentsText}>
                    Loading comments...
                  </Text>
                </View>
              ) : comments.length > 0 ? (
                <FlatList
                  data={comments}
                  renderItem={({ item }) => (
                    <CommentItem
                      comment={item}
                      onDeleteComment={handleDeleteComment}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  style={styles.commentsList}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => (
                    <View style={styles.commentSeparator} />
                  )}
                />
              ) : (
                <View style={styles.emptyCommentsContainer}>
                  <Text style={styles.emptyCommentsText}>No comments yet</Text>
                  <Text style={styles.emptyCommentsSubtext}>
                    Be the first to comment!
                  </Text>
                </View>
              )}
            </View>

            {/* Create Comment Section */}
            <View style={styles.createCommentSection}>
              <Text style={styles.createCommentTitle}>Add a comment</Text>

              <TextInput
                style={styles.commentInput}
                placeholder="Write your comment..."
                value={commentContent}
                onChangeText={setCommentContent}
                multiline
                maxLength={300}
              />

              <Text style={styles.commentCharacterCount}>
                {commentContent.length}/300
              </Text>

              {/* Image Selection */}
              <View style={styles.imageSection}>
                <TouchableOpacity
                  style={styles.imageSelectButton}
                  onPress={handleImageSelect}
                >
                  <Ionicons name="image-outline" size={20} color="#007AFF" />
                  <Text style={styles.imageSelectText}>Add Photo</Text>
                </TouchableOpacity>

                {/* Selected Image Preview */}
                {selectedImage && (
                  <View style={styles.selectedImageContainer}>
                    <Image
                      source={{ uri: selectedImage }}
                      style={styles.selectedImage}
                    />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={removeSelectedImage}
                    >
                      <Ionicons name="close-circle" size={20} color="#ff4444" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  pageHeader: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  flatListContent: {
    paddingVertical: 8,
  },
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  separator: {
    height: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  usernameOne: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
  deletePostButton: {
    padding: 4,
    borderRadius: 4,
  },
  contentText: {
    fontSize: 15,
    color: "#444",
    marginBottom: 10,
    lineHeight: 22,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  debugText: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
    fontStyle: "italic",
  },
  actions: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-around",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionText: {
    fontSize: 14,
    color: "#007bff",
    marginLeft: 6,
  },
  likedText: {
    color: "#ff4444",
    fontWeight: "600",
  },
  bookmarkedText: {
    color: "#ffa500",
    fontWeight: "600",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#1f867aff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Floating Action Button styles
  fab: {
    position: "absolute",
    bottom: 5,
    right: 0, // Changed from left to right
    width: 64, // Made bigger (was typically 56)
    height: 64, // Made bigger (was typically 56)
    backgroundColor: "#007AFF",
    borderRadius: 32, // Half of width/height for perfect circle
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabIcon: {
    color: "#fff",
    fontSize: 28, // Made bigger (was typically 20-24)
    fontWeight: "bold",
    lineHeight: 28,
  },
  // Create Post Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  modalCancelButton: {
    fontSize: 16,
    color: "#007AFF",
  },
  modalPostButton: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
  disabledButtonText: {
    opacity: 0.5,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  textInputContainer: {
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    backgroundColor: "#fafafa",
    padding: 4,
    marginBottom: 10,
  },
  postInput: {
    fontSize: 16,
    color: "#333",
    padding: 16,
    minHeight: 120,
    textAlignVertical: "top",
    backgroundColor: "transparent",
  },
  characterCount: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
    marginTop: 5,
  },
  uploadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f8ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  uploadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  // URL Switcher Modal Styles
  urlModalContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  urlModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  urlModalContent: {
    padding: 20,
  },
  urlModalDescription: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  urlOption: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  urlOptionActive: {
    borderColor: "#007AFF",
    backgroundColor: "#f0f8ff",
  },
  urlOptionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  urlOptionTextActive: {
    color: "#007AFF",
  },
  urlOptionURL: {
    fontSize: 14,
    color: "#666",
    fontFamily: "monospace",
  },
  urlModalTip: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },

  // Comment Modal Styles - Updated for combined view
  commentModalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  commentModalContent: {
    flex: 1,
    padding: 15,
  },
  originalPostPreview: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: "#007AFF",
  },
  originalPostUsername: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  originalPostContent: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },

  // Comments Section Styles
  commentsSection: {
    flex: 1,
    marginBottom: 15,
  },
  commentsSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  commentsList: {
    maxHeight: 200,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 5,
  },
  loadingCommentsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingCommentsText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666",
  },
  emptyCommentsContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  emptyCommentsText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  emptyCommentsSubtext: {
    fontSize: 12,
    color: "#999",
  },

  // Create Comment Section Styles
  createCommentSection: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 15,
  },
  createCommentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 8,
  },
  commentCharacterCount: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
    marginBottom: 15,
  },
  imageSection: {
    marginBottom: 15,
  },
  imageSelectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
  },
  imageSelectText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  selectedImageContainer: {
    position: "relative",
    marginTop: 10,
    alignSelf: "center",
  },
  selectedImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  // Comment Item Styles
  commentItem: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 2,
    borderRadius: 8,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  commentUsername: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  commentTimestamp: {
    fontSize: 11,
    color: "#999",
  },
  commentHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  deleteButton: {
    padding: 4,
    borderRadius: 4,
  },
  commentContent: {
    fontSize: 14,
    color: "#444",
    lineHeight: 18,
  },
  commentImage: {
    width: 120,
    height: 120,
    borderRadius: 6,
    marginTop: 8,
  },
  commentSeparator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 2,
  },
});
