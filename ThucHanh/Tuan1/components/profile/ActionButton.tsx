import { Pressable, StyleSheet, Text } from 'react-native';

type ActionButtonProps = {
  disabled: boolean;
  onPress: () => void;
};

export function ActionButton({ disabled, onPress }: ActionButtonProps) {
  return (
    <Pressable
      accessibilityHint="Nhấn để lưu hồ sơ, sau khi lưu nút tạm khóa trong 3 giây"
      accessibilityLabel="Lưu hồ sơ sinh viên"
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.saveButton,
        pressed && !disabled && styles.saveButtonPressed,
        disabled && styles.saveButtonDisabled,
      ]}>
      <Text style={[styles.saveButtonText, disabled && styles.saveButtonTextDisabled]}>
        Lưu hồ sơ
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#2F9FE8',
    borderColor: '#1688D5',
    borderRadius: 13,
    borderWidth: 2,
    justifyContent: 'center',
    minHeight: 48,
    minWidth: 48,
    overflow: 'hidden',
    paddingHorizontal: 18,
    paddingVertical: 10,
    shadowColor: '#1485CF',
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
  },
  saveButtonDisabled: {
    backgroundColor: '#D9E1EA',
    borderColor: '#CBD5E1',
    shadowOpacity: 0,
  },
  saveButtonPressed: {
    backgroundColor: '#166AAE',
    transform: [{ translateY: 2 }, { scale: 0.98 }],
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
  },
  saveButtonTextDisabled: {
    color: '#8B95A1',
  },
});
