import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RootState} from '../store/store.ts';
import useAppSelector from '../hooks/useSelector.ts';

function FavouriteScreen() {
  const pokemon = useAppSelector(
    (state: RootState) => state.pokemon.pokemonList,
  );
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View>
        {pokemon.map(item => (
          <Text>{item.name}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#fff',
  },
});

export default FavouriteScreen;
