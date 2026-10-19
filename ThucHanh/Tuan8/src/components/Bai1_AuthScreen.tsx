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
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../services/authService';
import { setAuth, logout } from '../store/authSlice';
import { RootState } from '../store';

interface Bai1_AuthScreenProps {
  onNavigateHome?: () => void;
}

export default function Bai1_AuthScreen({ onNavigateHome }: Bai1_AuthScreenProps) {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

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

  // Hàm kiểm tra định dạng email (@gmail.com)
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@gmail\.com$/i.test(email.trim());
  };

  // Xử lý Đăng nhập
  const handleLogin = async () => {
    let valid = true;

    if (!loginEmail.trim()) {
      setLoginEmailError('Vui lòng nhập email');
      valid = false;
    } else if (!isValidEmail(loginEmail)) {
      setLoginEmailError('Email phải có định dạng @gmail.com');
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
      const res = await authService.login(loginEmail, loginPassword);

      // Lưu token + user vào AsyncStorage
      await AsyncStorage.setItem('auth_token', res.token);
      await AsyncStorage.setItem('auth_user', JSON.stringify(res.user));

      // Lưu vào store 'auth'
      dispatch(setAuth({ token: res.token, user: res.user }));

      Alert.alert('Thành công', 'Đăng nhập thành công! Điều hướng về Home.');

      if (onNavigateHome) {
        onNavigateHome();
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đăng nhập thất bại, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý Đăng ký
  const handleRegister = async () => {
    let valid = true;

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
      setRegEmailError('Email phải có định dạng @gmail.com');
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
      const res = await authService.register(regEmail, regPassword, regName);

      // Lưu token + user vào AsyncStorage
      await AsyncStorage.setItem('auth_token', res.token);
      await AsyncStorage.setItem('auth_user', JSON.stringify(res.user));

      // Lưu vào store 'auth'
      dispatch(setAuth({ token: res.token, user: res.user }));

      Alert.alert('Thành công', 'Đăng ký thành công! Điều hướng về Home.');

      if (onNavigateHome) {
        onNavigateHome();
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đăng ký thất bại, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý Đăng xuất khi đang ở màn hình Home mô phỏng
  const handleLogout = async () => {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('auth_user');
    dispatch(logout());
  };

  // Nếu đã đăng nhập thành công (đang ở Home)
  if (auth.isLoggedIn && auth.user) {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.homeTitle}>🏠 Màn hình Home</Text>
        <Text style={styles.homeSub}>Đăng nhập thành công!</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}><Text style={styles.bold}>Họ tên:</Text> {auth.user.name}</Text>
          <Text style={styles.infoText}><Text style={styles.bold}>Email:</Text> {auth.user.email}</Text>
          <Text style={styles.infoText}><Text style={styles.bold}>Token:</Text> {auth.token?.substring(0, 20)}...</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>BookStore Online</Text>

      {/* Tabs chuyển đổi Đăng nhập / Đăng ký */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'login' && styles.activeTabButton]}
          onPress={() => setActiveTab('login')}
        >
          <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>
            Đăng nhập
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'register' && styles.activeTabButton]}
          onPress={() => setActiveTab('register')}
        >
          <Text style={[styles.tabText, activeTab === 'register' && styles.activeTabText]}>
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>

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
            onChangeText={(text) => {
              setLoginEmail(text);
              if (loginEmailError) setLoginEmailError('');
            }}
          />
          {!!loginEmailError && <Text style={styles.errorText}>{loginEmailError}</Text>}

          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={[styles.input, !!loginPasswordError && styles.inputError]}
            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)..."
            secureTextEntry
            value={loginPassword}
            onChangeText={(text) => {
              setLoginPassword(text);
              if (loginPasswordError) setLoginPasswordError('');
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
            onChangeText={(text) => {
              setRegName(text);
              if (regNameError) setRegNameError('');
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
            onChangeText={(text) => {
              setRegEmail(text);
              if (regEmailError) setRegEmailError('');
            }}
          />
          {!!regEmailError && <Text style={styles.errorText}>{regEmailError}</Text>}

          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={[styles.input, !!regPasswordError && styles.inputError]}
            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)..."
            secureTextEntry
            value={regPassword}
            onChangeText={(text) => {
              setRegPassword(text);
              if (regPasswordError) setRegPasswordError('');
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
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
    marginTop: 24,
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
  },
  homeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 8,
  },
  homeSub: {
    fontSize: 16,
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
    marginBottom: 24,
  },
  infoText: {
    fontSize: 15,
    color: '#333',
    marginVertical: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
