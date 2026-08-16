import { StyleSheet, Text, View } from 'react-native';

import { IconButton } from '@/src/components/IconButton';
import { PrimaryButton } from '@/src/components/PrimaryButton';
import { SecondaryButton } from '@/src/components/SecondaryButton';

export function ButtonStateDemo() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.stateLabel}>Primary</Text>
        <PrimaryButton label="Nhấn giữ để xem pressed" onPress={() => undefined} />
        <PrimaryButton label="Đang xử lý" loading onPress={() => undefined} />
        <PrimaryButton disabled label="Tạm khóa" onPress={() => undefined} />
      </View>
      <View style={styles.row}>
        <Text style={styles.stateLabel}>Secondary</Text>
        <SecondaryButton label="Tab để xem focused" onPress={() => undefined} />
        <SecondaryButton label="Đang xử lý" loading onPress={() => undefined} />
        <SecondaryButton disabled label="Tạm khóa" onPress={() => undefined} />
      </View>
      <View style={styles.iconRow}>
        <Text style={styles.stateLabel}>Icon</Text>
        <IconButton
          accessibilityLabel="Mở bộ lọc thông báo"
          iconName="tune"
          onPress={() => undefined}
        />
        <IconButton accessibilityLabel="Đang tải bộ lọc" iconName="sync" loading />
        <IconButton accessibilityLabel="Bộ lọc đang bị khóa" disabled iconName="lock" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  row: {
    gap: 10,
  },
  iconRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  stateLabel: {
    color: '#4B5563',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 24,
  },
});
