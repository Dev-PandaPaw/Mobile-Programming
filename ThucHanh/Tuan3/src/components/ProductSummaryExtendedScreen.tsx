import React, { useState, useMemo, useCallback, memo } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

interface Product {
  id: string;
  name: string;
  price: number;
}

const initialProducts: Product[] = [
  { id: '1', name: 'Áo thun', price: 200000 },
  { id: '2', name: 'Quần jean', price: 450000 },
  { id: '3', name: 'Giày thể thao', price: 800000 },
  { id: '4', name: 'Balo laptop', price: 350000 },
  { id: '5', name: 'Mũ lưỡi trai', price: 120000 },
];

interface ProductItemProps {
  item: Product;
  onSelect: (product: Product) => void;
}

const ProductItem = memo(function ProductItem({ item, onSelect }: ProductItemProps) {
  return (
    <View style={styles.itemContainer}>
      <Button
        title={`${item.name} - ${item.price.toLocaleString('vi-VN')}đ`}
        onPress={() => onSelect(item)}
      />
    </View>
  );
});

export default function ProductSummaryExtendedScreen() {
  const [keyword, setKeyword] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let result = initialProducts.filter(product => {
      const matchKeyword = product.name
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const maxPriceNum = parseFloat(maxPrice);
      const matchPrice = isNaN(maxPriceNum) || product.price <= maxPriceNum;
      return matchKeyword && matchPrice;
    });

    if (sortOrder === 'asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [keyword, maxPrice, sortOrder]);

  const totalPrice = useMemo(() => {
    return filteredProducts.reduce(
      (total, product) => total + product.price,
      0
    );
  }, [filteredProducts]);

  const handleSelect = useCallback((product: Product) => {
    setSelectedProduct(product.name);
  }, []);

  const toggleSort = () => {
    if (sortOrder === 'none') setSortOrder('asc');
    else if (sortOrder === 'asc') setSortOrder('desc');
    else setSortOrder('none');
  };

  const getSortLabel = () => {
    if (sortOrder === 'asc') return 'Sắp xếp: Giá tăng dần ⬆';
    if (sortOrder === 'desc') return 'Sắp xếp: Giá giảm dần ⬇';
    return 'Sắp xếp: Mặc định';
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Tìm kiếm sản phẩm"
      />
      <TextInput
        style={styles.input}
        value={maxPrice}
        onChangeText={setMaxPrice}
        placeholder="Nhập mức giá tối đa (VD: 500000)"
        keyboardType="numeric"
      />
      <Button title={getSortLabel()} onPress={toggleSort} color="#6200EE" />

      {selectedProduct ? (
        <Text style={styles.selectedText}>Đã chọn: {selectedProduct}</Text>
      ) : null}

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductItem item={item} onSelect={handleSelect} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không tìm thấy sản phẩm</Text>
        }
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
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  selectedText: {
    fontSize: 15,
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
});
