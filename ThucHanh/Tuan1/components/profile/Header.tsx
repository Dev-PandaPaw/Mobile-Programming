import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { IconName } from './types';

type HeaderIconButtonProps = {
  accessibilityLabel: string;
  icon: IconName;
};

export function Header() {
  return (
    <View style={styles.header}>
      <HeaderIconButton accessibilityLabel="Mở menu SmartCampus" icon="menu" />
      <Text accessibilityRole="header" style={styles.headerTitle}>
        SmartCampus
      </Text>
      <HeaderIconButton accessibilityLabel="Mở thông báo" icon="notifications-none" />
    </View>
  );
}

function HeaderIconButton({ accessibilityLabel, icon }: HeaderIconButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled: false }}
      hitSlop={10}
      onPress={() => undefined}
      style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}>
      <MaterialIcons color="#FFFFFF" name={icon} size={24} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#2D84DA',
    flexDirection: 'row',
    minHeight: 58,
    paddingHorizontal: 14,
  },
  headerTitle: {
    color: '#FFFFFF',
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    minWidth: 48,
  },
  iconButtonPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.92 }],
  },
});
