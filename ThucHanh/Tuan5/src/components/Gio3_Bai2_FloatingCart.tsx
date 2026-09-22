import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

interface FloatingCartProps {
  count?: number;
}

export default function Gio3_Bai2_FloatingCart({ count = 4 }: FloatingCartProps) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentList}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <View key={item} style={styles.placeholderCard} />
        ))}
      </ScrollView>

      <View style={styles.floatingButton}>
        <View style={styles.cartIcon}>
          <View style={styles.cartBasket} />
          <View style={styles.cartHandle} />
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F3F4F6',
  },
  contentList: {
    flex: 1,
    padding: 16,
  },
  placeholderCard: {
    height: 100,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBasket: {
    width: 18,
    height: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderTopWidth: 0,
    borderRadius: 2,
    marginTop: 4,
  },
  cartHandle: {
    position: 'absolute',
    top: 2,
    width: 10,
    height: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderBottomWidth: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
