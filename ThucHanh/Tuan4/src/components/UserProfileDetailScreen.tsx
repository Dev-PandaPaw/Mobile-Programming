import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

// Định nghĩa kiểu dữ liệu User từ JSON của API
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company?: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

export default function UserProfileDetailScreen() {
  // Sử dụng kiểu User | null theo yêu cầu
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const data = (await response.json()) as User;
      setUser(data);
    } catch (error) {
      console.error('Lỗi khi fetch user detail:', error);
    } finally {
      setLoading(false);
    }
  };

  // Khi chưa có dữ liệu thì hiển thị loading / màn hình trống
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0066cc" style={styles.loader} />
      </SafeAreaView>
    );
  }

  // Nếu không có dữ liệu user thì trả về null (màn hình trống)
  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Bài 10: Chi tiết người dùng (User Profile Detail)</Text>

      {/* Đổ dữ liệu vào UI sử dụng Optional Chaining (user?.name, ...) */}
      <View style={styles.card}>
        <Text style={styles.label}>ID: <Text style={styles.value}>{user?.id}</Text></Text>
        <Text style={styles.label}>Họ tên: <Text style={styles.value}>{user?.name}</Text></Text>
        <Text style={styles.label}>Tên đăng nhập: <Text style={styles.value}>{user?.username}</Text></Text>
        <Text style={styles.label}>Email: <Text style={styles.value}>{user?.email}</Text></Text>
        <Text style={styles.label}>Số điện thoại: <Text style={styles.value}>{user?.phone}</Text></Text>
        <Text style={styles.label}>Website: <Text style={styles.value}>{user?.website}</Text></Text>
        <Text style={styles.label}>Công ty: <Text style={styles.value}>{user?.company?.name}</Text></Text>
        <Text style={styles.label}>Thành phố: <Text style={styles.value}>{user?.address?.city}</Text></Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  loader: {
    marginTop: 40,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  value: {
    fontWeight: 'normal',
    color: '#222',
  },
});
