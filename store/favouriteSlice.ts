import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonState {
  pokemonList: Pokemon[];
}

const initialState: PokemonState = {
  pokemonList: [],
};

export const favouriteSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemon: (state, action) => {
      state.pokemonList = action.payload;
    },
    addPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.pokemonList = action.payload
        ? [...state.pokemonList, action.payload]
        : state.pokemonList;
    },
    removePokemon: (state, action: PayloadAction<Pokemon>) => {
      state.pokemonList = state.pokemonList.filter(
        item => item.name !== action.payload.name,
      );
    },
  },
});

export const {setPokemon, addPokemon, removePokemon} = favouriteSlice.actions;

export default favouriteSlice.reducer;
