import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export  function HomeScreen() {
  const router = useRouter();

  const menuItems = [
    {
      id: 1,
      title: 'Descarte Irregular',
      subtitle: 'Denuncie descartes irregulares',
      emoji: '📸',
      route: 'descarte-irregular',
      color: '#39BF24'
    },
    {
      id: 2,
      title: 'Política de Reserva de Móveis',
      subtitle: 'Descarte móveis de forma sustentável',
      emoji: '🪑',
      route: 'politica-reserva',
      color: '#72BF24'
    },
    {
       id: 3,
      title: 'Eventos AMO',
      subtitle: 'Participe dos nossos eventos',
      emoji: '📅',
      route: 'eventos',
      color: '#F2C335'
    },
    {
      id: 4,
      title: 'Atuação da AMO',
      subtitle: 'Conheça nossa área de atuação',
      emoji: '💼',
      route: 'atuacao-amo',
      color: '#F2C335'
    },
    {
      id: 5,
      title: 'Serviços Públicos',
      subtitle: 'Informações sobre serviços',
      emoji: '🏥',
      route: 'servicos-publicos',
      color: '#39BF24'
    },
    {
      id: 6,
      title: 'Quem Somos',
      subtitle: 'Conheça a AMO Orlândia',
      emoji: '👥',
      route: 'quem-somos',
      color: '#72BF24'
    },
    {
      id: 7,
      title: 'O que Fazemos',
      subtitle: 'Nossas atividades e projetos',
      emoji: '⚡',
      route: 'o-que-fazemos',
      color: '#9EBF26'
    },
    {
      id: 8,
      title: 'Contate-nos',
      subtitle: 'Entre em contato conosco',
      emoji: '📞',
      route: 'contato',
      color: '#F2C335'
    },
      {
    id: 9, // ou o próximo número disponível
    title: 'Associe-se à AMO',
    subtitle: 'Torne-se um associado da AMO Orlândia',
    emoji: '🤝',
    route: '/associe-se',
    color: '#9EBF26'
      },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/logo.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
          
          <Text style={styles.title}>AMO Orlândia</Text>
          <Text style={styles.subtitle}>
            Associação de Moradores de Orlândia
          </Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuButton,
              { 
                backgroundColor: item.color + '15',
                borderLeftColor: item.color,
              }
            ]}
            onPress={() => router.push(item.route as any)}
          >
            <View style={styles.buttonContent}>
              <View style={[styles.iconContainer, { backgroundColor: item.color + '25' }]}>
                <Text style={styles.emoji}>{item.emoji}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.buttonTitle}>{item.title}</Text>
                <Text style={styles.buttonSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>📍 Av. Cinco, 48 A - Orlândia/SP</Text>
        <Text style={styles.footerText}>📱 WhatsApp: (16) 99173-7383</Text>
        <Text style={styles.footerText}>📷 @amo.orlandia</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: '#39BF24',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '500',
  },
  menuContainer: {
    padding: 20,
    paddingTop: 30,
  },
  menuButton: {
    marginBottom: 15,
    borderRadius: 15,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  emoji: {
    fontSize: 28,
  },
  textContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  footer: {
    backgroundColor: '#f8f9fa',
    padding: 25,
    marginTop: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
});
// No final do arquivo:
export default HomeScreen; // ou o nome da sua função/componente
