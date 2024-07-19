import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ListCard, SearchBar, Title} from '../components';
import React from 'react';

function HomeScreen() {
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.sectionContainer}>
        <Title>Pokedex</Title>
        <Text style={styles.subTitle}>
          Cerca un pokemon tramite nome o numero del pokedex
        </Text>
        <SearchBar />
        <ListCard />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#fff',
  },
  sectionContainer: {
    paddingHorizontal: 24,
    gap: 10,
    height: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Regualr',
    color: '#333',
  },
});

export default HomeScreen;
