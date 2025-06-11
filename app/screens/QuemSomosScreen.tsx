import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export function QuemSomosScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>👥 Quem Somos</Text>
        
        <View style={styles.card}>
          <Text style={styles.subtitle}>🏛️ AMO Orlândia</Text>
          <Text style={styles.text}>
            A AMO (Associação de Moradores de Orlândia) é uma entidade apartidária que busca difundir cidadania, COM SEUS DIREITOS E DEVERES; Inserir o cidadão de bem no conhecimento político e nas decisões do poder público, fiscalizando, propondo idéias e soluções.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.subtitle}>🎯 Nossa Missão</Text>
          <Text style={styles.text}>
            Fundada com o objetivo de representar os interesses da população, a AMO trabalha de forma colaborativa com as autoridades locais, exercendo função fiscalizadora e propondo soluções para problemas que afetam nossa cidade.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.subtitle}>💪 Nossos Valores</Text>
          <Text style={styles.bulletPoint}>• 🤝 Transparência em todas as ações</Text>
          <Text style={styles.bulletPoint}>• 🌱 Compromisso com o meio ambiente</Text>
          <Text style={styles.bulletPoint}>• 👥 Participação cidadã ativa</Text>
          <Text style={styles.bulletPoint}>• 🏘️ Desenvolvimento sustentável</Text>
          <Text style={styles.bulletPoint}>• ⚖️ Justiça social e igualdade</Text>
        </View>

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>📍 Nossa Sede</Text>
          <Text style={styles.contactText}>Av. Cinco, 48 A</Text>
          <Text style={styles.contactText}>Orlândia - SP</Text>
          <Text style={styles.contactText}>CEP: 14.620-000</Text>
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
    color: '#72BF24',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
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
    marginTop: 10,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
});
