// src/components/Bai2_AutoLogin_Checkout.tsx
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
import { useAppDispatch, useAppSelector } from '../store';
import { authService } from '../services/authService';
import {
  restoreSession,
  setAuth,
  logout,
  AUTH_STORAGE_KEY,
} from '../store/authSlice';

export default function Bai2_AutoLogin_Checkout() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  // Chuyển đổi giữa 2 màn hình: 'checkout' (Thanh toán) và 'login' (Đăng nhập)
  const [screen, setScreen] = useState<'checkout' | 'login'>('checkout');

  // Thông báo khi bấm thanh toán mà chưa đăng nhập
  const [notLoggedInWarning, setNotLoggedInWarning] = useState(false);

  // Form đăng nhập
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // 1. Auto-login: Khôi phục phiên và xác minh token khi mở app
  useEffect(() => {
    let isMounted = true;
    const check = async () => {
      setIsCheckingSession(true);
      await dispatch(restoreSession());
      // Giữ loading ~1 giây để dễ dàng chụp màn hình minh chứng
      setTimeout(() => {
        if (isMounted) setIsCheckingSession(false);
      }, 1000);
    };
    check();
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // Kiểm tra email
  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  // 2. Bấm nút Thanh toán
  const handleCheckoutPress = () => {
    if (!auth.isLoggedIn || !auth.user) {
      setNotLoggedInWarning(true);
    } else {
      Alert.alert('Thành công', 'Thanh toán đơn hàng thành công!');
    }
  };

  // 3. Xử lý Đăng nhập -> Thành công thì quay lại đúng trang Thanh toán
  const handleLogin = async () => {
    let valid = true;
    setServerError('');

    if (!email.trim()) {
      setEmailError('Vui lòng nhập email');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Email không đúng định dạng');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Mật khẩu tối thiểu 6 ký tự');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    try {
      setLoading(true);
      const res = await authService.login(email, password);

      // Lưu AsyncStorage và Redux store (không lưu mật khẩu)
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(res));
      dispatch(setAuth(res));

      setNotLoggedInWarning(false);
      Alert.alert('Thành công', 'Đăng nhập thành công! Quay lại trang Thanh toán.');
      setScreen('checkout');
    } catch (err: any) {
      const msg = err.message || 'Đăng nhập thất bại';
      setServerError(msg);
      Alert.alert('Lỗi', msg);
    } finally {
      setLoading(false);
    }
  };

  // 4. Đăng xuất
  const handleLogout = async () => {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    dispatch(logout());
    setNotLoggedInWarning(false);
    Alert.alert('Thông báo', 'Đã đăng xuất thành công!');
  };

  // ====== MÀN HÌNH LOADING (DỄ DÀNG CHỤP ẢNH MINH CHỨNG AUTO-LOGIN) ======
  if (isCheckingSession) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Đang kiểm tra phiên đăng nhập...</Text>
      </View>
    );
  }

  // ====== GIAO DIỆN FORM ĐĂNG NHẬP ======
  if (screen === 'login') {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Đăng nhập</Text>

        {!!serverError && (
          <View style={styles.errorBox}>
            <Text style={styles.errorBoxText}>{serverError}</Text>
          </View>
        )}

        <View style={styles.formContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, !!emailError && styles.inputError]}
            placeholder="Nhập email..."
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              if (emailError) setEmailError('');
              if (serverError) setServerError('');
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
              if (serverError) setServerError('');
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

      {/* Thông tin đơn hàng */}
      <View style={styles.infoBox}>
        <Text style={styles.boxTitle}>📦 Đơn hàng của bạn</Text>
        <Text style={styles.infoText}>• Dế Mèn Phiêu Lưu Ký (x1)</Text>
        <Text style={styles.totalPrice}>Tổng tiền: 45.000 đ</Text>
      </View>

      {/* Trạng thái ĐÃ ĐĂNG NHẬP */}
      {auth.isLoggedIn && auth.user ? (
        <View style={styles.infoBox}>
          <Text style={styles.boxTitle}>👤 Thông tin giao hàng</Text>
          <Text style={styles.infoText}>
            Người nhận: <Text style={styles.bold}>{auth.user.name}</Text>
          </Text>
          <Text style={styles.infoText}>
            Email: <Text style={styles.bold}>{auth.user.email}</Text>
          </Text>

          <TouchableOpacity style={styles.submitButton} onPress={handleCheckoutPress}>
            <Text style={styles.submitButtonText}>Xác nhận Thanh toán</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Trạng thái CHƯA ĐĂNG NHẬP */
        <View>
          <TouchableOpacity style={styles.submitButton} onPress={handleCheckoutPress}>
            <Text style={styles.submitButtonText}>Thanh toán</Text>
          </TouchableOpacity>

          {/* Cảnh báo khi chưa đăng nhập */}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 14,
    fontSize: 15,
    color: '#555',
    fontWeight: '500',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  headerTitle: {
    fontSize: 22,
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
    color: '#222',
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
  errorBox: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  errorBoxText: {
    color: '#c62828',
    fontSize: 13,
    textAlign: 'center',
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
    padding: 14,
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
