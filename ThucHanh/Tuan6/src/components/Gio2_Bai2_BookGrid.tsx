import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { BOOKS } from '../data/data';

export default function Gio2_Bai2_BookGrid() {
  return (
    <View style={styles.container}>
      {BOOKS.map((book) => (
        <View key={book.id} style={styles.item}>
          <Image source={{ uri: book.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1}>
              {book.title}
            </Text>
            <Text style={styles.price}>{book.price}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  item: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: '#E5E7EB',
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
});
