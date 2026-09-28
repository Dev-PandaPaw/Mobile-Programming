import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Gio1_Bai1_Header from './Gio1_Bai1_Header';
import Gio1_Bai2_BookCard from './Gio1_Bai2_BookCard';
import { BOOKS } from '../data/data';

export default function Gio1_ThuThach() {
  return (
    <View style={styles.container}>
      <Gio1_Bai1_Header />
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {BOOKS.map((book) => (
          <Gio1_Bai2_BookCard key={book.id} book={book} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    paddingVertical: 8,
  },
});
