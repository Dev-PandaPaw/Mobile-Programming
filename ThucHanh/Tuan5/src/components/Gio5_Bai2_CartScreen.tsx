import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, ScrollView } from 'react-native';
import { CART_ITEMS } from '../data/data';
import Gio5_Bai1_TabBar from './Gio5_Bai1_TabBar';

export default function Gio5_Bai2_CartScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
      </View>

      <ScrollView style={styles.scrollList} contentContainerStyle={styles.scrollContent}>
        {CART_ITEMS.map((item) => (
          <View key={item.id} style={styles.cartCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.itemQuantity}>SL: {item.quantity}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.checkoutBar}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Tổng tiền</Text>
          <Text style={styles.totalValue}>257.000 đ</Text>
        </View>
        <View style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Thanh toán</Text>
        </View>
      </View>

      <Gio5_Bai1_TabBar activeTab="Giỏ hàng" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1B4B',
  },
  scrollList: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  cartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  itemImage: {
    width: 60,
    height: 75,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  itemInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  itemQuantity: {
    fontSize: 13,
    color: '#6B7280',
  },
  priceContainer: {
    width: 90,
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#15803D',
  },
  checkoutBar: {
    height: 64,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalInfo: {
    flexDirection: 'column',
  },
  totalLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  checkoutButton: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 6,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
