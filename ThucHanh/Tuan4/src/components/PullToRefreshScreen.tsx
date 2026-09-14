import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
} from 'react-native';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function PullToRefreshScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  // Quản lý đồng bộ 2 trạng thái: loading ban đầu và refreshing khi kéo làm mới
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchPosts = async (isRefresh: boolean = false) => {
    if (isRefresh) {
      setRefreshing(true);
      // Ẩn danh sách cũ trong lúc tải lại
      setPosts([]);
    } else {
      setLoading(true);
    }

    try {
      // Thêm độ trễ để thấy rõ trạng thái xoay loading
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      const data = (await response.json()) as Post[];
      setPosts(data);
    } catch (error) {
      console.error('Lỗi khi fetch posts:', error);
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchPosts(false);
  }, []);

  const handleRefresh = () => {
    fetchPosts(true);
  };

  const isBusy = loading || refreshing;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bài 15: Tải lại trang (Pull to Refresh)</Text>

      {/* Khi đang load (lần đầu hoặc lúc tải lại) thì ẩn danh sách và hiện màn hình loading */}
      {isBusy ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>
            {refreshing ? 'Đang tải lại danh sách...' : 'Đang tải dữ liệu ban đầu...'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemId}>Bài viết #{item.id}</Text>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
          )}
          // Kéo danh sách để kích hoạt tải lại
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#0066cc']}
            />
          }
        />
      )}
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
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemId: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
});
