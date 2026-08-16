import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ComponentProps, useState } from 'react';
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

type IconName = ComponentProps<typeof MaterialIcons>['name'];

type IconButtonProps = {
  accessibilityHint?: string;
  accessibilityLabel: string;
  disabled?: boolean;
  iconName: IconName;
  loading?: boolean;
  onPress?: () => void;
  shape?: 'circle' | 'square';
  style?: StyleProp<ViewStyle>;
};

export function IconButton({
  accessibilityHint,
  accessibilityLabel,
  disabled = false,
  iconName,
  loading = false,
  onPress,
  shape = 'square',
  style,
}: IconButtonProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isUnavailable = disabled || loading;

  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: isUnavailable }}
      disabled={isUnavailable}
      hitSlop={8}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        shape === 'circle' && styles.circle,
        pressed && !isUnavailable && styles.pressed,
        isFocused && !isUnavailable && styles.focused,
        isUnavailable && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color="#4B5563" size="small" />
      ) : (
        <MaterialIcons color={isUnavailable ? '#9CA3AF' : '#4B5563'} name={iconName} size={32} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: 'transparent',
    borderWidth: 3,
    justifyContent: 'center',
    minHeight: 48,
    minWidth: 48,
  },
  circle: {
    borderColor: '#9CA3AF',
    borderRadius: 28,
    minHeight: 56,
    minWidth: 56,
  },
  pressed: {
    backgroundColor: '#E5E7EB',
    transform: [{ scale: 0.96 }],
  },
  focused: {
    borderColor: '#2563EB',
  },
  disabled: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
  },
});
