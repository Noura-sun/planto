import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/plant.png')} style={styles.image} />
      <Text style={styles.title}>My Plants 🌱</Text>
      <Text style={styles.subtitle}>Start your plant journey!</Text>
      <Button
        title="Set Plant Reminder"
        onPress={() => navigation.navigate('SignIn')}
        color="#4CAF50"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  subtitle: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 20,
  },
});
