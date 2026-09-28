import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useCart } from "../hooks/useCart";

export default function Gio5_Bai2_CartScreen({ navigation }: any) {
  const { items, totalPriceFormatted, updateQuantity, removeFromCart } =
    useCart();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
      </View>

      <ScrollView
        style={styles.scrollList}
        contentContainerStyle={styles.scrollContent}
      >
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Giỏ hàng trống</Text>
          </View>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.cartCard}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() =>
                      updateQuantity(item.bookId, item.quantity - 1)
                    }
                  >
                    <Text style={styles.qtyBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() =>
                      updateQuantity(item.bookId, item.quantity + 1)
                    }
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <TouchableOpacity
                  onPress={() => removeFromCart(item.bookId)}
                  style={styles.deleteBtn}
                >
                  <Text style={styles.deleteText}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.checkoutBar}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Tổng tiền</Text>
          <Text style={styles.totalValue}>{totalPriceFormatted}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() =>
            navigation?.navigate("CheckoutScreen", {
              totalAmount: totalPriceFormatted,
            })
          }
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
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
    color: "#1E1B4B",
  },
  scrollList: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 15,
    color: "#6B7280",
  },
  cartCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  itemImage: {
    width: 60,
    height: 75,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
  },
  itemInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyBtn: {
    width: 26,
    height: 26,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    lineHeight: 18,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#1F2937",
  },
  priceContainer: {
    width: 90,
    alignItems: "flex-end",
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#15803D",
  },
  deleteBtn: {
    marginTop: 8,
  },
  deleteText: {
    fontSize: 12,
    color: "#EF4444",
  },
  checkoutBar: {
    height: 64,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalInfo: {
    flexDirection: "column",
  },
  totalLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#DC2626",
  },
  checkoutButton: {
    backgroundColor: "#1E1B4B",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 6,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
