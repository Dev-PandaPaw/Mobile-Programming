import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { BOOKS } from '../data/data';

export default function Gio3_Bai1_Badge() {
  const book = BOOKS[0];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: book.image }} style={styles.image} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{book.discount}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  imageContainer: {
    position: 'relative',
    width: 160,
    height: 220,
    borderRadius: 8,
    overflow: 'hidden',
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
