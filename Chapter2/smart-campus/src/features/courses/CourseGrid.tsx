import { StyleSheet, View } from 'react-native';

import { CourseCard } from './CourseCard';
import { courseImageCases } from './mockCourses';

export function CourseGrid() {
  return (
    <View style={styles.courseGrid}>
      {courseImageCases.map((course) => (
        <CourseCard course={course} key={course.code} style={styles.courseGridItem} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  courseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  courseGridItem: {
    flexBasis: 280,
    flexGrow: 1,
    maxWidth: 420,
    minWidth: 260,
  },
});
