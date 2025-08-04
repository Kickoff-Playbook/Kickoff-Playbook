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

export default function FormulaOneRules() {
  const [expandedRule, setExpandedRule] = useState(null);

  const toggleExpanded = (ruleNumber) => {
    setExpandedRule(expandedRule === ruleNumber ? null : ruleNumber);
  };

  const f1Rules = [
    {
      id: 1,
      title: "Race Format",
      content:
        "Weekend includes practice, qualifying, and race. Grid positions determined by qualifying times. Race distance varies by track (around 300km or 2 hours max).",
    },
    {
      id: 2,
      title: "Points System",
      content:
        "Top 10 finishers score points: 1st=25, 2nd=18, 3rd=15... 10th=1. Fastest lap bonus point if driver finishes in top 10. Sprint races award points too.",
    },
    {
      id: 3,
      title: "Safety & Flags",
      content:
        "Yellow flags = caution/no overtaking. Red flag = session stopped. Safety car bunches field. VSC (Virtual Safety Car) controls speed remotely.",
    },
    {
      id: 4,
      title: "Technical Regulations",
      content:
        "Strict car specifications. Weight limits, engine regulations, aerodynamic restrictions. DRS (drag reduction system) allowed in designated zones.",
    },
    {
      id: 5,
      title: "Penalties & Violations",
      content:
        "Time penalties, grid penalties, disqualification possible. Track limits enforced. Unsafe releases from pits penalized. Exceeding speed limits = penalties.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏎️ F1 Rules</Text>
        <Text style={styles.headerSubtitle}>
          Formula 1 Racing rules and regulations
        </Text>
      </View>

      {f1Rules.map((rule) => (
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
    backgroundColor: "#DC143C",
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
    borderLeftColor: "#DC143C",
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
