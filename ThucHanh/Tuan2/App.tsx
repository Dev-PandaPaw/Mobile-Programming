import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import StudentDirectoryScreen from "./Bai2/StudentDirectoryScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StudentDirectoryScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 24 : 0,
  },
});
