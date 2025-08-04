import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for stored authentication on app start
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      const authStatus = await AsyncStorage.getItem("isAuthenticated");

      console.log("Checking auth state...", { storedUser, authStatus });

      if (storedUser && authStatus === "true") {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
        console.log("User is authenticated:", userData);
      } else {
        console.log("No authenticated user found");
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      console.log("AuthContext: Logging in user", userData);

      // Store user data and auth status
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      await AsyncStorage.setItem("isAuthenticated", "true");

      setUser(userData);
      setIsAuthenticated(true);

      console.log("AuthContext: User logged in successfully");
      return { success: true };
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, error: "Failed to save login data" };
    }
  };

  const logout = async () => {
    try {
      console.log("AuthContext: Logging out user");

      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("isAuthenticated");

      setUser(null);
      setIsAuthenticated(false);

      console.log("AuthContext: User logged out successfully");
      return { success: true };
    } catch (error) {
      console.error("Error during logout:", error);
      return { success: false, error: "Failed to logout" };
    }
  };

  const signup = async (userData) => {
    try {
      console.log("AuthContext: Signing up user", userData);

      // Store user data after successful signup
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      await AsyncStorage.setItem("isAuthenticated", "true");

      setUser(userData);
      setIsAuthenticated(true);

      console.log("AuthContext: User signed up successfully");
      return { success: true };
    } catch (error) {
      console.error("Error during signup:", error);
      return { success: false, error: "Failed to save signup data" };
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
