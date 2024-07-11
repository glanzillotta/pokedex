import Card from './Card.tsx';
import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
} from 'react-native';

interface Pokemon {
  name: string;
  url: string;
}

function ListCard({}) {
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  const {data, isLoading} = useQuery({
    queryKey: ['pokemon-list', limit, offset],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`,
      );
      return response.json();
    },
  });

  const handleLoadMore = () => {
    setLimit(prevState => prevState + 10);
    setOffset(prevState => prevState + 10);
  };

  const renderFooter = () => {
    return (
      <>
        {isLoading && <ActivityIndicator />}
        {data?.results.length === 0 && <Text>Pokemon terminati</Text>}
      </>
    );
  };

  return (
    <FlatList
      numColumns={2}
      data={data?.results}
      renderItem={({item}: ListRenderItemInfo<Pokemon>) => (
        <Card
          name={item.name}
          id={item.url.split('/').slice(-2)[0]}
          imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            item.url.split('/').slice(-2)[0]
          }.png`}
        />
      )}
      key={2}
      keyExtractor={pokemon => pokemon.name}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListCard;
