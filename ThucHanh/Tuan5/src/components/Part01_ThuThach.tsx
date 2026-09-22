import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Gio1_Bai1_Header from './Gio1_Bai1_Header';
import Gio2_Bai1_CategoryChips from './Gio2_Bai1_CategoryChips';
import Gio5_Bai1_TabBar from './Gio5_Bai1_TabBar';
import { BOOKS, CART_ITEMS } from '../data/data';

export default function Part01_ThuThach() {
  const [currentTab, setCurrentTab] = useState('Trang chủ');
  const [selectedBook, setSelectedBook] = useState(BOOKS[0]);

  const handleSelectBook = (book: typeof BOOKS[0]) => {
    setSelectedBook(book);
    setCurrentTab('Chi tiết');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenContainer}>
        {currentTab === 'Trang chủ' && (
          <View style={styles.tabContent}>
            <Gio1_Bai1_Header />
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.homeScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <Gio2_Bai1_CategoryChips />
              <View style={styles.gridContainer}>
                {BOOKS.map((book) => (
                  <TouchableOpacity
                    key={book.id}
                    style={styles.gridItem}
                    onPress={() => handleSelectBook(book)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.imageWrapper}>
                      <Image source={{ uri: book.image }} style={styles.bookImage} />
                      {book.discount && (
                        <View style={styles.badge}>
                          <Text style={styles.badgeText}>{book.discount}</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.bookTitle} numberOfLines={1}>
                        {book.title}
                      </Text>
                      <Text style={styles.bookPrice}>{book.price}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.floatingButton}
              onPress={() => setCurrentTab('Giỏ hàng')}
              activeOpacity={0.8}
            >
              <View style={styles.cartIcon}>
                <View style={styles.cartBasket} />
                <View style={styles.cartHandle} />
              </View>
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {currentTab === 'Chi tiết' && (
          <View style={styles.tabContent}>
            <View style={styles.detailImageContainer}>
              <Image source={{ uri: selectedBook.image }} style={styles.detailImage} />
            </View>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.detailScrollContent}>
              <Text style={styles.detailTitle}>{selectedBook.title}</Text>
              <Text style={styles.detailAuthor}>{selectedBook.author}</Text>
              <View style={styles.detailPriceBox}>
                <Text style={styles.detailPrice}>{selectedBook.price}</Text>
                {selectedBook.originalPrice && (
                  <Text style={styles.detailOriginalPrice}>{selectedBook.originalPrice}</Text>
                )}
              </View>
              <Text style={styles.detailSectionTitle}>Mô tả cuốn sách</Text>
              <Text style={styles.detailText}>{selectedBook.description}</Text>
              <Text style={styles.detailText}>
                Tác phẩm mang lại những bài học sâu sắc về cuộc sống, cách ứng xử và tạo dựng các mối quan hệ bền vững trong xã hội.
              </Text>
            </ScrollView>
            <View style={styles.detailBottomBar}>
              <View>
                <Text style={styles.detailBottomLabel}>Tạm tính</Text>
                <Text style={styles.detailBottomPrice}>{selectedBook.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.addToCartBtn}
                onPress={() => setCurrentTab('Giỏ hàng')}
              >
                <Text style={styles.addToCartBtnText}>Thêm vào giỏ</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {currentTab === 'Giỏ hàng' && (
          <View style={styles.tabContent}>
            <View style={styles.cartHeader}>
              <Text style={styles.cartHeaderTitle}>Giỏ hàng</Text>
            </View>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.cartScrollContent}>
              {CART_ITEMS.map((item) => (
                <View key={item.id} style={styles.cartCard}>
                  <Image source={{ uri: item.image }} style={styles.cartItemImage} />
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text style={styles.cartItemQuantity}>SL: {item.quantity}</Text>
                  </View>
                  <Text style={styles.cartItemPrice}>{item.price}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.checkoutBar}>
              <View>
                <Text style={styles.checkoutLabel}>Tổng tiền</Text>
                <Text style={styles.checkoutTotal}>257.000 đ</Text>
              </View>
              <View style={styles.checkoutBtn}>
                <Text style={styles.checkoutBtnText}>Thanh toán</Text>
              </View>
            </View>
          </View>
        )}

        {currentTab === 'Tài khoản' && (
          <View style={styles.tabContent}>
            <View style={styles.accountHeader}>
              <Text style={styles.accountHeaderTitle}>Tài khoản</Text>
            </View>
            <View style={styles.profileSection}>
              <View style={styles.avatarPlaceholder} />
              <Text style={styles.profileName}>Nguyễn Văn A</Text>
              <Text style={styles.profileEmail}>nguyenvana@gmail.com</Text>
            </View>
            <View style={styles.menuList}>
              <View style={styles.menuItem}>
                <Text style={styles.menuText}>Đơn hàng của tôi</Text>
              </View>
              <View style={styles.menuItem}>
                <Text style={styles.menuText}>Sổ địa chỉ nhận hàng</Text>
              </View>
              <View style={styles.menuItem}>
                <Text style={styles.menuText}>Cài đặt tài khoản</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <Gio5_Bai1_TabBar activeTab={currentTab} onTabChange={setCurrentTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1B4B',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  tabContent: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  homeScrollContent: {
    paddingBottom: 80,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: '#E5E7EB',
  },
  bookImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#DC2626',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 8,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  bookPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E1B4B',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBasket: {
    width: 18,
    height: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderTopWidth: 0,
    borderRadius: 2,
    marginTop: 4,
  },
  cartHandle: {
    position: 'absolute',
    top: 2,
    width: 10,
    height: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderBottomWidth: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  detailImageContainer: {
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  detailImage: {
    width: 140,
    aspectRatio: 3 / 4,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  detailScrollContent: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  detailAuthor: {
    fontSize: 15,
    color: '#4B5563',
    marginBottom: 12,
  },
  detailPriceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#86EFAC',
    borderRadius: 8,
    marginBottom: 16,
  },
  detailPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#15803D',
  },
  detailOriginalPrice: {
    fontSize: 15,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  detailSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
    marginBottom: 10,
  },
  detailBottomBar: {
    height: 64,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  detailBottomLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  detailBottomPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1B4B',
  },
  addToCartBtn: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  addToCartBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartHeader: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1B4B',
  },
  cartScrollContent: {
    padding: 16,
  },
  cartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  cartItemImage: {
    width: 60,
    height: 75,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  cartItemInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  cartItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  cartItemQuantity: {
    fontSize: 13,
    color: '#6B7280',
  },
  cartItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#15803D',
  },
  checkoutBar: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  checkoutTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  checkoutBtn: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  accountHeader: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1B4B',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 24,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  menuList: {
    backgroundColor: '#FFFFFF',
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuText: {
    fontSize: 15,
    color: '#374151',
  },
});
