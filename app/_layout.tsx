import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomSplashScreen } from '../components/CustomSplashScreen';
import { ThemeProvider } from './contexts/ThemeContext';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // ✅ TODOS OS HOOKS NO INÍCIO
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // ✅ USEEFFECT SEMPRE APÓS OS STATES
   useEffect(() => {
    if (loaded) {
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Função para criar o botão de voltar customizado
    const createHeaderLeft = () => {
    const router = useRouter();
    return () => (
      <TouchableOpacity 
        onPress={() => router.push('/')}
        style={{ 
          marginLeft: Platform.OS === 'ios' ? 10 : 15,
          marginTop: Platform.OS === 'ios' ? -8 : -5,
          backgroundColor: 'rgba(0, 0, 0, 0.18)',
          borderRadius: 25,
          width: Platform.OS === 'ios' ? 45 : 50,
          height: Platform.OS === 'ios' ? 45 : 50,
          justifyContent: 'center',
          alignItems: 'center',
          ...(Platform.OS === 'ios' && {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }),
          ...(Platform.OS === 'android' && {
            elevation: 5,
          })
        }}
        activeOpacity={0.7}
      >
        <Text style={{ 
          color: '#fff', 
          fontSize: Platform.OS === 'ios' ? 24 : 30,
          fontWeight: 'bold',
          textAlign: 'center',
          lineHeight: Platform.OS === 'ios' ? 24 : 30,
          marginTop: Platform.OS === 'ios' ? -2 : 0,
          marginLeft: Platform.OS === 'ios' ? 2 : 4,
        }}>←</Text>
      </TouchableOpacity>
    );
  };

if (!loaded) {
    return null;
  }

  if (!appIsReady) {
    return null;
  }

  if (showCustomSplash) {
    return (
      <CustomSplashScreen 
        onFinish={() => setShowCustomSplash(false)} 
      />
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack
          screenOptions={{
            headerShown: true,
            gestureEnabled: true,
            animation: Platform.OS === 'ios' ? 'slide_from_right' : 'fade',
            presentation: 'card',
            headerBackVisible: false,
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen 
            name="index" 
            options={{ 
              headerShown: false,
              gestureEnabled: false,
              animation: 'none',
            }} 
          />
          
          <Stack.Screen 
            name="quem-somos" 
            options={{ 
              title: 'Quem Somos',
              headerStyle: { backgroundColor: '#39BF24' },
              headerTintColor: '#fff',
              headerTitleStyle: { 
                fontWeight: 'bold',
                fontSize: Platform.OS === 'ios' ? 18 : 16,
              },
              headerShown:false,
              headerLeft: createHeaderLeft(),
              gestureEnabled: true,
              presentation: 'card',
            }} 
          />

          <Stack.Screen 
            name="denuncia" 
            options={{ 
              title: 'Nova Denúncia',
              headerStyle: { backgroundColor: '#E74C3C' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
              headerShown:false,
              headerLeft: createHeaderLeft()
            }} 
          />
          
          <Stack.Screen 
            name="atuacao-amo" 
            options={{ 
              title: 'Atuação da AMO',
              headerStyle: { backgroundColor: '#F2C335' },
              headerTintColor: '#fff',
              headerTitleStyle: { 
                fontWeight: 'bold',
                fontSize: Platform.OS === 'ios' ? 18 : 16,
              },
              headerShown:false,
              headerLeft: createHeaderLeft(),
              gestureEnabled: true,
              presentation: 'card',
            }} 
          />

          <Stack.Screen 
            name="debug-ios" 
            options={{ 
              title: '🚨 Debug iOS',
              headerStyle: { backgroundColor: '#FF6B6B' },
              headerTintColor: '#fff',
              headerTitleStyle: { 
                fontWeight: 'bold',
                fontSize: Platform.OS === 'ios' ? 18 : 16,
              },
              headerLeft: createHeaderLeft(),
              gestureEnabled: true,
              presentation: 'card',
            }} 
          />
          
          <Stack.Screen 
            name="politica-reserva" 
            options={{ 
              title: 'Política de Reserva',
              headerStyle: { backgroundColor: '#72BF24' },
              headerTintColor: '#fff',
              headerTitleStyle: { 
                fontWeight: 'bold',
                fontSize: Platform.OS === 'ios' ? 18 : 16,
              },
              headerShown:false,
              headerLeft: createHeaderLeft(),
              gestureEnabled: true,
              presentation: 'card',
            }} 
          />

          <Stack.Screen 
            name="eventos" 
            options={{ 
              title: 'Eventos AMO',
              headerStyle: { backgroundColor: '#F2C335' },
              headerTintColor: '#fff',
              headerTitleStyle: { 
                fontWeight: 'bold',
                fontSize: Platform.OS === 'ios' ? 18 : 16,
              },
              headerShown:false,
              headerLeft: createHeaderLeft(),
              gestureEnabled: true,
              presentation: 'card',
            }} 
          />

          <Stack.Screen 
            name="evento-detalhes" 
            options={{ 
              title: 'Detalhes do Evento',
              headerStyle: { backgroundColor: '#9EBF26' },
              headerTintColor: '#fff',
              headerTitleStyle: { 
                fontWeight: 'bold',
                fontSize: Platform.OS === 'ios' ? 18 : 16,
              },
              headerShown:false,
              headerLeft: createHeaderLeft(),
              gestureEnabled: true,
              presentation: 'card',
            }} 
          />

          <Stack.Screen 
            name="projeto-limpai" 
            options={{ 
              title: 'Projeto Limpai',
              headerStyle: { backgroundColor: '#9EBF26' },
              headerTintColor: '#fff',
              headerTitleStyle: { 
                fontWeight: 'bold',
                fontSize: Platform.OS === 'ios' ? 18 : 16,
              },
              headerShown:false,
              headerLeft: createHeaderLeft(),
              gestureEnabled: true,
              presentation: 'card',
            }} 
          />
          
          <Stack.Screen 
            name="contato" 
            options={{ 
              title: 'Contate-nos',
              headerStyle: { backgroundColor: '#F2C335' },
              headerTintColor: '#fff',
              headerTitleStyle: { 
                fontWeight: 'bold',
                fontSize: Platform.OS === 'ios' ? 18 : 16,
              },
              headerShown:false,
              headerLeft: createHeaderLeft(),
              gestureEnabled: true,
              presentation: 'card',
            }} 
          />
          
          <Stack.Screen 
            name="descarte-irregular" 
            options={{ 
              headerShown: false, // ✅ DESABILITA O HEADER PADRÃO
            }} 
          />
          
          <Stack.Screen 
            name="servicos-publicos" 
            options={{ 
              title: 'Serviços Públicos',
              headerStyle: { backgroundColor: '#39BF24' },
              headerTintColor: '#fff',
              headerTitleStyle: { 
                fontWeight: 'bold',
                fontSize: Platform.OS === 'ios' ? 18 : 16,
              },
              headerShown:false,
              headerLeft: createHeaderLeft(),
              gestureEnabled: true,
              presentation: 'card',
            }} 
          />

          <Stack.Screen 
            name="associe-se" 
            options={{ 
              title: 'Associe-se à AMO',
              headerStyle: { backgroundColor: '#9EBF26' },
              headerTintColor: '#fff',
              headerTitleStyle: { 
                fontWeight: 'bold',
                fontSize: Platform.OS === 'ios' ? 18 : 16,
              },
              headerShown:false,
              headerLeft: createHeaderLeft(),
              gestureEnabled: true,
              presentation: 'card',
            }} 
          />

          <Stack.Screen 
            name="+not-found" 
            options={{
              title: 'Página não encontrada',
              headerStyle: { backgroundColor: '#39BF24' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
              headerLeft: createHeaderLeft(),
            }}
          />
        </Stack>
        
        <StatusBar 
          style="auto" 
          backgroundColor={Platform.OS === 'android' ? '#39BF24' : undefined}
          translucent={Platform.OS === 'android'}
        />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}


