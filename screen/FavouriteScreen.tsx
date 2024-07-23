import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {RootState} from '../store/store.ts';
import useAppSelector from '../hooks/useSelector.ts';
import {PokemonCard, Title} from '../components';
import {Pokemon} from '../store/favouriteSlice.ts';
import Icon from 'react-native-vector-icons/Ionicons';

function FavouriteScreen() {
  const pokemon = useAppSelector(
    (state: RootState) => state.favourite.pokemonList,
  );
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View>
        <Title>Favourite</Title>
        {!Array.isArray(pokemon) || !pokemon.length ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Non ci sono pokemon tra i preferiti.
            </Text>
            <Icon name="heart-dislike-outline" size={50} color="#333" />
          </View>
        ) : null}
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
    paddingTop: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  emptyText: {
    color: '#333',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default FavouriteScreen;
