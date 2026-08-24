import { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Course, courses } from './data/courses';
import { CourseRow } from './components/CourseRow';

type SortOrder = 'none' | 'asc' | 'desc';

const categories = ['Tất cả', ...Array.from(new Set(courses.map((c) => c.category)))];



const PAGE_SIZE = 4;

export default function CourseListScreen() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('vi');
    return courses.filter((course) => {
      const matchQuery = `${course.title} ${course.instructor} ${course.category}`
        .toLocaleLowerCase('vi')
        .includes(normalizedQuery);
      const matchCategory = selectedCategory === 'Tất cả' || course.category === selectedCategory;
      return matchQuery && matchCategory;
    });
  }, [query, selectedCategory]);

  const sortedCourses = useMemo(() => {
    return [...filteredCourses].sort((a, b) => {
      if (sortOrder === 'asc') return a.students - b.students;
      if (sortOrder === 'desc') return b.students - a.students;
      return 0;
    });
  }, [filteredCourses, sortOrder]);

  const paginatedCourses = sortedCourses.slice(0, page * PAGE_SIZE);

  const handleLoadMore = () => {
    if (paginatedCourses.length < sortedCourses.length && !loadingMore) {
      setLoadingMore(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setLoadingMore(false);
      }, 1000);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const openCourse = (course: Course) => {
    const message = `Giảng viên: ${course.instructor}\nSố sinh viên: ${course.students}`;
    if (Platform.OS === 'web') {
      alert(`${course.title}\n\n${message}`);
    } else {
      Alert.alert(course.title, message);
    }
  };

  return (
    <FlatList
      key="grid-2-columns"
      data={paginatedCourses}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}
      contentContainerStyle={styles.listContainer}
      ListFooterComponent={
        loadingMore ? (
          <View style={styles.footerLoader}>
            <ActivityIndicator size="small" color="#0d6efd" />
            <Text style={styles.footerText}>Đang tải thêm khóa học...</Text>
          </View>
        ) : paginatedCourses.length >= sortedCourses.length && sortedCourses.length > 0 ? (
          <View style={styles.footerLoader}>
            <Text style={styles.footerEndText}>Đã tải hết {sortedCourses.length} khóa học</Text>
          </View>
        ) : null
      }
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Course Catalog</Text>
          <Text style={styles.subtitle}>
            Khám phá các khóa học đang mở
          </Text>
          <View style={styles.searchContainer}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Tìm theo tên, giảng viên hoặc danh mục"
              placeholderTextColor="#8A8F98"
              returnKeyType="search"
              style={styles.searchInput}
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery('')} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>✕</Text>
              </Pressable>
            )}
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            {categories.map((cat) => {
              const isSelected = cat === selectedCategory;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={[styles.chip, isSelected && styles.activeChip]}
                >
                  <Text style={[styles.chipText, isSelected && styles.activeChipText]}>
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
          <View style={styles.sortContainer}>
            <Text style={styles.sortLabel}>Sắp xếp theo SV:</Text>
            <Pressable
              onPress={() => setSortOrder('none')}
              style={[styles.sortButton, sortOrder === 'none' && styles.activeSortButton]}
            >
              <Text style={[styles.sortButtonText, sortOrder === 'none' && styles.activeSortButtonText]}>
                Mặc định
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSortOrder('asc')}
              style={[styles.sortButton, sortOrder === 'asc' && styles.activeSortButton]}
            >
              <Text style={[styles.sortButtonText, sortOrder === 'asc' && styles.activeSortButtonText]}>
                Tăng dần ↑
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSortOrder('desc')}
              style={[styles.sortButton, sortOrder === 'desc' && styles.activeSortButton]}
            >
              <Text style={[styles.sortButtonText, sortOrder === 'desc' && styles.activeSortButtonText]}>
                Giảm dần ↓
              </Text>
            </Pressable>
          </View>
          <Text style={styles.resultText}>
            Tìm thấy {sortedCourses.length} khóa học
          </Text>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            Không tìm thấy khóa học
          </Text>
          <Text style={styles.emptyText}>
            Hãy thử tìm kiếm bằng một từ khóa khác.
          </Text>
        </View>
      }
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
      renderItem={({ item }) => (
        <CourseRow
          course={item}
          onPress={openCourse}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  columnWrapper: {
    gap: 10,
  },
  header: {
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    marginBottom: 12,
    paddingRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 46,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  clearButton: {
    padding: 6,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#6c757d',
  },
  categoryScroll: {
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f1f3f5',
    marginRight: 8,
  },
  activeChip: {
    backgroundColor: '#0d6efd',
  },
  chipText: {
    fontSize: 13,
    color: '#495057',
    fontWeight: '500',
  },
  activeChipText: {
    color: '#fff',
    fontWeight: '600',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 6,
  },
  sortLabel: {
    fontSize: 13,
    color: '#495057',
    fontWeight: '600',
    marginRight: 4,
  },
  sortButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dee2e6',
    backgroundColor: '#f8f9fa',
  },
  activeSortButton: {
    backgroundColor: '#e7f1ff',
    borderColor: '#0d6efd',
  },
  sortButtonText: {
    fontSize: 12,
    color: '#495057',
  },
  activeSortButtonText: {
    color: '#0d6efd',
    fontWeight: '600',
  },
  resultText: {
    fontSize: 13,
    color: '#6c757d',
    fontWeight: '500',
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: '#6c757d',
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  footerText: {
    fontSize: 13,
    color: '#0d6efd',
    fontWeight: '500',
  },
  footerEndText: {
    fontSize: 13,
    color: '#adb5bd',
    fontStyle: 'italic',
  },
});