// URL Configuration Manager
// Quick switch between different network locations

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const URL_CONFIGS = {
  home: {
    name: "Home Network (192.168.1.71)",
    urls:
      Platform.OS === "ios"
        ? [
            "http://192.168.1.71:8080",
            "http://localhost:8080",
            "http://192.168.1.73:8080",
          ]
        : [
            "http://192.168.1.71:8080",
            "http://10.0.2.2:8080",
            "http://localhost:8080",
          ],
  },
  school: {
    name: "School Network (192.168.1.73)",
    urls:
      Platform.OS === "ios"
        ? [
            "http://192.168.1.73:8080",
            "http://192.168.1.71:8080",
            "http://localhost:8080",
          ]
        : [
            "http://192.168.1.73:8080",
            "http://192.168.1.71:8080",
            "http://10.0.2.2:8080",
          ],
  },
  localhost: {
    name: "Local Development",
    urls:
      Platform.OS === "ios"
        ? [
            "http://localhost:8080",
            "http://192.168.1.71:8080",
            "http://192.168.1.73:8080",
          ]
        : [
            "http://10.0.2.2:8080",
            "http://localhost:8080",
            "http://192.168.1.71:8080",
          ],
  },
  auto: {
    name: "Auto-Detect Best URL",
    urls:
      Platform.OS === "ios"
        ? [
            "http://192.168.1.71:8080",
            "http://192.168.1.73:8080",
            "http://localhost:8080",
          ]
        : [
            "http://192.168.1.71:8080",
            "http://192.168.1.73:8080",
            "http://10.0.2.2:8080",
            "http://localhost:8080",
          ],
  },
};

// Get saved or default URL configuration
export const getBackendURLs = async () => {
  try {
    const savedConfig = await AsyncStorage.getItem("currentURLConfig");
    const configKey = savedConfig || "auto";
    return URL_CONFIGS[configKey]?.urls || URL_CONFIGS.auto.urls;
  } catch (error) {
    console.log("Error reading URL config:", error);
    return URL_CONFIGS.auto.urls;
  }
};

// Save working URL configuration
export const saveWorkingURLConfig = async (workingURL, configKey) => {
  try {
    await AsyncStorage.setItem("currentURLConfig", configKey);
    await AsyncStorage.setItem("lastWorkingURL", workingURL);
    console.log(`✅ Saved working URL config: ${URL_CONFIGS[configKey]?.name}`);
  } catch (error) {
    console.log("Error saving URL config:", error);
  }
};

// Switch URL configuration manually
export const switchURLConfig = async (configKey) => {
  try {
    await AsyncStorage.setItem("currentURLConfig", configKey);
    console.log(`🔄 Switched to: ${URL_CONFIGS[configKey]?.name}`);
    return true;
  } catch (error) {
    console.log("Error switching URL config:", error);
    return false;
  }
};

// Try multiple URLs until one works with intelligent URL management
export const tryMultipleURLs = async (endpoint, options = {}) => {
  const urls = await getBackendURLs();
  let lastError = null;

  for (let i = 0; i < urls.length; i++) {
    const url = `${urls[i]}${endpoint}`;
    try {
      console.log(`🔍 Trying URL ${i + 1}/${urls.length}: ${url}`);

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 3000)
      );

      const response = await Promise.race([
        fetch(url, options),
        timeoutPromise,
      ]);

      if (response.ok) {
        console.log(`✅ URL ${url} responded successfully!`);

        // Save the working URL configuration
        const baseURL = urls[i];
        const configKey = Object.keys(URL_CONFIGS).find((key) =>
          URL_CONFIGS[key].urls.includes(baseURL)
        );
        if (configKey) {
          await saveWorkingURLConfig(baseURL, configKey);
        }

        return response;
      } else {
        console.log(`❌ URL ${url} responded with status: ${response.status}`);
        lastError = new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ URL ${url} failed: ${error.message}`);
      lastError = error;
    }
  }

  // All URLs failed
  console.log(`🚫 All URLs failed. Last error:`, lastError?.message);
  throw lastError || new Error("All backend URLs failed");
};

// Get current saved configuration info
export const getCurrentURLConfig = async () => {
  try {
    const savedConfig = await AsyncStorage.getItem("currentURLConfig");
    const lastWorkingURL = await AsyncStorage.getItem("lastWorkingURL");

    return {
      configKey: savedConfig || "auto",
      configName:
        URL_CONFIGS[savedConfig || "auto"]?.name || "Auto-Detect Best URL",
      lastWorkingURL: lastWorkingURL || "None",
    };
  } catch (error) {
    console.log("Error getting current URL config:", error);
    return {
      configKey: "auto",
      configName: "Auto-Detect Best URL",
      lastWorkingURL: "None",
    };
  }
};

// Quick switch functions for console use
export const quickSwitch = {
  // Switch to home network (192.168.1.71)
  home: async () => {
    await AsyncStorage.setItem("currentURLConfig", "home");
    console.log("🏠 Switched to Home Network (192.168.1.71)");
    return "home";
  },

  // Switch to school network (192.168.1.73)
  school: async () => {
    await AsyncStorage.setItem("currentURLConfig", "school");
    console.log("🏢 Switched to School Network (192.168.1.73)");
    return "school";
  },

  // Switch to localhost
  localhost: async () => {
    await AsyncStorage.setItem("currentURLConfig", "localhost");
    console.log("💻 Switched to Localhost");
    return "localhost";
  },

  // Switch to auto-detect
  auto: async () => {
    await AsyncStorage.setItem("currentURLConfig", "auto");
    console.log("🔄 Switched to Auto-Detect Mode");
    return "auto";
  },

  // Show current configuration
  current: async () => {
    const config = (await AsyncStorage.getItem("currentURLConfig")) || "auto";
    const lastWorking =
      (await AsyncStorage.getItem("lastWorkingURL")) || "none";
    console.log(`📍 Current Config: ${config} (${URL_CONFIGS[config]?.name})`);
    console.log(`✅ Last Working URL: ${lastWorking}`);
    return { config, lastWorking };
  },
};

// Usage in console:
// quickSwitch.home() - Switch to home network
// quickSwitch.school() - Switch to school network
// quickSwitch.localhost() - Switch to localhost
// quickSwitch.auto() - Switch to auto-detect
// quickSwitch.current() - Show current config
