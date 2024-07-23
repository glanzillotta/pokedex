import React, {memo} from 'react';
import {useQuery} from '@tanstack/react-query';
import Card from './Card.tsx';
import {
  addPokemon,
  Pokemon,
  removePokemon,
} from '../../store/favouriteSlice.ts';
import useDispatch from '../../hooks/useDispatch.ts';
import useAppSelector from '../../hooks/useSelector.ts';
import {RootState} from '../../store/store.ts';
import {getBackgroundColor} from '../../utils/coulors.ts';
import {TouchableWithoutFeedback} from 'react-native';

interface PokemonCardProps {
  pokemon: Pokemon;
  onPressCard?: () => void;
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
    <TouchableWithoutFeedback onPress={onPressCard}>
      <Card
        id={id}
        name={pokemon.name}
        imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        onPressFavourite={handelFavourite}
        isFavourite={!!pokemonList.find(p => p.name === pokemon.name)}
        backgroundColor={getBackgroundColor(data?.types || [])}
      />
    </TouchableWithoutFeedback>
  );
};

export default memo(PokemonCard);
