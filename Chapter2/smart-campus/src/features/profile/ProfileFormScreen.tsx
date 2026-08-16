import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconButton } from '@/src/components/IconButton';
import { PrimaryButton } from '@/src/components/PrimaryButton';
import { SecondaryButton } from '@/src/components/SecondaryButton';

type ProfileFormValues = {
  fullName: string;
  studentId: string;
  email: string;
  program: string;
  summary: string;
};

const initialValues: ProfileFormValues = {
  fullName: 'Nguyễn Minh Anh',
  studentId: 'SC2026301',
  email: 'minhanh@student.smartcampus.edu',
  program: 'Mobile Programming',
  summary: '',
};

export function ProfileFormScreen() {
  const [isKeyboardSafe, setIsKeyboardSafe] = useState(true);
  const [values, setValues] = useState(initialValues);

  const updateField = (field: keyof ProfileFormValues, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <IconButton
          accessibilityLabel="Quay lại SmartCampus Dashboard"
          iconName="arrow-back"
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Student Profile Form</Text>
      </View>

      <View style={styles.modeSwitcher}>
        <SecondaryButton
          label="Cấu trúc dễ bị che"
          onPress={() => setIsKeyboardSafe(false)}
          style={!isKeyboardSafe && styles.activeModeButton}
        />
        <SecondaryButton
          label="Cấu trúc an toàn"
          onPress={() => setIsKeyboardSafe(true)}
          style={isKeyboardSafe && styles.activeModeButton}
        />
      </View>

      {isKeyboardSafe ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
          style={styles.keyboardSafeArea}>
          <ScrollView
            contentContainerStyle={styles.keyboardSafeContent}
            keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <ProfileFormFields values={values} onChange={updateField} />
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.fixedContent}>
          <ProfileFormFields values={values} onChange={updateField} />
        </View>
      )}
    </SafeAreaView>
  );
}

function ProfileFormFields({
  onChange,
  values,
}: {
  onChange: (field: keyof ProfileFormValues, value: string) => void;
  values: ProfileFormValues;
}) {
  const summaryIsShort = values.summary.trim().length < 20;

  return (
    <View style={styles.form}>
      <Field
        autoCapitalize="words"
        label="Full Name"
        onChangeText={(value) => onChange('fullName', value)}
        returnKeyType="next"
        value={values.fullName}
      />
      <Field
        autoCapitalize="characters"
        label="Student ID"
        onChangeText={(value) => onChange('studentId', value)}
        returnKeyType="next"
        value={values.studentId}
      />
      <Field
        autoCapitalize="none"
        keyboardType="email-address"
        label="Email"
        onChangeText={(value) => onChange('email', value)}
        returnKeyType="next"
        value={values.email}
      />
      <Field
        autoCapitalize="words"
        label="Program"
        onChangeText={(value) => onChange('program', value)}
        returnKeyType="next"
        value={values.program}
      />
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Profile Summary</Text>
        <TextInput
          accessibilityLabel="Profile Summary"
          multiline
          onChangeText={(value) => onChange('summary', value)}
          placeholder="Viết mục tiêu học tập, kỹ năng mobile và kế hoạch hoàn thành môn học"
          placeholderTextColor="#6B7280"
          returnKeyType="done"
          style={[styles.input, styles.summaryInput]}
          textAlignVertical="top"
          value={values.summary}
        />
        {summaryIsShort ? (
          <Text style={styles.errorText}>Profile Summary cần ít nhất 20 ký tự để dễ đánh giá.</Text>
        ) : null}
      </View>
      <PrimaryButton
        disabled={summaryIsShort}
        iconName="check-circle"
        label="Lưu hồ sơ sinh viên"
        onPress={() => undefined}
      />
    </View>
  );
}

type FieldProps = {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address';
  label: string;
  onChangeText: (value: string) => void;
  returnKeyType?: 'done' | 'next';
  value: string;
};

function Field({
  autoCapitalize = 'sentences',
  keyboardType = 'default',
  label,
  onChangeText,
  returnKeyType = 'next',
  value,
}: FieldProps) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
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
  headerTitle: {
    color: '#111827',
    flex: 1,
    flexShrink: 1,
    fontSize: 27,
    fontWeight: '800',
    lineHeight: 34,
    minWidth: 0,
  },
  modeSwitcher: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  activeModeButton: {
    borderColor: '#0F766E',
  },
  keyboardSafeArea: {
    flex: 1,
  },
  keyboardSafeContent: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  fixedContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 8,
    paddingHorizontal: 20,
  },
  form: {
    gap: 18,
    paddingTop: 16,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    color: '#374151',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 25,
  },
  input: {
    borderColor: '#9CA3AF',
    borderWidth: 2,
    color: '#111827',
    fontSize: 20,
    lineHeight: 28,
    minHeight: 58,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  summaryInput: {
    minHeight: 128,
  },
  errorText: {
    color: '#B91C1C',
    flexShrink: 1,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 24,
    minWidth: 0,
  },
});
