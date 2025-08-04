import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//
import SportsPage from "./sportsPages/SportsPage";
import Teampage from "./sportsPages/Teampage";
import PlayerStats from "./sportsPages/PlayerStats";
import FootballRules from "./sportsPages/FootballRules";
import BasketballRules from "./sportsPages/BasketballRules";
import BaseballRules from "./sportsPages/BaseballRules";
import HockeyRules from "./sportsPages/HockeyRules";
import SoccerRules from "./sportsPages/SoccerRules";
import TennisRules from "./sportsPages/TennisRules";
import GolfRules from "./sportsPages/GolfRules";
import FormulaOneRules from "./sportsPages/FormulaOneRules";
//
const Stack = createNativeStackNavigator();
//
export default function SportsRules() {
  return (
    <Stack.Navigator
      initialRouteName="SportsPage"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1f867aff",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="SportsPage"
        component={SportsPage}
        options={{
          headerShown: false,
          title: "Sports Page",
        }}
      />
      <Stack.Screen
        name="Teampage"
        component={Teampage}
        options={{
          headerShown: false,
          title: "NFL Teams",
        }}
      />
      <Stack.Screen
        name="PlayerStats"
        component={PlayerStats}
        options={{
          headerShown: false,
          title: "Player Stats",
        }}
      />
      <Stack.Screen
        name="FootballRules"
        component={FootballRules}
        options={{
          headerShown: false,
          title: "NFL Rules",
        }}
      />
      <Stack.Screen
        name="BasketballRules"
        component={BasketballRules}
        options={{
          headerShown: false,
          title: "NBA Rules",
        }}
      />
      <Stack.Screen
        name="BaseballRules"
        component={BaseballRules}
        options={{
          headerShown: false,
          title: "MLB Rules",
        }}
      />
      <Stack.Screen
        name="HockeyRules"
        component={HockeyRules}
        options={{
          headerShown: false,
          title: "NHL Rules",
        }}
      />
      <Stack.Screen
        name="SoccerRules"
        component={SoccerRules}
        options={{
          headerShown: false,
          title: "Soccer Rules",
        }}
      />
      <Stack.Screen
        name="TennisRules"
        component={TennisRules}
        options={{
          headerShown: false,
          title: "Tennis Rules",
        }}
      />
      <Stack.Screen
        name="GolfRules"
        component={GolfRules}
        options={{
          headerShown: false,
          title: "Golf Rules",
        }}
      />
      <Stack.Screen
        name="FormulaOneRules"
        component={FormulaOneRules}
        options={{
          headerShown: false,
          title: "F1 Rules",
        }}
      />
    </Stack.Navigator>
  );
}
