import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function BetMGMInfo({ navigation }) {
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
    console.log(`Selected ${sport.name} for BetMGM`);
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
            <Ionicons name="diamond" size={32} color="white" />
          </View>
          <View style={styles.appInfo}>
            <Text style={styles.appName}>BetMGM</Text>
            <Text style={styles.appTagline}>King of Sportsbooks</Text>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>HARDEST</Text>
            </View>
          </View>
        </View>
      </View>

      {/* App Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailCard}>
          <Text style={styles.cardTitle}>🎁 Current Bonus</Text>
          <Text style={styles.bonusText}>Risk-Free Bet up to $1000</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.cardTitle}>⭐ Key Features</Text>
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>• Lion's Boost Odds</Text>
            <Text style={styles.featureItem}>• Edit My Bet Feature</Text>
            <Text style={styles.featureItem}>• Advanced Live In-Game</Text>
            <Text style={styles.featureItem}>• Complex Betting Options</Text>
          </View>
        </View>

        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>⚠️ Advanced Features</Text>
          <Text style={styles.warningText}>
            BetMGM offers sophisticated betting tools and complex markets.
            Recommended for experienced bettors who understand advanced
            strategies.
          </Text>
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
          🏆 BetMGM is the "King of Sportsbooks" with advanced features like bet
          editing and complex parlays. Best suited for experienced bettors.
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
    backgroundColor: "#FFD700",
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
    backgroundColor: "rgba(0,0,0,0.2)",
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
    color: "#000",
  },
  appTagline: {
    fontSize: 16,
    color: "rgba(0,0,0,0.8)",
    marginTop: 4,
  },
  difficultyBadge: {
    backgroundColor: "#DC3545",
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
  warningCard: {
    backgroundColor: "#FFF3CD",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderColor: "#FFEAA7",
    borderWidth: 1,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#856404",
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: "#856404",
    lineHeight: 18,
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
    backgroundColor: "#FFEBEE",
    margin: 16,
    marginBottom: 30,
    padding: 16,
    borderRadius: 12,
    borderColor: "#FFCDD2",
    borderWidth: 1,
  },
  footerText: {
    fontSize: 12,
    color: "#D32F2F",
    textAlign: "center",
    lineHeight: 16,
  },
});
