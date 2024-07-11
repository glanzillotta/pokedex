import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useQuery} from '@tanstack/react-query';

interface CardProps {
  id: string;
  name: string;
  imageUrl?: string;
}

const Card = ({id, name, imageUrl}: CardProps) => {
  const {data} = useQuery({
    queryKey: ['pokemon-type', id],
    queryFn: async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      return response.json();
    },
  });

  return (
    <View
      style={{
        ...styles.card,
        backgroundColor: colours[data?.types[0]?.type?.name],
      }}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.number}>{id.padStart(3, '0')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // backgroundColor: '#E0F7FA',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    margin: 10,
    width: 150,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Nunito-Bold',
  },
  number: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Nunito-Regular',
  },
});

type Colours = {
  [key: string]: string;
};

const colours: Colours = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export default Card;
