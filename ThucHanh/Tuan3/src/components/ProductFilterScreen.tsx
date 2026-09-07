import React, { memo, useCallback, useMemo, useState } from 'react';
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

export default function ProductFilterScreen() {
  const [keyword, setKeyword] = useState('');
  const [selectedName, setSelectedName] = useState('');

  const products = useMemo(
    () => [
      { id: '1', name: 'Điện thoại', price: 12000000 },
      { id: '2', name: 'Máy tính bảng', price: 9000000 },
      { id: '3', name: 'Tai nghe', price: 1500000 },
    ],
    []
  );

  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(normalizedKeyword)
    );
  }, [keyword, products]);

  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedName(product.name);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Tìm sản phẩm"
        style={styles.input}
      />
      <Text style={styles.selectedText}>
        Sản phẩm đã chọn: {selectedName || 'Chưa chọn'}
      </Text>
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductItem item={item} onSelect={handleSelectProduct} />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Không tìm thấy sản phẩm</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    gap: 12,
    padding: 24,
    paddingTop: 48,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  itemContainer: {
    marginVertical: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 16,
  },
});
