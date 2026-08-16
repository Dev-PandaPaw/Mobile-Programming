export type ProfileFormValues = {
  fullName: string;
  studentId: string;
  email: string;
  program: string;
  summary: string;
};

export type ProfileFormErrors = Partial<Record<keyof ProfileFormValues, string>>;

const studentIdPattern = /^SC-\d{4}-\d{4}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateProfileForm(values: ProfileFormValues): ProfileFormErrors {
  const errors: ProfileFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Enter your full name.';
  }

  if (!studentIdPattern.test(values.studentId.trim())) {
    errors.studentId = 'Use the format SC-YYYY-NNNN.';
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.program.trim()) {
    errors.program = 'Enter your academic program.';
  }

  if (values.summary.length > 240) {
    errors.summary = 'Keep the profile summary to 240 characters.';
  }

  return errors;
}

export function hasProfileFormErrors(errors: ProfileFormErrors) {
  return Object.keys(errors).length > 0;
}
