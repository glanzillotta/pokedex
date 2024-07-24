import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {PokemonCard, Title} from '../components';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useInfiniteQuery} from '@tanstack/react-query';
import {Pokemon} from '../store/favouriteSlice.ts';
import {HomeNavigationProps} from '../navigation';

interface HomeScreenProps extends HomeNavigationProps {}

function HomeScreen({navigation}: HomeScreenProps) {
  const {
    data,
    isFetchingNextPage,
    isFetchNextPageError,
    isFetchingPreviousPage,
    fetchNextPage,
    // fetchPreviousPage,
    hasNextPage,
    // hasPreviousPage,
    isError,
    isSuccess,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['pokemon-list'],
    queryFn: async ({pageParam}) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=8&offset=${pageParam}`,
      );
      return response.json();
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => lastPageParam + 8,
    // getPreviousPageParam: (firstPage, allPages, firstPageParam) =>
    //   firstPageParam > 8 ? firstPageParam - 8 : firstPage,
    initialData: undefined,
    initialPageParam: 0,
    // maxPages: 6,
  });

  const renderFooter = () => {
    return (
      <>
        {isFetchingNextPage && <ActivityIndicator size={40} />}
        {isFetchNextPageError && <Text>Pokemon terminati</Text>}
      </>
    );
  };

  const renderHeader = () => {
    return <>{isFetchingPreviousPage && <ActivityIndicator />}</>;
  };

  const handleEndReached = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  const renderItem = ({item}: ListRenderItemInfo<Pokemon>) => {
    return (
      <PokemonCard
        pokemon={item}
        key={item.name}
        onPressCard={_ =>
          navigation.navigate('DetailPokemon', {name: item.name})
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.sectionContainer}>
        <Title>Pokedex</Title>
        <Text style={styles.subTitle}>
          Cerca un pokemon tramite nome o numero del pokedex
        </Text>
        {isSuccess && (
          <FlatList
            numColumns={2}
            data={data?.pages.flatMap(page => page?.results) || []}
            renderItem={renderItem}
            key={2}
            // getItemLayout={(_, index) => ({
            //   length: ITEM_HEIGHT,
            //   offset: ITEM_HEIGHT * index,
            //   index,
            // })}
            keyExtractor={item => item.url.split('/').slice(-2)[0]}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            // onStartReachedThreshold={0.2}
            scrollEventThrottle={16}
            initialNumToRender={8}
            // onScroll={handleScroll}
            // onStartReached={handleStartReached}
            ListFooterComponent={renderFooter}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={styles.listContent}
            maxToRenderPerBatch={8}
          />
        )}
        {isError && !data && (
          <View style={styles.refreshContainer}>
            <Text>Qualcosa è andato storto</Text>
            <Text>Riprova</Text>
            <TouchableWithoutFeedback onPress={() => refetch()}>
              <Icon name={'refresh'} size={30} color="#333" />
            </TouchableWithoutFeedback>
          </View>
        )}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  sectionContainer: {
    paddingHorizontal: 24,
    gap: 10,
    height: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Regualr',
    color: '#333',
  },
  listContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
