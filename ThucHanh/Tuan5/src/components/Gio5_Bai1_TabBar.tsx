import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface TabItemProps {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
  renderIcon: (color: string) => React.ReactNode;
}

function TabItem({ label, isActive = false, onPress, renderIcon }: TabItemProps) {
  const color = isActive ? '#1E1B4B' : '#9CA3AF';

  return (
    <TouchableOpacity
      style={styles.tabItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconWrapper}>{renderIcon(color)}</View>
      <Text style={[styles.tabLabel, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function HomeIcon({ color }: { color: string }) {
  return (
    <View style={styles.iconContainer}>
      <View style={[styles.homeRoof, { borderBottomColor: color }]} />
      <View style={[styles.homeBody, { borderColor: color }]} />
    </View>
  );
}

function CategoryIcon({ color }: { color: string }) {
  return (
    <View style={[styles.iconContainer, styles.categoryGrid]}>
      <View style={[styles.categoryBox, { backgroundColor: color }]} />
      <View style={[styles.categoryBox, { backgroundColor: color }]} />
      <View style={[styles.categoryBox, { backgroundColor: color }]} />
      <View style={[styles.categoryBox, { backgroundColor: color }]} />
    </View>
  );
}

function CartTabIcon({ color }: { color: string }) {
  return (
    <View style={styles.iconContainer}>
      <View style={[styles.cartHandle, { borderColor: color }]} />
      <View style={[styles.cartBasket, { borderColor: color }]} />
    </View>
  );
}

function UserIcon({ color }: { color: string }) {
  return (
    <View style={styles.iconContainer}>
      <View style={[styles.userHead, { borderColor: color }]} />
      <View style={[styles.userBody, { borderColor: color }]} />
    </View>
  );
}

interface TabBarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function Gio5_Bai1_TabBar({
  activeTab = 'Trang chủ',
  onTabChange,
}: TabBarProps) {
  return (
    <View style={styles.tabBar}>
      <TabItem
        label="Trang chủ"
        isActive={activeTab === 'Trang chủ'}
        onPress={() => onTabChange && onTabChange('Trang chủ')}
        renderIcon={(color) => <HomeIcon color={color} />}
      />
      <TabItem
        label="Chi tiết"
        isActive={activeTab === 'Chi tiết'}
        onPress={() => onTabChange && onTabChange('Chi tiết')}
        renderIcon={(color) => <CategoryIcon color={color} />}
      />
      <TabItem
        label="Giỏ hàng"
        isActive={activeTab === 'Giỏ hàng'}
        onPress={() => onTabChange && onTabChange('Giỏ hàng')}
        renderIcon={(color) => <CartTabIcon color={color} />}
      />
      <TabItem
        label="Tài khoản"
        isActive={activeTab === 'Tài khoản'}
        onPress={() => onTabChange && onTabChange('Tài khoản')}
        renderIcon={(color) => <UserIcon color={color} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  iconWrapper: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  homeBody: {
    width: 12,
    height: 9,
    borderWidth: 1.8,
    borderTopWidth: 0,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    padding: 2,
    justifyContent: 'center',
  },
  categoryBox: {
    width: 6,
    height: 6,
    borderRadius: 1,
  },
  cartHandle: {
    width: 8,
    height: 5,
    borderWidth: 1.8,
    borderBottomWidth: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  cartBasket: {
    width: 16,
    height: 10,
    borderWidth: 1.8,
    borderTopWidth: 0,
    borderRadius: 2,
  },
  userHead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.8,
    marginBottom: 1,
  },
  userBody: {
    width: 15,
    height: 7,
    borderWidth: 1.8,
    borderBottomWidth: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
});
