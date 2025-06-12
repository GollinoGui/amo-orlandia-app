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
          marginLeft: 15,
          backgroundColor: 'rgba(0, 0, 0, 0.18)',
          borderRadius: 40,
          width: 50,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        activeOpacity={0.7}
        // 🔧 ADICIONE ESTAS PROPS PARA iOS
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessible={true}
        accessibilityLabel="Voltar para início"
        accessibilityRole="button"
      >
        <Text style={{ 
          color: '#fff', 
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center',
          lineHeight: 20,
          marginLeft: 4
        }}>←</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        // 🔧 CONFIGURAÇÕES GLOBAIS PARA iOS
        screenOptions={{
          headerShown: true,
          gestureEnabled: true,
          animation: Platform.OS === 'ios' ? 'slide_from_right' : 'fade',
          presentation: 'card',
          // 🔧 FORÇA INTERATIVIDADE NO iOS
          headerBackVisible: false,
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
            // 🔧 CONFIGURAÇÕES ESPECÍFICAS PARA TELA INICIAL
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
            // 🔧 FORÇA INTERATIVIDADE
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
        // 🔧 CONFIGURAÇÕES ESPECÍFICAS PARA iOS
        backgroundColor={Platform.OS === 'android' ? '#39BF24' : undefined}
        translucent={Platform.OS === 'android'}
      />
    </ThemeProvider>
  );
}
