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
import { ScreenStackHeaderSearchBarView } from "react-native-screens";
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
            <View style={styles.explanationBox}>
              <Text style={styles.bulletPoint}>
                Welcome to Kickoff Playbook!
              </Text>
              <Text style={styles.bulletPoint}>
                - This platform was created to help you learn smarter ways to
                make picks and understand sports betting odds.
              </Text>
              <Text style={styles.bulletPoint}>
                - Kickoff Playbook is not a gambling app — you won’t place real
                bets here. Instead, you’ll find tips, strategies, and resources
                to learn in a safe, risk‑free way.
              </Text>
              <Text style={styles.bulletPoint}>
                - We also provide resources and alternatives for anyone who may
                struggle with gambling addiction — because learning should
                always stay positive and responsible.
              </Text>
              <Text style={styles.bulletPoint}>
                - Play smart, Learn more, and Enjoy the Game!
              </Text>
            </View>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(2)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>Be in the Right Headspace</Text>
          </TouchableOpacity>

          {expandedRule === 2 && (
            <View style={styles.explanation}>
              <Text style={styles.bulletPoint}>
                - Only place bets when you are calm, focused, and clear-minded
              </Text>
              <Text style={styles.bulletPoint}>
                - Avoid emotional betting or wagering when stressed, impaired,
                or distracted. Making decisions in the right mental state
                improves judgment and reduces impulsive losses.
              </Text>
            </View>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(3)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>Create a Betting Budget</Text>
          </TouchableOpacity>

          {expandedRule === 3 && (
            <View style={styles.explanationBox}>
              <Text style={styles.bulletPoint}>
                - Setting a fixed amount of money dedicated solely for betting
                activities.
              </Text>
              <Text style={styles.bulletPoint}>
                - Establishing a budget helps you control your spending, avoid
                chasing losses, and gamble responsibly. Always stick to your
                budget to keep betting fun and safe.
              </Text>
            </View>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(4)}
            style={styles.textBox}
          >
            <Text style={styles.caption}> Don't Blind Bet</Text>
          </TouchableOpacity>

          {expandedRule === 4 && (
            <View style={styles.explanationBox}>
              <Text style={styles.bulletPoint}>
                - Blind betting means placing a wager without doing any research
                or looking at relevant stats.
              </Text>
              <Text style={styles.bulletPoint}>
                - Always review stats from previous games, team performance, and
                trends before betting. Informed decisions increase your chances
                of success and reduce unnecessary risks.
              </Text>
            </View>
          )}
        </View>
        {/*  */}

        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(5)}
            style={styles.textBox}
          >
            <Text style={styles.caption}> Start Small, Grow Later</Text>
          </TouchableOpacity>

          {expandedRule === 5 && (
            <View style={styles.explanation}>
              <Text style={styles.bulletPoint}>
                - Beginners should keep their bet amounts modest — starting as
                low as 2 units and no more than 10 units
              </Text>
              <Text style={styles.bulletPoint}>
                - Use smaller bets to test your methods and build confidence.
                Once you see what works and feel more comfortable, you can
                gradually increase the size of your bets.
              </Text>
            </View>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(6)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>Keep the Odds Simple</Text>
          </TouchableOpacity>

          {expandedRule === 6 && (
            <View style={styles.explanation}>
              <Text style={styles.bulletPoint}>
                - Overstacking parlays means combining too many bets into one,
                which greatly reduces your chance of winning.
              </Text>
              <Text style={styles.bulletPoint}>
                - Stick to smaller, simpler bets with fewer legs. The simpler
                the parlay, the higher your chances of hitting it successfully.
              </Text>
            </View>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(7)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>Bet Within Your Comfort Zone</Text>
          </TouchableOpacity>

          {expandedRule === 7 && (
            <View style={styles.explanation}>
              <Text style={styles.bulletPoint}>
                - Placing bets on sports you don’t understand or follow is
                considered blind betting.
              </Text>
              <Text style={styles.bulletPoint}>
                - Only bet on sports you’re familiar with and feel confident
                about. If you aren’t knowledgeable about a sport, avoid betting
                on it until you’ve taken the time to learn.
              </Text>
            </View>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(8)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>
              Beware of Following or Stalling Bets
            </Text>
          </TouchableOpacity>

          {expandedRule === 8 && (
            <View style={styles.explanation}>
              <Text style={styles.bulletPoint}>
                - Copying or delaying bets based solely on what others are
                doing, without your own research or strategy.
              </Text>
              <Text style={styles.bulletPoint}>
                - Even if you follow successful bettors, relying on their picks
                without understanding or verifying them can lead to losses.
                Develop your own approach and avoid blindly following others’
                bets.
              </Text>
            </View>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(9)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>Use Live Bets as a Learning Too</Text>
          </TouchableOpacity>

          {expandedRule === 9 && (
            <View style={styles.explanation}>
              <Text style={styles.bulletPoint}>
                - Placing bets during the game while watching it live.
              </Text>
              <Text style={styles.bulletPoint}>
                - Live betting helps you better understand the flow of the game
                and make more informed decisions. Watching the action in
                real-time can improve your chances of making successful bets.
              </Text>
            </View>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(10)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>Track Your Bets</Text>
          </TouchableOpacity>

          {expandedRule === 10 && (
            <View style={styles.explanation}>
              <Text style={styles.bulletPoint}>
                - Keeping a detailed record of all your bets, including amounts,
                types, and outcomes.
              </Text>
              <Text style={styles.bulletPoint}>
                - Tracking helps you analyze your betting patterns, learn from
                mistakes, and improve your strategies over time. It’s essential
                for responsible and informed betting.
              </Text>
            </View>
          )}
        </View>
        {/*  */}
        <View style={styles.ruleBox}>
          <TouchableOpacity
            onPress={() => toggleExpanded(8)}
            style={styles.textBox}
          >
            <Text style={styles.caption}>
              Don't Make Betting Your Main Form of Entertainment
            </Text>
          </TouchableOpacity>

          {expandedRule === 8 && (
            <View style={styles.explanation}>
              <Text style={styles.bulletPoint}>
                - Don't make the habit of relying on sports betting as your
                primary source of fun or excitement.
              </Text>
              <Text style={styles.bulletPoint}>
                - Sports betting should be treated as a hobby or a way to learn,
                not as a main entertainment outlet. Keeping it in balance helps
                avoid addiction and maintains a healthy relationship with
                betting.
              </Text>
            </View>
          )}
        </View>
        {/*  */}
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
  explanationBox: {
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
  bulletPoint: {
    marginBottom: 8,
    lineHeight: 20,
    paddingLeft: 10,
  },
});
