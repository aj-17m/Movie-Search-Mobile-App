import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    if (!query) return;
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=16967e26&s=${query}`);

      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        alert('No movies found');
      }
    } catch (error) {
      console.error('Error fetching data', error);
      alert('Error fetching data');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MovieDetails', { imdbID: item.imdbID })}>
      <Image source={{ uri: item.Poster }} style={styles.poster} />
      <View>
        <Text style={styles.title}>{item.Title}</Text>
        <Text>{item.Year}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Movies..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title="Search" onPress={searchMovies} />
      <FlatList
        data={movies}
        keyExtractor={item => item.imdbID}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, borderRadius: 5 },
  card: { flexDirection: 'row', marginBottom: 10, backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8 },
  poster: { width: 70, height: 100, marginRight: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
});
