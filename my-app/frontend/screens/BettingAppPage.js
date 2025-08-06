import React from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SportsBettingPage({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const bettingApps = [
    {
      id: 1,
      name: "PrizePicks",
      icon: "gift",
      color: "#6C5CE7",
      description: "Daily Fantasy Pick'em Platform",
      rating: "4.6",
      bonus: "100% Deposit Match up to $100",
      features: ["Pick'em Style", "Player Props", "Quick Payouts"],
      difficulty: "Beginner Friendly",
      difficultyColor: "#28A745", // Green
    },
    {
      id: 2,
      name: "DraftKings",
      icon: "trophy",
      color: "#FF6B35",
      description: "Daily Fantasy Sports & Sportsbook",
      rating: "4.8",
      bonus: "Bet $5, Get $200",
      features: ["Live Betting", "Same Game Parlays", "Early Cash Out"],
      difficulty: "Medium",
      difficultyColor: "#FFC107", // Yellow/Orange
    },
    {
      id: 3,
      name: "FanDuel",
      icon: "ribbon",
      color: "#1E3A8A",
      description: "America's #1 Sportsbook",
      rating: "4.7",
      bonus: "Bet $5, Get $150",
      features: ["Live Streaming", "Parlay Boosts", "Quick Payouts"],
      difficulty: "Medium",
      difficultyColor: "#FFC107", // Yellow/Orange
    },
    {
      id: 4,
      name: "ESPN BET",
      icon: "tv",
      color: "#CC0000",
      description: "ESPN's Official Sportsbook",
      rating: "4.5",
      bonus: "First Bet Reset up to $1000",
      features: ["ESPN Integration", "Live Betting", "Sports News"],
      difficulty: "Medium",
      difficultyColor: "#FFC107", // Yellow/Orange
    },
    {
      id: 5,
      name: "BetMGM",
      icon: "diamond",
      color: "#FFD700",
      description: "King of Sportsbooks",
      rating: "4.6",
      bonus: "Risk-Free Bet up to $1000",
      features: ["Lion's Boost", "Edit My Bet", "Live In-Game"],
      difficulty: "Hardest",
      difficultyColor: "#DC3545", // Red
    },
    {
      id: 6,
      name: "Fanatics",
      icon: "storefront",
      color: "#0066CC",
      description: "Fanatics Sportsbook",
      rating: "4.3",
      bonus: "Bet $5, Get $150 in Bonus Bets",
      features: ["FanCash Rewards", "Live Betting", "Exclusive Gear"],
      difficulty: "Beginner Friendly",
      difficultyColor: "#28A745", // Green
    },
    {
      id: 7,
      name: "Caesars",
      icon: "medal",
      color: "#8B0000",
      description: "Caesars Sportsbook & Casino",
      rating: "4.5",
      bonus: "First Bet on Caesars up to $1250",
      features: ["Caesars Rewards", "Odds Boost", "Live Betting"],
      difficulty: "Hardest",
      difficultyColor: "#DC3545", // Red
    },
  ];

  const handleAppPress = (app) => {
    console.log(`Selected betting app: ${app.name}`);
    // Navigate to the specific app's information page
    switch (app.name) {
      case "PrizePicks":
        navigation.navigate("PrizePicksInfo");
        break;
      case "DraftKings":
        navigation.navigate("DraftKingsInfo");
        break;
      case "FanDuel":
        navigation.navigate("FanDuelInfo");
        break;
      case "ESPN BET":
        navigation.navigate("ESPNBETInfo");
        break;
      case "BetMGM":
        navigation.navigate("BetMGMInfo");
        break;
      case "Fanatics":
        navigation.navigate("FanaticsInfo");
        break;
      case "Caesars":
        navigation.navigate("CaesarsInfo");
        break;
      default:
        console.log(`Navigate to ${app.name} info page (not implemented yet)`);
    }
  };

  const handleMoreAppsPress = () => {
    console.log("More apps coming soon pressed");
    // Could show a modal or navigate to a coming soon page
  };

  const filteredApps = bettingApps.filter((app) => {
    const matchesSearch = app.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === "All" || app.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const difficultyOptions = ["All", "Beginner Friendly", "Medium", "Hardest"];

  const renderDifficultyFilter = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
    >
      {difficultyOptions.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.filterButton,
            selectedDifficulty === option && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedDifficulty(option)}
        >
          <Text
            style={[
              styles.filterButtonText,
              selectedDifficulty === option && styles.filterButtonTextActive,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderAppButton = (app) => (
    <TouchableOpacity
      key={app.id}
      style={[styles.appButton, { borderLeftColor: app.color }]}
      onPress={() => handleAppPress(app)}
      activeOpacity={0.7}
    >
      <View style={styles.appContent}>
        {/* App Icon */}
        <View style={[styles.iconContainer, { backgroundColor: app.color }]}>
          <Ionicons name={app.icon} size={28} color="white" />
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <View style={styles.appHeader}>
            <Text style={styles.appName}>{app.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>{app.rating}</Text>
            </View>
          </View>

          <Text style={styles.appDescription}>{app.description}</Text>

          {/* Difficulty Level */}
          <View style={styles.difficultyContainer}>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: app.difficultyColor },
              ]}
            >
              <Text style={styles.difficultyText}>{app.difficulty}</Text>
            </View>
          </View>

          <View style={styles.bonusContainer}>
            <Text style={styles.bonusText}>🎁 {app.bonus}</Text>
          </View>

          <View style={styles.featuresContainer}>
            {app.features.slice(0, 2).map((feature, index) => (
              <View key={index} style={styles.featureTag}>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
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

  const renderMoreAppsButton = () => (
    <TouchableOpacity
      style={styles.moreAppsButton}
      onPress={handleMoreAppsPress}
      activeOpacity={0.7}
    >
      <View style={styles.moreAppsContent}>
        <View style={styles.moreAppsIconContainer}>
          <Ionicons name="add-circle" size={32} color="#1f867aff" />
        </View>
        <View style={styles.moreAppsInfo}>
          <Text style={styles.moreAppsText}>More Apps Coming Soon</Text>
          <Text style={styles.moreAppsSubtext}>
            We're adding more sportsbooks and betting platforms
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color="#1f867aff"
          style={styles.arrow}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎰 Sports Betting Apps</Text>
        <Text style={styles.headerSubtitle}>
          Discover the best sportsbooks and their features
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
          placeholder="Search betting apps..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Important Notice */}
      <View style={styles.noticeContainer}>
        <Ionicons name="warning" size={20} color="#FF6B35" />
        <Text style={styles.noticeText}>
          Please gamble responsibly. Must be 21+ and located in eligible states.
        </Text>
      </View>

      {/* Difficulty Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Filter by Difficulty Level:</Text>
        {renderDifficultyFilter()}
      </View>

      {/* Apps List */}
      <View style={styles.appsContainer}>
        <Text style={styles.sectionTitle}>Popular Sportsbooks</Text>
        {filteredApps.map((app) => renderAppButton(app))}
        {/* More Apps Coming Soon Button */}
        {renderMoreAppsButton()}
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Industry Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7+</Text>
            <Text style={styles.statLabel}>Top Apps</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>21+</Text>
            <Text style={styles.statLabel}>Age Req.</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>Live</Text>
            <Text style={styles.statLabel}>Betting</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>$1000+</Text>
            <Text style={styles.statLabel}>Bonuses</Text>
          </View>
        </View>
      </View>

      {/* Footer Warning */}
      <View style={styles.footerWarning}>
        <Text style={styles.warningText}>
          🛡️ Remember: Never bet more than you can afford to lose. If you have a
          gambling problem, call 1-800-GAMBLER.
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
  noticeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3CD",
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderColor: "#FFEAA7",
    borderWidth: 1,
  },
  noticeText: {
    marginLeft: 8,
    fontSize: 12,
    color: "#856404",
    flex: 1,
  },
  filterSection: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: "row",
  },
  filterButton: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterButtonActive: {
    backgroundColor: "#1f867aff",
    borderColor: "#1f867aff",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  filterButtonTextActive: {
    color: "white",
  },
  appsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  appButton: {
    backgroundColor: "white",
    marginBottom: 16,
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
  appContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  appInfo: {
    flex: 1,
  },
  appHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  appName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  appDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  difficultyContainer: {
    marginBottom: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  difficultyText: {
    fontSize: 11,
    color: "white",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  bonusContainer: {
    backgroundColor: "#E8F5E8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  bonusText: {
    fontSize: 12,
    color: "#2D5A2D",
    fontWeight: "600",
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  featureTag: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  featureText: {
    fontSize: 10,
    color: "#666",
  },
  arrow: {
    marginLeft: 8,
  },
  // More Apps Button Styles
  moreAppsButton: {
    backgroundColor: "white",
    marginBottom: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#1f867aff",
    borderStyle: "dashed",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  moreAppsContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  moreAppsIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    backgroundColor: "#f8f9fa",
    borderWidth: 2,
    borderColor: "#1f867aff",
    borderStyle: "dashed",
  },
  moreAppsInfo: {
    flex: 1,
  },
  moreAppsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f867aff",
    marginBottom: 4,
  },
  moreAppsSubtext: {
    fontSize: 14,
    color: "#666",
  },
  statsContainer: {
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
  statsTitle: {
    fontSize: 18,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f867aff",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  footerWarning: {
    backgroundColor: "#F8D7DA",
    margin: 16,
    marginBottom: 30,
    padding: 16,
    borderRadius: 8,
    borderColor: "#F5C6CB",
    borderWidth: 1,
  },
  warningText: {
    fontSize: 12,
    color: "#721C24",
    textAlign: "center",
    lineHeight: 16,
  },
});
