import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function FootballRules() {
  const [expandedRule, setExpandedRule] = useState(null);

  const toggleExpanded = (ruleNumber) => {
    setExpandedRule(expandedRule === ruleNumber ? null : ruleNumber);
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

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏈 NFL Rules</Text>
        <Text style={styles.headerSubtitle}>
          Essential rules and regulations for American Football
        </Text>
      </View>

      {/* Rules List */}
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
});
