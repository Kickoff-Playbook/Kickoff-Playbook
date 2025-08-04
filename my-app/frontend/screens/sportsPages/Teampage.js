import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";

export default function TeamsScreen() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Move the API call inside useEffect
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": "dLYB9vRIvJLvIndg10Oaj8oTr7gS1rimOfuvskhN",
      },
    };

    try {
      setLoading(true);
      const response = await fetch(
        "https://api.sportradar.com/nfl/official/trial/v7/en/league/teams.json",
        options
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ API Response:", data);

      // Extract teams from the response
      if (data && data.teams) {
        setTeams(data.teams);
        console.log(`📊 Found ${data.teams.length} teams`);
      }
    } catch (err) {
      console.error("❌ API Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Simple team item renderer
  const renderTeam = ({ item }) => (
    <View style={styles.teamItem}>
      <Text style={styles.teamName}>{item.name}</Text>
      <Text style={styles.teamDetails}>
        {item.market} • {item.alias}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NFL Teams</Text>

      {/* Refresh Button for Testing */}
      <TouchableOpacity style={styles.refreshButton} onPress={fetchTeams}>
        <Text style={styles.refreshText}>🔄 Refresh Data</Text>
      </TouchableOpacity>

      {/* Loading State */}
      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#1f867aff" />
          <Text>Loading teams...</Text>
        </View>
      )}

      {/* Error State */}
      {error && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>❌ Error: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchTeams}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Success State - Render Teams */}
      {!loading && !error && teams.length > 0 && (
        <FlatList
          data={teams}
          keyExtractor={(item) => item.id}
          renderItem={renderTeam}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Empty State */}
      {!loading && !error && teams.length === 0 && (
        <View style={styles.centerContainer}>
          <Text>No teams found</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  refreshButton: {
    backgroundColor: "#1f867aff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  refreshText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  teamItem: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  teamDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#ff6b6b",
    padding: 12,
    borderRadius: 8,
  },
  retryText: {
    color: "white",
    fontWeight: "bold",
  },
});
