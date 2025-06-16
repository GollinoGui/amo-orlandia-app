import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export function QuemSomosScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = '#39BF24';
  const secondaryColor = '#F2C335';

  const abrirWhatsApp = async () => {
    const numero = '16991737383';
    const mensagem = 'Olá! Gostaria de saber mais sobre a AMO Orlândia.';
    const whatsappWeb = `https://wa.me/55${numero}?text=${encodeURIComponent(mensagem)}`;
    
    try {
      await Linking.openURL(whatsappWeb);
    } catch (error) {
      console.error('Erro ao abrir WhatsApp:', error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      
      {/* HEADER PRINCIPAL */}
      <View style={[styles.headerSection, { backgroundColor: primaryColor }]}>
        <Text style={styles.headerTitle}>AMO Orlândia</Text>
        <Text style={styles.headerSubtitle}>Associação dos Moradores de Orlândia</Text>
        <Text style={styles.headerDescription}>
          Uma entidade apartidária que atua em defesa da qualidade de vida dos cidadãos de Orlândia
        </Text>
      </View>

      {/* NOSSA ESSÊNCIA */}
      <View style={[styles.section, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>🎯 Nossa Essência</Text>
        <Text style={[styles.sectionText, { color: textColor }]}>
          A AMO é mais que uma associação - somos a voz unificada da comunidade orlandina. 
          Trabalhamos de forma apartidária, focando sempre no bem comum e na melhoria 
          da qualidade de vida de todos os cidadãos.
        </Text>
        
        <View style={styles.principiosContainer}>
          <View style={[styles.principioItem, { borderLeftColor: primaryColor }]}>
            <Text style={[styles.principioTitulo, { color: primaryColor }]}>Apartidária</Text>
            <Text style={[styles.principioTexto, { color: textColor }]}>
              Não temos vínculos políticos. Nosso compromisso é exclusivamente com a comunidade.
            </Text>
          </View>
          
          <View style={[styles.principioItem, { borderLeftColor: secondaryColor }]}>
            <Text style={[styles.principioTitulo, { color: secondaryColor }]}>Transparente</Text>
            <Text style={[styles.principioTexto, { color: textColor }]}>
              Todas nossas ações são públicas e prestamos contas à comunidade regularmente.
            </Text>
          </View>
          
          <View style={[styles.principioItem, { borderLeftColor: primaryColor }]}>
            <Text style={[styles.principioTitulo, { color: primaryColor }]}>Inclusiva</Text>
            <Text style={[styles.principioTexto, { color: textColor }]}>
              Trabalhamos sem discriminação, representando todos os moradores de Orlândia.
            </Text>
          </View>
        </View>
      </View>

      {/* NOSSAS FINALIDADES */}
      <View style={[styles.section, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>🎯 Nossas Finalidades</Text>
        
        <View style={styles.finalidadesList}>
          <View style={styles.finalidadeItem}>
            <Text style={[styles.finalidadeIcon, { color: primaryColor }]}>🌱</Text>
            <View style={styles.finalidadeTexto}>
              <Text style={[styles.finalidadeTitulo, { color: textColor }]}>Desenvolvimento Sustentável</Text>
              <Text style={[styles.finalidadeDescricao, { color: textColor }]}>
                Promover o desenvolvimento sustentável e equilibrado dos bairros de Orlândia
              </Text>
            </View>
          </View>

          <View style={styles.finalidadeItem}>
            <Text style={[styles.finalidadeIcon, { color: secondaryColor }]}>🗣️</Text>
            <View style={styles.finalidadeTexto}>
              <Text style={[styles.finalidadeTitulo, { color: textColor }]}>Representação Popular</Text>
              <Text style={[styles.finalidadeDescricao, { color: textColor }]}>
                Representar a população, propondo soluções a problemas locais e fiscalizando o poder público
              </Text>
            </View>
          </View>

          <View style={styles.finalidadeItem}>
            <Text style={[styles.finalidadeIcon, { color: primaryColor }]}>📚</Text>
            <View style={styles.finalidadeTexto}>
              <Text style={[styles.finalidadeTitulo, { color: textColor }]}>Cidadania e Cultura</Text>
              <Text style={[styles.finalidadeDescricao, { color: textColor }]}>
                Fomentar cidadania, cultura, educação, esportes e direitos humanos
              </Text>
            </View>
          </View>

          <View style={styles.finalidadeItem}>
            <Text style={[styles.finalidadeIcon, { color: secondaryColor }]}>🛡️</Text>
            <View style={styles.finalidadeTexto}>
              <Text style={[styles.finalidadeTitulo, { color: textColor }]}>Ética e Transparência</Text>
              <Text style={[styles.finalidadeDescricao, { color: textColor }]}>
                Apoiar ações de ética, transparência e preservação do meio ambiente e patrimônio público
              </Text>
            </View>
          </View>

          <View style={styles.finalidadeItem}>
            <Text style={[styles.finalidadeIcon, { color: primaryColor }]}>🤝</Text>
            <View style={styles.finalidadeTexto}>
              <Text style={[styles.finalidadeTitulo, { color: textColor }]}>Políticas Públicas</Text>
              <Text style={[styles.finalidadeDescricao, { color: textColor }]}>
                Colaborar com a formulação de políticas públicas, fomentando parcerias público-privadas saudáveis
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* NOSSO IMPACTO */}
      <View style={[styles.section, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>📊 Nosso Impacto</Text>
        
        <View style={styles.impactoGrid}>
          <View style={[styles.impactoCard, { backgroundColor: primaryColor + '15' }]}>
            <Text style={[styles.impactoNumero, { color: primaryColor }]}>500+</Text>
            <Text style={[styles.impactoTexto, { color: textColor }]}>Famílias Atendidas</Text>
          </View>
          
          <View style={[styles.impactoCard, { backgroundColor: secondaryColor + '15' }]}>
            <Text style={[styles.impactoNumero, { color: secondaryColor }]}>15+</Text>
            <Text style={[styles.impactoTexto, { color: textColor }]}>Projetos Realizados</Text>
          </View>
          
          <View style={[styles.impactoCard, { backgroundColor: primaryColor + '15' }]}>
            <Text style={[styles.impactoNumero, { color: primaryColor }]}>10+</Text>
            <Text style={[styles.impactoTexto, { color: textColor }]}>Parcerias Ativas</Text>
          </View>
          
          <View style={[styles.impactoCard, { backgroundColor: secondaryColor + '15' }]}>
            <Text style={[styles.impactoNumero, { color: secondaryColor }]}>100%</Text>
            <Text style={[styles.impactoTexto, { color: textColor }]}>Transparência</Text>
          </View>
        </View>
      </View>

      {/* COMO ATUAMOS */}
      <View style={[styles.section, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>⚙️ Como Atuamos</Text>
        
        <View style={styles.atuacaoContainer}>
          <View style={styles.atuacaoItem}>
            <View style={[styles.atuacaoIconContainer, { backgroundColor: primaryColor }]}>
              <Text style={styles.atuacaoIconText}>1</Text>
            </View>
            <View style={styles.atuacaoTextoContainer}>
              <Text style={[styles.atuacaoTitulo, { color: textColor }]}>Escutamos a Comunidade</Text>
              <Text style={[styles.atuacaoDescricao, { color: textColor }]}>
                Identificamos problemas e necessidades através do diálogo direto com os moradores
              </Text>
            </View>
          </View>

          <View style={styles.atuacaoItem}>
            <View style={[styles.atuacaoIconContainer, { backgroundColor: secondaryColor }]}>
              <Text style={styles.atuacaoIconText}>2</Text>
            </View>
            <View style={styles.atuacaoTextoContainer}>
              <Text style={[styles.atuacaoTitulo, { color: textColor }]}>Desenvolvemos Soluções</Text>
              <Text style={[styles.atuacaoDescricao, { color: textColor }]}>
                Criamos projetos e propostas concretas para resolver os problemas identificados
              </Text>
            </View>
          </View>

          <View style={styles.atuacaoItem}>
            <View style={[styles.atuacaoIconContainer, { backgroundColor: primaryColor }]}>
              <Text style={styles.atuacaoIconText}>3</Text>
            </View>
            <View style={styles.atuacaoTextoContainer}>
              <Text style={[styles.atuacaoTitulo, { color: textColor }]}>Mobilizamos Recursos</Text>
              <Text style={[styles.atuacaoDescricao, { color: textColor }]}>
                Buscamos parcerias e recursos necessários para implementar as soluções
              </Text>
            </View>
          </View>

          <View style={styles.atuacaoItem}>
            <View style={[styles.atuacaoIconContainer, { backgroundColor: secondaryColor }]}>
              <Text style={styles.atuacaoIconText}>4</Text>
            </View>
            <View style={styles.atuacaoTextoContainer}>
              <Text style={[styles.atuacaoTitulo, { color: textColor }]}>Executamos e Monitoramos</Text>
              <Text style={[styles.atuacaoDescricao, { color: textColor }]}>
                Colocamos os projetos em prática e acompanhamos os resultados
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* FAÇA PARTE */}
      <View style={[styles.section, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>🤝 Faça Parte da AMO</Text>
        <Text style={[styles.sectionText, { color: textColor }]}>
          A AMO é feita por pessoas como você, que acreditam que juntos podemos 
          construir uma Orlândia melhor para todos. Sua participação é fundamental!
        </Text>

        <View style={styles.participarContainer}>
          <TouchableOpacity 
            style={[styles.participarButton, { backgroundColor: '#25D366' }]}
            onPress={abrirWhatsApp}
          >
            <Text style={styles.participarButtonText}>📱 Fale Conosco no WhatsApp</Text>
          </TouchableOpacity>

          <View style={styles.contatoInfo}>
            <Text style={[styles.contatoTexto, { color: textColor }]}>
              📧 contato@amoorlandia.org.br
            </Text>
            <Text style={[styles.contatoTexto, { color: textColor }]}>
              📍 Av. Cinco, 48 A - Orlândia/SP
            </Text>
            <Text style={[styles.contatoTexto, { color: textColor }]}>
              📱 (16) 99173-7383
            </Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // HEADER
  headerSection: {
    padding: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 15,
    textAlign: 'center',
  },
  headerDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
  },

  // SEÇÕES
  section: {
    margin: 15,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },

  // PRINCÍPIOS
  principiosContainer: {
    marginTop: 10,
  },
  principioItem: {
    borderLeftWidth: 4,
    paddingLeft: 15,
    marginBottom: 20,
    paddingVertical: 10,
  },
  principioTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
    principioTexto: {
    fontSize: 14,
    lineHeight: 20,
  },

  // FINALIDADES
  finalidadesList: {
    marginTop: 10,
  },
  finalidadeItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  finalidadeIcon: {
    fontSize: 24,
    marginRight: 15,
    marginTop: 5,
  },
  finalidadeTexto: {
    flex: 1,
  },
  finalidadeTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  finalidadeDescricao: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },

  // IMPACTO
  impactoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  impactoCard: {
    width: '48%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  impactoNumero: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  impactoTexto: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },

  // COMO ATUAMOS
  atuacaoContainer: {
    marginTop: 10,
  },
  atuacaoItem: {
    flexDirection: 'row',
    marginBottom: 25,
    alignItems: 'flex-start',
  },
  atuacaoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  atuacaoIconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  atuacaoTextoContainer: {
    flex: 1,
  },
  atuacaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  atuacaoDescricao: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },

  // PARTICIPAR
  participarContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  participarButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  participarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contatoInfo: {
    alignItems: 'center',
  },
  contatoTexto: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default QuemSomosScreen;

