import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActionButton } from '@/components/profile/ActionButton';
import { BottomNavigation } from '@/components/profile/BottomNavigation';
import { Header } from '@/components/profile/Header';
import { ProfileSummary } from '@/components/profile/ProfileSummary';
import { SearchField } from '@/components/profile/SearchField';
import { StudentInfoCard } from '@/components/profile/StudentInfoCard';

const STUDENT = {
  fullName: 'Võ Văn Cảnh',
  studentId: '23676641',
  email: 'vovancanh@iuh.edu.vn',
  className: 'DHKTPM19A',
};

export default function HomeScreen() {
  const [keyword, setKeyword] = useState('');
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const disableTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (disableTimer.current) {
        clearTimeout(disableTimer.current);
      }
    };
  }, []);

  const handleSave = () => {
    if (disableTimer.current) {
      clearTimeout(disableTimer.current);
    }

    setIsSaveDisabled(true);
    disableTimer.current = setTimeout(() => {
      setIsSaveDisabled(false);
      disableTimer.current = null;
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <ProfileSummary fullName={STUDENT.fullName} studentId={STUDENT.studentId} />
        <SearchField keyword={keyword} onChangeKeyword={setKeyword} />
        <StudentInfoCard
          className={STUDENT.className}
          email={STUDENT.email}
        />
        <ActionButton disabled={isSaveDisabled} onPress={handleSave} />
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    gap: 14,
    paddingBottom: 22,
    paddingHorizontal: 18,
    paddingTop: 28,
  },
});
