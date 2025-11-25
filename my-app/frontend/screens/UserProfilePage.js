import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { HandleUpdateProfile } from "../api/auth";
import { getUserBookmarks } from "../api/bookmark";

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth();

  // Debug: Log user data to see actual structure
  console.log("User data in ProfilePage:", user);

  // State for modals
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);
  const [bookmarksModalVisible, setBookmarksModalVisible] = useState(false);

  // State for bookmarks
  const [bookmarks, setBookmarks] = useState([]);
  const [loadingBookmarks, setLoadingBookmarks] = useState(false);

  // State for form inputs
  const [editUsername, setEditUsername] = useState(user?.username || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [editFirstName, setEditFirstName] = useState(
    user?.firstname || user?.firstName || ""
  );
  const [editLastName, setEditLastName] = useState(
    user?.lastname || user?.lastName || ""
  );
  const [editAge, setEditAge] = useState(user?.userage || user?.userAge || "");
  const [editPhoneNumber, setEditPhoneNumber] = useState(
    user?.phonenumber || user?.phoneNum || ""
  );
  const [editState, setEditState] = useState(user?.location || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  const handleEditProfile = () => {
    setEditUsername(user?.username || "");
    setEditEmail(user?.email || "");
    setEditFirstName(user?.firstname || user?.firstName || "");
    setEditLastName(user?.lastname || user?.lastName || "");
    setEditAge(user?.userage || user?.userAge || "");
    setEditPhoneNumber(user?.phonenumber || user?.phoneNum || "");
    setEditState(user?.location || "");
    setEditProfileModalVisible(true);
  };

  const handleSaveProfile = async () => {
    try {
      // Check if user has an ID for backend update
      if (!user?.id) {
        Alert.alert(
          "Error",
          "User ID not found. Please log out and log back in."
        );
        return;
      }

      // Basic validation
      if (!editUsername.trim() || !editEmail.trim()) {
        Alert.alert("Error", "Username and email are required.");
        return;
      }

      // Email validation
      if (!editEmail.includes("@") || !editEmail.includes(".")) {
        Alert.alert("Error", "Please enter a valid email address.");
        return;
      }

      // Age validation if provided
      if (
        editAge &&
        (isNaN(editAge) || parseInt(editAge) < 18 || parseInt(editAge) > 120)
      ) {
        Alert.alert("Error", "Please enter a valid age (18-120).");
        return;
      }

      // Prepare updated user data (using both formats for compatibility)
      const updatedData = {
        username: editUsername.trim(),
        email: editEmail.trim(),
        firstName: editFirstName.trim(),
        lastname: editLastName.trim(),
        firstname: editFirstName.trim(),
        lastName: editLastName.trim(),
        userAge: editAge.trim(),
        userage: editAge.trim(),
        phoneNum: editPhoneNumber.trim(),
        phonenumber: editPhoneNumber.trim(),
        location: editState.trim(),
      };

      // First, update the backend database
      const backendResult = await HandleUpdateProfile(user.id, updatedData);

      if (!backendResult.success) {
        Alert.alert(
          "Error",
          "Failed to update profile on server: " + backendResult.error
        );
        return;
      }

      // If backend update successful, update local context and storage
      const result = await updateUser(updatedData);

      if (result.success) {
        Alert.alert(
          "Profile Updated",
          "Your profile has been updated successfully!",
          [
            {
              text: "OK",
              onPress: () => {
                setEditProfileModalVisible(false);
              },
            },
          ]
        );
      } else {
        Alert.alert(
          "Error",
          "Failed to save profile locally. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  const handleChangePassword = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setChangePasswordModalVisible(true);
  };

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long!");
      return;
    }

    // Here you would typically make an API call to change the password
    Alert.alert(
      "Password Changed",
      "Your password has been changed successfully!",
      [
        {
          text: "OK",
          onPress: () => {
            setChangePasswordModalVisible(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
          },
        },
      ]
    );
  };

  const handleViewBookmarks = async () => {
    if (!user?.id) {
      Alert.alert("Error", "User not found. Please log in again.");
      return;
    }

    setLoadingBookmarks(true);
    setBookmarksModalVisible(true);

    try {
      const userBookmarks = await getUserBookmarks(user.id);
      setBookmarks(userBookmarks || []);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      Alert.alert("Error", "Failed to load bookmarks. Please try again.");
      setBookmarks([]);
    } finally {
      setLoadingBookmarks(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Unknown time";
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Header with user info */}
        {/* <View style={styles.header}>
        <Text style={styles.pageTitle}>User Profile</Text>
      </View> */}

        {/* User Info Section */}
        <View style={styles.userInfoSection}>
          <View style={styles.userCard}>
            <Text style={styles.welcomeText}>
              Welcome, {user?.username || "User"}!
            </Text>
            <Text style={styles.userEmail}>
              Email: {user?.email || "No email provided"}
            </Text>
            <Text style={styles.userInfo}>
              Name: {user?.firstname || user?.firstName || "N/A"}{" "}
              {user?.lastname || user?.lastName || ""}
            </Text>
            <Text style={styles.userInfo}>
              Age: {user?.userage || user?.userAge || "N/A"}
            </Text>
            <Text style={styles.userInfo}>
              Phone: {user?.phonenumber || user?.phoneNum || "N/A"}
            </Text>
            <Text style={styles.userInfo}>
              Location: {user?.location || "N/A"}
            </Text>
            <Text style={styles.userID}>User ID: {user?.id || "Unknown"}</Text>
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsSection}>
          <Text style={styles.sectionTitle}>Profile Options</Text>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleChangePassword}
          >
            <Text style={styles.optionText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleViewBookmarks}
          >
            <Text style={styles.optionText}>My Bookmarks</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Notification Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Privacy Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Section */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editProfileModalVisible}
        onRequestClose={() => setEditProfileModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalScrollContainer}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Edit Profile</Text>

              <TextInput
                style={styles.input}
                placeholder="Username"
                value={editUsername}
                onChangeText={setEditUsername}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={editEmail}
                onChangeText={setEditEmail}
                keyboardType="email-address"
              />

              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={editFirstName}
                onChangeText={setEditFirstName}
              />

              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={editLastName}
                onChangeText={setEditLastName}
              />

              <TextInput
                style={styles.input}
                placeholder="Age"
                value={editAge}
                onChangeText={setEditAge}
                keyboardType="number-pad"
              />

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={editPhoneNumber}
                onChangeText={setEditPhoneNumber}
                keyboardType="phone-pad"
              />

              <TextInput
                style={styles.input}
                placeholder="Location"
                value={editState}
                onChangeText={setEditState}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setEditProfileModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSaveProfile}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={changePasswordModalVisible}
        onRequestClose={() => setChangePasswordModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
            />

            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setChangePasswordModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSavePassword}
              >
                <Text style={styles.saveButtonText}>Change Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bookmarks Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={bookmarksModalVisible}
        onRequestClose={() => setBookmarksModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>My Bookmarks</Text>

            {loadingBookmarks ? (
              <Text style={styles.loadingText}>Loading bookmarks...</Text>
            ) : bookmarks.length === 0 ? (
              <Text style={styles.emptyText}>No bookmarks found</Text>
            ) : (
              <FlatList
                data={bookmarks}
                renderItem={({ item }) => (
                  <View style={styles.bookmarkItem}>
                    <Text style={styles.bookmarkContent} numberOfLines={3}>
                      {item.content}
                    </Text>
                    <Text style={styles.bookmarkDate}>
                      {formatTimestamp(item.created_at)}
                    </Text>
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                style={styles.bookmarksList}
              />
            )}

            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setBookmarksModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  //   header: {
  //     padding: 20,
  //     backgroundColor: "#fff",
  //     borderBottomWidth: 1,
  //     borderBottomColor: "#eee",
  //   },
  //   pageTitle: {
  //     fontSize: 24,
  //     fontWeight: "bold",
  //     color: "#333",
  //     textAlign: "center",
  //   },
  userInfoSection: {
    padding: 20,
  },
  userCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  userInfo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 6,
  },
  userID: {
    fontSize: 14,
    color: "#999",
  },
  optionsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  logoutSection: {
    padding: 20,
    paddingBottom: 40,
  },
  logoutButton: {
    backgroundColor: "#ff6b6b",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalScrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bookmarksList: {
    maxHeight: 300,
    marginBottom: 20,
  },
  bookmarkItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#007AFF",
  },
  bookmarkContent: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  bookmarkDate: {
    fontSize: 12,
    color: "#666",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginVertical: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginVertical: 20,
  },
});
