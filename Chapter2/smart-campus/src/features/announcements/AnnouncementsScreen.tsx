import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  SectionList,
  SectionListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconButton } from '@/src/components/IconButton';
import { SecondaryButton } from '@/src/components/SecondaryButton';
import { ButtonStateDemo } from '@/src/features/buttons/ButtonStateDemo';
import { CourseGrid } from '@/src/features/courses/CourseGrid';

import { AnnouncementRow } from './AnnouncementRow';
import { announcements } from './announcementData';
import { createAnnouncementSections } from './announcementSections';
import { Announcement, AnnouncementSection } from './types';

export function AnnouncementsScreen() {
  const [showEmptyState, setShowEmptyState] = useState(false);
  const sections = showEmptyState ? [] : createAnnouncementSections(announcements);

  const renderAnnouncement = useCallback<SectionListRenderItem<Announcement, AnnouncementSection>>(
    ({ item }) => <AnnouncementRow announcement={item} />,
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <SectionList
        ListEmptyComponent={<AnnouncementsEmptyState />}
        ListFooterComponent={
          <DashboardFooter
            onToggleEmptyState={() => setShowEmptyState((value) => !value)}
            showEmptyState={showEmptyState}
          />
        }
        ListHeaderComponent={<DashboardHeader />}
        ItemSeparatorComponent={AnnouncementSeparator}
        contentContainerStyle={styles.content}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        renderItem={renderAnnouncement}
        renderSectionHeader={({ section }) => <AnnouncementSectionHeader title={section.title} />}
        sections={sections}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled
      />
    </SafeAreaView>
  );
}

function DashboardHeader() {
  return (
    <>
      <TopBar />
      <SearchField />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Khóa học nổi bật trong học kỳ này</Text>
        <CourseGrid />
      </View>
      <View style={styles.announcementsHeader}>
        <Text style={styles.sectionTitle}>Thông báo mới nhất dành cho sinh viên</Text>
      </View>
    </>
  );
}

function DashboardFooter({
  onToggleEmptyState,
  showEmptyState,
}: {
  onToggleEmptyState: () => void;
  showEmptyState: boolean;
}) {
  return (
    <>
      <ProfileAction />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SectionList controls</Text>
        <SecondaryButton
          label={showEmptyState ? 'Khôi phục danh sách thông báo' : 'Xem trạng thái danh sách rỗng'}
          onPress={onToggleEmptyState}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Button state system</Text>
        <ButtonStateDemo />
      </View>
    </>
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
        onPress={() => router.push('/profile')}
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

function AnnouncementSeparator() {
  return <View style={styles.separator} />;
}

function AnnouncementSectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );
}

function AnnouncementsEmptyState() {
  return (
    <View style={styles.emptyState}>
      <MaterialIcons color="#6B7280" name="inbox" size={38} />
      <Text style={styles.emptyTitle}>Chưa có thông báo mới</Text>
      <Text style={styles.emptyBody}>Các cập nhật học vụ, sự kiện và dịch vụ sinh viên sẽ xuất hiện tại đây.</Text>
    </View>
  );
}

function ProfileAction() {
  return (
    <SecondaryButton
      iconName="person-outline"
      label="Xem hồ sơ sinh viên và tiến độ học tập"
      onPress={() => router.push('/profile')}
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
  announcementsHeader: {
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
  separator: {
    backgroundColor: '#D1D5DB',
    height: 1,
    marginHorizontal: 20,
  },
  sectionHeader: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionHeaderText: {
    color: '#0F766E',
    flexShrink: 1,
    fontSize: 19,
    fontWeight: '900',
    lineHeight: 26,
    minWidth: 0,
    textTransform: 'uppercase',
  },
  emptyState: {
    alignItems: 'center',
    borderColor: '#D1D5DB',
    borderWidth: 2,
    gap: 8,
    marginHorizontal: 20,
    paddingHorizontal: 18,
    paddingVertical: 28,
  },
  emptyTitle: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 29,
    textAlign: 'center',
  },
  emptyBody: {
    color: '#4B5563',
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
  },
  profileButton: {
    marginHorizontal: 20,
    marginTop: 44,
  },
});
