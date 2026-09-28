import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/store";
import MainNavigation from "./src/navigation/MainNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
