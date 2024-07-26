import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {DetailPokemonNavigationProps} from '../../navigation';
import {useQuery} from '@tanstack/react-query';
import {getBackgroundColor} from '../../utils/colors.ts';
import {GradientOrColorContainer} from '../../components';
import FormsPokemon from './components';

interface DetailPokemonScreenProps extends DetailPokemonNavigationProps {}
interface TabItem {
  id: number;
  title: string;
  component?: Element;
}

const tabs: TabItem[] = [
  {
    id: 1,
    title: 'Forms',
    component: FormsPokemon,
  },
  {id: 2, title: 'Detail'},
  {id: 3, title: 'Types'},
  {id: 4, title: 'Stats'},
  {id: 5, title: 'Weaknesses'},
];

function DetailPokemonScreen({route}: DetailPokemonScreenProps) {
  const [selectedTab, setSelectedTab] = useState<number>(1);

  const {data, isSuccess} = useQuery({
    queryKey: ['pokemon', route.params.name],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${route.params.name}`,
      );
      return response.json();
    },
  });

  const renderTabItem = ({item}: {item: TabItem}) => (
    <TouchableOpacity
      style={styles.tabItem}
      onPress={() => setSelectedTab(item.id)}>
      <Text
        style={[
          styles.tabText,
          item.id === selectedTab && styles.selectedTabText,
        ]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <GradientOrColorContainer
        backgroundColor={getBackgroundColor(data?.types || [])}
        style={styles.imageContainer}>
        {isSuccess && (
          <Image
            width={200}
            height={200}
            source={{
              uri: data?.sprites.other['official-artwork']?.front_default,
            }}
          />
        )}
      </GradientOrColorContainer>
      <View style={styles.listContainer}>
        <FlatList
          horizontal
          data={tabs}
          renderItem={renderTabItem}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />
        {tabs.find(tab => tab.id === selectedTab)?.component}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    margin: 30,
    marginTop: 20,
    borderRadius: 20,
  },
  tabItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tabText: {
    fontSize: 16,
    color: '#999',
  },
  selectedTabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  listContainer: {
    marginHorizontal: 20,
  },
});

export default DetailPokemonScreen;
