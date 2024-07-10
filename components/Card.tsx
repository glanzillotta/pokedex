import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

interface CardProps {
  name: string;
  number: string;
  imageUrl: string;
}

const Card = ({name, number, imageUrl}: CardProps) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.number}>{number}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E0F7FA',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    margin: 10,
    width: 150,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 3,
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

export default Card;
