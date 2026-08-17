import { Image, StyleSheet, Text, View } from 'react-native';

export function Avatar() {
  return (
    <View style={styles.avatar}>
      <Image
        accessibilityIgnoresInvertColors
        accessibilityLabel="Ảnh đại diện sinh viên"
        resizeMode="cover"
        source={require('@/assets/images/icon.png')}
        style={styles.avatarImage}
      />
      <Text style={styles.avatarText}>SV</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: '#E6F0FF',
    borderColor: '#2D84DA',
    borderRadius: 38,
    borderWidth: 2,
    height: 76,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 76,
  },
  avatarImage: {
    height: 76,
    opacity: 0.08,
    position: 'absolute',
    width: 76,
  },
  avatarText: {
    color: '#1F2937',
    fontSize: 21,
    fontWeight: '800',
    lineHeight: 27,
  },
});
