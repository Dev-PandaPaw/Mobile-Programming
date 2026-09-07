import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function GreetingExtendedScreen() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');

  const handleReset = () => {
    setFullName('');
    setAge('');
  };

  const parsedAge = parseInt(age, 10);
  const isUnder18 = !isNaN(parsedAge) && parsedAge < 18;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Nhập họ tên"
      />
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Nhập tuổi"
        keyboardType="numeric"
      />
      <Button title="Xóa dữ liệu" onPress={handleReset} />
      <Text style={styles.greeting}>
        {fullName ? `Xin chào, ${fullName}!` : 'Vui lòng nhập họ tên'}
      </Text>
      {isUnder18 ? (
        <Text style={styles.warning}>Bạn chưa đủ 18 tuổi</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    gap: 16,
    justifyContent: 'center',
    padding: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  greeting: {
    fontSize: 20,
    textAlign: 'center',
  },
  warning: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
