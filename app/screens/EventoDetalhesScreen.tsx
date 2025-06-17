import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
  Linking
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

interface Evento {
  id: number;
  titulo: string;
  subtitulo: string;
  data: string;
  status: 'futuro' | 'passado' | 'em_andamento';
  icone: string;
  cor: string;
  descricao: string;
  local?: string;
  horario?: string;
  organizador?: string;
  participantes?: number;
  resultados?: string[];
  detalhes?: string;
  contato?: string;
  instagram?: string;
}

const eventos: Evento[] = [
  {
    id: 1,
    titulo: "Projeto Limpai",
    subtitulo: "Mutirão de Limpeza Urbana",
    data: "2024-03-15",
    status: "futuro",
    icone: "🧹",
    cor: "#9EBF26",
    descricao: "Nosso primeiro grande mutirão de limpeza foi um sucesso! Mais de 100 voluntários participaram e fizeram a diferença em nossa cidade.",
    local: "Praça Central de Orlândia",
    horario: "08:00 às 12:00",
    organizador: "AMO Orlândia",
    participantes: 0,
    detalhes: "O Projeto Limpai é uma iniciativa da AMO Orlândia para mobilizar a comunidade na limpeza e preservação dos espaços públicos da cidade. Venha fazer parte desta transformação!",
    contato: "(16) 99173-7383",
    instagram: "@amo.orlandia",
    resultados: [
      "🗑️ 500kg de lixo coletado",
      "🌳 10 árvores plantadas", 
      "👥 120 voluntários participaram",
      "📍 5 praças revitalizadas"
    ]
  },
];

export function EventoDetalhesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { id } = useLocalSearchParams();

  const evento = eventos.find(e => e.id === parseInt(id as string));

  if (!evento) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar 
          barStyle={theme.isDark ? "light-content" : "light-content"}
          backgroundColor="#9EBF26"
        />
        
        <View style={[
          styles.header, 
          { 
            paddingTop: insets.top + 10,
            backgroundColor: '#9EBF26'
          }
        ]}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>❌ Evento não encontrado</Text>
          
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.text }]}>
            Evento não encontrado. Volte para a lista de eventos.
          </Text>
        </View>
      </View>
    );
  }

  const abrirWhatsApp = async () => {
    if (!evento.contato) return;
    
    const numero = evento.contato.replace(/\D/g, '');
    const mensagem = `Olá! Gostaria de saber mais sobre o evento: ${evento.titulo}`;
    const url = `whatsapp://send?phone=55${numero}&text=${encodeURIComponent(mensagem)}`;
    
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('WhatsApp', `Entre em contato: ${evento.contato}`);
    }
  };

  const abrirInstagram = async () => {
    if (!evento.instagram) return;
    
    const url = `https://www.instagram.com/${evento.instagram.replace('@', '')}/`;
    
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Instagram', `Procure: ${evento.instagram}`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* ✅ STATUS BAR */}
      <StatusBar 
        barStyle={theme.isDark ? "light-content" : "light-content"}
        backgroundColor={evento.cor}
      />
      
      {/* ✅ HEADER RESPONSIVO */}
      <View style={[
        styles.header, 
        { 
          paddingTop: insets.top + 10,
          backgroundColor: evento.cor
        }
      ]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>📅 Detalhes do Evento</Text>
        
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        {/* HEADER DO EVENTO */}
        <View style={[styles.eventoHeader, { backgroundColor: evento.cor }]}>
          <Text style={styles.eventoIcone}>{evento.icone}</Text>
          <View style={styles.eventoHeaderText}>
            <Text style={styles.eventoTitulo}>{evento.titulo}</Text>
            <Text style={styles.eventoSubtitulo}>{evento.subtitulo}</Text>
          </View>
          <View style={[styles.statusBadge, { 
            backgroundColor: evento.status === 'futuro' ? '#4CAF50' : 
                            evento.status === 'em_andamento' ? '#FF9800' : '#757575'
          }]}>
            <Text style={styles.statusText}>
              {evento.status === 'futuro' ? 'FUTURO' : 
               evento.status === 'em_andamento' ? 'AGORA' : 'REALIZADO'}
            </Text>
          </View>
        </View>

        {/* INFORMAÇÕES BÁSICAS */}
        <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.cardTitle, { color: evento.cor }]}>
            📋 Informações do Evento
          </Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>📅</Text>
            <Text style={[styles.infoText, { color: theme.colors.text }]}>
              {new Date(evento.data).toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>

          {evento.horario && (
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>⏰</Text>
              <Text style={[styles.infoText, { color: theme.colors.text }]}>
                {evento.horario}
              </Text>
            </View>
          )}

          {evento.local && (
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📍</Text>
              <Text style={[styles.infoText, { color: theme.colors.text }]}>
                {evento.local}
              </Text>
            </View>
          )}

          {evento.organizador && (
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>👥</Text>
              <Text style={[styles.infoText, { color: theme.colors.text }]}>
                Organizado por: {evento.organizador}
              </Text>
            </View>
          )}

          {evento.participantes && evento.participantes > 0 && (
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>🎯</Text>
              <Text style={[styles.infoText, { color: theme.colors.text }]}>
                {evento.participantes} participantes confirmados
              </Text>
            </View>
          )}
        </View>

        {/* DESCRIÇÃO */}
        <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.cardTitle, { color: evento.cor }]}>
            📝 Sobre o Evento
          </Text>
          <Text style={[styles.descricaoText, { color: theme.colors.text }]}>
            {evento.descricao}
          </Text>
          
          {evento.detalhes && (
            <>
              <Text style={[styles.detalhesTitle, { color: evento.cor }]}>
                Mais Detalhes:
              </Text>
              <Text style={[styles.detalhesText, { color: theme.colors.text }]}>
                {evento.detalhes}
              </Text>
            </>
          )}
        </View>

        {/* RESULTADOS (se evento passado) */}
        {evento.resultados && evento.resultados.length > 0 && (
          <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.cardTitle, { color: evento.cor }]}>
              🏆 Resultados Alcançados
            </Text>
            {evento.resultados.map((resultado, index) => (
              <View key={index} style={styles.resultadoItem}>
                <Text style={[styles.resultadoText, { color: theme.colors.text }]}>
                  {resultado}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* CONTATOS */}
        <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.cardTitle, { color: evento.cor }]}>
            📞 Entre em Contato
          </Text>
          
          {evento.contato && (
            <TouchableOpacity 
              style={[styles.contactButton, { backgroundColor: '#25D366' }]}
              onPress={abrirWhatsApp}
            >
              <Text style={styles.contactIcon}>📱</Text>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>WhatsApp</Text>
                <Text style={styles.contactSubtitle}>{evento.contato}</Text>
              </View>
            </TouchableOpacity>
          )}

          {evento.instagram && (
            <TouchableOpacity 
              style={[styles.contactButton, { backgroundColor: '#E4405F' }]}
              onPress={abrirInstagram}
            >
              <Text style={styles.contactIcon}>📷</Text>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Instagram</Text>
                <Text style={styles.contactSubtitle}>{evento.instagram}</Text>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={[styles.contactButton, { backgroundColor: '#F2C335' }]}
            onPress={() => router.push('/contato')}
          >
            <Text style={styles.contactIcon}>📝</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Formulário de Contato</Text>
              <Text style={styles.contactSubtitle}>Use nosso formulário completo</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* CALL TO ACTION */}
        {evento.status === 'futuro' && (
          <View style={[styles.ctaCard, { 
            backgroundColor: theme.isDark ? '#1B4D3E' : '#E8F5E8',
            borderColor: '#4CAF50'
          }]}>
            <Text style={[styles.ctaTitle, { color: '#4CAF50' }]}>
              🎉 Participe deste Evento!
            </Text>
            <Text style={[styles.ctaText, { color: theme.colors.text }]}>
              Entre em contato conosco e confirme sua participação. Juntos fazemos a diferença!
            </Text>
            <TouchableOpacity 
              style={[styles.ctaButton, { backgroundColor: '#4CAF50' }]}
              onPress={abrirWhatsApp}
            >
              <Text style={styles.ctaButtonText}>
                📱 Confirmar Participação
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ESPAÇAMENTO FINAL */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // ✅ HEADER STYLES
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
  // ERROR STYLES
   errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  // EVENTO STYLES
  eventoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  eventoIcone: {
    fontSize: 40,
    marginRight: 15,
  },
  eventoHeaderText: {
    flex: 1,
  },
  eventoTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  eventoSubtitulo: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  statusBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // CARD STYLES
  card: {
    margin: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  // INFO STYLES
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 30,
  },
  infoText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  // DESCRIÇÃO STYLES
  descricaoText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
  detalhesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  detalhesText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  // RESULTADOS STYLES
  resultadoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  resultadoText: {
    fontSize: 16,
    fontWeight: '500',
  },
  // CONTACT STYLES
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  contactIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  // CTA STYLES
  ctaCard: {
    margin: 15,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  ctaButton: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EventoDetalhesScreen;
