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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#51247cff",
  },
  caption: {
    fontWeight: "bold",
    fontSize: 20,
  },
  explanation: {
    marginTop: 10,
    fontSize: 14,
  },
  ruleBox: {
    margin: 10,
    borderWidth: 5,
    borderColor: "#20900cff",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#e9eef3ff",
  },
  textBox: {
    paddingVertical: 5,
  },
});
