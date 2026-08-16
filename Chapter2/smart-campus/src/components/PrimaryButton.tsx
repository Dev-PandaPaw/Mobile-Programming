import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ComponentProps, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

type IconName = ComponentProps<typeof MaterialIcons>['name'];

type PrimaryButtonProps = {
  label: string;
  accessibilityLabel?: string;
  disabled?: boolean;
  iconName?: IconName;
  loading?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({
  label,
  accessibilityLabel,
  disabled = false,
  iconName,
  loading = false,
  onPress,
  style,
}: PrimaryButtonProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isUnavailable = disabled || loading;

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: isUnavailable }}
      disabled={isUnavailable}
      hitSlop={8}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && !isUnavailable && styles.pressed,
        isFocused && !isUnavailable && styles.focused,
        isUnavailable && styles.disabled,
        style,
      ]}>
      {loading ? <ActivityIndicator color="#FFFFFF" size="small" /> : null}
      {!loading && iconName ? <MaterialIcons color="#FFFFFF" name={iconName} size={24} /> : null}
      <Text style={[styles.label, isUnavailable && styles.disabledLabel]}>
        {loading ? 'Đang xử lý...' : label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#111827',
    borderColor: '#111827',
    borderWidth: 3,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    minHeight: 56,
    minWidth: 48,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  pressed: {
    backgroundColor: '#374151',
    transform: [{ scale: 0.98 }],
  },
  focused: {
    borderColor: '#2563EB',
  },
  disabled: {
    backgroundColor: '#9CA3AF',
    borderColor: '#9CA3AF',
  },
  label: {
    color: '#FFFFFF',
    flexShrink: 1,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
    minWidth: 0,
    textAlign: 'center',
  },
  disabledLabel: {
    color: '#F9FAFB',
  },
});
