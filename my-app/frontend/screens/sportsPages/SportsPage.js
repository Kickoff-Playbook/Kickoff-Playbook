import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SportsList({ navigation }) {
  const sportsData = [
    {
      id: 1,
      name: "Football (NFL)",
      icon: "football",
      color: "#8B4513",
      description: "National Football League",
    },
    {
      id: 2,
      name: "Basketball (NBA)",
      icon: "basketball",
      color: "#FF8C00",
      description: "National Basketball Association",
    },
    {
      id: 3,
      name: "Baseball (MLB)",
      icon: "baseball",
      color: "#228B22",
      description: "Major League Baseball",
    },
    {
      id: 4,
      name: "Hockey (NHL)",
      icon: "hockey-puck",
      color: "#4169E1",
      description: "National Hockey League",
    },
    {
      id: 5,
      name: "Soccer (MLS)",
      icon: "football-outline",
      color: "#32CD32",
      description: "Major League Soccer",
    },
    {
      id: 6,
      name: "Tennis",
      icon: "tennisball",
      color: "#FFD700",
      description: "Professional Tennis",
    },
    {
      id: 7,
      name: "Golf",
      icon: "golf",
      color: "#90EE90",
      description: "Professional Golf Association",
    },
    {
      id: 8,
      name: "Formula 1",
      icon: "car-sport",
      color: "#FF1801",
      description: "Formula One Racing",
    },
  ];

  const handleSportPress = (sport) => {
    console.log(`Selected sport: ${sport.name}`);
    // Navigate to specific sport screen
    switch (sport.name) {
      case "Football (NFL)":
        navigation.navigate("FootballRules");
        break;
      case "Basketball (NBA)":
        navigation.navigate("BasketballRules");
        break;
      case "Baseball (MLB)":
        navigation.navigate("BaseballRules");
        break;
      case "Hockey (NHL)":
        navigation.navigate("HockeyRules");
        break;
      case "Soccer (MLS)":
        navigation.navigate("SoccerRules");
        break;
      case "Tennis":
        navigation.navigate("TennisRules");
        break;
      case "Golf":
        navigation.navigate("GolfRules");
        break;
      case "Formula 1":
        navigation.navigate("FormulaOneRules");
        break;
      default:
        console.log(`Navigate to ${sport.name} (not implemented yet)`);
    }
  };

  const renderSportButton = (sport) => (
    <TouchableOpacity
      key={sport.id}
      style={[styles.sportButton, { borderLeftColor: sport.color }]}
      onPress={() => handleSportPress(sport)}
      activeOpacity={0.7}
    >
      <View style={styles.sportContent}>
        {/* Sport Icon */}
        <View style={[styles.iconContainer, { backgroundColor: sport.color }]}>
          <Ionicons name={sport.icon} size={24} color="white" />
        </View>

        {/* Sport Info */}
        <View style={styles.sportInfo}>
          <Text style={styles.sportName}>{sport.name}</Text>
          <Text style={styles.sportDescription}>{sport.description}</Text>
        </View>

        {/* Arrow Indicator */}
        <Ionicons
          name="chevron-forward"
          size={20}
          color="#666"
          style={styles.arrow}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sports Center</Text>
        <Text style={styles.headerSubtitle}>
          Explore teams, stats, and live updates
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search sports..."
          placeholderTextColor="#999"
        />
      </View>

      {/* Sports List */}
      <View style={styles.sportsContainer}>
        <Text style={styles.sectionTitle}>Popular Sports</Text>
        {sportsData.map((sport) => renderSportButton(sport))}
      </View>

      {/* Quick Stats Section */}
      <View style={styles.quickStats}>
        <Text style={styles.quickStatsTitle}>Live Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Sports</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>150+</Text>
            <Text style={styles.statLabel}>Teams</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>Live</Text>
            <Text style={styles.statLabel}>Updates</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Coverage</Text>
          </View>
        </View>
      </View>

      {/* Featured Section */}
      <View style={styles.featuredSection}>
        <Text style={styles.featuredTitle}>🔥 Trending Now</Text>
        <View style={styles.featuredContent}>
          <Text style={styles.featuredText}>
            NFL Season is heating up! Check out the latest team standings and
            player stats.
          </Text>
          <TouchableOpacity style={styles.featuredButton}>
            <Text style={styles.featuredButtonText}>View NFL Stats</Text>
            <Ionicons name="arrow-forward" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#1f867aff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    marginTop: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  sportsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  sportButton: {
    backgroundColor: "white",
    marginBottom: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sportContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  sportInfo: {
    flex: 1,
  },
  sportName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  sportDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  arrow: {
    marginLeft: 8,
  },
  quickStats: {
    margin: 16,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quickStatsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f867aff",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  featuredSection: {
    margin: 16,
    marginBottom: 30,
    padding: 20,
    backgroundColor: "#fff3cd",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ffeaa7",
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#856404",
    marginBottom: 12,
  },
  featuredContent: {
    flexDirection: "column",
  },
  featuredText: {
    fontSize: 14,
    color: "#856404",
    marginBottom: 12,
    lineHeight: 20,
  },
  featuredButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f867aff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  featuredButtonText: {
    color: "white",
    fontWeight: "600",
    marginRight: 8,
  },
});
