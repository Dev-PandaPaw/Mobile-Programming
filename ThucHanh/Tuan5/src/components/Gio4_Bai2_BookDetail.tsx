import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { BOOKS } from '../data/data';

export default function Gio4_Bai2_BookDetail() {
  const book = BOOKS[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: book.image }} style={styles.coverImage} />
      </View>

      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{book.price}</Text>
          {book.originalPrice && (
            <Text style={styles.originalPrice}>{book.originalPrice}</Text>
          )}
        </View>

        <Text style={styles.descriptionHeader}>Mô tả cuốn sách</Text>
        <Text style={styles.descriptionText}>{book.description}</Text>
        <Text style={styles.descriptionText}>
          Tác phẩm mang lại những bài học sâu sắc về cuộc sống, cách ứng xử và tạo dựng các mối quan hệ bền vững trong xã hội. Cuốn sách không chỉ hướng dẫn cách để trở thành một người giao tiếp giỏi mà còn giúp người đọc thấu hiểu bản thân và những người xung quanh.
        </Text>
        <Text style={styles.descriptionText}>
          Nội dung cuốn sách được đúc kết qua nhiều năm nghiên cứu thực tế và trải nghiệm của tác giả, mang tính ứng dụng cao và phù hợp với mọi lứa tuổi độc giả trên toàn thế giới.
        </Text>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceInfo}>
          <Text style={styles.bottomPriceLabel}>Tạm tính</Text>
          <Text style={styles.bottomPriceValue}>{book.price}</Text>
        </View>
        <View style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  coverImage: {
    alignSelf: 'center',
    width: 150,
    aspectRatio: 3 / 4,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#86EFAC',
    borderRadius: 8,
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#15803D',
  },
  originalPrice: {
    fontSize: 16,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  descriptionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
    marginBottom: 12,
  },
  bottomBar: {
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  bottomPriceInfo: {
    flexDirection: 'column',
  },
  bottomPriceLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  bottomPriceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1B4B',
  },
  addToCartButton: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
