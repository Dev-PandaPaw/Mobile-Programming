import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { IconName } from './types';

const navItems: {
  label: string;
  icon: IconName;
  active?: boolean;
}[] = [
  { label: 'Home', icon: 'home' },
  { label: 'Library', icon: 'school' },
  { label: 'Events', icon: 'calendar-today' },
  { label: 'Profile', icon: 'account-circle', active: true },
  { label: 'Library', icon: 'arrow-drop-down' },
];

export function BottomNavigation() {
  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => (
        <Pressable
          accessibilityLabel={`Mở mục ${item.label}`}
          accessibilityRole="tab"
          accessibilityState={{ selected: Boolean(item.active), disabled: false }}
          hitSlop={8}
          key={`${item.label}-${item.icon}`}
          onPress={() => undefined}
          style={({ pressed }) => [
            styles.navItem,
            item.active && styles.navItemActive,
            pressed && styles.navItemPressed,
          ]}>
          <MaterialIcons color={item.active ? '#1F2937' : '#8D949C'} name={item.icon} size={22} />
          <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#D4E8FA',
    borderTopWidth: 1,
    flexDirection: 'row',
    minHeight: 68,
    paddingHorizontal: 10,
    paddingTop: 6,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
    gap: 3,
    justifyContent: 'center',
    minHeight: 52,
    minWidth: 48,
    paddingHorizontal: 2,
  },
  navItemActive: {
    backgroundColor: '#2F9FE8',
  },
  navItemPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.94 }],
  },
  navLabel: {
    color: '#8D949C',
    fontSize: 9,
    lineHeight: 13,
  },
  navLabelActive: {
    color: '#1F2937',
  },
});
