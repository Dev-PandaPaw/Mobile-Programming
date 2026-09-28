import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CATEGORIES } from '../data/data';

export default function Gio2_Bai1_CategoryChips() {
  return (
    <View style={styles.container}>
      {CATEGORIES.map((category) => (
        <View key={category.id} style={styles.chip}>
          <Text style={styles.chipText}>{category.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4338CA',
    backgroundColor: '#FFFFFF',
  },
  chipText: {
    fontSize: 14,
    color: '#4338CA',
  },
});
