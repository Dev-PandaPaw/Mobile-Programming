import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const API_URL = 'https://6aba0b9a5b549d818d61ccdf.mockapi.io/products';

export default function MockApiDemo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi fetch API:', err);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Danh sách sản phẩm</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View>
                    <Text style={styles.boldText}>ID: {item.id} - {item.name}</Text>
                    <Text>Giá: ${item.price}</Text>
                    <Text>Số lượng: {item.quantity}</Text>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
