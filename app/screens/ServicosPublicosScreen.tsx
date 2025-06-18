import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Linking,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

interface Servico {
  id: number;
  nome: string;
  subtitulo: string;
  icone: string;
  cor: string;
  endereco?: string;
  telefone?: string;
  horario?: string;
  responsavel?: string;
  descricao: string;
  servicos?: string[];
  comoAcessar?: string;
  isExternalLink?: boolean;
  url?: string;
}

export function ServicosPublicosScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null);

  const servicos: Servico[] = [
    {
      id: 1,
      nome: 'CRAS',
      subtitulo: 'Centro de Referência de Assistência Social',
      icone: '🏢',
      cor: '#39BF24',
      endereco: 'Rua 6 nº 49, Centro',
      telefone: '(16) 99316-2959',
      horario: '08:00H às 17:00H',
      responsavel: 'Juliana da Silva Amaral Baldo (Coordenadora)',
      descricao: 'O CRAS Maria Eunice Segatto – Orlândia é o órgão responsável pela organização e oferta dos serviços socioassistenciais da Proteção Social Básica do Sistema Único de Assistência Social (SUAS) nas áreas de vulnerabilidade e risco social.\n\nDestina-se à população em situação de vulnerabilidade social decorrente da pobreza, privação e/ou fragilização de vínculos afetivos – relacionais e de pertencimento social (discriminações etárias, étnicas, de gênero ou por deficiências, dentre outras).',
      servicos: [
        'Serviços de Proteção Social Básica',
        'Atendimento a famílias em vulnerabilidade social',
        'Programas de transferência de renda',
        'Atividades comunitárias e grupos de convivência',
        'Orientação e encaminhamentos sociais'
      ],
      comoAcessar: 'Procure o CRAS diretamente no endereço ou entre em contato pelo telefone para agendar atendimento. O atendimento é gratuito e destinado a famílias em situação de vulnerabilidade social.'
    },
    {
      id: 2,
      nome: 'Centro Odontológico',
      subtitulo: 'Centro Odontológico "Genuíno Nogueira"',
      icone: '🦷',
      cor: '#72BF24',
      endereco: 'Av. F, 924 – Jardim Boa Vista',
      telefone: '(16) 3820-8210 / (16) 3820-8212',
      horario: 'Das 7:00h às 17:00h',
      descricao: 'O Centro Odontológico "Genuíno Nogueira" oferece atendimento odontológico gratuito para a população de Orlândia, promovendo saúde bucal e prevenção de doenças dentárias.',
      servicos: [
        'Consultas odontológicas',
        'Limpeza dental',
        'Tratamento de cáries',
        'Extrações dentárias',
        'Procedimentos preventivos',
        'Orientações de higiene bucal'
      ],
      comoAcessar: 'Entre em contato pelos telefones disponíveis para agendar sua consulta. O atendimento é gratuito para munícipes de Orlândia. Leve documento de identidade e comprovante de residência.'
    },
    {
      id: 3,
      nome: 'Conselho Tutelar',
      subtitulo: 'Proteção dos direitos da criança e adolescente',
      icone: '👶',
      cor: '#9EBF26',
      endereco: 'Rua 1, número 15 - Centro',
      telefone: '(16) 3820-8201',
      horario: 'Segunda a Sexta-feira das 08:00 às 17:00',
      descricao: 'O Conselho Tutelar é um órgão permanente e autônomo, não jurisdicional, encarregado pela sociedade de zelar pelo cumprimento dos direitos da criança e do adolescente. Atua na proteção integral de crianças e adolescentes em situação de risco ou vulnerabilidade.',
      servicos: [
        'Atendimento a crianças e adolescentes em situação de risco',
        'Aplicação de medidas de proteção',
        'Orientação a pais e responsáveis',
        'Encaminhamentos para programas sociais',
        'Fiscalização de entidades de atendimento',
        'Representação junto ao Ministério Público'
      ],
      comoAcessar: 'O atendimento pode ser feito diretamente no endereço ou pelo telefone. Em casos de emergência envolvendo crianças e adolescentes, o Conselho Tutelar deve ser acionado imediatamente. Leve documentos da criança/adolescente e responsáveis.'
    },
    {
      id: 4,
      nome: 'Secretaria de Cultura',
      subtitulo: 'Desenvolvimento cultural do município',
      icone: '🎭',
      cor: '#F2C335',
      endereco: 'Avenida 3, nº 151, Centro',
      telefone: '(16) 3820-8153',
      horario: 'Segunda a Sexta-feira das 08:00 às 17:00',
      responsavel: 'Josimara Ribeiro de Mendonça (Secretária)',
      descricao: 'A Secretaria Municipal de Cultura é responsável por promover, desenvolver e apoiar as atividades culturais no município de Orlândia, valorizando a cultura local e proporcionando acesso à arte e cultura para toda a população.',
      servicos: [
        'Organização de eventos culturais',
        'Apoio a artistas e grupos culturais locais',
        'Gestão de espaços culturais municipais',
        'Oficinas e cursos de arte e cultura',
        'Festivais e apresentações artísticas',
        'Preservação do patrimônio cultural local'
      ],
      comoAcessar: 'Procure a secretaria no endereço indicado ou entre em contato pelo telefone para informações sobre eventos, inscrições em oficinas ou apoio a projetos culturais. Atendimento gratuito para munícipes.'
    },
    {
      id: 5,
      nome: 'Desenvolvimento e Assistência Social',
      subtitulo: 'Secretaria Municipal',
      icone: '🤝',
      cor: '#39BF24',
      endereco: 'Rua 1, nº 15, Centro',
      telefone: '(16) 3820-8011',
      horario: 'Segunda a Sexta-feira das 08:00 às 17:00',
      responsavel: 'Laura Maria Benine (Secretária)',
      descricao: 'A Secretaria Municipal de Desenvolvimento e Assistência Social é responsável por planejar, coordenar e executar políticas públicas de assistência social, promovendo o desenvolvimento social e a proteção às famílias em situação de vulnerabilidade.',
      servicos: [
        'Coordenação de programas sociais municipais',
        'Gestão de benefícios sociais',
        'Atendimento a famílias em vulnerabilidade',
        'Programas de geração de renda',
        'Articulação com entidades assistenciais',
        'Desenvolvimento de políticas sociais'
      ],
      comoAcessar: 'Procure a secretaria no endereço indicado ou entre em contato pelo telefone para informações sobre programas sociais, benefícios e atendimentos. Leve documentos pessoais e comprovante de residência.'
    },
    {
      id: 6,
      nome: 'Desenvolvimento Econômico e Turismo',
      subtitulo: 'Secretaria Municipal',
      icone: '🏪',
      cor: '#72BF24',
      endereco: 'Avenida do Café, 1.040, Centro',
      telefone: '(16) 3820-8063',
      horario: 'Segunda a Sexta-feira das 08:00 às 16:30',
      responsavel: 'Nelson Dias Leite Neto (Secretário)',
      descricao: 'A Secretaria Municipal de Desenvolvimento Econômico e Turismo tem como objetivo fomentar o crescimento econômico local, atrair investimentos, apoiar empreendedores e desenvolver o potencial turístico de Orlândia.',
      servicos: [
        'Apoio a micro e pequenas empresas',
        'Orientação para abertura de negócios',
        'Programas de capacitação empresarial',
        'Desenvolvimento de projetos turísticos',
        'Atração de investimentos',
        'Fomento ao empreendedorismo local'
      ],
      comoAcessar: 'Entre em contato pelo telefone, e-mail (desenvolvimentoeconomico@orlandia.sp.gov.br) ou compareça ao endereço para orientações sobre abertura de empresas, programas de apoio ao empreendedor e informações turísticas.'
    },
    {
      id: 7,
      nome: 'Secretaria de Educação',
      subtitulo: 'Educação Municipal',
      icone: '📚',
      cor: '#9EBF26',
      endereco: 'Rua 3, nº 565, Centro',
      telefone: '(16) 3820-8160',
      horario: 'Segunda a Sexta-feira das 08:00 às 17:00',
      responsavel: 'Dileia Ribeiro de Oliveira Filtre (Responsável)',
      descricao: 'A Secretaria Municipal de Educação é responsável por planejar, coordenar e executar as políticas educacionais do município, garantindo o acesso à educação de qualidade para todos os munícipes de Orlândia.',
      servicos: [
        'Gestão das escolas municipais',
        'Matrículas na rede municipal de ensino',
        'Programas de alimentação escolar',
        'Transporte escolar',
        'Formação continuada de professores',
        'Educação de Jovens e Adultos (EJA)',
        'Educação Infantil e Ensino Fundamental'
      ],
      comoAcessar: 'Entre em contato pelo telefone, e-mail (educacao@orlandia.sp.gov.br) ou compareça ao endereço para informações sobre matrículas, transferências, documentação escolar e programas educacionais. Leve documentos pessoais e comprovante de residência.'
    },
    {
      id: 8,
      nome: 'Secretaria de Esporte e Lazer',
      subtitulo: 'Esporte e Lazer Municipal',
      icone: '⚽',
      cor: '#F2C335',
      endereco: 'Rua 10 s/n, Jardim Boa Vista - Praça Homero Vieira',
      telefone: '(16) 3820-8175',
      horario: 'Segunda a Sexta-feira das 08:00 às 17:00',
      responsavel: 'Jober Lemos Nogueira (Secretário)',
      descricao: 'A Secretaria Municipal de Esporte e Lazer promove atividades esportivas e de lazer para toda a população, incentivando a prática esportiva, o bem-estar e a qualidade de vida dos munícipes.',
      servicos: [
        'Organização de campeonatos e torneios',
        'Escolinhas esportivas para crianças e adolescentes',
        'Atividades físicas para terceira idade',
        'Gestão de equipamentos esportivos municipais',
        'Eventos esportivos e recreativos',
        'Programas de incentivo ao esporte',
        'Atividades de lazer comunitário'
      ],
      comoAcessar: 'Procure a secretaria no endereço indicado ou entre em contato pelo telefone para informações sobre inscrições em atividades esportivas, uso de equipamentos públicos e participação em eventos. Atendimento gratuito para munícipes.'
    },
    {
      id: 9,
      nome: 'Farmácia Central',
      subtitulo: 'Farmácia Municipal Central "Boliver Berti"',
      icone: '💊',
      cor: '#39BF24',
      endereco: 'Avenida 8, 364 – Centro',
      telefone: '(16) 3820-8213',
      horario: 'Das 8:00h às 21:00h',
      descricao: 'A Farmácia Municipal Central "Boliver Berti" oferece medicamentos gratuitos para a população de Orlândia, garantindo o acesso a tratamentos essenciais e medicamentos básicos do SUS.',
      servicos: [
        'Dispensação de medicamentos do SUS',
        'Medicamentos para tratamentos crônicos',
        'Medicamentos básicos e essenciais',
        'Orientação farmacêutica',
        'Controle de medicamentos especiais',
        'Atendimento a receitas médicas do SUS'
      ],
            comoAcessar: 'Compareça à farmácia com receita médica válida, documento de identidade e cartão SUS. O atendimento é gratuito para munícipes de Orlândia. Horário estendido até 21h para maior comodidade da população.'
    },
    {
      id: 10,
      nome: 'Secretaria de Finanças',
      subtitulo: 'Finanças e Tributação Municipal',
      icone: '💰',
      cor: '#72BF24',
      endereco: 'Avenida do Café, 1.040, Centro',
      telefone: '(16) 3820-8020',
      horario: 'Segunda a Sexta-feira das 08:00 às 16:30',
      responsavel: 'Marcelo Henrique Pinto (Secretário)',
      descricao: 'A Secretaria Municipal de Finanças é responsável pela gestão financeira do município, arrecadação de tributos, controle orçamentário e atendimento ao contribuinte para questões fiscais e tributárias.',
      servicos: [
        'Emissão de certidões negativas',
        'Parcelamento de débitos municipais',
        'Cadastro de contribuintes',
        'Orientação tributária',
        'Emissão de guias de pagamento',
        'Atendimento ao contribuinte',
        'Regularização fiscal'
      ],
      comoAcessar: 'Entre em contato pelo telefone, e-mail (financas@orlandia.sp.gov.br) ou compareça ao endereço para questões relacionadas a impostos municipais, certidões, parcelamentos e orientações fiscais. Leve documentos pessoais e comprovantes.'
    },
    {
      id: 11,
      nome: 'Secretaria de Governo',
      subtitulo: 'Coordenação Governamental',
      icone: '🏛️',
      cor: '#9EBF26',
      endereco: 'Avenida do Café, 1.040, Centro',
      telefone: '(16) 3820-8001',
      horario: 'Segunda a Sexta-feira das 08:00 às 16:30',
      responsavel: 'Luiz Carlos Pereira (Secretário)',
      descricao: 'A Secretaria Municipal de Governo coordena as ações governamentais, articula políticas públicas entre as secretarias e mantém o relacionamento institucional com outros órgãos e entidades.',
      servicos: [
        'Coordenação de políticas públicas',
        'Articulação intersetorial',
        'Relacionamento institucional',
        'Apoio às demais secretarias',
        'Gestão de convênios e parcerias',
        'Comunicação governamental'
      ],
      comoAcessar: 'Entre em contato pelo telefone ou compareça ao endereço para questões relacionadas a políticas públicas, parcerias institucionais e articulação governamental.'
    },
    {
      id: 12,
      nome: 'Secretaria de Habitação',
      subtitulo: 'Habitação e Desenvolvimento Urbano',
      icone: '🏠',
      cor: '#F2C335',
      endereco: 'Avenida do Café, 1.040, Centro',
      telefone: '(16) 3820-8050',
      horario: 'Segunda a Sexta-feira das 08:00 às 16:30',
      responsavel: 'Marcos Roberto Pereira (Secretário)',
      descricao: 'A Secretaria Municipal de Habitação desenvolve políticas habitacionais, programas de moradia popular e projetos de desenvolvimento urbano para garantir o direito à moradia digna.',
      servicos: [
        'Programas habitacionais municipais',
        'Cadastro para habitação popular',
        'Regularização fundiária',
        'Projetos de desenvolvimento urbano',
        'Orientação sobre programas federais de habitação',
        'Acompanhamento de obras habitacionais'
      ],
      comoAcessar: 'Procure a secretaria no endereço indicado ou entre em contato pelo telefone para informações sobre programas habitacionais, inscrições e orientações. Leve documentos pessoais, comprovante de renda e residência.'
    },
    {
      id: 13,
      nome: 'Portal da Transparência',
      subtitulo: 'Transparência Pública Municipal',
      icone: '🔍',
      cor: '#39BF24',
      descricao: 'O Portal da Transparência de Orlândia disponibiliza informações sobre gastos públicos, licitações, contratos, folha de pagamento e demais dados da administração municipal, garantindo transparência e controle social.',
      servicos: [
        'Consulta a gastos públicos',
        'Informações sobre licitações',
        'Contratos e convênios',
        'Folha de pagamento dos servidores',
        'Receitas municipais',
        'Relatórios de gestão',
        'Lei de Acesso à Informação'
      ],
      comoAcessar: 'Acesse o portal através do site oficial da Prefeitura de Orlândia. Todas as informações estão disponíveis 24 horas por dia, gratuitamente.',
      isExternalLink: true,
      url: 'https://www.orlandia.sp.gov.br/transparencia'
    }
  ];

  const abrirModal = (servico: Servico) => {
    setServicoSelecionado(servico);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setServicoSelecionado(null);
  };

  const abrirLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir link:', error);
    }
  };

  const ligarTelefone = async (telefone: string) => {
    const numeroLimpo = telefone.replace(/\D/g, '');
    const url = `tel:+55${numeroLimpo}`;
    
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao ligar:', error);
    }
  };

  const renderServico = (servico: Servico) => (
    <TouchableOpacity
      key={servico.id}
      style={[styles.servicoCard, { backgroundColor: theme.colors.card }]}
      onPress={() => servico.isExternalLink && servico.url ? abrirLink(servico.url) : abrirModal(servico)}
      activeOpacity={0.7}
    >
      <View style={[styles.servicoHeader, { backgroundColor: servico.cor }]}>
        <Text style={styles.servicoIcone}>{servico.icone}</Text>
        <View style={styles.servicoHeaderText}>
          <Text style={styles.servicoNome}>{servico.nome}</Text>
          <Text style={styles.servicoSubtitulo}>{servico.subtitulo}</Text>
        </View>
        {servico.isExternalLink && (
          <Ionicons name="open-outline" size={20} color="#fff" />
        )}
      </View>

      <View style={styles.servicoContent}>
        {servico.endereco && (
          <Text style={[styles.servicoInfo, { color: theme.colors.text }]}>
            📍 {servico.endereco}
          </Text>
        )}
        
        {servico.telefone && (
          <Text style={[styles.servicoInfo, { color: theme.colors.text }]}>
            📞 {servico.telefone}
          </Text>
        )}
        
        {servico.horario && (
          <Text style={[styles.servicoInfo, { color: theme.colors.text }]}>
            ⏰ {servico.horario}
          </Text>
        )}

        <Text style={[styles.servicoDescricao, { color: theme.colors.text }]} numberOfLines={3}>
          {servico.descricao}
        </Text>

        <View style={styles.verMaisContainer}>
          <Text style={[styles.verMaisText, { color: servico.cor }]}>
            {servico.isExternalLink ? 'Acessar Portal →' : 'Ver detalhes →'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
        
        <Text style={styles.headerTitle}>🏥 Serviços Públicos</Text>
        
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        {/* HEADER CARD */}
        <View style={[styles.headerCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.title, { color: '#39BF24' }]}>Serviços Públicos</Text>
          <Text style={[styles.description, { color: theme.colors.text }]}>
            Encontre informações sobre os principais serviços públicos disponíveis em Orlândia. 
            Clique em cada serviço para ver detalhes completos.
          </Text>
        </View>

        {/* LISTA DE SERVIÇOS */}
        <View style={styles.servicosList}>
          {servicos.map(renderServico)}
        </View>

        {/* INFORMAÇÕES GERAIS */}
        <View style={[styles.infoCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.infoTitle, { color: '#F2C335' }]}>ℹ️ Informações Gerais</Text>
          <Text style={[styles.infoText, { color: theme.colors.text }]}>
            • Todos os serviços são gratuitos para munícipes de Orlândia
          </Text>
          <Text style={[styles.infoText, { color: theme.colors.text }]}>
            • Leve sempre documento de identidade e comprovante de residência
          </Text>
          <Text style={[styles.infoText, { color: theme.colors.text }]}>
            • Para emergências médicas, ligue 192 (SAMU) ou 193 (Bombeiros)
          </Text>
          <Text style={[styles.infoText, { color: theme.colors.text }]}>
            • Para emergências policiais, ligue 190 (Polícia Militar)
          </Text>
        </View>

        {/* CONTATO PREFEITURA */}
        <View style={[styles.contatoCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.contatoTitle, { color: '#39BF24' }]}>📞 Contato Geral da Prefeitura</Text>
          
          <TouchableOpacity 
            style={[styles.contatoButton, { backgroundColor: '#3498DB' }]}
            onPress={() => ligarTelefone('1638263600')}
          >
            <Text style={styles.contatoIcon}>📞</Text>
            <View style={styles.contatoInfo}>
              <Text style={styles.contatoButtonTitle}>Telefone Principal</Text>
              <Text style={styles.contatoButtonSubtitle}>(16) 3826-3600</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.contatoButton, { backgroundColor: '#E67E22' }]}
            onPress={() => abrirLink('mailto:faleconosco@orlandia.sp.gov.br')}
          >
            <Text style={styles.contatoIcon}>📧</Text>
            <View style={styles.contatoInfo}>
              <Text style={styles.contatoButtonTitle}>Email Oficial</Text>
              <Text style={styles.contatoButtonSubtitle}>faleconosco@orlandia.sp.gov.br</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.contatoButton, { backgroundColor: '#E4405F' }]}
            onPress={() => abrirLink('https://www.instagram.com/prefeituramunicipalorlandia/')}
          >
            <Text style={styles.contatoIcon}>📷</Text>
            <View style={styles.contatoInfo}>
              <Text style={styles.contatoButtonTitle}>Instagram Oficial</Text>
              <Text style={styles.contatoButtonSubtitle}>@prefeituramunicipalorlandia</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ESPAÇAMENTO FINAL */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* MODAL DE DETALHES */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            {servicoSelecionado && (
              <>
                {/* HEADER DO MODAL */}
                <View style={[styles.modalHeader, { backgroundColor: servicoSelecionado.cor }]}>
                  <Text style={styles.modalIcone}>{servicoSelecionado.icone}</Text>
                  <View style={styles.modalHeaderText}>
                    <Text style={styles.modalNome}>{servicoSelecionado.nome}</Text>
                    <Text style={styles.modalSubtitulo}>{servicoSelecionado.subtitulo}</Text>
                  </View>
                  <TouchableOpacity onPress={fecharModal} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalBody}>
                  {/* INFORMAÇÕES BÁSICAS */}
                  <View style={styles.modalSection}>
                    <Text style={[styles.modalSectionTitle, { color: servicoSelecionado.cor }]}>
                      📋 Informações Básicas
                    </Text>
                    
                    {servicoSelecionado.endereco && (
                      <View style={styles.modalInfoItem}>
                                                <Text style={styles.modalInfoIcon}>📍</Text>
                        <Text style={[styles.modalInfoText, { color: theme.colors.text }]}>
                          {servicoSelecionado.endereco}
                        </Text>
                      </View>
                    )}
                    
                    {servicoSelecionado.telefone && (
                      <TouchableOpacity 
                        style={styles.modalInfoItem}
                        onPress={() => ligarTelefone(servicoSelecionado.telefone!)}
                      >
                        <Text style={styles.modalInfoIcon}>📞</Text>
                        <Text style={[styles.modalInfoText, { color: servicoSelecionado.cor }]}>
                          {servicoSelecionado.telefone}
                        </Text>
                      </TouchableOpacity>
                    )}
                    
                    {servicoSelecionado.horario && (
                      <View style={styles.modalInfoItem}>
                        <Text style={styles.modalInfoIcon}>⏰</Text>
                        <Text style={[styles.modalInfoText, { color: theme.colors.text }]}>
                          {servicoSelecionado.horario}
                        </Text>
                      </View>
                    )}
                    
                    {servicoSelecionado.responsavel && (
                      <View style={styles.modalInfoItem}>
                        <Text style={styles.modalInfoIcon}>👤</Text>
                        <Text style={[styles.modalInfoText, { color: theme.colors.text }]}>
                          {servicoSelecionado.responsavel}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* DESCRIÇÃO */}
                  <View style={styles.modalSection}>
                    <Text style={[styles.modalSectionTitle, { color: servicoSelecionado.cor }]}>
                      📖 Descrição
                    </Text>
                    <Text style={[styles.modalDescricao, { color: theme.colors.text }]}>
                      {servicoSelecionado.descricao}
                    </Text>
                  </View>

                  {/* SERVIÇOS OFERECIDOS */}
                  {servicoSelecionado.servicos && (
                    <View style={styles.modalSection}>
                      <Text style={[styles.modalSectionTitle, { color: servicoSelecionado.cor }]}>
                        🔧 Serviços Oferecidos
                      </Text>
                      {servicoSelecionado.servicos.map((servico, index) => (
                        <View key={index} style={styles.servicoItem}>
                          <Text style={styles.servicoItemBullet}>•</Text>
                          <Text style={[styles.servicoItemText, { color: theme.colors.text }]}>
                            {servico}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* COMO ACESSAR */}
                  {servicoSelecionado.comoAcessar && (
                    <View style={styles.modalSection}>
                      <Text style={[styles.modalSectionTitle, { color: servicoSelecionado.cor }]}>
                        🚪 Como Acessar
                      </Text>
                      <Text style={[styles.modalDescricao, { color: theme.colors.text }]}>
                        {servicoSelecionado.comoAcessar}
                      </Text>
                    </View>
                  )}

                  {/* BOTÕES DE AÇÃO */}
                  <View style={styles.modalActions}>
                    {servicoSelecionado.telefone && (
                      <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: servicoSelecionado.cor }]}
                        onPress={() => ligarTelefone(servicoSelecionado.telefone!)}
                      >
                        <Text style={styles.actionButtonText}>📞 Ligar</Text>
                      </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: '#6c757d' }]}
                      onPress={fecharModal}
                    >
                      <Text style={styles.actionButtonText}>✖️ Fechar</Text>
                    </TouchableOpacity>
                  </View>

                  {/* ESPAÇAMENTO FINAL DO MODAL */}
                  <View style={{ height: 20 }} />
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  // HEADER CARD
  headerCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  // SERVIÇOS LIST
  servicosList: {
    gap: 15,
  },
  servicoCard: {
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  servicoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  servicoIcone: {
    fontSize: 28,
    marginRight: 15,
  },
  servicoHeaderText: {
    flex: 1,
  },
  servicoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  servicoSubtitulo: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  servicoContent: {
    padding: 15,
  },
  servicoInfo: {
    fontSize: 14,
    marginBottom: 5,
    opacity: 0.8,
  },
  servicoDescricao: {
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 10,
  },
  verMaisContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  verMaisText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  // INFO CARD
  infoCard: {
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  // CONTATO CARD
  contatoCard: {
    padding: 20,
    borderRadius: 15,
    marginTop: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contatoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  contatoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  contatoIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  contatoInfo: {
    flex: 1,
  },
  contatoButtonTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  contatoButtonSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '90%',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  modalIcone: {
    fontSize: 32,
    marginRight: 15,
  },
  modalHeaderText: {
    flex: 1,
  },
  modalNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalSubtitulo: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    padding: 20,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInfoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  modalInfoIcon: {
    fontSize: 16,
    marginRight: 10,
    marginTop: 2,
  },
  modalInfoText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  modalDescricao: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'justify',
  },
  servicoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  servicoItemBullet: {
    fontSize: 16,
    marginRight: 10,
    marginTop: 2,
    color: '#39BF24',
  },
  servicoItemText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ServicosPublicosScreen;

