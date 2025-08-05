import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function FootballRules() {
  const [expandedRule, setExpandedRule] = useState(null);
  const [activeTab, setActiveTab] = useState("rules"); // "rules" or "teams"
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const toggleExpanded = (ruleNumber) => {
    setExpandedRule(expandedRule === ruleNumber ? null : ruleNumber);
  };

  // Fetch NFL teams when Teams tab is selected
  useEffect(() => {
    if (activeTab === "teams" && teams.length === 0) {
      fetchTeams();
    }
  }, [activeTab]);

  const fetchTeams = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": "dLYB9vRIvJLvIndg10Oaj8oTr7gS1rimOfuvskhN",
      },
    };

    try {
      setLoading(true);
      const response = await fetch(
        "https://api.sportradar.com/nfl/official/trial/v7/en/league/teams.json",
        options
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ API Response:", data);

      if (data && data.teams) {
        setTeams(data.teams);
        console.log(`📊 Found ${data.teams.length} teams`);
      }
    } catch (err) {
      console.error("❌ API Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const footballRules = [
    {
      id: 1,
      title: "Game Basics",
      content:
        "NFL games consist of four 15-minute quarters. Each team has 11 players on the field. The objective is to advance the ball into the opponent's end zone to score touchdowns.",
    },
    {
      id: 2,
      title: "Downs System",
      content:
        "Teams have 4 downs (attempts) to advance the ball 10 yards. If successful, they get a new set of 4 downs. Failure results in turnover to the opposing team.",
    },
    {
      id: 3,
      title: "Scoring",
      content:
        "Touchdown (6 points), Field Goal (3 points), Safety (2 points), Extra Point (1 point), Two-Point Conversion (2 points).",
    },
    {
      id: 4,
      title: "Penalties",
      content:
        "Common penalties include holding (10 yards), false start (5 yards), pass interference (spot foul), and unsportsmanlike conduct (15 yards).",
    },
    {
      id: 5,
      title: "Timeouts & Clock",
      content:
        "Each team gets 3 timeouts per half. The game clock stops for incomplete passes, out of bounds plays, and timeouts. Two-minute warning in each half.",
    },
  ];

  // Team item renderer
  const renderTeam = ({ item }) => (
    <View style={styles.teamItem}>
      <View style={styles.teamHeader}>
        <Text style={styles.teamName}>{item.name}</Text>
        <Text style={styles.teamAlias}>{item.alias}</Text>
      </View>
      <Text style={styles.teamLocation}>{item.market}</Text>
      <View style={styles.teamDetails}>
        <Text style={styles.teamConference}>
          {item.conference?.name || "Conference"} •{" "}
          {item.division?.name || "Division"}
        </Text>
      </View>
    </View>
  );

  const renderRulesContent = () => (
    <>
      {footballRules.map((rule) => (
        <View key={rule.id} style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(rule.id)}
            style={styles.textBox}
          >
            <View style={styles.titleRow}>
              <Text style={styles.caption}>{rule.title}</Text>
              <Ionicons
                name={
                  expandedRule === rule.id ? "chevron-down" : "chevron-forward"
                }
                size={20}
                color="#333"
                style={styles.arrow}
              />
            </View>
          </TouchableOpacity>

          {expandedRule === rule.id && (
            <Text style={styles.explanation}>{rule.content}</Text>
          )}
        </View>
      ))}
    </>
  );

  const renderTeamsContent = () => (
    <FlatList
      data={teams}
      keyExtractor={(item) => item.id}
      renderItem={renderTeam}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <>
          {loading && (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color="#8B4513" />
              <Text style={styles.loadingText}>Loading NFL teams...</Text>
            </View>
          )}

          {error && (
            <View style={styles.centerContainer}>
              <Text style={styles.errorText}>❌ Error: {error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={fetchTeams}>
                <Text style={styles.retryText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
      ListEmptyComponent={() =>
        !loading &&
        !error && (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>No teams found</Text>
          </View>
        )
      }
    />
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏈 NFL</Text>
        <Text style={styles.headerSubtitle}>
          Rules, teams, and football information
        </Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "rules" && styles.activeTab]}
          onPress={() => setActiveTab("rules")}
        >
          <Ionicons
            name="library"
            size={20}
            color={activeTab === "rules" ? "white" : "#8B4513"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "rules" && styles.activeTabText,
            ]}
          >
            Rules
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "teams" && styles.activeTab]}
          onPress={() => setActiveTab("teams")}
        >
          <Ionicons
            name="people"
            size={20}
            color={activeTab === "teams" ? "white" : "#8B4513"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "teams" && styles.activeTabText,
            ]}
          >
            Teams
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content based on active tab */}
      {activeTab === "rules" ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderRulesContent()}
        </ScrollView>
      ) : (
        renderTeamsContent()
      )}
    </View>
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
    backgroundColor: "#8B4513",
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
  ruleBox: {
    margin: 16,
    backgroundColor: "white",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#8B4513",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  textBox: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  caption: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  explanation: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  arrow: {
    marginLeft: 10,
  },
  // Tab Navigation Styles
  tabContainer: {
    flexDirection: "row",
    margin: 16,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: "#8B4513",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8B4513",
  },
  activeTabText: {
    color: "white",
  },
  // Teams Section Styles
  teamsContainer: {
    flex: 1,
    minHeight: 400,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    color: "#dc3545",
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
  },
  retryButton: {
    backgroundColor: "#dc3545",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: "white",
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  teamItem: {
    backgroundColor: "white",
    margin: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#8B4513",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  teamHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  teamAlias: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8B4513",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  teamLocation: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  teamDetails: {
    marginTop: 4,
  },
  teamConference: {
    fontSize: 14,
    color: "#999",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1000,
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
});
