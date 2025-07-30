import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Icon } from "react-native-vector-icons/Icon";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
//
import SignUpPage from "../screens/SignUp";
import LogInPage from "../screens/LogIn";
import PostPage from "../screens/PostPage";
import SportsRules from "../screens/SportsRules";
import ResponsibleGamblingPage from "../screens/ResponsibleGambling";

//
const Tabs = createBottomTabNavigator({
  screenOptions: {
    animation: "fade",
  },
});
//
export default function NavigationBar() {
  return (
    <>
      <NavigationContainer>
        <Tabs.Navigator>
          <Tabs.Screen
            name="Sign Up"
            component={SignUpPage}
            options={{
              //   tabBarStyle: { display: "none" },
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="Login"
            component={LogInPage}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="log-in" size={size} color={color} />
              ),
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
      </NavigationContainer>
    </>
  );
}
