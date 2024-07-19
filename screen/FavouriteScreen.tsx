import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {RootState} from '../store/store.ts';
import useAppSelector from '../hooks/useSelector.ts';
import {PokemonCard} from '../components';
import {Pokemon} from '../store/favouriteSlice.ts';

function FavouriteScreen() {
  const pokemon = useAppSelector(
    (state: RootState) => state.pokemon.pokemonList,
  );
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View>
        <FlatList
          data={pokemon}
          renderItem={renderItem}
          numColumns={2}
          key={2}
          keyExtractor={item => item.name}
        />
      </View>
    </SafeAreaView>
  );
}

const renderItem = ({item}: ListRenderItemInfo<Pokemon>) => {
  return <PokemonCard pokemon={item} key={item.name} />;
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
});

export default FavouriteScreen;
