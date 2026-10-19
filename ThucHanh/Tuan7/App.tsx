import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isWatched: boolean;
};

type Props = {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

const MovieCard = React.memo(({ movie, layout = 'row', onSelect }: Props) => {
  const tile = layout === 'tile';
  return (
    <TouchableOpacity
      style={[styles.card, tile && styles.tile]}
      onPress={() => onSelect(movie.id)}
    >
      <View style={tile && styles.posterBox}>
        <Image
          source={{ uri: movie.poster }}
          style={tile ? styles.tilePoster : styles.poster}
        />
        {tile && (
          <Text style={styles.star}>⭐ {movie.rating.toFixed(1)}</Text>
        )}
      </View>
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {movie.title}
        </Text>
        {!tile && (
          <>
            <Text>
              {movie.genre} - {movie.year}
            </Text>
            <Text>⭐ {movie.rating.toFixed(1)}</Text>
          </>
        )}
        <Text>{movie.isWatched ? '✅ đã xem' : 'chưa xem ⏳'}</Text>
      </View>
    </TouchableOpacity>
  );
});

const API_URL = 'https://6aba0b9a5b549d818d61ccdf.mockapi.io/movies';

export default function App(): React.JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isTile, setIsTile] = useState<boolean>(false);

  const fetchMovies = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const refresh = () => {
    setRefreshing(true);
    fetchMovies();
  };

  const selectMovie = (id: string) => {
    const movie = movies.find((m) => m.id === id);
    if (movie) {
      Alert.alert(`${movie.title} (${movie.year})`);
    }
  };

  const loadMore = () => {};

  const numColumns = isTile ? 2 : 1;

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.center}>
          <ActivityIndicator size="large" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Movie App</Text>
        <View style={styles.switchRow}>
          <Text>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} />
        </View>

        <FlatList
          key={String(numColumns)}
          data={movies}
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              layout={isTile ? 'tile' : 'row'}
              onSelect={selectMovie}
            />
          )}
          columnWrapperStyle={isTile ? styles.columns : undefined}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  poster: { width: 70, height: 100 },
  info: { flex: 1, padding: 8 },
  title: { fontSize: 16, fontWeight: 'bold' },
  tile: { flexDirection: 'column', margin: 5 },
  tilePoster: { width: '100%', aspectRatio: 2 / 3 },
  posterBox: { position: "relative" },
  star: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: 'white',
    padding: 3,
  },
  columns: { justifyContent: 'space-between' },
  footer: { alignItems: 'center', padding: 15 },
  retry: { marginTop: 5, fontWeight: 'bold' },
});
