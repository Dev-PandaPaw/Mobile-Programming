import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function SearchIcon() {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchCircle} />
      <View style={styles.searchHandle} />
    </View>
  );
}

function CartIcon() {
  return (
    <View style={styles.cartContainer}>
      <View style={styles.cartBasket} />
      <View style={styles.cartHandle} />
    </View>
  );
}

export default function Gio1_Bai1_Header() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.logoText}>BookStore</Text>
      <View style={styles.rightIconsContainer}>
        <SearchIcon />
        <CartIcon />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    backgroundColor: '#1E1B4B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  searchContainer: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 2,
    marginRight: 2,
  },
  searchHandle: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 6,
    height: 2,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
  },
  cartContainer: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBasket: {
    width: 16,
    height: 11,
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
