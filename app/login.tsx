import { Redirect, router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
  const insets = useSafeAreaInsets();
  const isLoggedIn = false;

  const onLogin = () => {
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: "testuser",
        password: "password123",
      }),
    })
      .then((response) =>
        response.status >= 400 ? Alert.alert("Error", "Invalid credentials") : response.json()
      )
      .then((data) => {
        if (data.accessToken) {
          // Handle successful login, e.g., store tokens and redirect
          console.log("Login successful", data);
          // router.push("/(tabs)");
        } else {
          console.error("Login failed", data);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={{ paddingTop: insets.top }}>
      <Pressable onPress={() => router.back()} style={{ padding: 20 }}>
        <Text>Back</Text>
      </Pressable>
      <Pressable onPress={onLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
  },
});
