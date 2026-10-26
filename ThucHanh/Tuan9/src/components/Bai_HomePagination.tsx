// src/components/Bai_HomePagination.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { bookService } from '../services/bookService';
import { Book } from '../types';

const PAGE_LIMIT = 6;

export default function Bai_HomePagination() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Tải trang đầu tiên
  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await bookService.getPage(1, PAGE_LIMIT);
      setBooks(res.data);
      setTotal(res.total);
      setHasMore(res.hasMore);
      setPage(1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Kéo xuống cuối để tải thêm (onEndReached)
  const handleLoadMore = async () => {
    if (loadingMore || !hasMore || loading) return;

    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const res = await bookService.getPage(nextPage, PAGE_LIMIT);

      setBooks((prev) => [...prev, ...res.data]);
      setHasMore(res.hasMore);
      setPage(nextPage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Kéo để làm mới (Pull-to-refresh)
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadInitialData();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Đang tải danh sách sách...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Trang chủ BookStore</Text>
      <View style={styles.badgeRow}>
        <Text style={styles.badgeText}>
          Đã tải: <Text style={styles.bold}>{books.length}</Text> / {total} cuốn sách
        </Text>
        <Text style={styles.badgePage}>Trang: {page}</Text>
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.bookCard}>
            <View style={styles.thumb}>
              <Text style={{ fontSize: 24 }}>📖</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={1}>
                {item.id}. {item.title}
              </Text>
              <Text style={styles.author}>{item.author}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.price}>
                  {item.price.toLocaleString('vi-VN')} đ
                </Text>
              </View>
            </View>
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footerLoading}>
              <ActivityIndicator size="small" color="#007bff" />
              <Text style={styles.footerLoadingText}>Đang tải thêm sách...</Text>
            </View>
          ) : !hasMore ? (
            <Text style={styles.endText}>✓ Đã tải hết toàn bộ {total} cuốn sách</Text>
          ) : null
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a2e',
    marginTop: 14,
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f1f5f9',
    marginHorizontal: 16,
    borderRadius: 6,
    marginBottom: 10,
  },
  badgeText: {
    fontSize: 13,
    color: '#334155',
  },
  badgePage: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#007bff',
  },
  bold: {
    fontWeight: 'bold',
    color: '#0f172a',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: 6,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  author: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 12,
    color: '#0284c7',
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  footerLoading: {
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  footerLoadingText: {
    fontSize: 13,
    color: '#666',
  },
  endText: {
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 13,
    paddingVertical: 14,
    fontStyle: 'italic',
  },
});

