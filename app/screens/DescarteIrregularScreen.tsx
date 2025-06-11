import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export function DescarteIrregularScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📸 Descarte Irregular</Text>
        <Text style={styles.text}>
          Em breve: funcionalidade para denunciar descartes irregulares com foto e localização.
        </Text>
        <Text style={styles.description}>
          Esta funcionalidade permitirá que você:
        </Text>
        <Text style={styles.bulletPoint}>• Tire fotos do descarte irregular</Text>
        <Text style={styles.bulletPoint}>• Marque a localização automaticamente</Text>
        <Text style={styles.bulletPoint}>• Envie a denúncia diretamente para a AMO</Text>
        <Text style={styles.bulletPoint}>• Acompanhe o status da sua denúncia</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39BF24',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
});
