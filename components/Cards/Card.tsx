import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface CardProps {
  id: string;
  name: string;
  imageUrl?: string;
  isFavourite?: boolean;
  backgroundColor?: string;
  onPressFavourite?: (event: GestureResponderEvent) => void;
}

const Card = ({
  id,
  name,
  imageUrl,
  onPressFavourite,
  backgroundColor,
  isFavourite = false,
}: CardProps) => {
  return (
    <View
      style={{
        ...styles.card,
        backgroundColor,
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

export default Card;
