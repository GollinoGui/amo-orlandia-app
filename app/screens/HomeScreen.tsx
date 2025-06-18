import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// 📱 OBTER DIMENSÕES DA TELA
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// 🔧 FUNÇÃO PARA RESPONSIVIDADE
const getResponsiveSize = (size: number) => {
  const baseWidth = 375; // iPhone SE como base
  return (screenWidth / baseWidth) * size;
};

// 🔧 FUNÇÃO PARA TEXTO RESPONSIVO
const getResponsiveFontSize = (size: number) => {
  const scale = screenWidth / 375;
  const newSize = size * scale;
  
  // Limitar tamanhos mínimos e máximos
  if (newSize < size * 0.8) return size * 0.8;
  if (newSize > size * 1.2) return size * 1.2;
  
  return newSize;
};

export function HomeScreen() {
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
      id: 8,
      title: 'Contate-nos',
      subtitle: 'Entre em contato conosco',
      emoji: '📞',
      route: 'contato',
      color: '#F2C335'
    },
    {
      id: 9,
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
                <Text style={styles.buttonTitle} numberOfLines={2} adjustsFontSizeToFit>
                  {item.title}
                </Text>
                <Text style={styles.buttonSubtitle} numberOfLines={2} adjustsFontSizeToFit>
                  {item.subtitle}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText} numberOfLines={1} adjustsFontSizeToFit>
          📍 Av. Cinco, 48 A - Orlândia/SP
        </Text>
        <Text style={styles.footerText} numberOfLines={1} adjustsFontSizeToFit>
          📱 WhatsApp: (16) 99173-7383
        </Text>
        {/* ✅ TEXTO DO INSTAGRAM CORRIGIDO */}
        <Text style={styles.footerText} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
          📷 @amo.orlandia
        </Text>
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
    paddingTop: getResponsiveSize(60),
    paddingBottom: getResponsiveSize(30),
    paddingHorizontal: getResponsiveSize(20),
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
    width: getResponsiveSize(100),
    height: getResponsiveSize(100),
    borderRadius: getResponsiveSize(50),
    marginBottom: getResponsiveSize(15),
    borderWidth: 3,
    borderColor: '#fff',
  },
  title: {
    fontSize: getResponsiveFontSize(28),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: getResponsiveSize(5),
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: getResponsiveFontSize(16),
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '500',
    // ✅ RESPONSIVIDADE PARA TEXTOS LONGOS
    paddingHorizontal: getResponsiveSize(10),
    lineHeight: getResponsiveFontSize(20),
  },
  menuContainer: {
    padding: getResponsiveSize(20),
    paddingTop: getResponsiveSize(30),
  },
  menuButton: {
    marginBottom: getResponsiveSize(15),
    borderRadius: 15,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // ✅ ALTURA MÍNIMA PARA CONSISTÊNCIA
    minHeight: getResponsiveSize(80),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: getResponsiveSize(20),
    // ✅ GARANTIR ALINHAMENTO
    minHeight: getResponsiveSize(80),
  },
  iconContainer: {
    width: getResponsiveSize(60),
    height: getResponsiveSize(60),
    borderRadius: getResponsiveSize(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getResponsiveSize(15),
    // ✅ TAMANHO FIXO PARA CONSISTÊNCIA
    flexShrink: 0,
  },
  emoji: {
    fontSize: getResponsiveFontSize(28),
  },
  textContainer: {
    flex: 1,
    // ✅ GARANTIR QUE O TEXTO USE TODO O ESPAÇO
    paddingRight: getResponsiveSize(10),
  },
  buttonTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: getResponsiveSize(4),
    // ✅ ALTURA DE LINHA PARA CONSISTÊNCIA
    lineHeight: getResponsiveFontSize(22),
  },
  buttonSubtitle: {
    fontSize: getResponsiveFontSize(14),
    color: '#666',
    lineHeight: getResponsiveFontSize(18),
  },
  footer: {
    backgroundColor: '#f8f9fa',
    padding: getResponsiveSize(25),
    marginTop: getResponsiveSize(20),
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  footerText: {
    fontSize: getResponsiveFontSize(14),
    color: '#666',
    marginBottom: getResponsiveSize(8),
    textAlign: 'center',
    // ✅ LARGURA MÁXIMA PARA EVITAR CORTES
    maxWidth: screenWidth - getResponsiveSize(40),
    // ✅ ALTURA DE LINHA CONSISTENTE
    lineHeight: getResponsiveFontSize(18),
  },
});

export default HomeScreen;
