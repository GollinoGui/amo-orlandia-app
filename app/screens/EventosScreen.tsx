import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

interface Evento {
  id: number;
  titulo: string;
  subtitulo: string;
  data: string;
  status: 'futuro' | 'passado' | 'em_andamento';
  icone: string;
  cor: string;
  imagem?: string;
  descricao: string;
  local?: string;
  horario?: string;
  organizador?: string;
  participantes?: number;
  resultados?: string[];
  fotos?: string[];
}

// ✅ FUNÇÃO PARA CALCULAR STATUS AUTOMÁTICO
const calcularStatusEvento = (dataEvento: string): 'futuro' | 'passado' | 'em_andamento' => {
  const hoje = new Date();
  const dataDoEvento = new Date(dataEvento);
  
  // Zerar as horas para comparar apenas as datas
  hoje.setHours(0, 0, 0, 0);
  dataDoEvento.setHours(0, 0, 0, 0);
  
  if (dataDoEvento.getTime() === hoje.getTime()) {
    return 'em_andamento';
  } else if (dataDoEvento > hoje) {
    return 'futuro';
  } else {
    return 'passado';
  }
};


export function EventosScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
const [eventos, setEventos] = useState<Evento[]>([]);
const [carregando, setCarregando] = useState(true);

useEffect(() => {
  const carregarEventos = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/GollinoGui/amo-orlandia-app/main/docs/eventos.json');
      const data: Omit<Evento, 'status'>[] = await response.json();
      const eventosComStatus: Evento[] = data.map(e => ({
        ...e,
        status: calcularStatusEvento(e.data),
      }));
      setEventos(eventosComStatus);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    } finally {
      setCarregando(false);
    }
  };

  carregarEventos();
}, []);
  const [filtroAtivo, setFiltroAtivo] = useState<'todos' | 'futuros' | 'passados'>('todos');

  const eventosFiltrados = eventos.filter(evento => {
    if (filtroAtivo === 'futuros') return evento.status === 'futuro' || evento.status === 'em_andamento';
    if (filtroAtivo === 'passados') return evento.status === 'passado';
    return true;
  });

  // ✅ FUNÇÃO PARA FORMATAR DATA BRASILEIRA
  const formatarDataBrasileira = (data: string) => {
    const dataObj = new Date(data);
    return dataObj.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // ✅ FUNÇÃO PARA VERIFICAR SE É HOJE
  const isHoje = (data: string) => {
    const hoje = new Date();
    const dataEvento = new Date(data);
    
    hoje.setHours(0, 0, 0, 0);
    dataEvento.setHours(0, 0, 0, 0);
    
    return dataEvento.getTime() === hoje.getTime();
  };

  const renderEvento = ({ item }: { item: Evento }) => (
    <TouchableOpacity
      style={[styles.eventoCard, { backgroundColor: theme.colors.card }]}
      onPress={() => router.push(`/evento-detalhes?id=${item.id}` as any)}
      activeOpacity={0.7}
    >
      <View style={[styles.eventoHeader, { backgroundColor: item.cor }]}>
        <Text style={styles.eventoIcone}>{item.icone}</Text>
        <View style={styles.eventoHeaderText}>
          <Text style={styles.eventoTitulo}>{item.titulo}</Text>
          <Text style={styles.eventoSubtitulo}>{item.subtitulo}</Text>
        </View>
        <View style={[styles.statusBadge, { 
          backgroundColor: item.status === 'futuro' ? '#4CAF50' : 
                          item.status === 'em_andamento' ? '#FF9800' : '#757575'
        }]}>
          <Text style={styles.statusText}>
            {item.status === 'futuro' ? 'FUTURO' : 
             item.status === 'em_andamento' ? 'HOJE' : 'REALIZADO'}
          </Text>
        </View>
      </View>

      <View style={styles.eventoContent}>
        <Text style={[styles.eventoData, { color: item.cor }]}>
          📅 {formatarDataBrasileira(item.data)}
          {isHoje(item.data) && <Text style={styles.hojeText}> • HOJE!</Text>}
        </Text>
        
        {item.local && (
          <Text style={[styles.eventoInfo, { color: theme.colors.text }]}>
            📍 {item.local}
          </Text>
        )}
        
        {item.horario && (
          <Text style={[styles.eventoInfo, { color: theme.colors.text }]}>
            ⏰ {item.horario}
          </Text>
        )}

        <Text style={[styles.eventoDescricao, { color: theme.colors.text }]} numberOfLines={2}>
          {item.descricao}
        </Text>

        <View style={styles.verMaisContainer}>
          <Text style={[styles.verMaisText, { color: item.cor }]}>
            Ver detalhes →
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar 
        barStyle={theme.isDark ? "light-content" : "light-content"}
        backgroundColor="#F2C335"
      />
      
      <View style={[
        styles.header, 
        { 
          paddingTop: insets.top + 10,
          backgroundColor: '#F2C335'
        }
      ]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>📅 Eventos AMO</Text>
        
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.headerCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.title, { color: '#F2C335' }]}> Eventos AMO</Text>
          <Text style={[styles.description, { color: theme.colors.text }]}>
            Acompanhe nossos eventos passados e futuros. Participe e faça a diferença em Orlândia!
          </Text>

          {/* Filtros */}
          <View style={styles.filtrosContainer}>
            <TouchableOpacity
              style={[styles.filtroButton, { 
                backgroundColor: filtroAtivo === 'todos' ? '#F2C335' : 'transparent',
                borderColor: '#F2C335'
              }]}
              onPress={() => setFiltroAtivo('todos')}
            >
              <Text style={[styles.filtroText, { 
                color: filtroAtivo === 'todos' ? '#fff' : '#F2C335' 
              }]}>
                Todos ({eventos.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filtroButton, { 
                backgroundColor: filtroAtivo === 'futuros' ? '#4CAF50' : 'transparent',
                borderColor: '#4CAF50'
              }]}
              onPress={() => setFiltroAtivo('futuros')}
            >
              <Text style={[styles.filtroText, { 
                color: filtroAtivo === 'futuros' ? '#fff' : '#4CAF50' 
              }]}>
                Futuros ({eventos.filter(e => e.status === 'futuro' || e.status === 'em_andamento').length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filtroButton, { 
                backgroundColor: filtroAtivo === 'passados' ? '#757575' : 'transparent',
                borderColor: '#757575'
              }]}
              onPress={() => setFiltroAtivo('passados')}
            >
              <Text style={[styles.filtroText, { 
                color: filtroAtivo === 'passados' ? '#fff' : '#757575' 
              }]}>
                Passados ({eventos.filter(e => e.status === 'passado').length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={eventosFiltrados}
          renderItem={renderEvento}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listaEventos}
          scrollEnabled={false}
        />

        {/* Call to Action */}
        <View style={[styles.ctaContainer, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.ctaTitle, { color: '#39BF24' }]}>
            🤝 Quer participar dos próximos eventos?
          </Text>
          <Text style={[styles.ctaText, { color: theme.colors.text }]}>
            Entre em contato conosco e seja um voluntário da AMO Orlândia!
          </Text>
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: '#39BF24' }]}
            onPress={() => router.push('/contato' as any)}
          >
            <Text style={styles.ctaButtonText}>📞 Entrar em Contato</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  headerCard: {
    padding: 20,
    borderRadius: 15,
    margin: 20,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  filtrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    flexWrap: 'wrap',
    paddingHorizontal: 5,
  },
  filtroButton: {
    flexGrow: 1,
    flexBasis: '30%', // permite quebra em colunas
    maxWidth: 110,     // define um limite para forçar quebra quando apertar
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    borderColor: '#ccc',
  },
  filtroText: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listaEventos: {
    paddingHorizontal: 20,
  },
  eventoCard: {
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  eventoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    position: 'relative',
  },
  eventoIcone: {
    fontSize: 32,
    marginRight: 15,
  },
  eventoHeaderText: {
    flex: 1,
  },
  eventoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  eventoSubtitulo: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  eventoContent: {
    padding: 15,
  },
  eventoData: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hojeText: {
    color: '#FF9800',
    fontWeight: 'bold',
  },
  eventoInfo: {
    fontSize: 14,
    marginBottom: 3,
    opacity: 0.8,
  },
   eventoDescricao: {
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 10,
  },
  eventoParticipantes: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  verMaisContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  verMaisText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  ctaContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
   ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  ctaButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventosScreen;
