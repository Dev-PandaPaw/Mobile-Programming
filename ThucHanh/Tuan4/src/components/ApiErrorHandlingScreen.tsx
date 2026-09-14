import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  SafeAreaView,
} from 'react-native';

// Định nghĩa cấu trúc lỗi CustomError
export interface CustomError {
  name: string;
  message: string;
  status?: number;
}

export default function ApiErrorHandlingScreen() {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const triggerApiError = async () => {
    try {
      setErrorMessage('');
      // Cố tình gọi URL sai
      const response = await fetch('https://jsonplaceholder.typicode.com/invalid-url-404');

      if (!response.ok) {
        const customErr: CustomError = {
          name: 'ApiHttpError',
          message: `Lỗi HTTP: ${response.status} (Not Found)`,
          status: response.status,
        };
        throw customErr;
      }

      await response.json();
    } catch (error) {
      // Bắt lỗi và ép kiểu về CustomError
      const err = error as CustomError;
      const msg = err.message || 'Lỗi không xác định';
      setErrorMessage(msg);
      Alert.alert('Thông báo lỗi', msg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bài 12: Xử lý lỗi API</Text>
      
      <Button title="Gửi Request (Sai URL)" onPress={triggerApiError} />

      {errorMessage !== '' && (
        <Text style={styles.errorText}>Lỗi bắt được: {errorMessage}</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 20,
    fontSize: 14,
    color: 'red',
  },
});
