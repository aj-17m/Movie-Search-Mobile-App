import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const MovieDetailsScreen = ({ route }) => {
  const { imdbID } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=16967e26&i=${imdbID}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching details', error);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (!movie) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <Text style={styles.title}>{movie.Title}</Text>
      <Text>Year: {movie.Year}</Text>
      <Text>Genre: {movie.Genre}</Text>
      <Text>Plot: {movie.Plot}</Text>
      <Text>IMDB Rating: {movie.imdbRating}</Text>
    </ScrollView>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  poster: { width: 200, height: 300, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
});
