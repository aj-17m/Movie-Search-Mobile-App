import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MovieItem = ({ movie, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.Title}</Text>
        <Text style={styles.year}>{movie.Year}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: { flexDirection: 'row', marginVertical: 8, backgroundColor: '#f0f0f0', borderRadius: 8, padding: 10 },
  poster: { width: 70, height: 100, borderRadius: 8 },
  info: { marginLeft: 10, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
  year: { fontSize: 14, color: 'gray' },
});

export default MovieItem;
