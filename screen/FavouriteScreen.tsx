import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import {RootState} from '../store/store.ts';
import useAppSelector from '../hooks/useSelector.ts';

function FavouriteScreen() {
  const pokemon = useAppSelector(
    (state: RootState) => state.pokemon.pokemonList,
  );
  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <View>
        {pokemon.map(item => (
          <Text>{item.name}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default FavouriteScreen;
