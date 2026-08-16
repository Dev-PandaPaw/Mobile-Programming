import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconButton } from '@/src/components/IconButton';
import { SecondaryButton } from '@/src/components/SecondaryButton';
import { ButtonStateDemo } from '@/src/features/buttons/ButtonStateDemo';
import { CourseCard } from '@/src/features/courses/CourseCard';
import { courseImageCases } from '@/src/features/courses/mockCourses';

type Announcement = {
  id: string;
  category: string;
  title: string;
  summary: string;
  time: string;
};

const announcements: Announcement[] = [
  {
    id: 'midterm-exam',
    category: 'LỊCH KIỂM TRA QUAN TRỌNG',
    title: 'Thông báo cập nhật lịch học và lịch kiểm tra giữa kỳ dành cho sinh viên',
    summary:
      'Sinh viên vui lòng kiểm tra lại phòng thi, thời gian bắt đầu và các yêu cầu chuẩn bị trước khi tham gia buổi kiểm tra.',
    time: 'Oct 12, 09:00 AM',
  },
  {
    id: 'assignment',
    category: 'BÀI TẬP THỰC HÀNH CÓ HẠN NỘP',
    title: 'Bài tập Mobile Programming về xử lý bố cục khi nội dung văn bản rất dài',
    summary:
      'Nộp ảnh chụp màn hình trước và sau khi sửa lỗi, kèm phần giải thích ngắn về quyết định layout.',
    time: 'Oct 10, 02:30 PM',
  },
  {
    id: 'library-hours',
    category: 'THÔNG BÁO CHUNG TỪ NHÀ TRƯỜNG',
    title: 'Thư viện thay đổi giờ mở cửa trong tuần lễ bảo trì hệ thống học liệu',
    summary:
      'Khu tự học tầng hai vẫn mở cửa nhưng số lượng chỗ ngồi có thể bị giới hạn vào buổi tối.',
    time: 'Oct 08, 11:15 AM',
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <TopBar />
        <SearchField />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Khóa học nổi bật trong học kỳ này</Text>
          {courseImageCases.map((course) => (
            <CourseCard course={course} key={course.code} />
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông báo mới nhất dành cho sinh viên</Text>
          {announcements.map((announcement, index) => (
            <AnnouncementRow
              announcement={announcement}
              isLast={index === announcements.length - 1}
              key={announcement.id}
            />
          ))}
        </View>
        <ProfileAction />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Button state system</Text>
          <ButtonStateDemo />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TopBar() {
  return (
    <View style={styles.topBar}>
      <IconButton
        accessibilityLabel="Mở menu điều hướng"
        iconName="menu"
        onPress={() => undefined}
      />
      <Text style={styles.appTitle}>SmartCampus Student Dashboard</Text>
      <IconButton
        accessibilityLabel="Mở hồ sơ cá nhân"
        iconName="person-outline"
        onPress={() => undefined}
        shape="circle"
      />
    </View>
  );
}

function SearchField() {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.searchField}>
      <MaterialIcons color="#6B7280" name="search" size={34} />
      <TextInput
        accessibilityLabel="Tìm kiếm thông báo trong SmartCampus"
        onChangeText={setQuery}
        placeholder="Tìm kiếm thông báo, lịch học, bài tập hoặc cập nhật học vụ"
        placeholderTextColor="#6B7280"
        style={styles.searchInput}
        value={query}
      />
      <IconButton
        accessibilityLabel="Xóa nội dung tìm kiếm"
        disabled={!query}
        iconName="close"
        onPress={() => setQuery('')}
      />
    </View>
  );
}

function AnnouncementRow({
  announcement,
  isLast,
}: {
  announcement: Announcement;
  isLast: boolean;
}) {
  return (
    <Pressable
      accessibilityLabel={`${announcement.category}. ${announcement.title}`}
      accessibilityRole="button"
      style={[styles.announcementRow, isLast && styles.lastAnnouncementRow]}>
      <View style={styles.announcementTextColumn}>
        <Text style={styles.announcementCategory}>{announcement.category}</Text>
        <Text style={styles.announcementTitle}>{announcement.title}</Text>
        <Text style={styles.announcementSummary}>{announcement.summary}</Text>
        <Text style={styles.announcementTime}>{announcement.time}</Text>
      </View>
      <MaterialIcons color="#6B7280" name="chevron-right" size={36} />
    </Pressable>
  );
}

function ProfileAction() {
  return (
    <SecondaryButton
      iconName="person-outline"
      label="Xem hồ sơ sinh viên và tiến độ học tập"
      onPress={() => undefined}
      style={styles.profileButton}
    />
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  content: {
    paddingBottom: 36,
  },
  topBar: {
    alignItems: 'center',
    borderBottomColor: '#D1D5DB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  appTitle: {
    color: '#000000',
    flex: 1,
    flexShrink: 1,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    minWidth: 0,
  },
  searchField: {
    alignItems: 'center',
    borderColor: '#9CA3AF',
    borderWidth: 2,
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 20,
    marginTop: 28,
    minHeight: 68,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchInput: {
    color: '#111827',
    flex: 1,
    flexShrink: 1,
    fontSize: 22,
    lineHeight: 28,
    minWidth: 0,
    paddingVertical: 0,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 34,
  },
  sectionTitle: {
    color: '#000000',
    fontSize: 27,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 18,
  },
  announcementRow: {
    alignItems: 'center',
    borderBottomColor: '#D1D5DB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 24,
    paddingTop: 24,
  },
  lastAnnouncementRow: {
    borderBottomWidth: 0,
  },
  announcementTextColumn: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  announcementCategory: {
    color: '#6B7280',
    flexShrink: 1,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 25,
    minWidth: 0,
  },
  announcementTitle: {
    color: '#000000',
    flexShrink: 1,
    fontSize: 23,
    fontWeight: '800',
    lineHeight: 31,
    marginTop: 8,
    minWidth: 0,
  },
  announcementSummary: {
    color: '#4B5563',
    flexShrink: 1,
    fontSize: 20,
    lineHeight: 29,
    marginTop: 8,
    minWidth: 0,
  },
  announcementTime: {
    color: '#9CA3AF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
    marginTop: 12,
  },
  profileButton: {
    marginHorizontal: 20,
    marginTop: 44,
  },
});
