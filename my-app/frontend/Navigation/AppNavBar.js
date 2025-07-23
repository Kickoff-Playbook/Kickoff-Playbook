import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Icon } from "react-native-vector-icons/Icon";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
//
import SignUpPage from "../screens/SignUp";
import LogInPage from "../screens/LogIn";
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
        </Tabs.Navigator>
      </NavigationContainer>
    </>
  );
}
