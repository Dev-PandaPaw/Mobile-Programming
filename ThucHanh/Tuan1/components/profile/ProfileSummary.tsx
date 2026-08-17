import { StyleSheet, Text, View } from 'react-native';

import { Avatar } from './Avatar';

type ProfileSummaryProps = {
  fullName: string;
  studentId: string;
};

export function ProfileSummary({ fullName, studentId }: ProfileSummaryProps) {
  return (
    <View style={styles.profileSummary}>
      <Avatar />
      <View style={styles.profileText}>
        <Text style={styles.studentName}>{fullName}</Text>
        <Text style={styles.studentCode}>SV: {studentId}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileSummary: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  profileText: {
    flex: 1,
    minWidth: 0,
  },
  studentName: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 23,
  },
  studentCode: {
    color: '#6B7280',
    fontSize: 11,
    lineHeight: 17,
  },
});
