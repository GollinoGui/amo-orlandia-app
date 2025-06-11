import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function HomeButton() {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.homeButton}
      onPress={() => router.push('/')}
      activeOpacity={0.8}
    >
      <Text style={styles.homeButtonText}>🏠</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  homeButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#39BF24',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    zIndex: 1000,
  },
  homeButtonText: {
    fontSize: 24,
  },
});
