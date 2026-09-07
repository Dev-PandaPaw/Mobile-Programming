import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
  memo,
} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string };

const initialTodos: Todo[] = [
  { id: '1', title: 'Học React Native', completed: true },
  { id: '2', title: 'Làm bài tập Hook', completed: false },
  { id: '3', title: 'Ôn tập lý thuyết', completed: false },
];

function todoReducer(state: Todo[] = initialTodos, action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO': {
      const title = action.payload.trim();
      if (!title) return state;
      const newTodo: Todo = {
        id: Date.now().toString(),
        title,
        completed: false,
      };
      return [...state, newTodo];
    }
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

interface TodoItemProps {
  item: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isDarkMode: boolean;
}

const TodoItem = memo(function TodoItem({
  item,
  onToggle,
  onDelete,
  isDarkMode,
}: TodoItemProps) {
  return (
    <View style={styles.todoRow}>
      <TouchableOpacity
        style={styles.todoTextContainer}
        onPress={() => onToggle(item.id)}
      >
        <Text
          style={[
            styles.todoText,
            { color: isDarkMode ? '#ffffff' : '#000000' },
            item.completed ? styles.completedText : null,
          ]}
        >
          {item.completed ? '[x] ' : '[ ] '}
          {item.title}
        </Text>
      </TouchableOpacity>
      <Button title="Xóa" onPress={() => onDelete(item.id)} color="red" />
    </View>
  );
});

function MainTodoScreen() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const [inputText, setInputText] = useState('');
  const [keyword, setKeyword] = useState('');

  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  useEffect(() => {
    console.log(`Danh sách hiện có ${todos.length} công việc`);
  }, [todos.length]);

  const filteredTodos = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    if (!query) return todos;
    return todos.filter(todo =>
      todo.title.toLowerCase().includes(query)
    );
  }, [keyword, todos]);

  const uncompletedCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const handleToggle = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const handleDelete = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);

  const handleAddTodo = () => {
    if (!inputText.trim()) return;
    dispatch({ type: 'ADD_TODO', payload: inputText });
    setInputText('');
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#222222' : '#ffffff' },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: isDarkMode ? '#ffffff' : '#000000' },
          ]}
        >
          Quản lý công việc
        </Text>
        <Button
          title={isDarkMode ? 'Đổi giao diện sáng' : 'Đổi giao diện tối'}
          onPress={toggleTheme}
        />
      </View>

      <Text
        style={[
          styles.statusText,
          { color: isDarkMode ? '#dddddd' : '#333333' },
        ]}
      >
        Số việc chưa hoàn thành: {uncompletedCount}
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDarkMode ? '#333333' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
            borderColor: isDarkMode ? '#555555' : '#cccccc',
          },
        ]}
        placeholder="Tìm kiếm công việc"
        placeholderTextColor={isDarkMode ? '#888888' : '#999999'}
        value={keyword}
        onChangeText={setKeyword}
      />

      <View style={styles.addRow}>
        <TextInput
          style={[
            styles.input,
            styles.addInput,
            {
              backgroundColor: isDarkMode ? '#333333' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#000000',
              borderColor: isDarkMode ? '#555555' : '#cccccc',
            },
          ]}
          placeholder="Nhập tên công việc"
          placeholderTextColor={isDarkMode ? '#888888' : '#999999'}
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Thêm" onPress={handleAddTodo} />
      </View>

      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggle={handleToggle}
            onDelete={handleDelete}
            isDarkMode={isDarkMode}
          />
        )}
        ListEmptyComponent={
          <Text
            style={[
              styles.emptyText,
              { color: isDarkMode ? '#888888' : '#999999' },
            ]}
          >
            Không có công việc nào
          </Text>
        }
      />
    </View>
  );
}

export default function TodoAppScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MainTodoScreen />
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 48,
    gap: 12,
  },
  header: {
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusText: {
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontSize: 15,
  },
  addRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  addInput: {
    flex: 1,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  todoTextContainer: {
    flex: 1,
    paddingRight: 8,
  },
  todoText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888888',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
  },
});
