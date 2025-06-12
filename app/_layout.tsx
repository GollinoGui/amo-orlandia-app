import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, Text, TouchableOpacity } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

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

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
            headerLeft: createHeaderLeft(),
            gestureEnabled: true,
            presentation: 'card',
          }} 
        />
        
        <Stack.Screen 
          name="o-que-fazemos" 
          options={{ 
            title: 'O que Fazemos',
            headerStyle: { backgroundColor: '#72BF24' },
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
          name="atuacao-amo" 
          options={{ 
            title: 'Atuação da AMO',
            headerStyle: { backgroundColor: '#F2C335' },
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
            headerLeft: createHeaderLeft(),
            gestureEnabled: true,
            presentation: 'card',
          }} 
        />

        {/* ✅ ROTAS DE EVENTOS ADICIONADAS */}
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
            headerLeft: createHeaderLeft(),
            gestureEnabled: true,
            presentation: 'card',
          }} 
        />
        
        <Stack.Screen 
          name="descarte-irregular" 
          options={{ 
            title: 'Descarte Irregular',
            headerStyle: { backgroundColor: '#39BF24' },
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
          name="servicos-publicos" 
          options={{ 
            title: 'Serviços Públicos',
            headerStyle: { backgroundColor: '#39BF24' },
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
          name="associe-se" 
          options={{ 
            title: 'Associe-se à AMO',
            headerStyle: { backgroundColor: '#9EBF26' },
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
  );
}
