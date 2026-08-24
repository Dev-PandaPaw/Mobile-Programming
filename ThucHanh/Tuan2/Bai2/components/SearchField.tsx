import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export interface SearchFieldProps {
  query: string;
  onChangeQuery: (text: string) => void;
  placeholder?: string;
}

export function SearchField({
  query,
  onChangeQuery,
  placeholder = "Tìm tên, mã sinh viên hoặc lớp",
}: SearchFieldProps) {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        value={query}
        onChangeText={onChangeQuery}
        placeholder={placeholder}
        placeholderTextColor="#8A8F98"
        returnKeyType="search"
        autoCorrect={false}
        style={styles.searchInput}
      />
      {query.length > 0 && (
        <Pressable onPress={() => onChangeQuery("")} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    marginTop: 12,
    marginBottom: 8,
    paddingRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  clearButton: {
    padding: 6,
  },
  clearButtonText: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "bold",
  },
});
