import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

interface TimelineMomento {
  ano: string;
  titulo: string;
  descricao: string;
  icone: string;
}

interface Valor {
  titulo: string;
  descricao: string;
  icone: string;
  cor: string;
}

export function QuemSomosScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  // 📅 TIMELINE DA AMO
  const timeline: TimelineMomento[] = [
    {
      ano: '2020',
      titulo: 'Fundação da AMO',
      descricao: 'A Associação de Moradores de Orlândia foi oficialmente fundada com o objetivo de representar e defender os interesses da comunidade orlandina.',
      icone: '🏛️'
    },
    {
      ano: '2021',
      titulo: 'Primeiros Projetos',
      descricao: 'Início dos primeiros projetos sociais e ambientais, focando na melhoria da qualidade de vida dos moradores.',
      icone: '🌱'
    },
    {
      ano: '2022',
      titulo: 'Parcerias Estratégicas',
      descricao: 'Estabelecimento de parcerias com empresas locais como MORLAN, UNIMED e INTELLI para ampliar o alcance dos projetos.',
      icone: '🤝'
    },
    {
      ano: '2023',
      titulo: 'Política de Reserva',
      descricao: 'Implementação da Política de Reserva de Móveis, revolucionando o descarte sustentável na cidade.',
      icone: '🪑'
    },
    {
      ano: '2024',
      titulo: 'Projeto Limpai',
      descricao: 'Lançamento do Projeto Limpai, grande iniciativa de conscientização ambiental e limpeza urbana.',
      icone: '🧹'
    },
        {
      ano: '2025',
      titulo: 'App AMO Orlândia',
      descricao: 'Lançamento do aplicativo oficial AMO Orlândia, facilitando o acesso aos serviços e fortalecendo a comunicação com a comunidade.',
      icone: '📱'
    }
  ];

  // 💎 VALORES DA AMO
  const valores: Valor[] = [
    {
      titulo: 'Transparência',
      descricao: 'Mantemos total transparência em nossas ações e prestação de contas à comunidade.',
      icone: '🔍',
      cor: '#39BF24'
    },
    {
      titulo: 'Sustentabilidade',
      descricao: 'Promovemos práticas sustentáveis e consciência ambiental em todos os nossos projetos.',
      icone: '🌱',
      cor: '#72BF24'
    },
    {
      titulo: 'Participação',
      descricao: 'Incentivamos a participação ativa da comunidade nas decisões e ações da associação.',
      icone: '👥',
      cor: '#9EBF26'
    },
    {
      titulo: 'Inovação',
      descricao: 'Buscamos soluções inovadoras para os desafios urbanos e sociais de Orlândia.',
      icone: '💡',
      cor: '#F2C335'
    }
  ];

  const abrirWhatsApp = async () => {
    const numero = '5516991737383';
    const mensagem = 'Olá! Gostaria de saber mais sobre a AMO Orlândia.';
    const url = `whatsapp://send?phone=${numero}&text=${encodeURIComponent(mensagem)}`;
    
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir WhatsApp:', error);
    }
  };

  const abrirInstagram = async () => {
    const url = 'https://www.instagram.com/amo.orlandia/';
    
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir Instagram:', error);
    }
  };

  const abrirMapa = async () => {
    const endereco = 'Av. Cinco, 48 A, Orlândia, SP';
    const url = `https://maps.google.com/?q=${encodeURIComponent(endereco)}`;
    
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir mapa:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* STATUS BAR */}
      <StatusBar 
        barStyle={theme.isDark ? "light-content" : "light-content"}
        backgroundColor="#39BF24"
      />
      
      {/* HEADER RESPONSIVO */}
      <View style={[
        styles.header, 
        { 
          paddingTop: insets.top + 10,
          backgroundColor: '#39BF24'
        }
      ]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>👥 Quem Somos</Text>
        
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        {/* HEADER PRINCIPAL */}
        <View style={styles.heroSection}>
          <Image 
            source={require('../../assets/images/logo.jpg')}
            style={styles.logoHero}
          />
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>
            AMO Orlândia
          </Text>
          <Text style={[styles.heroSubtitle, { color: theme.colors.text }]}>
            Associação de Moradores de Orlândia
          </Text>
          <Text style={[styles.heroDescription, { color: theme.colors.text }]}>
            Trabalhando juntos por uma Orlândia melhor desde 2020
          </Text>
        </View>

        {/* NOSSA MISSÃO */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: '#39BF24' }]}> Nossa Missão</Text>
          <Text style={[styles.sectionText, { color: theme.colors.text }]}>
            A AMO Orlândia tem como missão representar e defender os interesses da comunidade orlandina, 
            promovendo o desenvolvimento sustentável, a qualidade de vida e o bem-estar social através 
            de projetos inovadores e participação cidadã ativa.
          </Text>
        </View>

        {/* NOSSA VISÃO */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: '#72BF24' }]}> Nossa Visão</Text>
          <Text style={[styles.sectionText, { color: theme.colors.text }]}>
            Ser reconhecida como a principal associação de moradores de Orlândia, referência em 
            transparência, inovação e efetividade na promoção de melhorias urbanas e sociais, 
            contribuindo para fazer de Orlândia uma cidade modelo em qualidade de vida.
          </Text>
        </View>

        {/* NOSSOS VALORES */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: '#9EBF26' }]}> Nossos Valores</Text>
          
          <View style={styles.valoresGrid}>
            {valores.map((valor, index) => (
              <View key={index} style={[styles.valorCard, { backgroundColor: theme.colors.surface }]}>
                <View style={[styles.valorIconContainer, { backgroundColor: valor.cor }]}>
                  <Text style={styles.valorIcon}>{valor.icone}</Text>
                </View>
                <Text style={[styles.valorTitulo, { color: valor.cor }]}>{valor.titulo}</Text>
                <Text style={[styles.valorDescricao, { color: theme.colors.text }]}>
                  {valor.descricao}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* NOSSA HISTÓRIA - TIMELINE */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: '#F2C335' }]}>📅 Nossa História</Text>
          
          <View style={styles.timeline}>
            {timeline.map((momento, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View style={[styles.timelineIconContainer, { backgroundColor: '#F2C335' }]}>
                    <Text style={styles.timelineIcon}>{momento.icone}</Text>
                  </View>
                  <Text style={[styles.timelineAno, { color: '#F2C335' }]}>{momento.ano}</Text>
                </View>
                
                <View style={styles.timelineRight}>
                  <Text style={[styles.timelineTitulo, { color: theme.colors.text }]}>
                    {momento.titulo}
                  </Text>
                  <Text style={[styles.timelineDescricao, { color: theme.colors.text }]}>
                    {momento.descricao}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* NOSSOS NÚMEROS */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: '#39BF24' }]}>📊 Nossos Números</Text>
          
          <View style={styles.numerosGrid}>
            <View style={[styles.numeroCard, { backgroundColor: theme.colors.surface }]}>
              <Text style={styles.numeroValor}>5+</Text>
              <Text style={[styles.numeroLabel, { color: theme.colors.text }]}>Anos de Atuação</Text>
            </View>
            
            <View style={[styles.numeroCard, { backgroundColor: theme.colors.surface }]}>
              <Text style={styles.numeroValor}>1000+</Text>
              <Text style={[styles.numeroLabel, { color: theme.colors.text }]}>Famílias Atendidas</Text>
            </View>
            
            <View style={[styles.numeroCard, { backgroundColor: theme.colors.surface }]}>
              <Text style={styles.numeroValor}>50+</Text>
              <Text style={[styles.numeroLabel, { color: theme.colors.text }]}>Projetos Realizados</Text>
            </View>
            
            <View style={[styles.numeroCard, { backgroundColor: theme.colors.surface }]}>
              <Text style={styles.numeroValor}>3</Text>
              <Text style={[styles.numeroLabel, { color: theme.colors.text }]}>Parcerias Estratégicas</Text>
            </View>
          </View>
        </View>

        {/* NOSSO COMPROMISSO */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: '#72BF24' }]}>🤝 Nosso Compromisso</Text>
          
          <View style={styles.compromissosList}>
            <View style={styles.compromissoItem}>
              <Text style={styles.compromissoIcon}>✅</Text>
              <Text style={[styles.compromissoTexto, { color: theme.colors.text }]}>
                Transparência total em todas as nossas ações e prestação de contas
              </Text>
            </View>
            
            <View style={styles.compromissoItem}>
              <Text style={styles.compromissoIcon}>✅</Text>
              <Text style={[styles.compromissoTexto, { color: theme.colors.text }]}>
                Participação democrática da comunidade nas decisões importantes
              </Text>
            </View>
            
        
            
            <View style={styles.compromissoItem}>
              <Text style={styles.compromissoIcon}>✅</Text>
              <Text style={[styles.compromissoTexto, { color: theme.colors.text }]}>
                Inovação constante na busca por soluções eficazes
              </Text>
            </View>
            
            <View style={styles.compromissoItem}>
              <Text style={styles.compromissoIcon}>✅</Text>
              <Text style={[styles.compromissoTexto, { color: theme.colors.text }]}>
                Inclusão social e atenção às famílias em vulnerabilidade
              </Text>
            </View>
          </View>
        </View>

        {/* ONDE ESTAMOS */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: '#F2C335' }]}>📍 Onde Estamos</Text>
          
          <TouchableOpacity 
            style={[styles.enderecoButton, { backgroundColor: '#39BF24' }]}
            onPress={abrirMapa}
          >
            <Text style={styles.enderecoIcon}>📍</Text>
            <View style={styles.enderecoInfo}>
              <Text style={styles.enderecoTitulo}>Nossa Sede</Text>
              <Text style={styles.enderecoTexto}>Av. Cinco, 48 A - Orlândia/SP</Text>
              <Text style={styles.enderecoSubtexto}>Toque para abrir no mapa</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.contatoInfo}>
            <View style={styles.contatoItem}>
              <Text style={styles.contatoIcon}>📱</Text>
              <Text style={[styles.contatoTexto, { color: theme.colors.text }]}>
                WhatsApp: (16) 99173-7383
              </Text>
            </View>
            
            <View style={styles.contatoItem}>
              <Text style={styles.contatoIcon}>📷</Text>
              <Text style={[styles.contatoTexto, { color: theme.colors.text }]}>
                Instagram: @amo.orlandia
              </Text>
            </View>
          </View>
        </View>

        {/* CALL TO ACTION */}
        <View style={[styles.ctaSection, { 
          backgroundColor: theme.isDark ? '#1B4D3E' : '#E8F5E8',
          borderColor: '#39BF24'
        }]}>
          <Text style={[styles.ctaTitle, { color: '#39BF24' }]}>
            🌟 Faça Parte da Nossa História!
          </Text>
          <Text style={[styles.ctaText, { color: theme.colors.text }]}>
            A AMO Orlândia é feita por pessoas como você, que acreditam em uma cidade melhor. 
            Junte-se a nós e ajude a construir o futuro de Orlândia!
          </Text>
          
          <View style={styles.ctaButtons}>
            <TouchableOpacity 
              style={[styles.ctaButton, { backgroundColor: '#9EBF26' }]}
              onPress={() => router.push('/associe-se')}
            >
              <Text style={styles.ctaButtonText}>🤝 Associe-se</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.ctaButton, { backgroundColor: '#25D366' }]}
              onPress={abrirWhatsApp}
            >
              <Text style={styles.ctaButtonText}>💬 WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.ctaButton, { backgroundColor: '#E4405F' }]}
              onPress={abrirInstagram}
            >
              <Text style={styles.ctaButtonText}>📷 Instagram</Text>
            </TouchableOpacity>
          </View>
        </View>

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
  // HEADER STYLES
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
    padding: 15,
  },
  // HERO SECTION
  heroSection: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  logoHero: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#39BF24',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
    opacity: 0.8,
  },
  heroDescription: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.7,
  },
  // SECTION STYLES
  section: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  // VALORES GRID
  valoresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  valorCard: {
    flex: 1,
    minWidth: '45%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  valorIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  valorIcon: {
    fontSize: 24,
  },
  valorTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  valorDescricao: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  // TIMELINE STYLES
  timeline: {
    gap: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 15,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 80,
  },
  timelineIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineIcon: {
    fontSize: 24,
  },
  timelineAno: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  timelineRight: {
    flex: 1,
    paddingTop: 5,
  },
  timelineTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timelineDescricao: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  // NÚMEROS GRID
  numerosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  numeroCard: {
    flex: 1,
    minWidth: '45%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  numeroValor: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#39BF24',
    marginBottom: 5,
  },
  numeroLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  // COMPROMISSOS LIST
  compromissosList: {
    gap: 12,
  },
  compromissoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  compromissoIcon: {
    fontSize: 18,
    marginRight: 12,
    marginTop: 2,
  },
  compromissoTexto: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  // ENDEREÇO STYLES
  enderecoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  enderecoIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  enderecoInfo: {
    flex: 1,
  },
  enderecoTitulo: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  enderecoTexto: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 2,
  },
  enderecoSubtexto: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  contatoInfo: {
    gap: 10,
  },
  contatoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contatoIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  contatoTexto: {
    fontSize: 16,
  },
  // CTA STYLES
  ctaSection: {
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
    marginBottom: 15,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  ctaButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  ctaButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default QuemSomosScreen;

