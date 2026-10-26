import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import Bai_HomePagination from './src/components/Bai_HomePagination';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          <Bai_HomePagination />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
