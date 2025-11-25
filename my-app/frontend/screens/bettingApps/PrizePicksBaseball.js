import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../utils/theme";

const PrizePicksBaseball = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("bets");
  const [expandedBetType, setExpandedBetType] = useState(null);

  const toggleBetType = (type) => {
    setExpandedBetType(expandedBetType === type ? null : type);
  };

  // Sample data for bets
  const betTypes = [
    {
      id: 1,
      playerName: "Aaron Judge",
      team: "Yankees",
      betType: "Home Runs",
      line: "0.5+",
      more: "+120",
      less: "-145",
      description: "Will Aaron Judge hit 1 or more home runs?",
    },
    {
      id: 2,
      playerName: "Mookie Betts",
      team: "Dodgers",
      betType: "Hits",
      line: "1.5+",
      more: "+105",
      less: "-130",
      description: "Will Mookie Betts get 2 or more hits?",
    },
    {
      id: 3,
      playerName: "Ronald Acuña Jr.",
      team: "Braves",
      betType: "Stolen Bases",
      line: "0.5+",
      more: "+180",
      less: "-220",
      description: "Will Acuña Jr. steal 1 or more bases?",
    },
    {
      id: 4,
      playerName: "Gerrit Cole",
      team: "Yankees",
      betType: "Strikeouts",
      line: "7.5",
      more: "-110",
      less: "-110",
      description: "Will Gerrit Cole record more or less than 7.5 strikeouts?",
    },
    {
      id: 5,
      playerName: "Vladimir Guerrero Jr.",
      team: "Blue Jays",
      betType: "RBIs",
      line: "1.5+",
      more: "+140",
      less: "-170",
      description: "Will Vlad Jr. drive in 2 or more runs?",
    },
  ];

  // Sample data for odds
  const oddsData = [
    {
      id: 1,
      category: "Team Totals",
      bets: [
        { team: "Yankees", line: "4.5 Runs", over: "-115", under: "-105" },
        { team: "Dodgers", line: "5.0 Runs", over: "-110", under: "-110" },
        { team: "Braves", line: "4.5 Runs", over: "+100", under: "-120" },
      ],
    },
    {
      id: 2,
      category: "Game Totals",
      bets: [
        {
          matchup: "Yankees vs Red Sox",
          line: "9.5 Total Runs",
          over: "-120",
          under: "+100",
        },
        {
          matchup: "Dodgers vs Giants",
          line: "8.5 Total Runs",
          over: "-105",
          under: "-115",
        },
        {
          matchup: "Braves vs Mets",
          line: "9.0 Total Runs",
          over: "-110",
          under: "-110",
        },
      ],
    },
    {
      id: 3,
      category: "Pitcher Props",
      bets: [
        {
          pitcher: "Gerrit Cole",
          line: "6.5 K's",
          over: "+105",
          under: "-125",
        },
        {
          pitcher: "Walker Buehler",
          line: "5.5 K's",
          over: "-110",
          under: "-110",
        },
        { pitcher: "Max Fried", line: "7.5 K's", over: "+120", under: "-140" },
      ],
    },
  ];

  const renderBetItem = ({ item }) => (
    <View style={styles.betCard}>
      <View style={styles.betHeader}>
        <Text style={styles.playerName}>{item.playerName}</Text>
        <Text style={styles.teamName}>{item.team}</Text>
      </View>

      <View style={styles.betDetails}>
        <Text style={styles.betType}>
          {item.betType}: {item.line}
        </Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      <View style={styles.oddsContainer}>
        <TouchableOpacity style={[styles.oddButton, styles.moreButton]}>
          <Text style={styles.oddButtonText}>MORE</Text>
          <Text style={styles.oddValue}>{item.more}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.oddButton, styles.lessButton]}>
          <Text style={styles.oddButtonText}>LESS</Text>
          <Text style={styles.oddValue}>{item.less}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOddsCategory = ({ item }) => (
    <View style={styles.oddsCategory}>
      <Text style={styles.categoryTitle}>{item.category}</Text>
      {item.bets.map((bet, index) => (
        <View key={index} style={styles.oddsItem}>
          <View style={styles.oddsInfo}>
            <Text style={styles.oddsTeam}>
              {bet.team || bet.matchup || bet.pitcher}
            </Text>
            <Text style={styles.oddsLine}>{bet.line}</Text>
          </View>

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
        <Text style={styles.headerTitle}>PrizePicks Baseball</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "bets" && styles.activeTab]}
          onPress={() => setActiveTab("bets")}
        >
          <Ionicons
            name="swap-vertical"
            size={20}
            color={activeTab === "bets" ? "#FFFFFF" : "#8B5CF6"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "odds" && styles.activeTab]}
          onPress={() => setActiveTab("odds")}
        >
          <Ionicons
            name="trending-up"
            size={20}
            color={activeTab === "odds" ? "#FFFFFF" : "#8B5CF6"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "odds" && styles.activeTabText,
            ]}
          >
            Odds
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === "bets" ? (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Betting Guide</Text>
            <Text style={styles.sectionDescription}>
              Learn about Over and Under betting options
            </Text>

            {/* Over Box */}
            <View style={styles.betGuideBox}>
              <TouchableOpacity
                onPress={() => toggleBetType("over")}
                style={styles.betGuideHeader}
              >
                <View style={styles.betGuideTitle}>
                  <Ionicons name="arrow-up" size={20} color="#10B981" />
                  <Text style={styles.betGuideTitleText}>Over</Text>
                </View>
                <Ionicons
                  name={
                    expandedBetType === "over"
                      ? "chevron-down"
                      : "chevron-forward"
                  }
                  size={20}
                  color="#333"
                />
              </TouchableOpacity>

              {expandedBetType === "over" && (
                <View style={styles.betGuideContent}>
                  <Text style={styles.betGuideExplanation}>
                    "Over" means you're betting that the actual result will be
                    HIGHER than the predicted line. For example, if a player's
                    home run line is set at 0.5, betting "Over" means you think
                    they will hit 1 or more home runs in the game.
                  </Text>
                  <Text style={styles.betGuideExample}>
                    Example: Aaron Judge Over 0.5 Home Runs - You win if he hits
                    1+ home runs
                  </Text>
                </View>
              )}
            </View>

            {/* Under Box */}
            <View style={styles.betGuideBox}>
              <TouchableOpacity
                onPress={() => toggleBetType("under")}
                style={styles.betGuideHeader}
              >
                <View style={styles.betGuideTitle}>
                  <Ionicons name="arrow-down" size={20} color="#EF4444" />
                  <Text style={styles.betGuideTitleText}>Under</Text>
                </View>
                <Ionicons
                  name={
                    expandedBetType === "under"
                      ? "chevron-down"
                      : "chevron-forward"
                  }
                  size={20}
                  color="#333"
                />
              </TouchableOpacity>

              {expandedBetType === "under" && (
                <View style={styles.betGuideContent}>
                  <Text style={styles.betGuideExplanation}>
                    "Under" means you're betting that the actual result will be
                    LOWER than the predicted line. For example, if a player's
                    strikeout line is set at 7.5, betting "Under" means you
                    think they will record 7 or fewer strikeouts in the game.
                  </Text>
                  <Text style={styles.betGuideExample}>
                    Example: Gerrit Cole Under 7.5 Strikeouts - You win if he
                    gets 7 or fewer strikeouts
                  </Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Live Odds</Text>
            <Text style={styles.sectionDescription}>
              Current odds for team and game totals
            </Text>
            <FlatList
              data={oddsData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderOddsCategory}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          </View>
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
    backgroundColor: "#8B5CF6",
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
    backgroundColor: "#8B5CF6",
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
  betCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  betHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  playerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  teamName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8B5CF6",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  betDetails: {
    marginBottom: 12,
  },
  betType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
  },
  oddsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  oddButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: "center",
  },
  moreButton: {
    backgroundColor: "#10B981",
  },
  lessButton: {
    backgroundColor: "#EF4444",
  },
  overButton: {
    backgroundColor: "#3B82F6",
  },
  underButton: {
    backgroundColor: "#F59E0B",
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
  },
  oddsButtons: {
    flexDirection: "row",
  },
  // Betting Guide Styles
  betGuideBox: {
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
  betGuideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  betGuideTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  betGuideTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginLeft: 8,
  },
  betGuideContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  betGuideExplanation: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    marginBottom: 12,
  },
  betGuideExample: {
    fontSize: 14,
    color: "#6B7280",
    fontStyle: "italic",
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#8B5CF6",
  },
});

export default PrizePicksBaseball;
