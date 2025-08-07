import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FanDuelBaseball = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("bets");
  const [expandedFavorite, setExpandedFavorite] = useState(false);
  const [expandedUnderdog, setExpandedUnderdog] = useState(false);
  const [expandedRules, setExpandedRules] = useState({});

  // Toggle function for rules
  const toggleRule = (ruleId) => {
    setExpandedRules((prev) => ({
      ...prev,
      [ruleId]: !prev[ruleId],
    }));
  };

  // Educational content for betting concepts
  const bettingConcepts = {
    favorite: {
      title: "Favorite",
      symbol: "+",
      definition:
        "The team or player expected to win according to the sportsbook. Favorites have negative odds (like -150) meaning you need to bet more to win less. For example, betting $150 on a -150 favorite wins you $100 if they win.",
      example:
        "If the Yankees are -150 favorites against the Red Sox, they're expected to win. You'd bet $150 to potentially win $100.",
    },
    underdog: {
      title: "Underdog",
      symbol: "-",
      definition:
        "The team or player expected to lose according to the sportsbook. Underdogs have positive odds (like +130) meaning you bet less to win more. For example, betting $100 on a +130 underdog wins you $130 if they win.",
      example:
        "If the Red Sox are +130 underdogs against the Yankees, they're expected to lose. You'd bet $100 to potentially win $130.",
    },
  };

  // Betting rules data
  const bettingRules = [
    {
      id: "moneyline",
      name: "Moneyline",
      definition:
        "Bet on which team will win the game outright (no point spread)",
    },
    {
      id: "runline",
      name: "Run Line (Spread Betting)",
      definition:
        "Similar to point spreads in other sports—for example, a team favored by –1.5 runs must win by 2 or more for the bet to win",
    },
    {
      id: "totals",
      name: "Totals (Over/Under)",
      definition: "Betting on the combined number of runs scored by both teams",
    },
    {
      id: "teamtotals",
      name: "Team Totals",
      definition: "Bet on the over/under for a specific team's runs scored",
    },
    {
      id: "props",
      name: "Proposition Bets (Props)",
      definition:
        "Wagers on specific events, such as a player's hits, strikeouts, or home runs",
    },
    {
      id: "first5",
      name: "First 5 Innings",
      definition:
        "Bet on outcomes specific to the first five innings instead of the full game",
    },
    {
      id: "alternate",
      name: "Alternate Run Lines / Alternate Totals",
      definition:
        "Adjust the standard line (e.g., ±1.5) for different odds and payouts",
    },
    {
      id: "standardparlays",
      name: "Standard Parlays",
      definition:
        "Combine multiple bets into one for a higher potential payout",
    },
    {
      id: "sgp",
      name: "Same-Game Parlays (SGP)",
      definition:
        "Combine bets within a single game—FanDuel also offers SGP+, which lets you mix multiple SGPs (even across sports)",
    },
    {
      id: "roundrobin",
      name: "Round Robins",
      definition:
        "A series of smaller parlays built from your selections—some legs can win even if others don't",
    },
    {
      id: "futures",
      name: "Futures",
      definition:
        "Wager on long-term outcomes like division winners, World Series champions, or season MVPs",
    },
    {
      id: "livebetting",
      name: "Live Betting",
      definition:
        "Wager on games in progress with odds that update in real time",
    },
    {
      id: "cashout",
      name: "Cash-Out Option",
      definition:
        "Close out your bet early during certain events to lock in partial profit or reduce loss",
    },
    {
      id: "oddsboosts",
      name: "Odds Boosts",
      definition:
        "Periodic promotional boosts to increase payouts on selected bets",
    },
  ];

  // Sample data for odds
  const oddsData = [
    {
      id: 1,
      category: "Game Lines",
      bets: [
        {
          matchup: "Yankees vs Red Sox",
          moneyline: "NYY -150 / BOS +130",
          spread: "NYY -1.5 (+110) / BOS +1.5 (-130)",
        },
        {
          matchup: "Dodgers vs Giants",
          moneyline: "LAD -180 / SF +155",
          spread: "LAD -1.5 (+125) / SF +1.5 (-145)",
        },
        {
          matchup: "Braves vs Mets",
          moneyline: "ATL -120 / NYM +105",
          spread: "ATL -1.5 (+140) / NYM +1.5 (-160)",
        },
      ],
    },
    {
      id: 2,
      category: "Game Totals",
      bets: [
        {
          matchup: "Yankees vs Red Sox",
          line: "8.5 Total Runs",
          over: "-115",
          under: "-105",
        },
        {
          matchup: "Dodgers vs Giants",
          line: "9.0 Total Runs",
          over: "-110",
          under: "-110",
        },
        {
          matchup: "Braves vs Mets",
          line: "8.0 Total Runs",
          over: "+100",
          under: "-120",
        },
      ],
    },
    {
      id: 3,
      category: "First 5 Innings",
      bets: [
        {
          matchup: "Yankees vs Red Sox",
          line: "4.5 Runs",
          over: "-120",
          under: "+100",
        },
        {
          matchup: "Dodgers vs Giants",
          line: "5.0 Runs",
          over: "-105",
          under: "-115",
        },
        {
          matchup: "Braves vs Mets",
          line: "4.0 Runs",
          over: "-110",
          under: "-110",
        },
      ],
    },
  ];

  const renderOddsCategory = ({ item }) => (
    <View style={styles.oddsCategory}>
      <Text style={styles.categoryTitle}>{item.category}</Text>
      {item.bets.map((bet, index) => (
        <View key={index} style={styles.oddsItem}>
          <View style={styles.oddsInfo}>
            <Text style={styles.oddsTeam}>{bet.matchup}</Text>
            {bet.moneyline && (
              <Text style={styles.oddsLine}>Moneyline: {bet.moneyline}</Text>
            )}
            {bet.spread && (
              <Text style={styles.oddsLine}>Spread: {bet.spread}</Text>
            )}
            {bet.line && <Text style={styles.oddsLine}>{bet.line}</Text>}
          </View>

          {bet.over && bet.under && (
            <View style={styles.oddsButtons}>
              <TouchableOpacity style={[styles.oddButton, styles.overButton]}>
                <Text style={styles.oddButtonText}>OVER</Text>
                <Text style={styles.oddValue}>{bet.over}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.oddButton, styles.underButton]}>
                <Text style={styles.oddButtonText}>UNDER</Text>
                <Text style={styles.oddValue}>{bet.under}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FanDuel Baseball</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "bets" && styles.activeTab]}
          onPress={() => setActiveTab("bets")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "bets" && styles.activeTabText,
            ]}
          >
            +/-
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "odds" && styles.activeTab]}
          onPress={() => setActiveTab("odds")}
        >
          <Ionicons
            name="cash"
            size={20}
            color={activeTab === "odds" ? "#FFFFFF" : "#1E3A8A"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "odds" && styles.activeTabText,
            ]}
          >
            Wagers
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === "bets" ? (
          <ScrollView style={styles.tabContent}>
            <Text style={styles.sectionTitle}>What are Odds?</Text>
            <Text style={styles.sectionDescription}>
              Learn about favorites and underdogs in sports betting
            </Text>

            {/* Favorite Box */}
            <TouchableOpacity
              style={styles.betGuideBox}
              onPress={() => setExpandedFavorite(!expandedFavorite)}
            >
              <View style={styles.betGuideHeader}>
                <View style={styles.betGuideTitle}>
                  <Text style={styles.betGuideSymbol}>+</Text>
                  <Text style={styles.betGuideName}>Favorite</Text>
                </View>
                <Ionicons
                  name={expandedFavorite ? "chevron-up" : "chevron-down"}
                  size={24}
                  color="#1E3A8A"
                />
              </View>

              {expandedFavorite && (
                <View style={styles.betGuideContent}>
                  <Text style={styles.betGuideDefinition}>
                    {bettingConcepts.favorite.definition}
                  </Text>
                  <Text style={styles.betGuideExample}>
                    Example: {bettingConcepts.favorite.example}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Underdog Box */}
            <TouchableOpacity
              style={styles.betGuideBox}
              onPress={() => setExpandedUnderdog(!expandedUnderdog)}
            >
              <View style={styles.betGuideHeader}>
                <View style={styles.betGuideTitle}>
                  <Text style={styles.betGuideSymbol}>-</Text>
                  <Text style={styles.betGuideName}>Underdog</Text>
                </View>
                <Ionicons
                  name={expandedUnderdog ? "chevron-up" : "chevron-down"}
                  size={24}
                  color="#1E3A8A"
                />
              </View>

              {expandedUnderdog && (
                <View style={styles.betGuideContent}>
                  <Text style={styles.betGuideDefinition}>
                    {bettingConcepts.underdog.definition}
                  </Text>
                  <Text style={styles.betGuideExample}>
                    Example: {bettingConcepts.underdog.example}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <ScrollView style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Betting Rules</Text>
            <Text style={styles.sectionDescription}>
              Learn about different types of baseball betting options
            </Text>

            {bettingRules.map((rule) => (
              <TouchableOpacity
                key={rule.id}
                style={styles.betGuideBox}
                onPress={() => toggleRule(rule.id)}
              >
                <View style={styles.betGuideHeader}>
                  <Text style={styles.betGuideName}>{rule.name}</Text>
                  <Ionicons
                    name={
                      expandedRules[rule.id] ? "chevron-up" : "chevron-down"
                    }
                    size={24}
                    color="#1E3A8A"
                  />
                </View>

                {expandedRules[rule.id] && (
                  <View style={styles.betGuideContent}>
                    <Text style={styles.betGuideDefinition}>
                      {rule.definition}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1E3A8A",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  placeholder: {
    width: 34,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
  },
  activeTab: {
    backgroundColor: "#1E3A8A",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748B",
    marginLeft: 5,
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 5,
  },
  sectionDescription: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  oddButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: "center",
  },
  overButton: {
    backgroundColor: "#10B981",
  },
  underButton: {
    backgroundColor: "#EF4444",
  },
  oddButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  oddValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  oddsCategory: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 12,
  },
  oddsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  oddsInfo: {
    flex: 1,
  },
  oddsTeam: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 2,
  },
  oddsLine: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 1,
  },
  oddsButtons: {
    flexDirection: "row",
  },
  betGuideBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: "hidden",
  },
  betGuideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F8FAFC",
  },
  betGuideTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  betGuideSymbol: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginRight: 12,
    width: 30,
    textAlign: "center",
  },
  betGuideName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  betGuideContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  betGuideDefinition: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    marginBottom: 12,
  },
  betGuideExample: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    fontStyle: "italic",
  },
});

export default FanDuelBaseball;
