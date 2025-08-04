import React from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
//
export default function ResponsibleGamblingPage() {
  const [expandedRule, setExpandedRule] = useState(null);

  const toggleExpanded = (ruleNumber) => {
    setExpandedRule(expandedRule === ruleNumber ? null : ruleNumber);
  };
  //
  return (
    <>
      <ScrollView style={styles.container}>
        {/*  */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => toggleExpanded(1)}
            style={styles.textBox}
          >
            <View style={styles.titleRow}>
              <Text style={styles.caption}>
                Know Your Limits, Enjoy the Game
              </Text>
              <Ionicons
                name={expandedRule === 1 ? "chevron-down" : "chevron-forward"}
                size={20}
                color="#333"
                style={styles.arrow}
              />
            </View>
          </TouchableOpacity>

          {expandedRule === 1 && (
            <Text style={styles.explanation}> Rule 1 explain</Text>
          )}
        </View>
        {/*  */}
        <View>
          <Text>Tips on How to be a Responsible Player </Text>
        </View>
        {/*  */}
        <View>
          <Text> Free-to-Play Fantasy Apps</Text>
        </View>
        {/*  */}
        <View>
          <Text></Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7ed4f5ff",
  },
  header: {
    margin: 10,
    padding: 5,
    borderColor: "#20900cff",
    backgroundColor: "#e9eef3ff",
    borderWidth: 5,
    borderRadius: 10,

    backgroundColor: "#e9eef3ff",
  },

  caption: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  explanation: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },

  textBox: {
    paddingVertical: 5,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  arrow: {
    marginLeft: 10,
  },
});
