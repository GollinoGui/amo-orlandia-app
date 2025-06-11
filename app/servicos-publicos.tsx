import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ServicosPublicosScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🏥 Serviços Públicos</Text>
        
        <View style={styles.card}>
          <Text style={styles.subtitle}>🚧 Em Desenvolvimento</Text>
          <Text style={styles.text}>
            Esta seção está sendo desenvolvida para fornecer informações completas sobre os serviços públicos disponíveis em Orlândia.
          </Text>
        </View>

        <View style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>📋 Informações que estarão disponíveis:</Text>
          <Text style={styles.bulletPoint}>• 🏥 Unidades de Saúde e horários</Text>
          <Text style={styles.bulletPoint}>• 🏫 Escolas públicas e matrículas</Text>
          <Text style={styles.bulletPoint}>• 🚌 Transporte público e rotas</Text>
          <Text style={styles.bulletPoint}>• 📋 Documentação e cartórios</Text>
          <Text style={styles.bulletPoint}>• 🏛️ Órgãos públicos e contatos</Text>
          <Text style={styles.bulletPoint}>• 🚰 Serviços de água e esgoto</Text>
        </View>

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>📞 Precisa de informações agora?</Text>
          <Text style={styles.contactText}>Entre em contato conosco:</Text>
          <Text style={styles.contactText}>📱 WhatsApp: (16) 99173-7383</Text>
          <Text style={styles.contactText}>📷 Instagram: @amo.orlandia</Text>
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
    marginBottom: 10,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
});
