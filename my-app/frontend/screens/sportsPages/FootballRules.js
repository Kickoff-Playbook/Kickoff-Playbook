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
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
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

  // Fetch team details and players when a team is selected
  const fetchTeamDetails = async (teamId) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": "dLYB9vRIvJLvIndg10Oaj8oTr7gS1rimOfuvskhN",
      },
    };

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.sportradar.com/nfl/official/trial/v7/en/teams/${teamId}/profile.json`,
        options
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Team Profile Response:", data);

      if (data && data.players) {
        setTeamPlayers(data.players);
        console.log(`📊 Found ${data.players.length} players for ${data.name}`);
      }
    } catch (err) {
      console.error("❌ Team Profile API Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  // Team item renderer with click functionality
  const renderTeam = ({ item }) => (
    <TouchableOpacity
      style={styles.teamItem}
      onPress={() => {
        setSelectedTeam(item);
        setSelectedPlayer(null);
        setPlayerStats(null);
        fetchTeamDetails(item.id);
      }}
    >
      <View style={styles.teamContent}>
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
      <Ionicons
        name="chevron-forward"
        size={20}
        color="#8B4513"
        style={styles.chevron}
      />
    </TouchableOpacity>
  );

  // Player item renderer
  const renderPlayer = ({ item }) => (
    <TouchableOpacity
      style={styles.playerItem}
      onPress={() => {
        setSelectedPlayer(item);
        setPlayerStats(item); // In this case, player data includes stats
      }}
    >
      <View style={styles.playerHeader}>
        <Text style={styles.playerName}>{item.name}</Text>
        <Text style={styles.playerJersey}>#{item.jersey}</Text>
      </View>
      <Text style={styles.playerPosition}>{item.position}</Text>
      <View style={styles.playerDetails}>
        <Text style={styles.playerInfo}>
          {item.height} • {item.weight} lbs • Age: {item.age || "N/A"}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color="#8B4513"
        style={styles.chevron}
      />
    </TouchableOpacity>
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

  const renderTeamsContent = () => {
    // If viewing player stats
    if (selectedPlayer && playerStats) {
      return (
        <ScrollView
          style={styles.playerStatsContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.playerStatsContent}
        >
          <TouchableOpacity
            style={styles.backToPlayersButton}
            onPress={() => {
              setSelectedPlayer(null);
              setPlayerStats(null);
            }}
          >
            <Ionicons name="chevron-back" size={20} color="#8B4513" />
            <Text style={styles.backButtonText}>Back to Players</Text>
          </TouchableOpacity>

          <View style={styles.playerStatsHeader}>
            <Text style={styles.playerStatsName}>{playerStats.name}</Text>
            <Text style={styles.playerStatsJersey}>#{playerStats.jersey}</Text>
          </View>

          <View style={styles.playerStatsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Position</Text>
              <Text style={styles.statValue}>
                {playerStats.position || "N/A"}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Height</Text>
              <Text style={styles.statValue}>
                {playerStats.height || "N/A"}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Weight</Text>
              <Text style={styles.statValue}>
                {playerStats.weight || "N/A"}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Age</Text>
              <Text style={styles.statValue}>{playerStats.age || "N/A"}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Experience</Text>
              <Text style={styles.statValue}>
                {playerStats.experience || "N/A"} yrs
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>College</Text>
              <Text style={styles.statValue}>
                {playerStats.college || "N/A"}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Birth Date</Text>
              <Text style={styles.statValue}>
                {playerStats.birth_date || "N/A"}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Birth Place</Text>
              <Text style={styles.statValue}>
                {playerStats.birth_place || "N/A"}
              </Text>
            </View>
          </View>
        </ScrollView>
      );
    }

    // If viewing team players
    if (selectedTeam && teamPlayers.length > 0) {
      return (
        <ScrollView
          style={styles.playersContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.playersContent}
        >
          <TouchableOpacity
            style={styles.backToTeamsButton}
            onPress={() => {
              setSelectedTeam(null);
              setTeamPlayers([]);
            }}
          >
            <Ionicons name="chevron-back" size={20} color="#8B4513" />
            <Text style={styles.backButtonText}>Back to Teams</Text>
          </TouchableOpacity>

          <View style={styles.teamPlayersHeader}>
            <Text style={styles.teamPlayersTitle}>
              {selectedTeam.name} Roster
            </Text>
            <Text style={styles.teamPlayersCount}>
              {teamPlayers.length} Players
            </Text>
          </View>

          {teamPlayers.map((player) => (
            <TouchableOpacity
              key={player.id}
              style={styles.playerItem}
              onPress={() => {
                setSelectedPlayer(player);
                setPlayerStats(player);
              }}
            >
              <View style={styles.playerContent}>
                <View style={styles.playerHeader}>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerJersey}>#{player.jersey}</Text>
                </View>
                <Text style={styles.playerPosition}>{player.position}</Text>
                <View style={styles.playerDetails}>
                  <Text style={styles.playerInfo}>
                    {player.height} • {player.weight} lbs • Age:{" "}
                    {player.age || "N/A"}
                  </Text>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#8B4513"
                style={styles.chevron}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }

    // Default teams list
    return (
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
                <Text style={styles.loadingText}>
                  {selectedTeam ? "Loading players..." : "Loading NFL teams..."}
                </Text>
              </View>
            )}

            {error && (
              <View style={styles.centerContainer}>
                <Text style={styles.errorText}>❌ Error: {error}</Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={fetchTeams}
                >
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
  };

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
          onPress={() => {
            setActiveTab("teams");
            setSelectedTeam(null);
            setTeamPlayers([]);
            setSelectedPlayer(null);
            setPlayerStats(null);
          }}
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
    flexDirection: "row",
    alignItems: "center",
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
  teamContent: {
    flex: 1,
  },
  chevron: {
    marginLeft: 12,
  },
  // Players Section Styles
  playersContainer: {
    flex: 1,
  },
  playersContent: {
    paddingBottom: 30,
  },
  backToTeamsButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backToPlayersButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8B4513",
    marginLeft: 8,
  },
  teamPlayersHeader: {
    padding: 16,
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  teamPlayersTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  teamPlayersCount: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  playerItem: {
    backgroundColor: "white",
    margin: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#8B4513",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  playerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  playerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  playerJersey: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8B4513",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  playerPosition: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
    fontWeight: "600",
  },
  playerDetails: {
    marginTop: 4,
  },
  playerInfo: {
    fontSize: 14,
    color: "#999",
  },
  playerContent: {
    flex: 1,
  },
  // Player Stats Styles
  playerStatsContainer: {
    flex: 1,
  },
  playerStatsContent: {
    paddingBottom: 30,
  },
  playerStatsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  playerStatsName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  playerStatsJersey: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8B4513",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  playerStatsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 16,
    justifyContent: "space-between",
  },
  statItem: {
    width: "47%",
    backgroundColor: "white",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    fontWeight: "600",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
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
