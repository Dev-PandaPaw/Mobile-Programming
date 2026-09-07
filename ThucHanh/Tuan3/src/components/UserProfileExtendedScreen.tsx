import React, { useContext } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { UserContext, UserProvider } from '../context/UserContext';

function ProfileScreen() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const logout = userContext?.logout;

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bạn đã đăng xuất</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Button title="Đăng xuất" onPress={logout} color="#d9534f" />
    </View>
  );
}

export default function UserProfileExtendedScreen() {
  return (
    <UserProvider>
      <ProfileScreen />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    color: '#888888',
  },
});
