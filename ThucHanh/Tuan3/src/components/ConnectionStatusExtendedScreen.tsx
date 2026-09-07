import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function ConnectionStatusExtendedScreen() {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('Chưa kết nối');
  const [lastConnectedTime, setLastConnectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected) {
      setMessage('Thiết bị đã kết nối');
      setLastConnectedTime(new Date().toLocaleTimeString());
    } else {
      setMessage('Thiết bị đã ngắt kết nối');
    }
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <Switch value={isConnected} onValueChange={setIsConnected} />
      <Text style={[styles.message, { color: isConnected ? 'green' : 'red' }]}>
        {message}
      </Text>
      {lastConnectedTime ? (
        <Text style={styles.timeText}>
          Thời điểm kết nối gần nhất: {lastConnectedTime}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 14,
    color: '#666666',
  },
});
