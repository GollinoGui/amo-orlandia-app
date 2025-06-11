import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DescarteIrregularScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📸 Descarte Irregular</Text>
        
        <View style={styles.card}>
          <Text style={styles.subtitle}>🚧 Em Desenvolvimento</Text>
          <Text style={styles.text}>
            Esta funcionalidade está sendo desenvolvida e em breve permitirá que você denuncie descartes irregulares de forma rápida e eficiente.
          </Text>
        </View>

        <View style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>📋 Funcionalidades Previstas:</Text>
          <Text style={styles.bulletPoint}>• 📷 Tirar fotos do descarte irregular</Text>
          <Text style={styles.bulletPoint}>• 📍 Marcar localização automaticamente</Text>
          <Text style={styles.bulletPoint}>• 📤 Enviar denúncia diretamente para a AMO</Text>
          <Text style={styles.bulletPoint}>• 📊 Acompanhar status da denúncia</Text>
          <Text style={styles.bulletPoint}>• 🔔 Receber notificações sobre andamento</Text>
        </View>

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>📞 Enquanto isso, entre em contato:</Text>
          <Text style={styles.contactText}>📱 WhatsApp: (16) 99173-7383</Text>
          <Text style={styles.contactText}>📷 Instagram: @amo.orlandia</Text>
          <Text style={styles.contactText}>📍 Av. Cinco, 48 A - Orlândia/SP</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39BF24',
    textAlign: 'center',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F2C335',
    textAlign: 'center',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
  },
  featuresCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#39BF24',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#39BF24',
    marginBottom: 15,
  },
  bulletPoint: {
    fontSize: 15,
    lineHeight: 24,
    color: '#333',
    marginBottom: 8,
    paddingLeft: 10,
  },
  contactCard: {
    backgroundColor: '#39BF24',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
});
