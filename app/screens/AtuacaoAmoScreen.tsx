import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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

interface DiretorMembro {
  nome: string;
  cargo: string;
  conselho: string;
  contato?: string;
}

interface Parceria {
  nome: string;
  logo?: any;
  descricao: string;
  site?: string;
}

interface Reuniao {
  data: string;
  titulo: string;
  resumo: string;
  ata?: string;
}

export function AtuacaoAmoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const primaryColor = '#F2C335';

  // 👥 DADOS DA DIRETORIA
  const diretoria: DiretorMembro[] = [
    // Conselho Administrativo
    {
      nome: 'Elter Gollino',
      cargo: 'Presidente',
      conselho: 'Conselho Administrativo',
      contato: '(16) 99173-7383'
    },
    {
      nome: 'Fernando Marcos Siqueira',
      cargo: 'Vice Presidente',
      conselho: 'Conselho Administrativo',
    },
    // Diretoria Administrativa
    {
      nome: 'Marcelo Oliveira Fernandes',
      cargo: 'Presidente',
      conselho: 'Diretoria Administrativa',
      contato: '(16) 99998-2105'
    },
    {
      nome: 'José Antonio da Silva',
      cargo: 'Vice Presidente',
      conselho: 'Diretoria Administrativa',
    },
    // Conselho de Ética
    {
      nome: 'Fernanda Cristina Lamonato Claro',
      cargo: 'Primeiro Membro',
      conselho: 'Conselho de Ética',
    },
    {
      nome: 'Sonia Maria Reis Silva',
      cargo: 'Segundo Membro',
      conselho: 'Conselho de Ética',
    },
    // Conselho Fiscal
    {
      nome: 'Jose Eugenio Alves Favaro',
      cargo: 'Primeiro Membro',
      conselho: 'Conselho Fiscal',
    },
    {
      nome: 'Jean Fernando Marques',
      cargo: 'Segundo Membro',
      conselho: 'Conselho Fiscal',
    }
  ];

  // 🤝 PARCERIAS
  const parcerias: Parceria[] = [
    {
      nome: 'MORLAN',
      descricao: 'Juntos por uma Orlândia sustentável',
      site: 'https://morlan.com.br'
    },
    {
      nome: 'UNIMED',
      descricao: 'Cuidando da saúde da nossa comunidade',
      site: 'https://www.unimedaltamogiana.com.br/'
    },
    {
      nome: 'INTELLI',
      descricao: 'Tecnologia a serviço da comunidade',
      site: 'https://www.intelli.com.br/'
    },
    {
      nome: 'OIMASA',
      descricao: 'Revendedora de maquinas agricolas',
      site: 'https://oimasa.com.br/',
    },
    {
      nome: 'Hotel São Marcos', 
      descricao: 'Hospedagem e eventos em Orlândia',
      site: 'https://hotelsaomarcos.com/'
    },
    {
      nome: 'Brejeiro',
      descricao: 'Produtos Alimentícios',
      site: 'https://brejeiro.com.br/'
    },
    {
      nome: 'ZAP',
      descricao: 'Montagens industriais e manutenção',
    }
  ];

  // 📋 REUNIÕES IMPORTANTES
  const reunioesImportantes: Reuniao[] = [
    {
      data: '15/01/2025',
      titulo: 'Planejamento Anual 2025',
      resumo: 'Discussão das metas e projetos prioritários para o novo ano, incluindo expansão da política de reserva de móveis.',
      ata: 'ata-2025-01'
    },
    {
      data: '10/04/2025',
      titulo: 'Balanço do Projeto Limpai',
      resumo: 'Apresentação dos resultados do projeto de conscientização ambiental e planejamento para 2025.',
      ata: 'ata-2024-12'
    },
    {
      data: '01/02/2025',
      titulo: 'Reunião sobre Descartes irregulares',
      resumo: 'Solicitação do ecoponto à prefeitura municipal e discussão sobre a criação de um sistema de denúncias.',
      ata: 'ata-2024-11'
    }
  ];

  // 🏢 FOTOS DA SEDE
  const fotosSede = [
    require('../../assets/images/sede.png'),
    require('../../assets/images/sede2.png'),
    require('../../assets/images/sede3.png'),
    require('../../assets/images/sede4.png'),
  ];

  const [fotoSelecionada, setFotoSelecionada] = useState(0);

  // 🔗 FUNÇÕES
  const abrirSite = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir site:', error);
    }
  };

  const abrirAta = (ata: string) => {
    console.log('Abrir ata:', ata);
    // TODO: Implementar abertura de PDF ou link
  };

  const abrirMapa = async () => {
    const endereco = 'Av. Cinco, 48 A, Orlândia, SP';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
    
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir mapa:', error);
    }
  };

  // 👥 RENDERIZAR MEMBRO DA DIRETORIA
  const renderMembro = (membro: DiretorMembro) => (
    <View key={`${membro.nome}-${membro.conselho}`} style={[styles.membroCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.membroInfo}>
        <Text style={[styles.membroNome, { color: theme.colors.text }]}>{membro.nome}</Text>
        <Text style={[styles.membroCargo, { color: primaryColor }]}>{membro.cargo}</Text>
        <Text style={[styles.membroConselho, { color: theme.colors.text }]}>{membro.conselho}</Text>
        {membro.contato && (
          <Text style={[styles.membroContato, { color: theme.colors.text }]}>📱 {membro.contato}</Text>
        )}
      </View>
    </View>
  );

  // 🤝 RENDERIZAR PARCERIA
  const renderParceria = (parceria: Parceria) => (
    <TouchableOpacity
      key={parceria.nome}
      style={[styles.parceriaCard, { backgroundColor: theme.colors.card }]}
      onPress={() => parceria.site && abrirSite(parceria.site)}
      disabled={!parceria.site}
    >
      <View style={styles.parceriaLogo}>
        {parceria.logo ? (
          <Image source={parceria.logo} style={styles.logoImage} />
        ) : (
          <View style={[styles.logoPlaceholder, { backgroundColor: primaryColor }]}>
            <Text style={styles.logoPlaceholderText}>
              {parceria.nome.substring(0, 2)}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.parceriaInfo}>
        <Text style={[styles.parceriaNome, { color: theme.colors.text }]}>{parceria.nome}</Text>
        <Text style={[styles.parceriaDescricao, { color: theme.colors.text }]}>{parceria.descricao}</Text>
        {parceria.site && (
          <Text style={[styles.parceriaSite, { color: primaryColor }]}>🌐 Visitar site</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* ✅ NOVO: STATUS BAR */}
      <StatusBar 
        barStyle={theme.isDark ? "light-content" : "light-content"}
        backgroundColor="#F2C335"
      />
      
      {/* ✅ NOVO: HEADER RESPONSIVO */}
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
        
        <Text style={styles.headerTitle}>💼 Atuação da AMO</Text>
        
        <View style={styles.headerSpacer} />
      </View>

      {/* ✅ SEU CONTEÚDO ORIGINAL */}
      <ScrollView style={styles.content}>
        {/* 🏢 HEADER COM FOTO DA SEDE */}
        <View style={styles.headerContainer}>
          <Image 
            source={fotosSede[fotoSelecionada]} 
            style={styles.headerImage}
          />
          <View style={styles.headerOverlay}>
            <Text style={styles.headerTitleText}>AMO Orlândia</Text>
            <Text style={styles.headerSubtitle}>Nossa Atuação na Comunidade</Text>
          </View>
        </View>

        {/* 📖 SOBRE A AMO */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: primaryColor }]}>Sobre a AMO</Text>
          <Text style={[styles.sectionText, { color: theme.colors.text }]}>
            A Associação de Moradores de Orlândia (AMO) foi fundada com o objetivo de representar 
            e defender os interesses da comunidade orlandina. Trabalhamos para 
            melhorar a qualidade de vida dos moradores através de projetos ambientais, 
            sociais e de infraestrutura urbana.
          </Text>
          <Text style={[styles.sectionText, { color: theme.colors.text }]}>
            Nossa missão é promover o desenvolvimento sustentável da cidade, 
            fortalecendo a participação cidadã e criando pontes entre a comunidade e o poder público.
          </Text>
        </View>

        {/* 👥 NOSSA DIRETORIA */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: primaryColor }]}>Nossa Diretoria</Text>
          
          {/* Conselho Administrativo */}
          <Text style={[styles.subSectionTitle, { color: theme.colors.text }]}>Conselho Administrativo</Text>
          {diretoria.filter(m => m.conselho === 'Conselho Administrativo').map(renderMembro)}
          
          {/* Diretoria Administrativa */}
          <Text style={[styles.subSectionTitle, { color: theme.colors.text }]}>Diretoria Administrativa</Text>
          {diretoria.filter(m => m.conselho === 'Diretoria Administrativa').map(renderMembro)}
          
          {/* Conselho de Ética */}
          <Text style={[styles.subSectionTitle, { color: theme.colors.text }]}>Conselho de Ética</Text>
          {diretoria.filter(m => m.conselho === 'Conselho de Ética').map(renderMembro)}
          
          {/* Conselho Fiscal */}
          <Text style={[styles.subSectionTitle, { color: theme.colors.text }]}>Conselho Fiscal</Text>
          {diretoria.filter(m => m.conselho === 'Conselho Fiscal').map(renderMembro)}
        </View>

        {/* 📋 REUNIÕES IMPORTANTES */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: primaryColor }]}>📋 Reuniões Importantes</Text>
          {reunioesImportantes.map((reuniao, index) => (
            <View key={index} style={[styles.reuniaoCard, { borderLeftColor: primaryColor }]}>
              <View style={styles.reuniaoHeader}>
                <Text style={[styles.reuniaoData, { color: primaryColor }]}>{reuniao.data}</Text>
                <Text style={[styles.reuniaoTitulo, { color: theme.colors.text }]}>{reuniao.titulo}</Text>
              </View>
              <Text style={[styles.reuniaoResumo, { color: theme.colors.text }]}>{reuniao.resumo}</Text>
              {reuniao.ata && (
                <TouchableOpacity onPress={() => abrirAta(reuniao.ata!)}>
                  <Text style={[styles.reuniaoAta, { color: primaryColor }]}>📄 Ver Ata Completa</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* 🤝 PARCERIAS */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: primaryColor }]}>🤝 Nossas Parcerias</Text>
          <Text style={[styles.sectionText, { color: theme.colors.text }]}>
            Trabalhamos em conjunto com empresas e organizações que compartilham 
            nossos valores de sustentabilidade e desenvolvimento comunitário.
          </Text>
          {parcerias.map(renderParceria)}
        </View>

                {/* 📷 GALERIA DA SEDE */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: primaryColor }]}>📷 Nossa Sede</Text>
          <Text style={[styles.sectionText, { color: theme.colors.text }]}>
            Conheça nossa sede localizada na Av. Cinco, 48 A - Orlândia/SP
          </Text>
          
          {/* Foto Principal */}
          <View style={styles.galeriaContainer}>
            <Image 
              source={fotosSede[fotoSelecionada]} 
              style={styles.fotoSede}
            />
            
            {/* Miniaturas */}
            <ScrollView horizontal style={styles.miniaturas} showsHorizontalScrollIndicator={false}>
              {fotosSede.map((foto, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setFotoSelecionada(index)}
                  style={[
                    styles.miniatura,
                    { borderColor: index === fotoSelecionada ? primaryColor : 'transparent' }
                  ]}
                >
                  <Image source={foto} style={styles.miniaturaImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Endereço */}
          <TouchableOpacity 
            style={[styles.enderecoButton, { backgroundColor: primaryColor }]}
            onPress={abrirMapa}
          >
            <Text style={styles.enderecoIcon}>📍</Text>
            <View style={styles.enderecoInfo}>
              <Text style={styles.enderecoTitulo}>Nossa Localização</Text>
              <Text style={styles.enderecoTexto}>Av. Cinco, 48 A - Orlândia/SP</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 🎯 ÁREAS DE ATUAÇÃO */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: primaryColor }]}>🎯 Áreas de Atuação</Text>
          
          <View style={styles.atuacaoGrid}>
            <View style={[styles.atuacaoItem, { backgroundColor: theme.colors.surface }]}>
              <Text style={styles.atuacaoIcon}>🌱</Text>
              <Text style={[styles.atuacaoTitulo, { color: theme.colors.text }]}>Meio Ambiente</Text>
              <Text style={[styles.atuacaoDescricao, { color: theme.colors.text }]}>
                Projetos de sustentabilidade e preservação ambiental
              </Text>
            </View>

            <View style={[styles.atuacaoItem, { backgroundColor: theme.colors.surface }]}>
              <Text style={styles.atuacaoIcon}>🏘️</Text>
              <Text style={[styles.atuacaoTitulo, { color: theme.colors.text }]}>Infraestrutura</Text>
              <Text style={[styles.atuacaoDescricao, { color: theme.colors.text }]}>
                Melhorias urbanas e qualidade de vida
              </Text>
            </View>

            <View style={[styles.atuacaoItem, { backgroundColor: theme.colors.surface }]}>
              <Text style={styles.atuacaoIcon}>👥</Text>
              <Text style={[styles.atuacaoTitulo, { color: theme.colors.text }]}>Social</Text>
              <Text style={[styles.atuacaoDescricao, { color: theme.colors.text }]}>
                Programas comunitários e assistência social
              </Text>
            </View>

            <View style={[styles.atuacaoItem, { backgroundColor: theme.colors.surface }]}>
              <Text style={styles.atuacaoIcon}>📚</Text>
              <Text style={[styles.atuacaoTitulo, { color: theme.colors.text }]}>Educação</Text>
              <Text style={[styles.atuacaoDescricao, { color: theme.colors.text }]}>
                Conscientização e capacitação da comunidade
              </Text>
            </View>
          </View>
        </View>

        {/* 🏆 CONQUISTAS */}
        <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.sectionTitle, { color: primaryColor }]}>🏆 Nossas Conquistas</Text>
          
          <View style={styles.conquistasList}>
            <View style={styles.conquistaItem}>
              <Text style={styles.conquistaIcon}>✅</Text>
              <Text style={[styles.conquistaTexto, { color: theme.colors.text }]}>
                Implementação da Política de Reserva de Móveis
              </Text>
            </View>

            <View style={styles.conquistaItem}>
              <Text style={styles.conquistaIcon}>✅</Text>
              <Text style={[styles.conquistaTexto, { color: theme.colors.text }]}>
                Criação do sistema de denúncias ambientais
              </Text>
            </View>

            <View style={styles.conquistaItem}>
              <Text style={styles.conquistaIcon}>✅</Text>
              <Text style={[styles.conquistaTexto, { color: theme.colors.text }]}>
                Parcerias estratégicas com empresas locais
              </Text>
            </View>

            <View style={styles.conquistaItem}>
              <Text style={styles.conquistaIcon}>✅</Text>
              <Text style={[styles.conquistaTexto, { color: theme.colors.text }]}>
                Desenvolvimento do aplicativo AMO Orlândia
              </Text>
            </View>

            <View style={styles.conquistaItem}>
              <Text style={styles.conquistaIcon}>✅</Text>
              <Text style={[styles.conquistaTexto, { color: theme.colors.text }]}>
                Organização de eventos comunitários
              </Text>
            </View>
          </View>
        </View>

        {/* 📞 COMO PARTICIPAR */}
        <View style={[styles.ctaSection, { 
          backgroundColor: theme.isDark ? '#1B4D3E' : '#E8F5E8',
          borderColor: '#39BF24'
        }]}>
          <Text style={[styles.ctaTitle, { color: '#39BF24' }]}>
            🤝 Como Participar da AMO?
          </Text>
          <Text style={[styles.ctaText, { color: theme.colors.text }]}>
            Faça parte da nossa comunidade! Você pode participar como associado, 
            voluntário ou apoiador dos nossos projetos.
          </Text>
          
          <View style={styles.ctaButtons}>
            <TouchableOpacity 
              style={[styles.ctaButton, { backgroundColor: '#9EBF26' }]}
              onPress={() => router.push('/associe-se' as any)}
            >
              <Text style={styles.ctaButtonText}>🤝 Associe-se</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.ctaButton, { backgroundColor: '#F2C335' }]}
              onPress={() => router.push('/contato' as any)}
            >
              <Text style={styles.ctaButtonText}>📞 Contato</Text>
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
  // HEADER CONTAINER
  headerContainer: {
    position: 'relative',
    height: 200,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  headerTitleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  // SECTION STYLES
  section: {
    margin: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    flexWrap: 'wrap',
    flexShrink: 1,
    alignSelf: 'center',
    maxWidth: '90%',
    minWidth: 0,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  // MEMBRO STYLES
  membroCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#F2C335',
  },
  membroInfo: {
    flex: 1,
  },
  membroNome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  membroCargo: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 3,
  },
  membroConselho: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 5,
  },
  membroContato: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  // REUNIÃO STYLES
  reuniaoCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    backgroundColor: 'rgba(242, 195, 53, 0.1)',
  },
  reuniaoHeader: {
    marginBottom: 10,
  },
  reuniaoData: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reuniaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reuniaoResumo: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  reuniaoAta: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  // PARCERIA STYLES
  parceriaCard: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  parceriaLogo: {
    marginRight: 15,
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  logoPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPlaceholderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  parceriaInfo: {
    flex: 1,
  },
  parceriaNome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  parceriaDescricao: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 5,
  },
  parceriaSite: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  // GALERIA STYLES
  galeriaContainer: {
    marginBottom: 15,
  },
  fotoSede: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  miniaturas: {
    flexDirection: 'row',
  },
  miniatura: {
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 8,
  },
  miniaturaImage: {
    width: 60,
    height: 45,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  // ENDEREÇO STYLES
  enderecoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
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
  },
  enderecoTexto: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  // ATUAÇÃO STYLES
  atuacaoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  atuacaoItem: {
    width: '48%',
  padding: 15,
  borderRadius: 10,
  marginBottom: 10,
  alignItems: 'center',
  },
  atuacaoIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
    atuacaoTitulo: {
    fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 8,
  textAlign: 'center',
  flexShrink: 1,
  flexWrap: 'wrap',
  minWidth: 0,
  },
  atuacaoDescricao: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  // CONQUISTAS STYLES
  conquistasList: {
    gap: 12,
  },
  conquistaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    flexWrap: 'nowrap', // ou remova, para manter inline
    gap: 10, // opcional
  },
  conquistaIcon: {
    fontSize: 18,
    marginRight: 12,
    marginTop: 2,
  },
  conquistaTexto: {
    fontSize: 16,
  flex: 1,
  lineHeight: 22,
  flexShrink: 1,       // Permite encolhimento do texto
  flexWrap: 'wrap',    // Garante quebra de linha natural
  minWidth: 0,         // Garante que ele não quebre com largura mínima forçada
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
    justifyContent: 'center',
    gap: 15,
  },
  ctaButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 140,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AtuacaoAmoScreen;


