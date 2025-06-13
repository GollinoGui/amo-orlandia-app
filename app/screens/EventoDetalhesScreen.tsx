import { useThemeColor } from '@/hooks/useThemeColor';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native'; 
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  detalhes?: {
    objetivo?: string;
    comoParticipar?: string[];
    materiais?: string[];
    contato?: string;
    observacoes?: string;
  };
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
    descricao: "Grande mutirão de limpeza urbana para tornar nossa cidade mais limpa e sustentável. Venha participar conosco e fazer a diferença em Orlândia!",
    local: "Praça Central de Orlândia",
    horario: "08:00 às 12:00",
    organizador: "AMO Orlândia",
    participantes: 0,
    detalhes: {
      objetivo: "Promover a limpeza urbana e conscientização ambiental através da participação comunitária, tornando Orlândia uma cidade mais limpa e sustentável.",
      comoParticipar: [
        "Compareça no local e horário indicados",
        "Traga água e protetor solar",
        "Use roupas confortáveis e calçados fechados",
        "Venha com disposição para ajudar!"
      ],
      materiais: [
        "Sacos de lixo (fornecidos pela AMO)",
        "Luvas de proteção (fornecidas)",
        "Vassouras e pás (fornecidas)",
        "Carrinhos de mão (fornecidos)",
        "Água e lanche (fornecidos)"
      ],
      contato: "(16) 99173-7383",
      observacoes: "Em caso de chuva, o evento será adiado. Acompanhe nossas redes sociais para atualizações."
    }
  },
  {
    id: 2,
    titulo: "Limpai 2023",
    subtitulo: "1º Mutirão de Limpeza",
    data: "2023-09-20",
    status: "passado",
    icone: "🧹",
    cor: "#72BF24",
    descricao: "Nosso primeiro grande mutirão de limpeza foi um sucesso! Mais de 100 voluntários participaram e fizeram a diferença em nossa cidade.",
    local: "Bairro Centro",
    horario: "07:00 às 11:00",
    organizador: "AMO Orlândia",
    participantes: 120,
    resultados: [
      "120 voluntários participaram",
      "2 toneladas de lixo coletadas",
      "15 ruas completamente limpas",
      "50 mudas plantadas",
      "Parceria com 5 escolas locais",
      "Cobertura da mídia local"
    ],
    detalhes: {
      objetivo: "Nosso primeiro evento foi um marco na história da AMO Orlândia, demonstrando o poder da união comunitária.",
      observacoes: "Este evento inspirou a criação de outros projetos ambientais na cidade."
    }
  },
  {
    id: 3,
    titulo: "Plantio de Árvores",
    subtitulo: "Orlândia Mais Verde",
    data: "2023-11-25",
    status: "passado",
    icone: "🌳",
    cor: "#39BF24",
    descricao: "Evento de plantio de árvores nativas para aumentar a cobertura verde da cidade e melhorar a qualidade do ar.",
    local: "Parque Municipal",
    horario: "08:00 às 10:00",
    organizador: "AMO Orlândia + Prefeitura",
    participantes: 80,
    resultados: [
      "80 voluntários participaram",
      "200 mudas de árvores nativas plantadas",
      "5 áreas diferentes reflorestadas",
      "Parceria com escolas locais",
      "Workshop sobre meio ambiente",
      "Criação de área de preservação"
    ]
  },
  {
    id: 4,
    titulo: "Feira de Sustentabilidade",
    subtitulo: "Consciência Ambiental",
    data: "2024-04-22",
    status: "futuro",
    icone: "♻️",
    cor: "#F2C335",
    descricao: "Feira educativa sobre sustentabilidade, reciclagem e preservação ambiental. Venha aprender e ensinar sobre cuidados com o meio ambiente!",
    local: "Praça da Matriz",
    horario: "14:00 às 18:00",
    organizador: "AMO Orlândia",
    participantes: 0,
    detalhes: {
      objetivo: "Educar a população sobre práticas sustentáveis e promover a consciência ambiental através de atividades interativas.",
      comoParticipar: [
        "Entrada gratuita para todos",
        "Traga materiais recicláveis",
        "Participe das oficinas",
        "Visite os estandes educativos"
      ],
      materiais: [
        "Estandes informativos",
        "Oficinas de reciclagem",
        "Jogos educativos",
        "Distribuição de mudas",
        "Food trucks sustentáveis"
      ],
      contato: "(16) 99173-7383"
    }
  },
];

export function EventoDetalhesScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const evento = eventos.find(e => e.id === parseInt(id as string));

  if (!evento) {
    return (
      <View style={[styles.container, { backgroundColor, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[styles.errorText, { color: textColor }]}>Evento não encontrado</Text>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: '#39BF24' }]}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const abrirWhatsApp = async () => {
    if (evento.detalhes?.contato) {
      const numero = evento.detalhes.contato.replace(/\D/g, '');
      const mensagem = `Olá! Gostaria de participar do evento "${evento.titulo}".`;
      const url = `whatsapp://send?phone=55${numero}&text=${encodeURIComponent(mensagem)}`;
      
      try {
        await Linking.openURL(url);
      } catch (error) {
        console.error('Erro ao abrir WhatsApp:', error);
      }
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* Header do Evento */}
      <View style={[styles.header, { backgroundColor: evento.cor }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerIcone}>{evento.icone}</Text>
          <View style={styles.headerText}>
            <Text style={styles.headerTitulo}>{evento.titulo}</Text>
            <Text style={styles.headerSubtitulo}>{evento.subtitulo}</Text>
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
      </View>

      {/* Informações Básicas */}
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: evento.cor }]}>📋 Informações</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>📅</Text>
          <Text style={[styles.infoText, { color: textColor }]}>
            {new Date(evento.data).toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>

        {evento.horario && (
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>⏰</Text>
            <Text style={[styles.infoText, { color: textColor }]}>{evento.horario}</Text>
          </View>
        )}

        {evento.local && (
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <Text style={[styles.infoText, { color: textColor }]}>{evento.local}</Text>
          </View>
        )}

        {evento.organizador && (
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>👥</Text>
            <Text style={[styles.infoText, { color: textColor }]}>Organizado por: {evento.organizador}</Text>
          </View>
        )}

        {evento.participantes && evento.participantes > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>🎯</Text>
            <Text style={[styles.infoText, { color: textColor }]}>{evento.participantes} participantes</Text>
          </View>
        )}
      </View>

      {/* Descrição */}
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: evento.cor }]}>📝 Sobre o Evento</Text>
        <Text style={[styles.descricaoText, { color: textColor }]}>{evento.descricao}</Text>
        
        {evento.detalhes?.objetivo && (
          <>
            <Text style={[styles.subSectionTitle, { color: evento.cor }]}>🎯 Objetivo</Text>
            <Text style={[styles.descricaoText, { color: textColor }]}>{evento.detalhes.objetivo}</Text>
          </>
        )}
      </View>

      {/* Como Participar (apenas eventos futuros) */}
      {evento.status === 'futuro' && evento.detalhes?.comoParticipar && (
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.sectionTitle, { color: evento.cor }]}>🤝 Como Participar</Text>
          {evento.detalhes.comoParticipar.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.listBullet, { color: evento.cor }]}>•</Text>
              <Text style={[styles.listText, { color: textColor }]}>{item}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Materiais (apenas eventos futuros) */}
      {evento.status === 'futuro' && evento.detalhes?.materiais && (
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.sectionTitle, { color: evento.cor }]}>🛠️ Materiais Fornecidos</Text>
          {evento.detalhes.materiais.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.listBullet, { color: evento.cor }]}>✓</Text>
              <Text style={[styles.listText, { color: textColor }]}>{item}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Resultados (apenas eventos passados) */}
      {evento.status === 'passado' && evento.resultados && (
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.sectionTitle, { color: evento.cor }]}>🏆 Resultados Alcançados</Text>
          {evento.resultados.map((resultado, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.listBullet, { color: evento.cor }]}>🎉</Text>
              <Text style={[styles.listText, { color: textColor }]}>{resultado}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Observações */}
      {evento.detalhes?.observacoes && (
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.sectionTitle, { color: evento.cor }]}>⚠️ Observações</Text>
          <Text style={[styles.descricaoText, { color: textColor }]}>{evento.detalhes.observacoes}</Text>
        </View>
      )}

           {/* Botões de Ação */}
      {evento.status === 'futuro' && (
        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.sectionTitle, { color: evento.cor }]}>📞 Entre em Contato</Text>
          
          {evento.detalhes?.contato && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#25D366' }]}
              onPress={abrirWhatsApp}
            >
              <Text style={styles.actionButtonText}>📱 WhatsApp: {evento.detalhes.contato}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: evento.cor }]}
            onPress={() => router.push('/contato')}
          >
            <Text style={styles.actionButtonText}>📧 Formulário de Contato</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botão Voltar */}
      <View style={styles.voltarContainer}>
        <TouchableOpacity
          style={[styles.voltarButton, { backgroundColor: evento.cor }]}
          onPress={() => router.back()}
        >
          <Text style={styles.voltarButtonText}>← Voltar aos Eventos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    margin: 20,
    borderRadius: 15,
     ...Platform.select({
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
      default: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  headerIcone: {
    fontSize: 40,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  headerTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitulo: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  statusBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  card: {
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 15,
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
      default: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 10,
    width: 25,
  },
  infoText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  descricaoText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listBullet: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    width: 20,
  },
  listText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  actionButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  voltarContainer: {
    margin: 20,
    marginTop: 10,
  },
  voltarButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  voltarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default EventoDetalhesScreen;