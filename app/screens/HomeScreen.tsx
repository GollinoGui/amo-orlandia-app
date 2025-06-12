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
      title: 'Projeto Limpai',
      subtitle: 'Por uma Orlandia mais limpa.',
      emoji: '🧹',
      route: 'projeto-limpai',
      color: '#9EBF26'
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
          {/* Logo da AMO */}
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
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  menuContainer: {
    padding: 20,
    gap: 15,
  },
  menuButton: {
    borderRadius: 15,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  emoji: {
    fontSize: 22,
  },
  textContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  buttonSubtitle: {
    fontSize: 13,
    opacity: 0.7,
    color: '#666',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    opacity: 0.8,
    color: '#666',
  },
});
// No final do arquivo:
export default HomeScreen; // ou o nome da sua função/componente
