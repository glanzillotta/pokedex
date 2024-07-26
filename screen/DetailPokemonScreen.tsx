import {Image, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {DetailPokemonNavigationProps} from '../navigation';
import {useQuery} from '@tanstack/react-query';
import {getBackgroundColor} from '../utils/colors.ts';
import {GradientOrColorContainer} from '../components';

interface DetailPokemonScreenProps extends DetailPokemonNavigationProps {}

function DetailPokemonScreen({route}: DetailPokemonScreenProps) {
  const {data, isSuccess} = useQuery({
    queryKey: ['pokemon', route.params.name],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${route.params.name}`,
      );
      return response.json();
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <GradientOrColorContainer
        backgroundColor={getBackgroundColor(data?.types || [])}
        style={styles.imageContainer}>
        {isSuccess && (
          <Image
            width={200}
            height={200}
            source={{
              uri: data?.sprites.other['official-artwork']?.front_default,
            }}
          />
        )}
      </GradientOrColorContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    margin: 30,
    marginTop: 20,
    borderRadius: 20,
  },
});

export default DetailPokemonScreen;
