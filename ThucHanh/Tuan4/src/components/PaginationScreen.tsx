import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from 'react-native';

// Định nghĩa Generic Interface ApiResponse<T> theo yêu cầu
export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
}

// Định nghĩa kiểu dữ liệu Product có thêm trường thumbnail
export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
}

const PAGE_SIZE = 5;

export default function PaginationScreen() {
  const [response, setResponse] = useState<ApiResponse<Product> | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Hàm gọi API phân trang trả về kiểu ApiResponse<Product>
  const fetchProductsPage = async (pageNumber: number) => {
    try {
      setLoading(true);
      const skip = (pageNumber - 1) * PAGE_SIZE;
      const res = await fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`);
      const json = await res.json();

      const apiData: ApiResponse<Product> = {
        data: json.products,
        total: json.total,
        page: pageNumber,
      };

      setResponse(apiData);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu phân trang:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsPage(page);
  }, [page]);

  const totalPages = response ? Math.ceil(response.total / PAGE_SIZE) : 1;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bài 14: Phân trang dữ liệu (Generic Interface)</Text>

      {/* Thông tin phân trang */}
      <Text style={styles.info}>
        Trang {page} / {totalPages} (Tổng: {response?.total || 0} sản phẩm)
      </Text>

      {/* Danh sách sản phẩm */}
      {loading ? (
        <ActivityIndicator size="small" color="#000" style={styles.loader} />
      ) : (
        <FlatList
          data={response?.data || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              {item.thumbnail ? (
                <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} resizeMode="contain" />
              ) : null}
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>Giá: ${item.price}</Text>
              </View>
            </View>
          )}
        />
      )}

      {/* Nút chuyển trang */}
      <View style={styles.paginationButtons}>
        <Button
          title="Trang trước"
          onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page <= 1 || loading}
        />
        <View style={styles.spacing} />
        <Button
          title="Trang sau"
          onPress={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPages || loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  loader: {
    marginVertical: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 14,
    color: '#e65100',
    marginTop: 4,
  },
  paginationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  spacing: {
    width: 16,
  },
});
