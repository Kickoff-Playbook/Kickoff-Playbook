import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../contexts/AuthContext";
import { colors } from "../utils/theme";

// Import screen components
import SignUpPage from "../screens/SignUp";
import LogInPage from "../screens/LogIn";
import PostPage from "../screens/PostPage";
import SportsRules from "../screens/SportsRules";
import ResponsibleGamblingPage from "../screens/ResponsibleGambling";
import ProfilePage from "../screens/UserProfilePage";
import CreatorRules from "../screens/CreatorRules";
import SportsBettingPage from "../screens/BettingAppPage";

// Import betting app info screens
import PrizePicksInfo from "../screens/bettingApps/PrizePicksInfo";
import DraftKingsInfo from "../screens/bettingApps/DraftKingsInfo";
import FanDuelInfo from "../screens/bettingApps/FanDuelInfo";
import BetMGMInfo from "../screens/bettingApps/BetMGMInfo";
import FanaticsInfo from "../screens/bettingApps/FanaticsInfo";
import ESPNBETInfo from "../screens/bettingApps/ESPNBETInfo";
import CaesarsInfo from "../screens/bettingApps/CaesarsInfo";
//
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
//
// - login and sign up stack
function CreateOrSignIn() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Sign Up"
          component={SignUpPage}
          options={{
            //   tabBarStyle: { display: "none" },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
        <Stack.Screen
          name="Login"
          component={LogInPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="log-in" size={size} color={color} />
            ),
          }}
        />
      </Stack.Navigator>
    </>
  );
}

// - Stack navigator for betting apps section
function BettingAppsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="BettingAppsMain"
        component={SportsBettingPage}
        options={{ title: "Sports Betting Apps" }}
      />
      <Stack.Screen
        name="PrizePicksInfo"
        component={PrizePicksInfo}
        options={{
          title: "PrizePicks",
          headerStyle: { backgroundColor: "#6C5CE7" },
        }}
      />
      <Stack.Screen
        name="DraftKingsInfo"
        component={DraftKingsInfo}
        options={{
          title: "DraftKings",
          headerStyle: { backgroundColor: "#FF6B35" },
        }}
      />
      <Stack.Screen
        name="FanDuelInfo"
        component={FanDuelInfo}
        options={{
          title: "FanDuel",
          headerStyle: { backgroundColor: "#1E3A8A" },
        }}
      />
      <Stack.Screen
        name="BetMGMInfo"
        component={BetMGMInfo}
        options={{
          title: "BetMGM",
          headerStyle: { backgroundColor: "#FFD700" },
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="FanaticsInfo"
        component={FanaticsInfo}
        options={{
          title: "Fanatics",
          headerStyle: { backgroundColor: "#0066CC" },
        }}
      />
      <Stack.Screen
        name="ESPNBETInfo"
        component={ESPNBETInfo}
        options={{
          title: "ESPN BET",
          headerStyle: { backgroundColor: "#CC0000" },
        }}
      />
      <Stack.Screen
        name="CaesarsInfo"
        component={CaesarsInfo}
        options={{
          title: "Caesars",
          headerStyle: { backgroundColor: "#8B0000" },
        }}
      />
    </Stack.Navigator>
  );
}

// - Bottom tabs, postpage, sports and rules, responsible gambling, bet by app page
function MainPagesBottomTab() {
  return (
    <>
      <Tabs.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarStyle: {
            backgroundColor: colors.white,
            borderTopColor: colors.border,
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text.secondary,
        }}
      >
        <Tabs.Screen
          name="Learn to Play"
          component={BettingAppsStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" size={size} color={color} />
            ),
            headerShown: false, // Hide the tab header since stack has its own
          }}
        />
        <Tabs.Screen
          name="Explore"
          component={PostPage}
          options={{
            headerTitle: "Share and Discover",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="share" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Sports Rules & Tutorials"
          component={SportsRules}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="RG"
          component={ResponsibleGamblingPage}
          options={{
            headerTitle: "Responsible Gambling",

            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="shield-checkmark-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </>
  );
}
//  - Drawer tabs, user profile, and extra pages
function AppDrawer() {
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Coach's Playbook"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerStyle: {
            backgroundColor: colors.white,
          },
          drawerActiveTintColor: colors.primary,
          drawerInactiveTintColor: colors.text.secondary,
        }}
      >
        <Drawer.Screen name="Coach's Playbook" component={CreatorRules} />
        <Drawer.Screen
          name="Main"
          component={MainPagesBottomTab}
          options={{ title: `Dashboard` }}
        />
        <Drawer.Screen name="Profile Page" component={ProfilePage} />
      </Drawer.Navigator>
    </>
  );
}
//
export default function NavigationBar() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1f867aff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        // Authenticated pages
        <AppDrawer />
      ) : (
        // Unauthenticated pages
        <CreateOrSignIn />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
