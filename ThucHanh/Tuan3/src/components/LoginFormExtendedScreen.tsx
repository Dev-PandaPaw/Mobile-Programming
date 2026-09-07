import React, { useReducer } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';

interface FormState {
  email: string;
  password: string;
  error: string;
  isSubmitting: boolean;
  successMessage: string;
}

type FormAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'START_SUBMIT' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'RESET' };

const initialState: FormState = {
  email: '',
  password: '',
  error: '',
  isSubmitting: false,
  successMessage: '',
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload, error: '', successMessage: '' };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload, error: '', successMessage: '' };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isSubmitting: false };
    case 'START_SUBMIT':
      return { ...state, isSubmitting: true, error: '', successMessage: '' };
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, successMessage: 'Đăng nhập thành công!' };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function LoginFormExtendedScreen() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleLogin = () => {
    if (!state.email || !state.password) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Vui lòng nhập đầy đủ thông tin',
      });
      return;
    }

    if (!state.email.includes('@')) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Email phải chứa ký tự @',
      });
      return;
    }

    if (state.password.length < 6) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Mật khẩu phải có ít nhất 6 ký tự',
      });
      return;
    }

    dispatch({ type: 'START_SUBMIT' });

    setTimeout(() => {
      dispatch({ type: 'SUBMIT_SUCCESS' });
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={state.email}
        onChangeText={text =>
          dispatch({ type: 'SET_EMAIL', payload: text })
        }
        placeholder="Email (ví dụ: user@example.com)"
        autoCapitalize="none"
        editable={!state.isSubmitting}
      />
      <TextInput
        style={styles.input}
        value={state.password}
        onChangeText={text =>
          dispatch({ type: 'SET_PASSWORD', payload: text })
        }
        placeholder="Mật khẩu (tối thiểu 6 ký tự)"
        secureTextEntry
        editable={!state.isSubmitting}
      />
      {state.error ? <Text style={styles.errorText}>{state.error}</Text> : null}
      {state.successMessage ? (
        <Text style={styles.successText}>{state.successMessage}</Text>
      ) : null}

      {state.isSubmitting ? (
        <View style={styles.submittingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.submittingText}>Đang đăng nhập...</Text>
        </View>
      ) : (
        <Button title="Đăng nhập" onPress={handleLogin} />
      )}

      <Button
        title="Đặt lại"
        onPress={() => dispatch({ type: 'RESET' })}
        disabled={state.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  submittingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  submittingText: {
    color: '#007AFF',
    fontSize: 16,
  },
});
