import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { BOOKS } from '../data/data';

export default function Gio3_ThuThach() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.gridContainer}>
        {BOOKS.map((book) => (
          <View key={book.id} style={styles.item}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: book.image }} style={styles.image} />
              {book.discount && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{book.discount}</Text>
                </View>
              )}
            </View>
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={1}>
                {book.title}
              </Text>
              <Text style={styles.price}>{book.price}</Text>
            </View>
          </View>
        ))}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F3F4F6',
  },
  scrollArea: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 96,
  },
  item: {
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
  image: {
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
  info: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  price: {
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
