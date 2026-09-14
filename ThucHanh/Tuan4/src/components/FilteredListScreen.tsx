import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';

// Hàm Generic <T> lọc mảng theo trường name
export function filterByName<T extends { name: string }>(items: T[], keyword: string): T[] {
  return items.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );
}

// Kiểu dữ liệu mẫu 1
interface User {
  id: number;
  name: string;
  role: string;
}

// Kiểu dữ liệu mẫu 2
interface Book {
  id: number;
  name: string;
  author: string;
}

// Dữ liệu mẫu để kiểm thử hàm Generic
const sampleUsers: User[] = [
  { id: 1, name: 'Nguyễn Văn An', role: 'Admin' },
  { id: 2, name: 'Võ Văn Cảnh', role: 'User' },
  { id: 3, name: 'Đặng Thị T', role: 'User' },
  { id: 4, name: 'Trần Thị P', role: 'User' },
  { id: 5, name: 'Vũ Văn G', role: 'User' },
  { id: 6, name: 'Trần H', role: 'User' },
  { id: 7, name: 'Lê Văn Cường', role: 'Editor' },
  { id: 8, name: 'Phạm Thị Dung', role: 'User' },
];

export default function FilteredListScreen() {
  const [keyword, setKeyword] = useState<string>('');

  // Áp dụng hàm Generic filterByName cho mảng sampleUsers
  const filteredUsers = filterByName<User>(sampleUsers, keyword);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bài 13: Bộ lọc danh sách (Generic)</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập tên cần tìm..."
        value={keyword}
        onChangeText={setKeyword}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.role}>Vai trò: {item.role}</Text>
          </View>
        )}
      />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 4,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 14,
    color: '#666',
  },
});
