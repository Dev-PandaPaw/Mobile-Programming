import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../services/authService';
import { setAuth, logout } from '../store/authSlice';
import { RootState } from '../store';

export default function Bai2_AutoLogin_Checkout() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  // Chuyển đổi giữa 2 màn hình: 'checkout' (Thanh toán) và 'login' (Đăng nhập)
  const [screen, setScreen] = useState<'checkout' | 'login'>('checkout');

  // Thông báo khi bấm thanh toán mà chưa đăng nhập
  const [notLoggedInWarning, setNotLoggedInWarning] = useState(false);

  // Form đăng nhập (giống bài 1)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Auto-login: Kiểm tra AsyncStorage khi mở app
  useEffect(() => {
    const checkAutoLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        const userStr = await AsyncStorage.getItem('auth_user');
        if (token && userStr) {
          dispatch(setAuth({ token, user: JSON.parse(userStr) }));
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkAutoLogin();
  }, [dispatch]);

  // 2. Bấm nút Thanh toán
  const handleCheckoutPress = () => {
    if (!auth.isLoggedIn) {
      // Chưa đăng nhập -> thông báo và hiện link đăng nhập ngay
      setNotLoggedInWarning(true);
    } else {
      Alert.alert('Thành công', 'Thanh toán đơn hàng thành công!');
    }
  };

  // 3. Xử lý Đăng nhập -> Thành công thì quay lại đúng trang Thanh toán
  const handleLogin = async () => {
    let valid = true;

    if (!email.trim() || !/^[^\s@]+@gmail\.com$/i.test(email.trim())) {
      setEmailError('Email phải có định dạng @gmail.com');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password || password.length < 6) {
      setPasswordError('Mật khẩu tối thiểu 6 ký tự');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    try {
      setLoading(true);
      const res = await authService.login(email, password);

      // Lưu AsyncStorage + Redux store
      await AsyncStorage.setItem('auth_token', res.token);
      await AsyncStorage.setItem('auth_user', JSON.stringify(res.user));
      dispatch(setAuth({ token: res.token, user: res.user }));

      setNotLoggedInWarning(false);
      Alert.alert('Thành công', 'Đăng nhập thành công! Quay lại trang Thanh toán.');

      // Quay lại đúng trang Thanh toán
      setScreen('checkout');
    } catch {
      Alert.alert('Lỗi', 'Đăng nhập thất bại.');
    } finally {
      setLoading(false);
    }
  };

  // 4. Đăng xuất
  const handleLogout = async () => {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('auth_user');
    dispatch(logout());
    setNotLoggedInWarning(false);
    Alert.alert('Thông báo', 'Đã đăng xuất thành công!');
  };

  // ====== GIAO DIỆN FORM ĐĂNG NHẬP (GIỐNG BÀI 1) ======
  if (screen === 'login') {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Đăng nhập</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, !!emailError && styles.inputError]}
            placeholder="Nhập email @gmail.com..."
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              if (emailError) setEmailError('');
            }}
          />
          {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}

          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={[styles.input, !!passwordError && styles.inputError]}
            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)..."
            secureTextEntry
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              if (passwordError) setPasswordError('');
            }}
          />
          {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Đăng nhập</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setScreen('checkout')}
          >
            <Text style={styles.backButtonText}>Quay lại trang Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ====== GIAO DIỆN MÀN HÌNH THANH TOÁN (CHECKOUT) ======
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Màn hình Thanh toán (Checkout)</Text>

      {/* Thông tin giỏ hàng / đơn hàng */}
      <View style={styles.infoBox}>
        <Text style={styles.boxTitle}>📦 Đơn hàng của bạn</Text>
        <Text style={styles.infoText}>• Sách Lập trình React Native (x1)</Text>
        <Text style={styles.totalPrice}>Tổng tiền: 150.000 đ</Text>
      </View>

      {/* Nếu ĐÃ ĐĂNG NHẬP */}
      {auth.isLoggedIn && auth.user ? (
        <View style={styles.infoBox}>
          <Text style={styles.boxTitle}>👤 Thông tin giao hàng</Text>
          <Text style={styles.infoText}>Người nhận: <Text style={styles.bold}>{auth.user.name}</Text></Text>
          <Text style={styles.infoText}>Email: <Text style={styles.bold}>{auth.user.email}</Text></Text>
          <Text style={styles.autoLoginText}>✓ Đã tự động đăng nhập từ AsyncStorage</Text>

          <TouchableOpacity style={styles.submitButton} onPress={handleCheckoutPress}>
            <Text style={styles.submitButtonText}>Xác nhận Thanh toán</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Nếu CHƯA ĐĂNG NHẬP */
        <View>
          <TouchableOpacity style={styles.submitButton} onPress={handleCheckoutPress}>
            <Text style={styles.submitButtonText}>Thanh toán</Text>
          </TouchableOpacity>

          {/* Khi bấm thanh toán mà chưa đăng nhập: hiện thông báo + link đăng nhập ngay */}
          {notLoggedInWarning && (
            <View style={styles.warningContainer}>
              <Text style={styles.warningText}>⚠️ Bạn chưa đăng nhập!</Text>
              <TouchableOpacity onPress={() => setScreen('login')}>
                <Text style={styles.linkText}>👉 Bấm vào đây để Đăng nhập ngay</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#1a1a2e',
  },
  infoBox: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 20,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc3545',
    marginTop: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  autoLoginText: {
    color: '#28a745',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fafafa',
  },
  inputError: {
    borderColor: '#dc3545',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#a0c4ff',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  backButtonText: {
    color: '#666',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  warningContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffeeba',
    alignItems: 'center',
  },
  warningText: {
    color: '#856404',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  linkText: {
    color: '#007bff',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
