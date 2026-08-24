import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Course } from '../data/courses';

export interface CourseRowProps {
  course: Course;
  onPress?: (course: Course) => void;
}

export function CourseRow({ course, onPress }: CourseRowProps) {
  return (
    <Pressable
      onPress={() => onPress?.(course)}
      style={({ pressed }) => [
        styles.courseCard,
        pressed && styles.courseCardPressed,
      ]}
    >
      <Text style={styles.courseTitle}>{course.title}</Text>
      <Text style={styles.instructor}>
        Giảng viên: {course.instructor}
      </Text>
      <View style={styles.courseFooter}>
        <Text style={styles.category}>{course.category}</Text>
        <Text style={styles.studentCount}>
          {course.students} sinh viên
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  courseCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    justifyContent: 'space-between',
  },
  courseCardPressed: {
    opacity: 0.7,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  instructor: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 8,
  },
  courseFooter: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
  },
  category: {
    fontSize: 11,
    color: '#0d6efd',
    backgroundColor: '#e7f1ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  studentCount: {
    fontSize: 11,
    color: '#6c757d',
  },
});
