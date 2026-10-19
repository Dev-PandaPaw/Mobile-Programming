import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setAuth, logout } from '../store/authSlice';

// 1. Component RatingStars tái sử dụng (nhận value, size, onSelect)
interface RatingStarsProps {
  value: number;
  size?: number;
  onSelect?: (val: number) => void;
}

export function RatingStars({ value, size = 20, onSelect }: RatingStarsProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.starsRow}>
      {stars.map((star) => (
        <TouchableOpacity
          key={star}
          disabled={!onSelect}
          onPress={() => onSelect && onSelect(star)}
        >
          <Text
            style={{
              fontSize: size,
              color: star <= Math.round(value) ? '#f59e0b' : '#d1d5db',
              marginRight: 4,
            }}
          >
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
}

interface Book {
  id: string;
  title: string;
  category: string;
  price: string;
}

const currentBookId = '1';
const currentCategory = 'Công nghệ';

const allBooks: Book[] = [
  { id: '1', title: 'Lập trình React Native', category: 'Công nghệ', price: '80.000 đ' },
  { id: '2', title: 'Lập trình Flutter cơ bản', category: 'Công nghệ', price: '75.000 đ' },
  { id: '3', title: 'TypeScript toàn tập', category: 'Công nghệ', price: '90.000 đ' },
  { id: '4', title: 'NodeJS & ExpressJS', category: 'Công nghệ', price: '85.000 đ' },
  { id: '5', title: 'Đắc nhân tâm', category: 'Kỹ năng', price: '60.000 đ' },
];

export default function Bai3_RatingReview() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  // Lọc sách cùng danh mục, trừ sách hiện tại
  const relatedBooks = allBooks.filter(
    (b) => b.category === currentCategory && b.id !== currentBookId
  );

  // Danh sách review ban đầu
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userName: 'Nguyễn Văn A',
      rating: 5,
      comment: 'Sách rất hay, hướng dẫn chi tiết và dễ hiểu.',
    },
    {
      id: '2',
      userName: 'Trần Thị B',
      rating: 4,
      comment: 'Nội dung thực tế, nhiều bài tập hữu ích.',
    },
  ]);

  // Form gửi đánh giá mới
  const [userRating, setUserRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 2. Tính điểm đánh giá trung bình từ mảng review
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : '0.0';

  // 3. Xử lý Gửi review mới (gọi POST giả lập & cập nhật ngay không load lại trang)
  const handleSubmitReview = async () => {
    if (!comment.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung bình luận');
      return;
    }

    try {
      setSubmitting(true);
      // Giả lập gọi API POST /reviews
      await new Promise((resolve) => setTimeout(resolve, 400));

      const newReview: Review = {
        id: Date.now().toString(),
        userName: auth.user?.name || 'Tôi',
        rating: userRating,
        comment: comment.trim(),
      };

      // Cập nhật lại danh sách + điểm trung bình mà không cần load lại trang
      setReviews([newReview, ...reviews]);
      setComment('');
      setUserRating(5);
      Alert.alert('Thành công', 'Đã gửi đánh giá thành công!');
    } catch {
      Alert.alert('Lỗi', 'Không thể gửi đánh giá.');
    } finally {
      setSubmitting(false);
    }
  };

  // Nút chuyển nhanh đăng nhập để tiện test bài
  const handleToggleAuth = () => {
    if (auth.isLoggedIn) {
      dispatch(logout());
    } else {
      dispatch(
        setAuth({
          token: 'mock_token',
          user: { id: '1', name: 'Võ Văn Cảnh', email: 'vovancanh@gmail.com' },
        })
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.headerTitle}>Đánh giá & Xếp hạng sao</Text>

      {/* Thông tin sách & Điểm trung bình */}
      <View style={styles.bookCard}>
        <Text style={styles.bookTitle}>Sách: Lập trình React Native</Text>
        <View style={styles.ratingOverview}>
          <RatingStars value={Number(averageRating)} size={24} />
          <Text style={styles.avgScore}>
            {averageRating} / 5 ({reviews.length} đánh giá)
          </Text>
        </View>
      </View>

      {/* Nút giả lập đổi trạng thái đăng nhập để test */}
      <View style={styles.authToggleBox}>
        <Text style={styles.authStatusText}>
          Trạng thái: <Text style={styles.bold}>{auth.isLoggedIn ? 'Đã đăng nhập' : 'Chưa đăng nhập'}</Text>
        </Text>
        <TouchableOpacity style={styles.authToggleBtn} onPress={handleToggleAuth}>
          <Text style={styles.authToggleBtnText}>
            {auth.isLoggedIn ? 'Đổi sang: Chưa đăng nhập' : 'Đổi sang: Đã đăng nhập'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Form gửi đánh giá (chỉ hiện khi đã đăng nhập) */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Gửi đánh giá của bạn</Text>

        {!auth.isLoggedIn ? (
          <View style={styles.notLoggedInBox}>
            <Text style={styles.notLoggedInText}>
              ⚠️ Vui lòng đăng nhập để gửi đánh giá cho cuốn sách này.
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.label}>Chọn số sao:</Text>
            <RatingStars value={userRating} size={30} onSelect={setUserRating} />

            <Text style={styles.label}>Bình luận:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập cảm nhận của bạn về cuốn sách..."
              multiline
              value={comment}
              onChangeText={setComment}
            />

            <TouchableOpacity
              style={[styles.submitBtn, submitting && styles.disabledBtn]}
              onPress={handleSubmitReview}
              disabled={submitting}
            >
              <Text style={styles.submitBtnText}>
                {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Danh sách review */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Tất cả đánh giá ({reviews.length})</Text>
        {reviews.map((item) => (
          <View key={item.id} style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>{item.userName}</Text>
              <RatingStars value={item.rating} size={16} />
            </View>
            <Text style={styles.reviewComment}>{item.comment}</Text>
          </View>
        ))}
      </View>

      {/* Hàng ngang 'Sách liên quan' (cùng danh mục, trừ sách hiện tại) */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Sách liên quan (Cùng danh mục)</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={relatedBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.relatedCard}>
              <View style={styles.relatedThumb}>
                <Text style={{ fontSize: 22 }}>📖</Text>
              </View>
              <Text numberOfLines={2} style={styles.relatedTitle}>
                {item.title}
              </Text>
              <Text style={styles.relatedPrice}>{item.price}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1a1a2e',
  },
  bookCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 14,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  ratingOverview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avgScore: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginLeft: 10,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authToggleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
  },
  authStatusText: {
    fontSize: 13,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  authToggleBtn: {
    backgroundColor: '#4338ca',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  authToggleBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  notLoggedInBox: {
    padding: 12,
    backgroundColor: '#fff3cd',
    borderRadius: 6,
  },
  notLoggedInText: {
    color: '#856404',
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginTop: 8,
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    height: 70,
    textAlignVertical: 'top',
    backgroundColor: '#fafafa',
  },
  submitBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  disabledBtn: {
    backgroundColor: '#a0c4ff',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
  },
  relatedCard: {
    width: 110,
    marginRight: 10,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
  relatedThumb: {
    width: 44,
    height: 44,
    borderRadius: 6,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
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
