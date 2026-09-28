import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

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

export default function Gio5_Bai1_TabBar(props: any) {
  // Khi dùng làm custom tabBar cho React Navigation:
  if (props?.state && props?.navigation) {
    const { state, navigation } = props as BottomTabBarProps;

    const tabs = [
      { name: 'HomeTab', label: 'Trang chủ', renderIcon: (c: string) => <HomeIcon color={c} /> },
      { name: 'DanhMuc', label: 'Danh mục', renderIcon: (c: string) => <CategoryIcon color={c} /> },
      { name: 'GioHang', label: 'Giỏ hàng', renderIcon: (c: string) => <CartTabIcon color={c} /> },
      { name: 'TaiKhoan', label: 'Tài khoản', renderIcon: (c: string) => <UserIcon color={c} /> },
    ];

    return (
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => {
          const isActive = state.index === index;
          const color = isActive ? '#1E1B4B' : '#9CA3AF';
          const route = state.routes[index];

          const handlePress = () => {
            if (route) {
              const isFocused = state.index === index;
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }
          };

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabItem}
              onPress={handlePress}
              activeOpacity={0.7}
            >
              <View style={styles.iconWrapper}>{tab.renderIcon(color)}</View>
              <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  // Fallback nếu dùng dạng component tĩnh
  const { activeTab = 'Trang chủ', onTabChange } = props || {};
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabItem} onPress={() => onTabChange?.('Trang chủ')}>
        <View style={styles.iconWrapper}>
          <HomeIcon color={activeTab === 'Trang chủ' ? '#1E1B4B' : '#9CA3AF'} />
        </View>
        <Text style={[styles.tabLabel, { color: activeTab === 'Trang chủ' ? '#1E1B4B' : '#9CA3AF' }]}>
          Trang chủ
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => onTabChange?.('Danh mục')}>
        <View style={styles.iconWrapper}>
          <CategoryIcon color={activeTab === 'Danh mục' ? '#1E1B4B' : '#9CA3AF'} />
        </View>
        <Text style={[styles.tabLabel, { color: activeTab === 'Danh mục' ? '#1E1B4B' : '#9CA3AF' }]}>
          Danh mục
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => onTabChange?.('Giỏ hàng')}>
        <View style={styles.iconWrapper}>
          <CartTabIcon color={activeTab === 'Giỏ hàng' ? '#1E1B4B' : '#9CA3AF'} />
        </View>
        <Text style={[styles.tabLabel, { color: activeTab === 'Giỏ hàng' ? '#1E1B4B' : '#9CA3AF' }]}>
          Giỏ hàng
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => onTabChange?.('Tài khoản')}>
        <View style={styles.iconWrapper}>
          <UserIcon color={activeTab === 'Tài khoản' ? '#1E1B4B' : '#9CA3AF'} />
        </View>
        <Text style={[styles.tabLabel, { color: activeTab === 'Tài khoản' ? '#1E1B4B' : '#9CA3AF' }]}>
          Tài khoản
        </Text>
      </TouchableOpacity>
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
