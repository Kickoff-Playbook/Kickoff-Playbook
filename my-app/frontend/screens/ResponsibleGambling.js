import React from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
//
export default function ResponsibleGamblingPage() {
  const [expandedRule, setExpandedRule] = useState(null);

  const toggleExpanded = (ruleNumber) => {
    setExpandedRule(expandedRule === ruleNumber ? null : ruleNumber);
  };
  // handle opening external link
  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to open this link");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open link");
    }
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
            <View style={styles.explanation}>
              <Text style={styles.bulletPoint}>
                {" "}
                - Set Limits – Encourage users to set time and money limits
                before betting.
              </Text>
              <Text style={styles.bulletPoint}>
                {" "}
                - Take Breaks – Remind users that stepping away is normal and
                healthy.
              </Text>
              <Text style={styles.bulletPoint}>
                {" "}
                - Keep Perspective – Betting is entertainment, not a guaranteed
                way to make money.
              </Text>
              <Text style={styles.bulletPoint}>
                {" "}
                - Links to Gambling Limit Features – Some sportsbooks have
                deposit limits, time reminders, or self-exclusion options.
              </Text>
            </View>
          )}
        </View>
        {/*  */}

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => toggleExpanded(2)}
            style={styles.textBox}
          >
            <View style={styles.titleRow}>
              <Text style={styles.caption}>
                Need support for a gambling problem?
              </Text>
              <Ionicons
                name={expandedRule === 2 ? "chevron-down" : "chevron-forward"}
                size={20}
                color="#333"
                style={styles.arrow}
              />
            </View>
          </TouchableOpacity>

          {expandedRule === 2 && (
            <View style={styles.explanation}>
              <Text style={styles.bulletPoint}>
                - Contact 1-800-GAMBLER, available in Text, Call, or Chat
              </Text>
              {/*  */}
              <Text style={styles.bulletPoint}>
                - Visit the National Council on Problem Gambling: {""}
                <Text
                  style={styles.linkText}
                  onPress={() =>
                    openLink("https://www.ncpgambling.org/help-treatment/")
                  }
                >
                  www.ncpgambling.org
                </Text>
              </Text>
              {/*  */}
              <Text style={styles.bulletPoint}>
                - For crisis support: {""}
                <Text
                  style={styles.linkText}
                  onPress={() =>
                    openLink(
                      "https://www.samhsa.gov/find-help/helplines/national-helpline"
                    )
                  }
                >
                  SAMHSA National Helpline
                </Text>
              </Text>
            </View>
          )}
        </View>

        {/*  */}

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => toggleExpanded(3)}
            style={styles.textBox}
          >
            <View style={styles.titleRow}>
              <Text style={styles.caption}>
                Tips on How to be a Responsible Player
              </Text>
              <Ionicons
                name={expandedRule === 3 ? "chevron-down" : "chevron-forward"}
                size={20}
                color="#333"
                style={styles.arrow}
              />
            </View>
          </TouchableOpacity>

          {expandedRule === 3 && (
            <View style={styles.explanation}>
              <Text style={styles.bulletPoint}>
                - Set time and money limits - and stick to them.
              </Text>
              <Text style={styles.bulletPoint}>
                - Don’t gamble to escape feelings of anxiety, stress or
                depression.
              </Text>
              <Text style={styles.bulletPoint}>
                - Know where to get help for gambling problems (see resources
                below).
              </Text>
              <Text style={styles.bulletPoint}>
                - Don’t gamble with money needed to pay bills.
              </Text>
              <Text style={styles.bulletPoint}>
                - Don’t make gambling your only source of entertainment.
              </Text>
              <Text style={styles.bulletPoint}>
                - Know the odds of the games you choose to play; expect to lose
                more times than you win.
              </Text>
              <Text style={styles.bulletPoint}>
                - Tell friends and family not to gift Lottery tickets to anyone
                under 18 years old.*
                {
                  "(Research has shown that the earlier a person begins to gamble the more likely they are to develop a gambling problem later in life.)"
                }
              </Text>
            </View>
          )}
        </View>
        {/*  */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => toggleExpanded(4)}
            style={styles.textBox}
          >
            <View style={styles.titleRow}>
              <Text style={styles.caption}> Free-to-Play Fantasy Apps</Text>
              <Ionicons
                name={expandedRule === 4 ? "chevron-down" : "chevron-forward"}
                size={20}
                color="#333"
                style={styles.arrow}
              />
            </View>
          </TouchableOpacity>

          {expandedRule === 4 && (
            <View style={styles.explanation}>
              <Text> Free‑to‑play apps = No betting, no cash winnings.</Text>
              <Text> The following list are free-to-play Fantasy sports.</Text>
              <Text> - PrizePicks - Fantasy Sports </Text>
              <Text> - DraftKings Fantasy Sports </Text>
              <Text> - FanDuel Fantasy Sports </Text>
              <Text> - DraftKings Pick6</Text>
              <Text> - Boom Fantasy - Fantasy Sports </Text>
              <Text> - CBS Sports Fantasy Football </Text>
              <Text> - FleaFlicker </Text>
            </View>
          )}
        </View>
        {/*  */}
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
    backgroundColor: "#F7F7F7",
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
  footerWarning: {
    backgroundColor: "#F8D7DA",
    margin: 16,
    marginBottom: 30,
    padding: 16,
    borderRadius: 8,
    borderColor: "#F5C6CB",
    borderWidth: 1,
  },
  warningText: {
    fontSize: 12,
    color: "#721C24",
    textAlign: "center",
    lineHeight: 16,
  },
  bulletPoint: {
    marginBottom: 8,
    lineHeight: 20,
    paddingLeft: 10,
  },
  linkText: {
    color: "#007AFF", // iOS blue link color
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
