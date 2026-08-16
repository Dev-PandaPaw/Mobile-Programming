import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Announcement } from './types';

type AnnouncementRowProps = {
  announcement: Announcement;
};

const categoryLabels: Record<Announcement['category'], string> = {
  academic: 'HỌC VỤ',
  event: 'SỰ KIỆN',
  service: 'DỊCH VỤ SINH VIÊN',
};

export function AnnouncementRow({ announcement }: AnnouncementRowProps) {
  return (
    <Pressable
      accessibilityLabel={`${categoryLabels[announcement.category]}. ${announcement.title}`}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.textColumn}>
        <Text style={styles.category}>{categoryLabels[announcement.category]}</Text>
        <Text style={styles.title}>{announcement.title}</Text>
        <Text style={styles.summary}>{announcement.summary}</Text>
        <Text style={styles.time}>{announcement.publishedAt}</Text>
      </View>
      <MaterialIcons color="#6B7280" name="chevron-right" size={36} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 24,
  },
  pressed: {
    backgroundColor: '#F3F4F6',
  },
  textColumn: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  category: {
    color: '#6B7280',
    flexShrink: 1,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 25,
    minWidth: 0,
  },
  title: {
    color: '#000000',
    flexShrink: 1,
    fontSize: 23,
    fontWeight: '800',
    lineHeight: 31,
    marginTop: 8,
    minWidth: 0,
  },
  summary: {
    color: '#4B5563',
    flexShrink: 1,
    fontSize: 20,
    lineHeight: 29,
    marginTop: 8,
    minWidth: 0,
  },
  time: {
    color: '#9CA3AF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
    marginTop: 12,
  },
});
