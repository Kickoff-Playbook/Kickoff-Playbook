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
import { colors, commonStyles } from "../utils/theme";
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

        {/* Footer Warning */}
        <View style={styles.footerWarning}>
          <Text style={styles.warningText}>
            ⚠️ GAMBLING WARNING: Gambling can be addictive. Play responsibly. If
            you or someone you know has a gambling problem, please call
            1-800-GAMBLER.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    margin: 10,
    padding: 16,
    borderColor: colors.accent,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  caption: {
    ...commonStyles.text.subheading,
    textAlign: "center",
  },
  explanation: {
    ...commonStyles.text.body,
    marginTop: 10,
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
  footerWarning: {
    backgroundColor: "#FFF3E0", // Light orange background
    margin: 16,
    marginBottom: 30,
    padding: 16,
    borderRadius: 8,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  warningText: {
    fontSize: 12,
    color: colors.slate,
    textAlign: "center",
    lineHeight: 16,
  },
});
