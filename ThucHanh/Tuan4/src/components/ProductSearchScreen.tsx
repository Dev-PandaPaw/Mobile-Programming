import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from 'react-native';

// Định nghĩa kiểu dữ liệu cho sản phẩm và kết quả trả về từ DummyJSON
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category?: string;
  thumbnail?: string;
}

export interface ProductSearchResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export default function ProductSearchScreen() {
  const [keyword, setKeyword] = useState<string>('phone');
  const [limit, setLimit] = useState<number>(2);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Type annotations cho tham số của hàm bất đồng bộ: (keyword: string, limit: number)
  const fetchProducts = async (searchKeyword: string, searchLimit: number): Promise<void> => {
    try {
      setLoading(true);
      const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchKeyword)}&limit=${searchLimit}`;
      const response = await fetch(url);
      const data = (await response.json()) as ProductSearchResponse;
      setProducts(data.products || []);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(keyword, limit);
  }, []);

  const handleSearch = () => {
    fetchProducts(keyword, limit);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} resizeMode="contain" />
      ) : null}
      <View style={styles.infoContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Bài 11: Tìm kiếm sản phẩm</Text>

      {/* Khung tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập từ khóa..."
          value={keyword}
          onChangeText={setKeyword}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Tìm</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="small" color="#000" style={styles.loader} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Không tìm thấy sản phẩm nào.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginLeft: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  loader: {
    marginTop: 20,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e65100',
    marginVertical: 2,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
    fontSize: 14,
  },
});
