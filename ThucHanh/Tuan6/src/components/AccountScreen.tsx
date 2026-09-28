import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useWishlist } from "../hooks/useWishlist";

export default function AccountScreen() {
  const { isLoggedIn, user, login, logout } = useAuth();
  const { totalWishlist } = useWishlist();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tài khoản</Text>
      </View>

      <View style={styles.content}>
        {!isLoggedIn ? (
          <View style={styles.cardContainer}>
            <View style={styles.avatarGuest}>
              <Text style={styles.avatarGuestText}>?</Text>
            </View>
            <Text style={styles.title}>Chưa đăng nhập</Text>
            <Text style={styles.subtitle}>
              Vui lòng đăng nhập để xem thông tin tài khoản
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => login()}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cardContainer}>
            <View style={styles.avatarUser}>
              <Text style={styles.avatarUserText}>
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </Text>
            </View>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Trạng thái:</Text>
              <Text style={styles.infoValue}>Đã đăng nhập</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Sách yêu thích:</Text>
              <Text style={styles.infoValue}>{totalWishlist} cuốn</Text>
            </View>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => logout()}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    width: "100%",
    alignItems: "center",
  },
  avatarGuest: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarGuestText: {
    color: "#9CA3AF",
    fontSize: 32,
    fontWeight: "bold",
  },
  avatarUser: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1E1B4B",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarUserText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 15,
    color: "#4B5563",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#15803D",
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#1E1B4B",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  secondaryButton: {
    width: "100%",
    backgroundColor: "#FEE2E2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "bold",
  },
});
