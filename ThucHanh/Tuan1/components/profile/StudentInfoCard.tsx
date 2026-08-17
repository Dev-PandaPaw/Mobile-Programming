import { StyleSheet, Text, View } from 'react-native';

import { InfoRow } from './InfoRow';

type StudentInfoCardProps = {
  className: string;
  email: string;
};

export function StudentInfoCard({ className, email }: StudentInfoCardProps) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoTitle}>Thông tin sinh viên</Text>
      <InfoRow icon="email" label="Email:" value={email} />
      <View style={styles.infoDivider} />
      <InfoRow icon="school" label="Class:" value={className} />
    </View>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: '#EAF3FF',
    borderColor: '#B7D8F8',
    borderRadius: 18,
    borderWidth: 1,
    gap: 10,
    padding: 13,
    shadowColor: '#0B5BA8',
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  infoDivider: {
    backgroundColor: '#C8DEF4',
    height: 1,
    marginLeft: 26,
  },
  infoTitle: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
  },
});
