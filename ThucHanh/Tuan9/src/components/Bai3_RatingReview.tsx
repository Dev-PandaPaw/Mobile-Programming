// src/components/Bai3_RatingReview.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch, useAppSelector } from '../store';
import { setAuth, logout, restoreSession, AUTH_STORAGE_KEY } from '../store/authSlice';
import { bookService } from '../services/bookService';
import { reviewService } from '../services/reviewService';
import { authService } from '../services/authService';
import { Book, Review } from '../types';

// Component RatingStars tái sử dụng (1..5 sao)
interface RatingStarsProps {
  value: number;
  size?: number;
  onSelect?: (val: number) => void;
}

export function RatingStars({ value, size = 18, onSelect }: RatingStarsProps) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <View style={styles.starsRow}>
      {stars.map((star) => (
        <TouchableOpacity
          key={star}
          disabled={!onSelect}
          onPress={() => onSelect && onSelect(star)}
          style={{ paddingHorizontal: 2 }}
        >
          <Text
            style={{
              fontSize: size,
              color: star <= Math.round(value) ? '#f59e0b' : '#d1d5db',
            }}
          >
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function Bai3_RatingReview() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  // Mặc định xem sách ID 8 ("Tư Duy Nhanh Và Chậm" theo yêu cầu đề bài)
  const [currentBookId, setCurrentBookId] = useState<number>(8);
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Form viết đánh giá
  const [userRating, setUserRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Form đăng nhập nhanh (khi chưa đăng nhập)
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginEmail, setLoginEmail] = useState('test@gmail.com');
  const [loginPassword, setLoginPassword] = useState('123456');
  const [loginLoading, setLoginLoading] = useState(false);

  // 1. Tự động kiểm tra phiên khi vào app
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  // 2. Tải thông tin sách, review và sách liên quan
  const loadBookData = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const [bookData, reviewData] = await Promise.all([
        bookService.getById(id),
        reviewService.getByBook(id),
      ]);
      setBook(bookData);
      setReviews(reviewData);

      // Tải sách liên quan từ server (GET /books?category=...&id_ne=...&_limit=10)
      if (bookData) {
        bookService.getRelated(bookData, 6).then(setRelatedBooks).catch(() => {});
      }
    } catch {
      Alert.alert('Lỗi', 'Không thể tải dữ liệu sách hoặc đánh giá.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookData(currentBookId);
  }, [currentBookId, loadBookData]);

  // 3. Tính điểm đánh giá trung bình
  const avgRating = useMemo(() => {
    if (reviews.length === 0) return '0.0';
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  // 4. Gửi đánh giá mới (POST /reviews kèm token)
  const handleSubmitReview = async () => {
    if (!auth.isLoggedIn || !auth.user) {
      setShowLoginForm(true);
      return;
    }

    if (!comment.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập nội dung đánh giá');
      return;
    }

    try {
      setSubmitting(true);
      // Gọi POST /reviews kèm token
      const newRev = await reviewService.create({
        bookId: currentBookId,
        userId: auth.user.id,
        userName: auth.user.name,
        rating: userRating,
        comment: comment.trim(),
      });

      // Chèn review mới vào đầu danh sách, không load lại trang
      setReviews((prev) => [newRev, ...prev]);
      setComment('');
      setUserRating(5);
      Alert.alert('Thành công', 'Đã gửi đánh giá thành công!');
    } catch (err: any) {
      // Token hết hạn (401) -> tự đăng xuất
      if (err?.response?.status === 401) {
        await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
        dispatch(logout());
        Alert.alert('Phiên hết hạn', 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      } else {
        const msg = err?.message || 'Không thể gửi đánh giá';
        Alert.alert('Lỗi', msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 5. Xoá review của chính mình (DELETE /reviews/:id)
  const handleDeleteReview = async (reviewId: number) => {
    try {
      await reviewService.remove(reviewId);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      Alert.alert('Thành công', 'Đã xoá đánh giá.');
    } catch (err: any) {
      if (err?.response?.status === 401) {
        await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
        dispatch(logout());
        Alert.alert('Lỗi', 'Phiên hết hạn. Vui lòng đăng nhập lại.');
      } else {
        Alert.alert('Lỗi', 'Không thể xoá đánh giá.');
      }
    }
  };

  // 6. Đăng nhập nhanh
  const handleQuickLogin = async () => {
    try {
      setLoginLoading(true);
      const res = await authService.login(loginEmail, loginPassword);
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(res));
      dispatch(setAuth(res));
      setShowLoginForm(false);
      Alert.alert('Thành công', `Đăng nhập thành công: ${res.user.name}`);
    } catch (err: any) {
      Alert.alert('Lỗi', err.message || 'Đăng nhập thất bại');
    } finally {
      setLoginLoading(false);
    }
  };

  // 7. Đăng xuất
  const handleLogout = async () => {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    dispatch(logout());
    Alert.alert('Thông báo', 'Đã đăng xuất!');
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Đang tải thông tin sách & đánh giá...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>Đánh giá & Bình luận</Text>

      {/* Thông tin sách */}
      {book && (
        <View style={styles.card}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.bookAuthor}>Tác giả: {book.author}</Text>
          <Text style={styles.bookCategory}>Thể loại: {book.category}</Text>
          <Text style={styles.bookPrice}>Giá: {book.price.toLocaleString('vi-VN')} đ</Text>
          <Text style={styles.bookDesc}>{book.description}</Text>

          {/* Điểm trung bình */}
          <View style={styles.avgContainer}>
            <Text style={styles.avgNumber}>{avgRating}</Text>
            <View>
              <RatingStars value={Number(avgRating)} size={22} />
              <Text style={styles.reviewCount}>({reviews.length} đánh giá)</Text>
            </View>
          </View>
        </View>
      )}

      {/* Trạng thái tài khoản */}
      <View style={styles.accountBar}>
        <Text style={styles.accountText}>
          Tài khoản:{' '}
          <Text style={styles.bold}>
            {auth.isLoggedIn && auth.user ? auth.user.name : 'Chưa đăng nhập'}
          </Text>
        </Text>
        {auth.isLoggedIn ? (
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutLink}>Đăng xuất</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setShowLoginForm(!showLoginForm)}>
            <Text style={styles.loginLink}>
              {showLoginForm ? 'Đóng đăng nhập' : 'Đăng nhập ngay'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Form đăng nhập nhanh nếu chưa có tài khoản */}
      {!auth.isLoggedIn && showLoginForm && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Đăng nhập để viết đánh giá</Text>
          <TextInput
            style={styles.input}
            placeholder="Email (vd: test@gmail.com)"
            value={loginEmail}
            autoCapitalize="none"
            onChangeText={setLoginEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu (vd: 123456)"
            secureTextEntry
            value={loginPassword}
            onChangeText={setLoginPassword}
          />
          <TouchableOpacity
            style={[styles.primaryButton, loginLoading && styles.disabledButton]}
            onPress={handleQuickLogin}
            disabled={loginLoading}
          >
            {loginLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryButtonText}>Đăng nhập</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Form gửi đánh giá (chỉ khi đã đăng nhập) */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Viết đánh giá của bạn</Text>
        {auth.isLoggedIn && auth.user ? (
          <View>
            <Text style={styles.label}>Chọn số sao:</Text>
            <RatingStars value={userRating} size={28} onSelect={setUserRating} />

            <Text style={styles.label}>Nội dung nhận xét:</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Nhập cảm nhận của bạn về cuốn sách này..."
              multiline
              value={comment}
              onChangeText={setComment}
            />

            <TouchableOpacity
              style={[styles.primaryButton, submitting && styles.disabledButton]}
              onPress={handleSubmitReview}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.primaryButtonText}>Gửi đánh giá</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.notLoggedInBox}>
            <Text style={styles.notLoggedInText}>
              Bạn cần đăng nhập để gửi nhận xét và chấm điểm cuốn sách.
            </Text>
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() => setShowLoginForm(true)}
            >
              <Text style={styles.outlineButtonText}>Đăng nhập để viết đánh giá</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Danh sách đánh giá */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Tất cả đánh giá ({reviews.length})</Text>
        {reviews.length === 0 ? (
          <Text style={styles.emptyText}>Chưa có đánh giá nào cho cuốn sách này.</Text>
        ) : (
          reviews.map((item) => (
            <View key={item.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewerName}>{item.userName}</Text>
                  <RatingStars value={item.rating} size={15} />
                </View>
                {/* Nút xoá chỉ hiện khi người dùng là chủ sở hữu đánh giá */}
                {auth.isLoggedIn && auth.user && item.userId === auth.user.id && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteReview(item.id)}
                  >
                    <Text style={styles.deleteButtonText}>Xoá</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.reviewComment}>{item.comment}</Text>
              {item.createdAt && (
                <Text style={styles.reviewDate}>
                  {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                </Text>
              )}
            </View>
          ))
        )}
      </View>

      {/* Thử thách: Sách liên quan cùng thể loại */}
      {relatedBooks.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sách liên quan ({book?.category})</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={relatedBooks}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.relatedItem}
                onPress={() => setCurrentBookId(item.id)}
              >
                <Text style={styles.bookEmoji}>📖</Text>
                <Text numberOfLines={2} style={styles.relatedTitle}>
                  {item.title}
                </Text>
                <Text style={styles.relatedPrice}>
                  {item.price.toLocaleString('vi-VN')} đ
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a2e',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 14,
    marginBottom: 14,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
  },
  bookCategory: {
    fontSize: 14,
    color: '#007bff',
    marginVertical: 2,
  },
  bookPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 6,
  },
  bookDesc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 19,
    marginBottom: 12,
  },
  avgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#eee',
    gap: 12,
  },
  avgNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  reviewCount: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 14,
  },
  accountText: {
    fontSize: 13,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  loginLink: {
    fontSize: 13,
    color: '#007bff',
    fontWeight: 'bold',
  },
  logoutLink: {
    fontSize: 13,
    color: '#dc3545',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    height: 75,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#007bff',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#90caf9',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  outlineButtonText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  notLoggedInBox: {
    padding: 8,
    alignItems: 'center',
  },
  notLoggedInText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  reviewComment: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  reviewDate: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 8,
  },
  relatedItem: {
    width: 115,
    marginRight: 10,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  bookEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  relatedTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    height: 32,
  },
  relatedPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#dc3545',
    marginTop: 4,
  },
});

