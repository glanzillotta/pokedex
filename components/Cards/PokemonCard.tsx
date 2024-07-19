import React, {memo} from 'react';
import {useQuery} from '@tanstack/react-query';
import colours from '../../constants/colors.ts';
import Card from './Card.tsx';
import {
  addPokemon,
  Pokemon,
  removePokemon,
} from '../../store/favouriteSlice.ts';
import useDispatch from '../../hooks/useDispatch.ts';
import useAppSelector from '../../hooks/useSelector.ts';
import {RootState} from '../../store/store.ts';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({pokemon}: PokemonCardProps) => {
  const dispatch = useDispatch();
  const pokemonList = useAppSelector(
    (state: RootState) => state.pokemon.pokemonList,
  );

  const id = pokemon.url.split('/').slice(-2)[0];

  const {data} = useQuery({
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
    <Card
      id={id}
      name={pokemon.name}
      imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
      onPressFavourite={handelFavourite}
      isFavourite={!!pokemonList.find(p => p.name === pokemon.name)}
      backgroundColor={colours[data?.types[0].type.name]}
    />
  );
};

export default memo(PokemonCard);
