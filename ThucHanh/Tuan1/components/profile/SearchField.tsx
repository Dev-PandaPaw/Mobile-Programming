import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, TextInput, View } from 'react-native';

type SearchFieldProps = {
  keyword: string;
  onChangeKeyword: (value: string) => void;
};

export function SearchField({ keyword, onChangeKeyword }: SearchFieldProps) {
  return (
    <View style={styles.searchBox}>
      <MaterialIcons color="#6B7280" name="search" size={20} />
      <TextInput
        accessibilityLabel="Tìm kiếm thông tin sinh viên"
        onChangeText={onChangeKeyword}
        placeholder="Tìm kiếm thông tin..."
        placeholderTextColor="#8F98A3"
        returnKeyType="search"
        style={styles.searchInput}
        value={keyword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    alignItems: 'center',
    borderColor: '#A9D1F7',
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 46,
    paddingHorizontal: 13,
  },
  searchInput: {
    color: '#111827',
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    minWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
});
