import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { username } = useLocalSearchParams();

  return (
    <View style={styles.tabBar}>
      <Text>Welcome to {username} profile!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
