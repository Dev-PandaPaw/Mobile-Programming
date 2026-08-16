import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Course = {
  code: string;
  title: string;
  instructor: string;
  actionLabel: string;
};

type Announcement = {
  id: string;
  category: string;
  title: string;
  summary: string;
  time: string;
};

const featuredCourse: Course = {
  code: 'CS-301',
  title: 'Lập trình ứng dụng di động đa nền tảng với React Native và TypeScript',
  instructor: 'Giảng viên phụ trách: Prof. Alan Turing và nhóm trợ giảng thực hành',
  actionLabel: 'Mở không gian học tập của môn học',
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
        <CourseCard course={featuredCourse} />
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
      </ScrollView>
    </SafeAreaView>
  );
}

function TopBar() {
  return (
    <View style={styles.topBar}>
      <Pressable accessibilityLabel="Mở menu điều hướng" accessibilityRole="button" style={styles.iconButton}>
        <MaterialIcons color="#4B5563" name="menu" size={36} />
      </Pressable>
      <Text style={styles.appTitle}>SmartCampus Student Dashboard</Text>
      <Pressable
        accessibilityLabel="Mở hồ sơ cá nhân"
        accessibilityRole="button"
        style={styles.avatarButton}>
        <MaterialIcons color="#6B7280" name="person-outline" size={32} />
      </Pressable>
    </View>
  );
}

function SearchField() {
  return (
    <View style={styles.searchField}>
      <MaterialIcons color="#6B7280" name="search" size={34} />
      <TextInput
        accessibilityLabel="Tìm kiếm thông báo trong SmartCampus"
        placeholder="Tìm kiếm thông báo, lịch học, bài tập hoặc cập nhật học vụ"
        placeholderTextColor="#6B7280"
        style={styles.searchInput}
      />
    </View>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Khóa học nổi bật trong học kỳ này</Text>
      <View style={styles.courseCard}>
        <View accessibilityLabel="Ảnh minh họa khóa học" style={styles.imagePlaceholder}>
          <View style={[styles.crossLine, styles.crossLineForward]} />
          <View style={[styles.crossLine, styles.crossLineBackward]} />
        </View>
        <Text style={styles.courseCode}>{course.code}</Text>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.instructor}>{course.instructor}</Text>
        <View style={styles.cardDivider} />
        <Pressable accessibilityRole="button" style={styles.courseButton}>
          <Text style={styles.courseButtonLabel}>{course.actionLabel}</Text>
        </Pressable>
      </View>
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
    <Pressable accessibilityRole="button" style={styles.profileButton}>
      <Text style={styles.profileButtonText}>Xem hồ sơ sinh viên và tiến độ học tập</Text>
      <MaterialIcons color="#111827" name="person-outline" size={32} />
    </Pressable>
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
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    minWidth: 48,
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
  avatarButton: {
    alignItems: 'center',
    borderColor: '#9CA3AF',
    borderRadius: 28,
    borderWidth: 3,
    justifyContent: 'center',
    minHeight: 56,
    minWidth: 56,
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
  courseCard: {
    borderColor: '#9CA3AF',
    borderWidth: 2,
    padding: 18,
  },
  imagePlaceholder: {
    aspectRatio: 2.55,
    backgroundColor: '#F4F5F7',
    borderColor: '#D1D5DB',
    borderWidth: 2,
    overflow: 'hidden',
    width: '100%',
  },
  crossLine: {
    backgroundColor: '#AEB5BF',
    height: 3,
    left: '-12%',
    position: 'absolute',
    top: '50%',
    width: '124%',
  },
  crossLineForward: {
    transform: [{ rotate: '21deg' }],
  },
  crossLineBackward: {
    transform: [{ rotate: '-21deg' }],
  },
  courseCode: {
    color: '#6B7280',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 28,
    marginTop: 22,
  },
  courseTitle: {
    color: '#000000',
    flexShrink: 1,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 36,
    marginTop: 8,
    minWidth: 0,
  },
  instructor: {
    color: '#4B5563',
    flexShrink: 1,
    fontSize: 22,
    lineHeight: 30,
    marginTop: 12,
    minWidth: 0,
  },
  cardDivider: {
    backgroundColor: '#D1D5DB',
    height: 1,
    marginTop: 24,
  },
  courseButton: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#E5E7EB',
    borderColor: '#111827',
    borderWidth: 3,
    justifyContent: 'center',
    marginTop: 18,
    maxWidth: '100%',
    minHeight: 56,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  courseButtonLabel: {
    color: '#000000',
    flexShrink: 1,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
    textAlign: 'center',
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
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderColor: '#111827',
    borderWidth: 3,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 44,
    minHeight: 66,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  profileButtonText: {
    color: '#000000',
    flexShrink: 1,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 29,
    minWidth: 0,
    textAlign: 'center',
  },
});
