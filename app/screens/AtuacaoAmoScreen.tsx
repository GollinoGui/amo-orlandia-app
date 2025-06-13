import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface DiretorMembro {
  nome: string;
  cargo: string;
  conselho: string;
  foto?: any; // ✅ MUDANÇA: any para aceitar require()
  contato?: string;
}

interface Parceria {
  nome: string;
  logo?: any; // ✅ MUDANÇA: any para aceitar require()
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
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = '#F2C335';

  // 👥 DADOS DA DIRETORIA - ✅ CORRIGIDO COM PLACEHOLDERS
  const diretoria: DiretorMembro[] = [
    // Conselho Administrativo
    {
      nome: 'Elter Gollino',
      cargo: 'Presidente',
      conselho: 'Conselho Administrativo',
      // foto: require('../../assets/images/diretoria/elter.jpg'), // ✅ COMENTADO até ter a foto
      contato: '(16) 99173-7383' // ✅ NÚMERO REAL DA AMO
    },
    {
      nome: 'Fernando Marcos Siqueira',
      cargo: 'Vice Presidente',
      conselho: 'Conselho Administrativo',
      // foto: require('../../assets/images/diretoria/fernando.jpg'),
    },
    // Diretoria Administrativa
    {
      nome: 'Marcelo Oliveira Fernandes',
      cargo: 'Presidente',
      conselho: 'Diretoria Administrativa',
      // foto: require('../../assets/images/diretoria/marcelo.jpg'),
    },
    {
      nome: 'José Antonio da Silva',
      cargo: 'Vice Presidente',
      conselho: 'Diretoria Administrativa',
      // foto: require('../../assets/images/diretoria/jose-antonio.jpg'),
    },
    // Conselho de Ética
    {
      nome: 'Fernanda Cristina Lamonato Claro',
      cargo: 'Primeiro Membro',
      conselho: 'Conselho de Ética',
      // foto: require('../../assets/images/diretoria/fernanda.jpg'),
    },
    {
      nome: 'Sonia Maria Reis Silva',
      cargo: 'Segundo Membro',
      conselho: 'Conselho de Ética',
      // foto: require('../../assets/images/diretoria/sonia.jpg'),
    },
    // Conselho Fiscal
    {
      nome: 'Jose Eugenio Alves Favaro',
      cargo: 'Primeiro Membro',
      conselho: 'Conselho Fiscal',
      // foto: require('../../assets/images/diretoria/jose-eugenio.jpg'),
    },
    {
      nome: 'Jean Fernando Marques',
      cargo: 'Segundo Membro',
      conselho: 'Conselho Fiscal',
      // foto: require('../../assets/images/diretoria/jean.jpg'),
    }
  ];

  // 🤝 PARCERIAS - ✅ CORRIGIDO COM PLACEHOLDERS
  const parcerias: Parceria[] = [
    {
      nome: 'MORLAN',
      // logo: require('../../assets/images/parceiros/morlan.png'), // ✅ COMENTADO
      descricao: 'Juntos por uma Orlândia sustentável',
      site: 'https://morlan.com.br'
    },
    {
      nome: 'UNIMED',
      // logo: require('../../assets/images/parceiros/unimed.png'), // ✅ COMENTADO
      descricao: 'Cuidando da saúde da nossa comunidade',
      site: 'https://unimed.com.br'
    },
    {
      nome: 'INTELLITEM',
      // logo: require('../../assets/images/parceiros/intellitem.png'), // ✅ COMENTADO
      descricao: 'Tecnologia a serviço da comunidade',
      site: 'https://intellitem.com.br'
    },
    {
      nome: 'Parceiro em Potencial 1',
      descricao: 'Espaço disponível para nova parceria',
    },
    {
      nome: 'Parceiro em Potencial 2', 
      descricao: 'Espaço disponível para nova parceria',
    }
  ];

  // 📋 REUNIÕES IMPORTANTES - ✅ DADOS REALISTAS
  const reunioesImportantes: Reuniao[] = [
    {
      data: '15/01/2025',
      titulo: 'Planejamento Anual 2025',
      resumo: 'Discussão das metas e projetos prioritários para o novo ano, incluindo expansão da política de reserva de móveis.',
      ata: 'ata-2025-01'
    },
    {
      data: '20/12/2024',
      titulo: 'Balanço do Projeto Limpai',
      resumo: 'Apresentação dos resultados do projeto de conscientização ambiental e planejamento para 2025.',
      ata: 'ata-2024-12'
    },
    {
      data: '10/11/2024',
      titulo: 'Novas Parcerias Estratégicas',
      resumo: 'Formalização de parcerias com empresas locais para ampliar os serviços oferecidos à comunidade.',
      ata: 'ata-2024-11'
    }
  ];

  // 🏢 FOTOS DA SEDE - ✅ USANDO LOGO COMO PLACEHOLDER
  const fotosSede = [
    require('../../assets/images/logo.jpg'), // ✅ PLACEHOLDER
    require('../../assets/images/logo.jpg'), // ✅ PLACEHOLDER
    require('../../assets/images/logo.jpg'), // ✅ PLACEHOLDER
    require('../../assets/images/logo.jpg'), // ✅ PLACEHOLDER
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
    // ✅ IMPLEMENTAÇÃO FUTURA - Por enquanto só log
    console.log('Abrir ata:', ata);
    // TODO: Implementar abertura de PDF ou link
  };

  // ✅ FUNÇÃO PARA ABRIR GOOGLE MAPS
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
    <View key={`${membro.nome}-${membro.conselho}`} style={[styles.membroCard, { backgroundColor: cardColor }]}>
      <View style={styles.membroFoto}>
        {membro.foto ? (
          <Image source={membro.foto} style={styles.fotoImage} />
        ) : (
          <View style={[styles.fotoPlaceholder, { backgroundColor: primaryColor }]}>
            <Text style={styles.fotoPlaceholderText}>
              {membro.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.membroInfo}>
        <Text style={[styles.membroNome, { color: textColor }]}>{membro.nome}</Text>
        <Text style={[styles.membroCargo, { color: primaryColor }]}>{membro.cargo}</Text>
        <Text style={[styles.membroConselho, { color: textColor }]}>{membro.conselho}</Text>
        {membro.contato && (
          <Text style={[styles.membroContato, { color: textColor }]}>📱 {membro.contato}</Text>
        )}
      </View>
    </View>
  );

  // 🤝 RENDERIZAR PARCERIA
  const renderParceria = (parceria: Parceria) => (
    <TouchableOpacity
      key={parceria.nome}
      style={[styles.parceriaCard, { backgroundColor: cardColor }]}
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
        <Text style={[styles.parceriaNome, { color: textColor }]}>{parceria.nome}</Text>
        <Text style={[styles.parceriaDescricao, { color: textColor }]}>{parceria.descricao}</Text>
        {parceria.site && (
          <Text style={[styles.parceriaSite, { color: primaryColor }]}>🌐 Visitar site</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* 🏢 HEADER COM FOTO DA SEDE */}
      <View style={styles.headerContainer}>
        <Image 
          source={fotosSede[fotoSelecionada]} 
          style={styles.headerImage}
        />
        <View style={styles.headerOverlay}>
          <Text style={styles.headerTitle}>AMO Orlândia</Text>
          <Text style={styles.headerSubtitle}>Nossa Atuação na Comunidade</Text>
        </View>
      </View>

      {/* 📖 SOBRE A AMO */}
      <View style={[styles.section, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>🏛️ Sobre a AMO</Text>
        <Text style={[styles.sectionText, { color: textColor }]}>
          A Associação de Moradores de Orlândia (AMO) foi fundada com o objetivo de representar 
          e defender os interesses da comunidade orlandina. Trabalhamos incansavelmente para 
          melhorar a qualidade de vida dos moradores através de projetos ambientais, 
          sociais e de infraestrutura urbana.
        </Text>
        <Text style={[styles.sectionText, { color: textColor }]}>
          Nossa missão é promover o desenvolvimento sustentável da cidade, 
          fortalecendo a participação cidadã e criando pontes entre a comunidade e o poder público.
        </Text>
      </View>

      {/* 👥 NOSSA DIRETORIA */}
      <View style={[styles.section, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>👥 Nossa Diretoria</Text>
        
        {/* Conselho Administrativo */}
        <Text style={[styles.subSectionTitle, { color: textColor }]}>Conselho Administrativo</Text>
        {diretoria.filter(m => m.conselho === 'Conselho Administrativo').map(renderMembro)}
        
        {/* Diretoria Administrativa */}
        <Text style={[styles.subSectionTitle, { color: textColor }]}>Diretoria Administrativa</Text>
        {diretoria.filter(m => m.conselho === 'Diretoria Administrativa').map(renderMembro)}
        
        {/* Conselho de Ética */}
        <Text style={[styles.subSectionTitle, { color: textColor }]}>Conselho de Ética</Text>
        {diretoria.filter(m => m.conselho === 'Conselho de Ética').map(renderMembro)}
        
        {/* Conselho Fiscal */}
        <Text style={[styles.subSectionTitle, { color: textColor }]}>Conselho Fiscal</Text>
        {diretoria.filter(m => m.conselho === 'Conselho Fiscal').map(renderMembro)}
      </View>

      {/* 📋 REUNIÕES IMPORTANTES */}
      <View style={[styles.section, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>📋 Reuniões Importantes</Text>
        {reunioesImportantes.map((reuniao, index) => (
          <View key={index} style={[styles.reuniaoCard, { borderLeftColor: primaryColor }]}>
            <View style={styles.reuniaoHeader}>
              <Text style={[styles.reuniaoData, { color: primaryColor }]}>{reuniao.data}</Text>
              <Text style={[styles.reuniaoTitulo, { color: textColor }]}>{reuniao.titulo}</Text>
            </View>
            <Text style={[styles.reuniaoResumo, { color: textColor }]}>{reuniao.resumo}</Text>
            {reuniao.ata && (
              <TouchableOpacity onPress={() => abrirAta(reuniao.ata!)}>
                                <Text style={[styles.reuniaoAta, { color: primaryColor }]}>📄 Ver Ata Completa</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      {/* 🤝 PARCERIAS */}
      <View style={[styles.section, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>🤝 Nossas Parcerias</Text>
        <Text style={[styles.sectionText, { color: textColor }]}>
          Trabalhamos em conjunto com empresas e organizações que compartilham 
          nossos valores de sustentabilidade e desenvolvimento comunitário.
        </Text>
        {parcerias.map(renderParceria)}
      </View>

      {/* 📷 GALERIA DA SEDE */}
      <View style={[styles.section, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>📷 Nossa Sede</Text>
        <Text style={[styles.sectionText, { color: textColor }]}>
          Conheça nossa sede localizada na Av. Cinco, 48 A - Orlândia/SP
        </Text>
        <View style={styles.galeriaContainer}>
          <Image 
            source={fotosSede[fotoSelecionada]} 
            style={styles.galeriaImagemPrincipal}
          />
          <ScrollView horizontal style={styles.galeriaThumbnails} showsHorizontalScrollIndicator={false}>
            {fotosSede.map((foto, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setFotoSelecionada(index)}
                style={[
                  styles.thumbnail,
                  fotoSelecionada === index && { borderColor: primaryColor, borderWidth: 3 }
                ]}
              >
                <Image 
                  source={foto} 
                  style={styles.thumbnailImage}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* 📍 NOSSA LOCALIZAÇÃO */}
      <View style={[styles.section, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>📍 Nossa Localização</Text>
        <View style={styles.localizacaoContainer}>
          <View style={styles.enderecoInfo}>
            <Text style={[styles.enderecoTexto, { color: textColor }]}>
              📍 Av. Cinco, 48 A - Orlândia/SP
            </Text>
            <Text style={[styles.enderecoTexto, { color: textColor }]}>
              📱 (16) 99173-7383
            </Text>
            <Text style={[styles.enderecoTexto, { color: textColor }]}>
              📧 contato@amoorlandia.org.br
            </Text>
            <Text style={[styles.enderecoTexto, { color: textColor }]}>
              📷 @amo.orlandia
            </Text>
          </View>
          
          {/* ✅ MAPA CLICÁVEL */}
          <TouchableOpacity 
            style={[styles.mapaPlaceholder, { backgroundColor: primaryColor + '20' }]}
            onPress={abrirMapa}
            activeOpacity={0.7}
          >
            <Text style={[styles.mapaTexto, { color: primaryColor }]}>
              🗺️ Ver no Google Maps
            </Text>
            <Text style={[styles.mapaSubTexto, { color: textColor }]}>
              Toque para abrir a localização
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 📞 COMO PARTICIPAR */}
      <View style={[styles.section, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>🤝 Como Participar</Text>
        <View style={styles.participarContainer}>
          <View style={styles.participarItem}>
            <Text style={styles.participarIcon}>👥</Text>
            <View style={styles.participarTexto}>
              <Text style={[styles.participarTitulo, { color: textColor }]}>Reuniões Mensais</Text>
              <Text style={[styles.participarDescricao, { color: textColor }]}>
                Participe das reuniões ordinárias toda primeira segunda-feira do mês às 19h30
              </Text>
            </View>
          </View>
          
          <View style={styles.participarItem}>
            <Text style={styles.participarIcon}>📝</Text>
            <View style={styles.participarTexto}>
              <Text style={[styles.participarTitulo, { color: textColor }]}>Associe-se</Text>
              <Text style={[styles.participarDescricao, { color: textColor }]}>
                Torne-se um associado e tenha voz ativa nas decisões da comunidade
              </Text>
            </View>
          </View>
          
          <View style={styles.participarItem}>
            <Text style={styles.participarIcon}>🌱</Text>
            <View style={styles.participarTexto}>
              <Text style={[styles.participarTitulo, { color: textColor }]}>Projetos Ambientais</Text>
              <Text style={[styles.participarDescricao, { color: textColor }]}>
                Participe do Projeto Limpai e outras iniciativas de sustentabilidade
              </Text>
            </View>
          </View>

          <View style={styles.participarItem}>
            <Text style={styles.participarIcon}>📱</Text>
            <View style={styles.participarTexto}>
              <Text style={[styles.participarTitulo, { color: textColor }]}>Redes Sociais</Text>
              <Text style={[styles.participarDescricao, { color: textColor }]}>
                Siga-nos no Instagram @amo.orlandia e WhatsApp (16) 99173-7383
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* 📊 ESTATÍSTICAS SIMPLES */}
      <View style={[styles.section, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: primaryColor }]}>📊 Nosso Impacto</Text>
        <View style={styles.estatisticasContainer}>
          <View style={[styles.estatisticaItem, { borderColor: primaryColor }]}>
            <Text style={[styles.estatisticaNumero, { color: primaryColor }]}>500+</Text>
            <Text style={[styles.estatisticaTexto, { color: textColor }]}>Famílias Atendidas</Text>
          </View>
          
          <View style={[styles.estatisticaItem, { borderColor: primaryColor }]}>
            <Text style={[styles.estatisticaNumero, { color: primaryColor }]}>50+</Text>
            <Text style={[styles.estatisticaTexto, { color: textColor }]}>Móveis Redistribuídos</Text>
          </View>
          
          <View style={[styles.estatisticaItem, { borderColor: primaryColor }]}>
            <Text style={[styles.estatisticaNumero, { color: primaryColor }]}>10+</Text>
            <Text style={[styles.estatisticaTexto, { color: textColor }]}>Projetos Realizados</Text>
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
  
  // 🏢 HEADER
  headerContainer: {
    height: 250,
    position: 'relative',
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },

  // 📖 SEÇÕES
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
    marginBottom: 10,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15,
  },

  // 👥 MEMBROS DA DIRETORIA
  membroCard: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  membroFoto: {
    marginRight: 15,
  },
  fotoImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  fotoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fotoPlaceholderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  membroInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  membroNome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  membroCargo: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  membroConselho: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 5,
  },
  membroContato: {
    fontSize: 12,
    opacity: 0.7,
  },

  // 📋 REUNIÕES
  reuniaoCard: {
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    backgroundColor: 'rgba(242, 195, 53, 0.1)',
    borderRadius: 8,
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
    fontWeight: '600',
  },
  reuniaoResumo: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  reuniaoAta: {
    fontSize: 14,
    fontWeight: '500',
  },

  // 🤝 PARCERIAS
  parceriaCard: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 1,
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
    resizeMode: 'contain',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  parceriaInfo: {
    flex: 1,
    justifyContent: 'center',
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
    fontWeight: '500',
  },

  // 📷 GALERIA
  galeriaContainer: {
    marginTop: 10,
  },
  galeriaImagemPrincipal: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  galeriaThumbnails: {
    flexDirection: 'row',
  },
  thumbnail: {
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },

  // 📍 LOCALIZAÇÃO
  localizacaoContainer: {
    marginTop: 10,
  },
  enderecoInfo: {
    marginBottom: 20,
  },
  enderecoTexto: {
    fontSize: 16,
    marginBottom: 8,
  },
  mapaPlaceholder: {
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  mapaTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mapaSubTexto: {
    fontSize: 14,
    opacity: 0.8,
  },

  // 🤝 COMO PARTICIPAR
  participarContainer: {
    marginTop: 10,
  },
  participarItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  participarIcon: {
    fontSize: 24,
    marginRight: 15,
    marginTop: 5,
  },
  participarTexto: {
    flex: 1,
  },
    participarTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  participarDescricao: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },

  // 📊 ESTATÍSTICAS
  estatisticasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  estatisticaItem: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'rgba(242, 195, 53, 0.1)',
  },
  estatisticaNumero: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  estatisticaTexto: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default AtuacaoAmoScreen;

