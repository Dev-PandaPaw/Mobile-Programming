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
import {
  hasProfileFormErrors,
  ProfileFormValues,
  validateProfileForm,
} from '@/src/features/profile/validation';

const initialValues: ProfileFormValues = {
  fullName: 'Nguyễn Minh Anh',
  studentId: 'SC-2026-0301',
  email: 'minhanh@student.smartcampus.edu',
  program: 'Mobile Programming',
  summary: '',
};

const initialTouchedState: Record<keyof ProfileFormValues, boolean> = {
  fullName: false,
  studentId: false,
  email: false,
  program: false,
  summary: false,
};

export function ProfileFormScreen() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState(initialTouchedState);
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);
  const errors = validateProfileForm(values);

  const updateField = (field: keyof ProfileFormValues, value: string) => {
    setSaved(false);
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const markTouched = (field: keyof ProfileFormValues) => {
    setTouched((currentTouched) => ({
      ...currentTouched,
      [field]: true,
    }));
  };

  const submitProfile = () => {
    setSubmitted(true);

    if (saved || hasProfileFormErrors(errors)) {
      return;
    }

    setSaved(true);
  };

  const formProps = {
    errors,
    onBlur: markTouched,
    onChange: updateField,
    onSubmit: submitProfile,
    saved,
    submitted,
    touched,
    values,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <IconButton
          accessibilityHint="Quay lại màn hình dashboard"
          accessibilityLabel="Quay lại SmartCampus Dashboard"
          iconName="arrow-back"
          onPress={() => router.back()}
        />
        <Text accessibilityRole="header" style={styles.headerTitle}>Student Profile Form</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
        style={styles.keyboardSafeArea}>
        <ScrollView
          contentContainerStyle={styles.keyboardSafeContent}
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <ProfileFormFields {...formProps} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ProfileFormFields({
  errors,
  onBlur,
  onChange,
  onSubmit,
  saved,
  submitted,
  touched,
  values,
}: {
  errors: Partial<Record<keyof ProfileFormValues, string>>;
  onBlur: (field: keyof ProfileFormValues) => void;
  onChange: (field: keyof ProfileFormValues, value: string) => void;
  onSubmit: () => void;
  saved: boolean;
  submitted: boolean;
  touched: Record<keyof ProfileFormValues, boolean>;
  values: ProfileFormValues;
}) {
  const getError = (field: keyof ProfileFormValues) =>
    touched[field] || submitted ? errors[field] : undefined;

  return (
    <View style={styles.form}>
      <Field
        autoCapitalize="words"
        error={getError('fullName')}
        label="Full Name"
        onBlur={() => onBlur('fullName')}
        onChangeText={(value) => onChange('fullName', value)}
        returnKeyType="next"
        value={values.fullName}
      />
      <Field
        autoCapitalize="characters"
        error={getError('studentId')}
        label="Student ID"
        onBlur={() => onBlur('studentId')}
        onChangeText={(value) => onChange('studentId', value)}
        returnKeyType="next"
        value={values.studentId}
      />
      <Field
        autoCapitalize="none"
        error={getError('email')}
        keyboardType="email-address"
        label="Email"
        onBlur={() => onBlur('email')}
        onChangeText={(value) => onChange('email', value)}
        returnKeyType="next"
        value={values.email}
      />
      <Field
        autoCapitalize="words"
        error={getError('program')}
        label="Program"
        onBlur={() => onBlur('program')}
        onChangeText={(value) => onChange('program', value)}
        returnKeyType="next"
        value={values.program}
      />
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Profile Summary</Text>
        <TextInput
          accessibilityHint={getError('summary') ?? 'Tóm tắt tối đa 240 ký tự'}
          accessibilityLabel="Profile Summary"
          multiline
          onBlur={() => onBlur('summary')}
          onChangeText={(value) => onChange('summary', value)}
          placeholder="Viết mục tiêu học tập, kỹ năng mobile và kế hoạch hoàn thành môn học"
          placeholderTextColor="#6B7280"
          returnKeyType="done"
          style={[styles.input, styles.summaryInput, getError('summary') && styles.inputError]}
          textAlignVertical="top"
          value={values.summary}
        />
        {getError('summary') ? (
          <Text accessibilityLiveRegion="polite" style={styles.errorText}>
            {getError('summary')}
          </Text>
        ) : null}
      </View>
      {saved ? (
        <Text accessibilityLiveRegion="polite" style={styles.successText}>
          Profile saved successfully.
        </Text>
      ) : null}
      <PrimaryButton
        accessibilityHint="Kiểm tra thông tin và lưu hồ sơ nếu không còn lỗi"
        disabled={saved}
        iconName="check-circle"
        label={saved ? 'Hồ sơ đã được lưu' : 'Lưu hồ sơ sinh viên'}
        onPress={onSubmit}
      />
    </View>
  );
}

type FieldProps = {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  keyboardType?: 'default' | 'email-address';
  label: string;
  onBlur: () => void;
  onChangeText: (value: string) => void;
  returnKeyType?: 'done' | 'next';
  value: string;
};

function Field({
  autoCapitalize = 'sentences',
  error,
  keyboardType = 'default',
  label,
  onBlur,
  onChangeText,
  returnKeyType = 'next',
  value,
}: FieldProps) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityHint={error ?? `Nhập ${label}`}
        accessibilityLabel={label}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        onBlur={onBlur}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        style={[styles.input, error && styles.inputError]}
        value={value}
      />
      {error ? (
        <Text accessibilityLiveRegion="polite" style={styles.errorText}>
          {error}
        </Text>
      ) : null}
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
  keyboardSafeArea: {
    flex: 1,
  },
  keyboardSafeContent: {
    paddingBottom: 40,
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
  inputError: {
    borderColor: '#B91C1C',
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
  successText: {
    color: '#0F766E',
    flexShrink: 1,
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 24,
    minWidth: 0,
  },
});
