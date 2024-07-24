import colours from '../constants/colors.ts';

interface Type {
  name: string;
}

export interface PokemonType {
  type: Type;
}

export const getBackgroundColor = (types: PokemonType[]) => {
  let background;
  if (types.length > 1) {
    const typeName1 = types[0].type.name;
    const typeName2 = types[1].type.name;

    background = [colours[typeName1], colours[typeName2]];
  } else {
    const typeName = types?.[0]?.type?.name;
    background = typeName ? colours[typeName] : colours.normal;
  }

  return background;
};
