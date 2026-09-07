import React, { useReducer } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface FormState {
  email: string;
  password: string;
  error: string;
}

type FormAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RESET' };

const initialState: FormState = {
  email: '',
  password: '',
  error: '',
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload, error: '' };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload, error: '' };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function LoginFormScreen() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleLogin = () => {
    if (!state.email || !state.password) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Vui lòng nhập đầy đủ thông tin',
      });
      return;
    }
    dispatch({ type: 'SET_ERROR', payload: '' });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={state.email}
        onChangeText={text =>
          dispatch({ type: 'SET_EMAIL', payload: text })
        }
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={state.password}
        onChangeText={text =>
          dispatch({ type: 'SET_PASSWORD', payload: text })
        }
        placeholder="Mật khẩu"
        secureTextEntry
      />
      {state.error ? <Text style={styles.errorText}>{state.error}</Text> : null}
      <Button title="Đăng nhập" onPress={handleLogin} />
      <Button title="Đặt lại" onPress={() => dispatch({ type: 'RESET' })} />
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
});
