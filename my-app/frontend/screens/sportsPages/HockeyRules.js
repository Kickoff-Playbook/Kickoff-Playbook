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

export default function HockeyRules() {
  const [expandedRule, setExpandedRule] = useState(null);

  const toggleExpanded = (ruleNumber) => {
    setExpandedRule(expandedRule === ruleNumber ? null : ruleNumber);
  };

  const hockeyRules = [
    {
      id: 1,
      title: "Game Structure",
      content:
        "Three 20-minute periods with 6 players per team on ice (including goalie). Overtime is 3-on-3 sudden death, then shootout.",
    },
    {
      id: 2,
      title: "Penalties & Power Play",
      content:
        "Minor penalties are 2 minutes, major penalties 5 minutes. Team plays short-handed during penalty. Power play ends if goal scored on minor penalty.",
    },
    {
      id: 3,
      title: "Offside & Icing",
      content:
        "Players cannot enter attacking zone before puck. Icing is shooting puck from your end past goal line at far end without it being touched.",
    },
    {
      id: 4,
      title: "Fighting & Checking",
      content:
        "Fighting results in 5-minute major penalty. Body checking allowed but hitting from behind, boarding, and checking to head are penalties.",
    },
    {
      id: 5,
      title: "Scoring & Assists",
      content:
        "Goals and assists worth 1 point each. Up to 2 assists per goal. Empty net goals count normally. Goalie credited with win/loss.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏒 NHL Rules</Text>
        <Text style={styles.headerSubtitle}>
          National Hockey League rules and regulations
        </Text>
      </View>

      {hockeyRules.map((rule) => (
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
    backgroundColor: "#4169E1",
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
    borderLeftColor: "#4169E1",
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
