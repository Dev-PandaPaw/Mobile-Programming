import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList } from 'react-native';
import { CATEGORIES } from '../data/data';
import Gio2_Bai1_CategoryChips from './Gio2_Bai1_CategoryChips';

export default function CategoryScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Danh mục sách</Text>
      </View>
      <View style={styles.chipsWrapper}>
        <Gio2_Bai1_CategoryChips />
      </View>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.categoryCard}>
            <Text style={styles.categoryName}>{item.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
    color: '#1F2937',
  },
  chipsWrapper: {
    backgroundColor: '#1E1B4B',
    paddingVertical: 4,
  },
  list: {
    padding: 16,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
});
