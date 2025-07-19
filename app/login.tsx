import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
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
        response.status >= 400
          ? Alert.alert("Error", "Invalid credentials")
          : response.json()
      )
      .then((data) => {
        console.log("Login successful:", data);
        return Promise.all([
          SecureStore.setItemAsync("accessToken", data.accessToken),
          SecureStore.setItemAsync("refreshToken", data.refreshToken),
          AsyncStorage.setItem("user", JSON.stringify(data.user)),
        ]);
      })
      .then(() => {
        router.push("/(tabs)");
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
