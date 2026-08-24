import { SafeAreaView, StyleSheet } from 'react-native';
import CourseListScreen from './Bai1/CourseListScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CourseListScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


