import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function GreetingScreen() {
  const [fullName, setFullName] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Nhập họ tên"
      />
      <Text style={styles.greeting}>
        {fullName ? `Xin chào, ${fullName}!` : 'Vui lòng nhập họ tên'}
      </Text>
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
});
