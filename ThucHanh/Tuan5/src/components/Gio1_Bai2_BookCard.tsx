import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Book, BOOKS } from '../data/data';

interface BookCardProps {
  book?: Book;
}

export default function Gio1_Bai2_BookCard({ book = BOOKS[0] }: BookCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: book.image }} style={styles.coverImage} />
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.author}>{book.author}</Text>
        </View>
        <Text style={styles.price}>{book.price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  coverImage: {
    width: 80,
    height: 110,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 110,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#6B7280',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E1B4B',
  },
});
