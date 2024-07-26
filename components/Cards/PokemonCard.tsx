import React, {memo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {
  addPokemon,
  Pokemon,
  removePokemon,
} from '../../store/favouriteSlice.ts';
import useDispatch from '../../hooks/useDispatch.ts';
import useAppSelector from '../../hooks/useSelector.ts';
import {RootState} from '../../store/store.ts';
import {getBackgroundColor, PokemonType} from '../../utils/colors.ts';
import {GestureResponderEvent, Pressable, StyleSheet} from 'react-native';
import GradientOrColorContainer from '../GradientOrColorContainer.tsx';
import CardContent from './CardContent.tsx';

interface PokemonCardProps {
  pokemon: Pokemon;
  onPressCard?: (event: GestureResponderEvent) => void;
}

interface Response {
  types: PokemonType[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

const PokemonCard = ({pokemon, onPressCard}: PokemonCardProps) => {
  const dispatch = useDispatch();
  const pokemonList = useAppSelector(
    (state: RootState) => state.favourites.pokemonList,
  );

  const id = pokemon.url.split('/').slice(-2)[0];

  const {data} = useQuery<Response, Pokemon>({
    queryKey: ['pokemon-type', pokemon.name],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`,
      );
      return response.json();
    },
  });

  const handelFavourite = () => {
    if (pokemonList.find(p => p.name === pokemon.name)) {
      dispatch(removePokemon(pokemon));
    } else {
      dispatch(addPokemon(pokemon));
    }
  };

  return (
    <Pressable onPress={onPressCard}>
      <GradientOrColorContainer
        backgroundColor={getBackgroundColor(data?.types || [])}
        style={styles.card}>
        <CardContent
          id={id}
          name={pokemon.name}
          imageUrl={data?.sprites.other['official-artwork']?.front_default}
          onPressFavourite={handelFavourite}
          isFavourite={!!pokemonList.find(p => p.name === pokemon.name)}
        />
      </GradientOrColorContainer>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    height: 195,
    width: 160,
  },
});

export default memo(PokemonCard);
