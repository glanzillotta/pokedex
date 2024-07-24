import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  DetailPokemon: {name: string};
};

export type BottomTabParamList = {
  Main: undefined;
  Favourites: undefined;
};

export type RootStackParamList = {
  TabNavigator: undefined;
};

export type HomeNavigationProps = NativeStackScreenProps<
  MainTabParamList,
  'Home'
>;
export type FavouritesNavigationProps = NativeStackScreenProps<
  BottomTabParamList,
  'Favourites'
>;
export type DetailPokemonNavigationProps = NativeStackScreenProps<
  MainTabParamList,
  'DetailPokemon'
>;
