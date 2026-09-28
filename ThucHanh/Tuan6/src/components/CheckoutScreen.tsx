import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

export default function CheckoutScreen({ route, navigation }: any) {
  const totalAmount = route?.params?.totalAmount || '0 đ';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Xác nhận thanh toán</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Tổng tiền cần thanh toán:</Text>
          <Text style={styles.amount}>{totalAmount}</Text>
        </View>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    paddingVertical: 6,
    paddingRight: 10,
  },
  backButtonText: {
    fontSize: 14,
    color: '#1E1B4B',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1B4B',
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E1B4B',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    color: '#4B5563',
    marginBottom: 8,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
  },
});
