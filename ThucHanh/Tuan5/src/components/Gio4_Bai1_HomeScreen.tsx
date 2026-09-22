import React from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Text, Image } from 'react-native';
import Gio1_Bai1_Header from './Gio1_Bai1_Header';
import Gio2_Bai1_CategoryChips from './Gio2_Bai1_CategoryChips';
import { BOOKS } from '../data/data';

export default function Gio4_Bai1_HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Gio1_Bai1_Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Gio2_Bai1_CategoryChips />

        <View style={styles.gridContainer}>
          {BOOKS.map((book) => (
            <View key={book.id} style={styles.gridItem}>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: book.image }} style={styles.bookImage} />
                {book.discount && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{book.discount}</Text>
                  </View>
                )}
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.bookTitle} numberOfLines={1}>
                  {book.title}
                </Text>
                <Text style={styles.bookPrice}>{book.price}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.floatingButton}>
        <View style={styles.cartIcon}>
          <View style={styles.cartBasket} />
          <View style={styles.cartHandle} />
        </View>
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>4</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1B4B',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    paddingBottom: 96,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: '#E5E7EB',
  },
  bookImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#DC2626',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 8,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  bookPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E1B4B',
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
  cartBadge: {
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
  cartBadgeText: {
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
