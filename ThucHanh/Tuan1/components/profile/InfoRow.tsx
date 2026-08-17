import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from 'react-native';

import { IconName } from './types';

type InfoRowProps = {
  icon: IconName;
  label: string;
  value: string;
};

export function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <MaterialIcons color="#1E9BEA" name={icon} size={19} />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text numberOfLines={1} style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    minHeight: 26,
  },
  infoLabel: {
    color: '#1F2937',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
    minWidth: 56,
  },
  infoValue: {
    color: '#111827',
    flex: 1,
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 18,
    minWidth: 0,
    textAlign: 'right',
  },
});
