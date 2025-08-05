import React from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { colors, commonStyles } from "../utils/theme";
//
export default function CreatorRules() {
  const [expandedRule, setExpandedRule] = useState(null);

  const toggleExpanded = (ruleNumber) => {
    setExpandedRule(expandedRule === ruleNumber ? null : ruleNumber);
  };
  //
  return (
    <>
      <ScrollView style={styles.container}>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(1)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>A Note from the Creator</Text>
          </TouchableOpacity>

          {expandedRule === 1 && (
            <Text style={styles.explanation}> Rule 1 explain</Text>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(2)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>Rule 2 </Text>
          </TouchableOpacity>

          {expandedRule === 2 && (
            <Text style={styles.explanation}> Rule 2 explain</Text>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(3)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>Rule 3 </Text>
          </TouchableOpacity>

          {expandedRule === 3 && (
            <Text style={styles.explanation}> Rule 3 explain</Text>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(4)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>Rule 3 </Text>
          </TouchableOpacity>

          {expandedRule === 4 && (
            <Text style={styles.explanation}> Rule 3 explain</Text>
          )}
        </View>
        {/*  */}

        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(5)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>Rule 3 </Text>
          </TouchableOpacity>

          {expandedRule === 5 && (
            <Text style={styles.explanation}> Rule 3 explain</Text>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(6)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>Rule 3 </Text>
          </TouchableOpacity>

          {expandedRule === 6 && (
            <Text style={styles.explanation}> Rule 3 explain</Text>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(7)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>Rule 3 </Text>
          </TouchableOpacity>

          {expandedRule === 7 && (
            <Text style={styles.explanation}> Rule 3 explain</Text>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(8)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>Rule 3 </Text>
          </TouchableOpacity>

          {expandedRule === 8 && (
            <Text style={styles.explanation}> Rule 3 explain</Text>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(9)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>Rule 3 </Text>
          </TouchableOpacity>

          {expandedRule === 9 && (
            <Text style={styles.explanation}> Rule 3 explain</Text>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(10)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>Rule 3 </Text>
          </TouchableOpacity>

          {expandedRule === 10 && (
            <Text style={styles.explanation}> Rule 3 explain</Text>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(11)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>Rule 3 </Text>
          </TouchableOpacity>

          {expandedRule === 11 && (
            <Text style={styles.explanation}> Rule 3 explain</Text>
          )}
        </View>

        {/* Footer Warning */}
        <View style={styles.footerWarning}>
          <Text style={styles.warningText}>
            🛡️ Remember: Never bet more than you can afford to lose. If you have
            a gambling problem, call 1-800-GAMBLER.
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
  caption: {
    ...commonStyles.text.subheading,
  },
  explanation: {
    ...commonStyles.text.body,
    marginTop: 10,
  },
  ruleBox: {
    margin: 10,
    borderWidth: 2,
    borderColor: colors.accent,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textBox: {
    paddingVertical: 5,
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
