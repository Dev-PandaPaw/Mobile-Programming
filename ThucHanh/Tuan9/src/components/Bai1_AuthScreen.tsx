// src/components/Bai1_AuthScreen.tsx
import React, { useState } from 'react';
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
import { setAuth, logout, AUTH_STORAGE_KEY } from '../store/authSlice';

export default function Bai1_AuthScreen() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Form Đăng nhập
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginEmailError, setLoginEmailError] = useState('');
  const [loginPasswordError, setLoginPasswordError] = useState('');

  // Form Đăng ký
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regNameError, setRegNameError] = useState('');
  const [regEmailError, setRegEmailError] = useState('');
  const [regPasswordError, setRegPasswordError] = useState('');

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Kiểm tra định dạng email
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  // Xử lý Đăng nhập
  const handleLogin = async () => {
    let valid = true;
    setServerError('');

    if (!loginEmail.trim()) {
      setLoginEmailError('Vui lòng nhập email');
      valid = false;
    } else if (!isValidEmail(loginEmail)) {
      setLoginEmailError('Email không đúng định dạng');
      valid = false;
    } else {
      setLoginEmailError('');
    }

    if (!loginPassword) {
      setLoginPasswordError('Vui lòng nhập mật khẩu');
      valid = false;
    } else if (loginPassword.length < 6) {
      setLoginPasswordError('Mật khẩu tối thiểu 6 ký tự');
      valid = false;
    } else {
      setLoginPasswordError('');
    }

    if (!valid) return;

    try {
      setLoading(true);
      // Gọi POST /login
      const result = await authService.login(loginEmail, loginPassword);

      // Lưu AsyncStorage và Redux store (không lưu mật khẩu)
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result));
      dispatch(setAuth(result));
    } catch (err: any) {
      const msg = err.message || 'Đăng nhập thất bại';
      setServerError(msg);
      Alert.alert('Lỗi', msg);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý Đăng ký
  const handleRegister = async () => {
    let valid = true;
    setServerError('');

    if (!regName.trim()) {
      setRegNameError('Vui lòng nhập họ tên');
      valid = false;
    } else {
      setRegNameError('');
    }

    if (!regEmail.trim()) {
      setRegEmailError('Vui lòng nhập email');
      valid = false;
    } else if (!isValidEmail(regEmail)) {
      setRegEmailError('Email không đúng định dạng');
      valid = false;
    } else {
      setRegEmailError('');
    }

    if (!regPassword) {
      setRegPasswordError('Vui lòng nhập mật khẩu');
      valid = false;
    } else if (regPassword.length < 6) {
      setRegPasswordError('Mật khẩu tối thiểu 6 ký tự');
      valid = false;
    } else {
      setRegPasswordError('');
    }

    if (!valid) return;

    try {
      setLoading(true);
      // Gọi POST /register
      const result = await authService.register(regName, regEmail, regPassword);

      // Lưu AsyncStorage và Redux store (không lưu mật khẩu)
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result));
      dispatch(setAuth(result));
    } catch (err: any) {
      const msg = err.message || 'Đăng ký thất bại';
      setServerError(msg);
      Alert.alert('Lỗi', msg);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý Đăng xuất
  const handleLogout = async () => {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    dispatch(logout());
  };

  // Xử lý Copy token
  const [copied, setCopied] = useState(false);
  const handleCopyToken = async () => {
    if (!auth.token) return;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(auth.token);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      Alert.alert('Token', auth.token);
    }
  };

  // Giao diện khi ĐÃ ĐĂNG NHẬP (Home)
  if (auth.isLoggedIn && auth.user) {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.homeTitle}>🏠 Màn hình Home</Text>
        <Text style={styles.homeSub}>Đăng nhập thành công!</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Họ tên:</Text> {auth.user.name}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Email:</Text> {auth.user.email}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>ID:</Text> {auth.user.id}
          </Text>
          <View style={styles.tokenContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bold}>Token (JWT):</Text>
              <Text style={styles.tokenBoxText} numberOfLines={2}>
                {auth.token}
              </Text>
            </View>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopyToken}>
              <Text style={styles.copyButtonText}>{copied ? '✓ Đã chép' : '📋 Copy'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Giao diện khi CHƯA ĐĂNG NHẬP
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>BookStore Online</Text>

      {/* Tabs Đăng nhập / Đăng ký */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'login' && styles.activeTabButton]}
          onPress={() => {
            setActiveTab('login');
            setServerError('');
          }}
        >
          <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>
            Đăng nhập
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'register' && styles.activeTabButton]}
          onPress={() => {
            setActiveTab('register');
            setServerError('');
          }}
        >
          <Text style={[styles.tabText, activeTab === 'register' && styles.activeTabText]}>
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lỗi từ Server */}
      {!!serverError && (
        <View style={styles.errorBox}>
          <Text style={styles.errorBoxText}>{serverError}</Text>
        </View>
      )}

      {/* Form Đăng nhập */}
      {activeTab === 'login' && (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, !!loginEmailError && styles.inputError]}
            placeholder="Nhập email..."
            keyboardType="email-address"
            autoCapitalize="none"
            value={loginEmail}
            onChangeText={(t) => {
              setLoginEmail(t);
              if (loginEmailError) setLoginEmailError('');
              if (serverError) setServerError('');
            }}
          />
          {!!loginEmailError && <Text style={styles.errorText}>{loginEmailError}</Text>}

          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={[styles.input, !!loginPasswordError && styles.inputError]}
            placeholder="Nhập mật khẩu..."
            secureTextEntry
            value={loginPassword}
            onChangeText={(t) => {
              setLoginPassword(t);
              if (loginPasswordError) setLoginPasswordError('');
              if (serverError) setServerError('');
            }}
          />
          {!!loginPasswordError && <Text style={styles.errorText}>{loginPasswordError}</Text>}

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
        </View>
      )}

      {/* Form Đăng ký */}
      {activeTab === 'register' && (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Họ và tên</Text>
          <TextInput
            style={[styles.input, !!regNameError && styles.inputError]}
            placeholder="Nhập họ tên..."
            value={regName}
            onChangeText={(t) => {
              setRegName(t);
              if (regNameError) setRegNameError('');
              if (serverError) setServerError('');
            }}
          />
          {!!regNameError && <Text style={styles.errorText}>{regNameError}</Text>}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, !!regEmailError && styles.inputError]}
            placeholder="Nhập email..."
            keyboardType="email-address"
            autoCapitalize="none"
            value={regEmail}
            onChangeText={(t) => {
              setRegEmail(t);
              if (regEmailError) setRegEmailError('');
              if (serverError) setServerError('');
            }}
          />
          {!!regEmailError && <Text style={styles.errorText}>{regEmailError}</Text>}

          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={[styles.input, !!regPasswordError && styles.inputError]}
            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)..."
            secureTextEntry
            value={regPassword}
            onChangeText={(t) => {
              setRegPassword(t);
              if (regPasswordError) setRegPasswordError('');
              if (serverError) setServerError('');
            }}
          />
          {!!regPasswordError && <Text style={styles.errorText}>{regPasswordError}</Text>}

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Đăng ký</Text>
            )}
          </TouchableOpacity>
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
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1a1a2e',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 3,
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#007bff',
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
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#a0c4ff',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 6,
  },
  homeSub: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 4,
  },
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 8,
    borderRadius: 6,
    marginTop: 6,
    gap: 8,
  },
  tokenBoxText: {
    fontSize: 12,
    color: '#475569',
    fontFamily: 'monospace',
    marginTop: 2,
  },
  copyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'center',
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
