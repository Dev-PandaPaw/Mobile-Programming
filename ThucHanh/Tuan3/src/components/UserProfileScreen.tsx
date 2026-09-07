import React, { createContext, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface UserContextType {
  name: string;
}

const UserContext = createContext<UserContextType | null>(null);

function ProfileScreen() {
  const user = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Xin chào, {user?.name}</Text>
    </View>
  );
}

export default function UserProfileScreen() {
  return (
    <UserContext.Provider value={{ name: 'Võ Văn Cảnh' }}>
      <ProfileScreen />
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
