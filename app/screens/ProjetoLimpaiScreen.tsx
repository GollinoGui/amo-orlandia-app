import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export function ProjetoLimpaiScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const cardColor = useThemeColor({}, 'card');

  const objetivos = [
    {
      icon: '⚖️',
      title: 'Aplicação da Legislação',
      description: 'Aplicar a legislação ambiental vigente em Orlândia'
    },
    {
      icon: '♻️',
      title: 'Descarte Correto',
      description: 'Estimular o descarte correto por meio de serviços regulares da Prefeitura e do app da AMO'
    },
    {
      icon: '🎓',
      title: 'Educação Ambiental',
      description: 'Promover educação ambiental e mobilização comunitária pela limpeza urbana e preservação dos espaços públicos'
    }
  ];

  const acoes = [
    {
      icon: '🧹',
      title: 'Mutirões de Limpeza',
      description: 'Organizamos mutirões regulares para limpeza de canteiros centrais e áreas públicas'
    },
    {
      icon: '🏢',
      title: 'Palestras em Empresas',
      description: 'Ações de conscientização PERMANENTES nas empresas através de palestras e ações cidadãs'
    },
    {
      icon: '🏫',
      title: 'Educação nas Escolas',
      description: 'Atuação na rede municipal de ensino com material didático específico'
    },
    {
      icon: '👨‍🎓',
      title: 'Engajamento Jovem',
      description: 'Ações diversas estimulando os jovens a participarem da preservação ambiental'
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.title, { color: primaryColor }]}>🧹 Projeto Limpai</Text>
        
        <View style={[styles.highlightBox, { backgroundColor: primaryColor + '15', borderColor: primaryColor }]}>
          <Text style={[styles.highlightText, { color: textColor }]}>
            O Projeto Limpaí é a primeira iniciativa da AMO e tem como objetivo principal combater o descarte irregular de resíduos, especialmente em canteiros centrais e áreas públicas.
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: primaryColor }]}>🎯 Nossos Objetivos</Text>
        {objetivos.map((objetivo, index) => (
          <View key={index} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemIcon}>{objetivo.icon}</Text>
              <Text style={[styles.itemTitle, { color: textColor }]}>
                {objetivo.title}
              </Text>
            </View>
            <Text style={[styles.itemDescription, { color: textColor }]}>
              {objetivo.description}
            </Text>
          </View>
        ))}

        <Text style={[styles.sectionTitle, { color: primaryColor }]}>🚀 Nossas Ações</Text>
        {acoes.map((acao, index) => (
          <View key={index} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemIcon}>{acao.icon}</Text>
              <Text style={[styles.itemTitle, { color: textColor }]}>
                {acao.title}
              </Text>
            </View>
            <Text style={[styles.itemDescription, { color: textColor }]}>
              {acao.description}
            </Text>
          </View>
        ))}

        <View style={[styles.callToActionBox, { backgroundColor: primaryColor }]}>
          <Text style={styles.callToActionTitle}>💚 Faça Parte!</Text>
          <Text style={styles.callToActionText}>
            Junte-se ao Projeto Limpai e ajude a construir uma Orlândia mais limpa e sustentável para todos!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  highlightBox: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 25,
  },
  highlightText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  itemCard: {
    backgroundColor: 'rgba(57, 191, 36, 0.05)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#39BF24',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  itemDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 32,
    opacity: 0.9,
  },
  callToActionBox: {
    padding: 20,
    borderRadius: 12,
    marginTop: 25,
    alignItems: 'center',
  },
  callToActionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  callToActionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
  },
});
// No final do arquivo:
export default ProjetoLimpaiScreen; // ou o nome da sua função/componente
