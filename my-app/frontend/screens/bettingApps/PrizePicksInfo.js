import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, commonStyles } from "../../utils/theme";

export default function PrizePicksInfo({ navigation }) {
  const sports = [
    { id: 1, name: "NFL Football", icon: "football", color: "#8B4513" },
    { id: 2, name: "NBA Basketball", icon: "basketball", color: "#FF8C00" },
    { id: 3, name: "MLB Baseball", icon: "baseball", color: "#228B22" },
    { id: 4, name: "NHL Hockey", icon: "snow-outline", color: "#4169E1" },
    { id: 5, name: "MLS Soccer", icon: "football-outline", color: "#32CD32" },
    { id: 6, name: "Tennis", icon: "tennisball", color: "#FFD700" },
    { id: 7, name: "Golf", icon: "golf", color: "#90EE90" },
    { id: 8, name: "Formula 1", icon: "car-sport", color: "#FF1801" },
  ];

  const handleSportPress = (sport) => {
    console.log(`Selected ${sport.name} for PrizePicks`);
    // Navigate to specific sport betting page
    switch (sport.name) {
      case "MLB Baseball":
        navigation.navigate("PrizePicksBaseball");
        break;
      case "NFL Football":
        navigation.navigate("PrizePicksFootball");
        break;
      // Add other sports navigation here
      default:
        console.log(`${sport.name} page not implemented yet`);
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
        <View style={[styles.iconContainer, { backgroundColor: sport.color }]}>
          <Ionicons name={sport.icon} size={24} color="white" />
        </View>
        <Text style={styles.sportName}>{sport.name}</Text>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.appIcon}>
            <Ionicons name="gift" size={32} color="white" />
          </View>
          <View style={styles.appInfo}>
            <Text style={styles.appName}>PrizePicks</Text>
            <Text style={styles.appTagline}>
              Daily Fantasy Pick'em Platform
            </Text>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>BEGINNER FRIENDLY</Text>
            </View>
          </View>
        </View>
      </View>

      {/* App Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailCard}>
          <Text style={styles.cardTitle}>🎁 Current Bonus</Text>
          <Text style={styles.bonusText}>100% Deposit Match up to $100</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.cardTitle}>⭐ Key Features</Text>
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>• Pick'em Style Betting</Text>
            <Text style={styles.featureItem}>• Player Props Focus</Text>
            <Text style={styles.featureItem}>• Quick Payouts</Text>
            <Text style={styles.featureItem}>• Simple Interface</Text>
          </View>
        </View>
      </View>

      {/* Sports Selection */}
      <View style={styles.sportsContainer}>
        <Text style={styles.sectionTitle}>Pick a Sport to Get Started</Text>
        <Text style={styles.sectionSubtitle}>
          Choose your favorite sport to explore betting options
        </Text>

        {sports.map((sport) => renderSportButton(sport))}
      </View>

      {/* Footer Info */}
      <View style={styles.footerInfo}>
        <Text style={styles.footerText}>
          🛡️ PrizePicks is perfect for beginners with its simple pick'em format.
          Just pick more or less on player stats!
        </Text>
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
    backgroundColor: "#6C5CE7",
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  appIcon: {
    width: 64,
    height: 64,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  appTagline: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
  },
  difficultyBadge: {
    backgroundColor: "#28A745",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  difficultyText: {
    fontSize: 10,
    color: "white",
    fontWeight: "600",
  },
  detailsContainer: {
    padding: 16,
  },
  detailCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  bonusText: {
    fontSize: 14,
    color: "#28A745",
    fontWeight: "600",
  },
  featuresList: {
    marginTop: 4,
  },
  featureItem: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    lineHeight: 20,
  },
  sportsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  sportButton: {
    backgroundColor: "white",
    marginBottom: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  sportName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  footerInfo: {
    backgroundColor: "#E3F2FD",
    margin: 16,
    marginBottom: 30,
    padding: 16,
    borderRadius: 12,
    borderColor: "#BBDEFB",
    borderWidth: 1,
  },
  footerText: {
    fontSize: 12,
    color: "#1976D2",
    textAlign: "center",
    lineHeight: 16,
  },
});
