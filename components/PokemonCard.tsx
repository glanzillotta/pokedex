import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import colours from '../constants/colors.ts';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface CardProps {
  id: string;
  name: string;
  imageUrl?: string;
  isFavourite?: boolean;
  onPressFavourite?: (event: GestureResponderEvent) => void;
}

const PokemonCard = ({
  id,
  name,
  imageUrl,
  onPressFavourite,
  isFavourite = false,
}: CardProps) => {
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
      <TouchableWithoutFeedback onPress={onPressFavourite}>
        <Icon
          name="heart"
          size={20}
          color="#CB2222FF"
          style={styles.favourite}
          solid={isFavourite}
        />
      </TouchableWithoutFeedback>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.number}>{id.padStart(3, '0')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    margin: 10,
    width: 150,
    height: 194,
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
  favourite: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default PokemonCard;
