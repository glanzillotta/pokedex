import {PokemonCard} from '../components';
import {useInfiniteQuery} from '@tanstack/react-query';
import React, {useRef} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Pokemon {
  name: string;
  url: string;
}

// const ITEM_HEIGHT = 150 as const;

function ListCard() {
  const flatListRef = useRef<FlatList<Pokemon>>(null);
  // const [scrollOffset, setScrollOffset] = useState(0);
  // const dispatch = useDispatch();
  // const pokemon = useAppSelector(
  //   (state: RootState) => state.pokemon.pokemonList,
  // );

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

  // const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   setScrollOffset(event.nativeEvent.contentOffset.y);
  // };

  const renderHeader = () => {
    return <>{isFetchingPreviousPage && <ActivityIndicator />}</>;
  };

  const handleEndReached = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  // const handleStartReached = async () => {
  //   const isFirstPage =
  //     data?.pages[0]?.results.length > 0 &&
  //     data?.pages[0]?.results[0].url.split('/').slice(-2)[0] === '1';
  //   if (hasPreviousPage && !isFetchingPreviousPage && !isFirstPage) {
  //     await fetchPreviousPage();
  //   }
  // };

  const renderItem = ({item}: ListRenderItemInfo<Pokemon>) => {
    return <PokemonCard pokemon={item} key={item.name} />;
  };

  // useEffect(() => {
  //   if (flatListRef.current && scrollOffset !== 0 && isFetchingNextPage) {
  //     flatListRef.current.scrollToOffset({
  //       offset:
  //         data?.pages.length === 6 ? scrollOffset - ITEM_HEIGHT : scrollOffset,
  //       animated: false,
  //     });
  //   } else if (flatListRef.current && isFetchingPreviousPage) {
  //     flatListRef.current.scrollToOffset({
  //       offset:
  //         data?.pages.length === 6 ? scrollOffset + ITEM_HEIGHT : scrollOffset,
  //       animated: false,
  //     });
  //   }
  // }, [
  //   data?.pages.length,
  //   isFetchingNextPage,
  //   isFetchingPreviousPage,
  //   scrollOffset,
  // ]);
  console.log(isSuccess, isError);
  return (
    <>
      {isSuccess && (
        <FlatList
          ref={flatListRef}
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
    </>
  );
}

const styles = StyleSheet.create({
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

export default ListCard;
