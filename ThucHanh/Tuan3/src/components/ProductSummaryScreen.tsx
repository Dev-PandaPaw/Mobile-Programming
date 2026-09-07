import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: '1', name: 'Áo thun', price: 200000 },
  { id: '2', name: 'Quần jean', price: 450000 },
  { id: '3', name: 'Giày thể thao', price: 800000 },
];

export default function ProductSummaryScreen() {
  const [keyword, setKeyword] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword]);

  const totalPrice = useMemo(() => {
    return filteredProducts.reduce(
      (total, product) => total + product.price,
      0
    );
  }, [filteredProducts]);

  const handleSelect = useCallback((product: Product) => {
    setSelectedProduct(product.name);
    console.log('Đã chọn:', product.name);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập tên sản phẩm để tìm kiếm"
      />
      {selectedProduct ? (
        <Text style={styles.selectedText}>Đã chọn: {selectedProduct}</Text>
      ) : null}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Button
              title={`${item.name} - ${item.price.toLocaleString('vi-VN')}đ`}
              onPress={() => handleSelect(item)}
            />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Không tìm thấy sản phẩm</Text>}
      />
      <Text style={styles.totalPrice}>
        Tổng giá: {totalPrice.toLocaleString('vi-VN')}đ
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
    paddingTop: 48,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  itemContainer: {
    marginVertical: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 16,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
});
