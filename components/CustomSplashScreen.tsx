import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Platform
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface CustomSplashScreenProps {
  onFinish: () => void;
}

// 🔧 UTILITÁRIOS DE SHADOW PARA WEB/MOBILE
const createShadow = (elevation: number) => {
  if (Platform.OS === 'web') {
    return {
      boxShadow: `0px ${elevation}px ${elevation * 0.8}px rgba(0, 0, 0, 0.25)`,
    };
  }
  return {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: elevation },
    shadowOpacity: 0.25,
    shadowRadius: elevation * 0.8,
    elevation,
  };
};

const createTextShadow = (offsetX: number, offsetY: number, blur: number, color: string) => {
  if (Platform.OS === 'web') {
    return {
      textShadow: `${offsetX}px ${offsetY}px ${blur}px ${color}`,
    };
  }
  return {
    textShadowColor: color,
    textShadowOffset: { width: offsetX, height: offsetY },
    textShadowRadius: blur,
  };
};

export function CustomSplashScreen({ onFinish }: CustomSplashScreenProps) {
  // Estados de animação
  const [fadeAnim] = useState(new Animated.Value(0));
  const [logoFloat] = useState(new Animated.Value(0));
  const [textGlow] = useState(new Animated.Value(0));
  const [loadingProgress] = useState(new Animated.Value(0));
  const [dotsAnim] = useState([
    new Animated.Value(0.4),
    new Animated.Value(0.4), 
    new Animated.Value(0.4)
  ]);

  useEffect(() => {
    // Animação de entrada
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: Platform.OS !== 'web', // ✅ Condicional para web
    }).start();

    // Animação flutuante do logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoFloat, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: Platform.OS !== 'web', // ✅ Condicional para web
        }),
        Animated.timing(logoFloat, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: Platform.OS !== 'web', // ✅ Condicional para web
        }),
      ])
    ).start();

    // Animação do texto brilhante
    Animated.loop(
      Animated.sequence([
        Animated.timing(textGlow, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(textGlow, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();

    // Animação das bolinhas
    const animateDotsSequence = () => {
      dotsAnim.forEach((dot, index) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(dot, {
              toValue: 1,
              duration: 600,
              useNativeDriver: Platform.OS !== 'web', // ✅ Condicional para web
            }),
            Animated.timing(dot, {
              toValue: 0.4,
              duration: 600,
              useNativeDriver: Platform.OS !== 'web', // ✅ Condicional para web
            }),
          ]),
          { iterations: -1 }
        ).start();
      });
    };

    // Delay para cada bolinha
    setTimeout(() => animateDotsSequence(), 500);

    // Barra de progresso
    Animated.timing(loadingProgress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    // Finalizar splash
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: Platform.OS !== 'web', // ✅ Condicional para web
      }).start(() => {
        onFinish();
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Fundo com gradiente simulado */}
      <View style={styles.backgroundGradient} />
      
      {/* Pontos flutuantes de fundo */}
      <View style={styles.floatingDots}>
        <Animated.View style={[styles.floatingDot, styles.dot1]} />
        <Animated.View style={[styles.floatingDot, styles.dot2]} />
        <Animated.View style={[styles.floatingDot, styles.dot3]} />
        <Animated.View style={[styles.floatingDot, styles.dot4]} />
      </View>

      <View style={styles.mainContainer}>
        {/* Logo Container */}
        <Animated.View 
          style={[
            styles.logoContainer,
            { transform: [{ translateY: logoFloat }] }
          ]}
        >
          <View style={styles.logoCircle}>
            {/* ✅ LOGO REAL DA AMO */}
            <Image 
              source={require('../assets/images/icon.png')}
              style={styles.logoImage}
              resizeMode="cover"
              onError={() => {
                // Se a logo não carregar, mostra fallback
                console.log('Logo não carregou, usando fallback');
              }}
            />
            
            {/* ✅ FALLBACK SEM EMOJI DA CASA */}
            <View style={styles.logoFallback}>
              <Text style={styles.logoAMO}>AMO</Text>
              <Text style={styles.logoText}>ORLÂNDIA</Text>
            </View>
          </View>
        </Animated.View>

        {/* Título Principal */}
        <Animated.View style={styles.titleContainer}>
          <Text style={styles.brandName}>AMO{'\n'}ORLÂNDIA</Text>
        </Animated.View>

        {/* Subtítulo */}
        <Text style={styles.tagline}>
          Associação de Moradores{'\n'}Orlândia - SP
        </Text>

        {/* Seção de Loading */}
        <View style={styles.loadingSection}>
          <Text style={styles.loadingText}>Carregando...</Text>
          
          {/* Bolinhas animadas */}
          <View style={styles.loadingDots}>
            <Animated.View 
              style={[
                styles.loadingDot,
                styles.loadingDot1,
                { 
                  opacity: dotsAnim[0],
                  transform: [{ 
                    scale: dotsAnim[0].interpolate({
                      inputRange: [0.4, 1],
                      outputRange: [1, 1.4]
                    })
                  }]
                }
              ]} 
            />
            <Animated.View 
              style={[
                styles.loadingDot,
                styles.loadingDot2,
                { 
                  opacity: dotsAnim[1],
                  transform: [{ 
                    scale: dotsAnim[1].interpolate({
                      inputRange: [0.4, 1],
                      outputRange: [1, 1.4]
                    })
                  }]
                }
              ]} 
            />
            <Animated.View 
              style={[
                styles.loadingDot,
                styles.loadingDot3,
                { 
                  opacity: dotsAnim[2],
                  transform: [{ 
                    scale: dotsAnim[2].interpolate({
                      inputRange: [0.4, 1],
                      outputRange: [1, 1.4]
                    })
                  }]
                }
              ]} 
            />
          </View>

          {/* Barra de progresso */}
          <View style={styles.loadingBarContainer}>
            <View style={styles.loadingBar}>
              <Animated.View 
                style={[
                  styles.loadingProgressBar,
                  {
                    width: loadingProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Versão */}
      <Text style={styles.versionInfo}>v1.0.0</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    position: 'relative',
  },
  
  // FUNDO GRADIENTE
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#39BF24', // Fallback
    // Simulando gradiente com sobreposições
  },

  // PONTOS FLUTUANTES
  floatingDots: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
  },
  dot1: {
    top: '20%',
    left: '10%',
  },
  dot2: {
    top: '30%',
    right: '15%',
  },
  dot3: {
    bottom: '25%',
    left: '20%',
  },
  dot4: {
    bottom: '35%',
    right: '10%',
  },

  // CONTAINER PRINCIPAL
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  // LOGO
  logoContainer: {
    marginBottom: 40,
  },
  logoCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    position: 'relative',
  },
  
  // ✅ LOGO REAL DA AMO
  logoImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    position: 'absolute',
    backgroundColor: '#fff',
  },
  
  // ✅ FALLBACK SEM EMOJI DA CASA
  logoFallback: {
    alignItems: 'center',
    position: 'absolute',
    opacity: 0, // Escondido por padrão, só aparece se a logo não carregar
  },
  logoAMO: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F2C335',
    marginBottom: 5,
    ...createTextShadow(1, 1, 2, 'rgba(0, 0, 0, 0.3)'), // ✅ Corrigido
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    ...createTextShadow(1, 1, 2, 'rgba(0, 0, 0, 0.3)'), // ✅ Corrigido
  },

  // TÍTULO
  titleContainer: {
    marginBottom: 20,
  },
  brandName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 4,
    lineHeight: 52,
    ...createTextShadow(2, 2, 4, 'rgba(0, 0, 0, 0.4)'), // ✅ Corrigido
  },

  // SUBTÍTULO
  tagline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 24,
    ...createTextShadow(1, 1, 2, 'rgba(0, 0, 0, 0.3)'), // ✅ Corrigido
  },

  // LOADING
  loadingSection: {
    alignItems: 'center',
    width: '100%',
  },
  loadingText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
    ...createTextShadow(1, 1, 2, 'rgba(0, 0, 0, 0.3)'), // ✅ Corrigido
  },

  // BOLINHAS DE LOADING
  loadingDots: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  loadingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  loadingDot1: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  loadingDot2: {
    backgroundColor: '#F2C335',
  },
  loadingDot3: {
    backgroundColor: '#9EBF26',
  },

  // BARRA DE PROGRESSO
  loadingBarContainer: {
    width: 200,
  },
  loadingBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgressBar: {
    height: '100%',
    backgroundColor: '#F2C335',
    borderRadius: 2,
  },

  // VERSÃO
  versionInfo: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    ...createTextShadow(1, 1, 2, 'rgba(0, 0, 0, 0.3)'), // ✅ Corrigido
  },
});
