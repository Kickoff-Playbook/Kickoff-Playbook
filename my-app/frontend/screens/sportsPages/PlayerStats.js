import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function PlayerStats() {
  const [selectedSport, setSelectedSport] = useState("NFL");
  const navigation = useNavigation();

  const sportsData = {
    NFL: {
      title: "NFL Player Stats",
      icon: "american-football",
      color: "#013369",
      stats: [
        { category: "Passing", leader: "Josh Allen", value: "4,306 yards" },
        { category: "Rushing", leader: "Josh Jacobs", value: "1,653 yards" },
        {
          category: "Receiving",
          leader: "Davante Adams",
          value: "1,516 yards",
        },
        { category: "Touchdowns", leader: "Josh Allen", value: "42 TDs" },
      ],
    },
    NBA: {
      title: "NBA Player Stats",
      icon: "basketball",
      color: "#FF8C00",
      stats: [
        { category: "Scoring", leader: "Luka Dončić", value: "32.4 PPG" },
        { category: "Rebounds", leader: "Domantas Sabonis", value: "12.3 RPG" },
        { category: "Assists", leader: "Tyrese Haliburton", value: "10.9 APG" },
        { category: "Steals", leader: "O.G. Anunoby", value: "2.1 SPG" },
      ],
    },
    MLB: {
      title: "MLB Player Stats",
      icon: "baseball",
      color: "#228B22",
      stats: [
        { category: "Batting Avg", leader: "Luis Arraez", value: ".354" },
        { category: "Home Runs", leader: "Aaron Judge", value: "62 HRs" },
        { category: "RBIs", leader: "Pete Alonso", value: "131 RBIs" },
        { category: "ERA", leader: "Shane Bieber", value: "2.88 ERA" },
      ],
    },
  };

  const currentSport = sportsData[selectedSport];

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={[styles.header, { backgroundColor: currentSport.color }]}>
        <Text style={styles.headerTitle}>📊 {currentSport.title}</Text>
        <Text style={styles.headerSubtitle}>
          Current season statistical leaders
        </Text>
      </View>

      {/* Sport Selection Tabs */}
      <View style={styles.tabContainer}>
        {Object.keys(sportsData).map((sport) => (
          <TouchableOpacity
            key={sport}
            style={[
              styles.tab,
              selectedSport === sport && [
                styles.activeTab,
                { backgroundColor: sportsData[sport].color },
              ],
            ]}
            onPress={() => setSelectedSport(sport)}
          >
            <Text
              style={[
                styles.tabText,
                selectedSport === sport && styles.activeTabText,
              ]}
            >
              {sport}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats List */}
      {currentSport.stats.map((stat, index) => (
        <View key={index} style={styles.statBox}>
          <View
            style={[
              styles.statIndicator,
              { backgroundColor: currentSport.color },
            ]}
          />
          <View style={styles.statContent}>
            <Text style={styles.statCategory}>{stat.category}</Text>
            <Text style={styles.statLeader}>{stat.leader}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
          <Ionicons
            name="trophy"
            size={24}
            color={currentSport.color}
            style={styles.trophyIcon}
          />
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Stats updated regularly throughout the season
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
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  activeTab: {
    // backgroundColor set dynamically
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: "white",
  },
  statBox: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statIndicator: {
    width: 4,
    height: 60,
    borderRadius: 2,
    marginRight: 16,
  },
  statContent: {
    flex: 1,
  },
  statCategory: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  statLeader: {
    fontSize: 16,
    color: "#666",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
  },
  trophyIcon: {
    marginLeft: 16,
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
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
