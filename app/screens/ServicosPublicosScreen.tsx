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
  // ✅ NOVO SERVIÇO - RT ENERGIA (ID 0)
  {
    id: 0,
    nome: 'RT Energia',
    subtitulo: 'Iluminação Pública - Troca de Lâmpadas',
    icone: '💡',
    cor: '#F39C12',
    telefone: '(12) 99674-7869',
    horario: 'Atendimento no mesmo dia',
    descricao: 'A RT Energia é responsável pela manutenção da iluminação pública em Orlândia. Oferece serviço de troca de lâmpadas queimadas com atendimento rápido e eficiente.',
    servicos: [
      'Troca de lâmpadas de iluminação pública',
      'Reparo em postes de luz',
      'Manutenção preventiva',
      'Atendimento emergencial',
      'Serviço gratuito para o munícipe'
    ],
    comoAcessar: 'Ligue ou mande mensagem no WhatsApp informando o endereço exato onde a lâmpada está queimada. O atendimento é realizado no mesmo dia. Serviço totalmente gratuito para os moradores.',
    url: 'https://www.rtenergia.com.br/'
  },
  // ✅ TODOS OS 13 SERVIÇOS ORIGINAIS MANTIDOS
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
      'Dispensação de medicamentos básicos',
      'Medicamentos para hipertensão e diabetes',
      'Medicamentos pediátricos',
      'Contraceptivos',
      'Medicamentos para doenças crônicas',
      'Orientação farmacêutica'
    ],
    comoAcessar: 'Apresente receita médica válida, documento de identidade e comprovante de residência. Atendimento gratuito para munícipes de Orlândia. Horário estendido até 21h para maior comodidade.'
  },
  {
    id: 10,
    nome: 'Secretaria de Saúde',
    subtitulo: 'Saúde Municipal',
    icone: '🏥',
    cor: '#72BF24',
    endereco: 'Avenida 8, nº 364, Centro',
    telefone: '(16) 3820-8200',
    horario: 'Segunda a Sexta-feira das 08:00 às 17:00',
        responsavel: 'Dra. Fernanda Cristina Gomes Ramos (Secretária)',
    descricao: 'A Secretaria Municipal de Saúde é responsável por coordenar e executar as políticas de saúde pública no município, garantindo o acesso universal aos serviços de saúde através do Sistema Único de Saúde (SUS).',
    servicos: [
      'Coordenação das Unidades Básicas de Saúde',
      'Programas de prevenção e promoção da saúde',
      'Vigilância sanitária e epidemiológica',
      'Campanhas de vacinação',
      'Atendimento médico e odontológico',
      'Programas de saúde da família',
      'Controle de endemias'
    ],
    comoAcessar: 'Para atendimento médico, procure a UBS mais próxima de sua residência. Para informações gerais, entre em contato com a secretaria pelo telefone ou compareça ao endereço. Leve documento de identidade, CPF e comprovante de residência.'
  },
  {
    id: 11,
    nome: 'Secretaria de Obras',
    subtitulo: 'Obras e Serviços Municipais',
    icone: '🚧',
    cor: '#9EBF26',
    endereco: 'Avenida do Café, 1.040, Centro',
    telefone: '(16) 3820-8050',
    horario: 'Segunda a Sexta-feira das 08:00 às 17:00',
    responsavel: 'Eng. Civil Rodrigo Augusto Pinto (Secretário)',
    descricao: 'A Secretaria Municipal de Obras e Serviços é responsável pela execução, manutenção e fiscalização de obras públicas, infraestrutura urbana e serviços municipais essenciais.',
    servicos: [
      'Execução de obras públicas',
      'Manutenção de ruas e avenidas',
      'Limpeza urbana e coleta de lixo',
      'Manutenção de praças e jardins',
      'Serviços de capina e poda',
      'Fiscalização de obras particulares',
      'Emissão de alvarás de construção'
    ],
    comoAcessar: 'Entre em contato pelo telefone ou compareça ao endereço para solicitações de serviços urbanos, informações sobre obras públicas ou para questões relacionadas a alvarás e licenças. Leve documentos necessários conforme o tipo de solicitação.'
  },
  {
    id: 12,
    nome: 'Secretaria do Meio Ambiente',
    subtitulo: 'Meio Ambiente e Sustentabilidade',
    icone: '🌱',
    cor: '#27AE60',
    endereco: 'Avenida do Café, 1.040, Centro',
    telefone: '(16) 3820-8070',
    horario: 'Segunda a Sexta-feira das 08:00 às 17:00',
    responsavel: 'Bióloga Marina Rodrigues Silva (Secretária)',
    descricao: 'A Secretaria Municipal do Meio Ambiente é responsável por desenvolver e executar políticas ambientais, promover a sustentabilidade e fiscalizar o cumprimento da legislação ambiental no município.',
    servicos: [
      'Licenciamento ambiental',
      'Fiscalização ambiental',
      'Educação ambiental',
      'Gestão de áreas verdes',
      'Controle da poluição',
      'Programas de reciclagem',
      'Proteção da fauna e flora'
    ],
    comoAcessar: 'Entre em contato pelo telefone ou compareça ao endereço para questões relacionadas ao meio ambiente, licenças ambientais, denúncias de crimes ambientais ou participação em programas de educação ambiental.'
  },
  {
    id: 13,
    nome: 'Vigilância Sanitária',
    subtitulo: 'Vigilância em Saúde',
    icone: '🔍',
    cor: '#E74C3C',
    endereco: 'Avenida 8, nº 364, Centro',
    telefone: '(16) 3820-8220',
    horario: 'Segunda a Sexta-feira das 08:00 às 17:00',
    responsavel: 'Departamento de Vigilância em Saúde',
    descricao: 'A Vigilância Sanitária é responsável por fiscalizar e controlar os riscos à saúde pública, garantindo a qualidade de produtos, serviços e ambientes que possam afetar a saúde da população.',
    servicos: [
      'Fiscalização de estabelecimentos comerciais',
      'Controle sanitário de alimentos',
      'Licenciamento sanitário',
      'Vigilância epidemiológica',
      'Controle de vetores e pragas',
      'Fiscalização de farmácias e drogarias',
      'Inspeção de estabelecimentos de saúde'
    ],
    comoAcessar: 'Entre em contato pelo telefone para denúncias, solicitação de fiscalização ou informações sobre licenciamento sanitário. Para atendimento presencial, compareça ao endereço com documentos necessários conforme o tipo de solicitação.'
  },
  {
  id: 14,
  nome: 'Rede Protetiva',
  subtitulo: 'Proteção Social Especializada',
  icone: '🛡️',
  cor: '#8E44AD',
  endereco: 'Rua 6, nº 49, Centro',
  telefone: '(16) 3820-8011',
  horario: 'Segunda a Sexta-feira das 08:00 às 17:00',
  responsavel: 'Equipe Multidisciplinar',
  descricao: 'A Rede Protetiva oferece serviços especializados de proteção social para indivíduos e famílias em situação de risco pessoal e social, violação de direitos ou ameaça, com vínculos familiares e comunitários fragilizados ou rompidos.',
  servicos: [
    'Atendimento especializado a famílias e indivíduos',
    'Proteção a vítimas de violência doméstica',
    'Acompanhamento de casos de violação de direitos',
    'Orientação e apoio psicossocial',
    'Articulação com rede de proteção',
    'Medidas protetivas de urgência',
    'Acompanhamento de adolescentes em conflito com a lei'
  ],
  comoAcessar: 'O acesso pode ser feito através de encaminhamento do CRAS, Conselho Tutelar, Ministério Público ou procura espontânea. Atendimento especializado e sigiloso para situações de violação de direitos. Leve documentos pessoais e relate a situação.',
  isExternalLink: true,
  url: 'https://redeprotetivaorlandia.blogspot.com/' // OU O LINK CORRETO
}

];


  const abrirDetalhes = (servico: Servico) => {
    setServicoSelecionado(servico);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setServicoSelecionado(null);
  };

  const fazerLigacao = async (telefone: string) => {
    const numeroLimpo = telefone.replace(/\D/g, '');
    const url = `tel:+55${numeroLimpo}`;
    
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Erro ao fazer ligação:', error);
    }
  };

  const abrirWhatsApp = async (telefone: string, nome: string) => {
    const numeroLimpo = telefone.replace(/\D/g, '');
    const mensagem = `Olá! Preciso de informações sobre ${nome}.`;
    const url = `whatsapp://send?phone=55${numeroLimpo}&text=${encodeURIComponent(mensagem)}`;
    
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        const webUrl = `https://wa.me/55${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      console.error('Erro ao abrir WhatsApp:', error);
    }
  };

  const abrirSite = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir site:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar 
        barStyle={theme.isDark ? "light-content" : "light-content"}
        backgroundColor="#39BF24"
      />
      
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
        <View style={[styles.headerCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.headerSubtitle, { color: theme.colors.text }]}>
            Encontre aqui os principais serviços públicos de Orlândia com informações de contato e funcionamento.
          </Text>
        </View>

        {servicos.map((servico) => (
          <TouchableOpacity
            key={servico.id}
            style={[styles.servicoCard, { backgroundColor: theme.colors.card }]}
            onPress={() => abrirDetalhes(servico)}
            activeOpacity={0.7}
          >
            <View style={[styles.servicoHeader, { backgroundColor: servico.cor }]}>
              <Text style={styles.servicoIcone}>{servico.icone}</Text>
              <View style={styles.servicoInfo}>
                <Text style={styles.servicoNome}>{servico.nome}</Text>
                <Text style={styles.servicoSubtitulo}>{servico.subtitulo}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
            </View>
            
            <View style={styles.servicoContent}>
              {servico.telefone && (
                <Text style={[styles.servicoDetalhe, { color: theme.colors.text }]}>
                  📞 {servico.telefone}
                </Text>
              )}
              {servico.endereco && (
                <Text style={[styles.servicoDetalhe, { color: theme.colors.text }]}>
                  📍 {servico.endereco}
                </Text>
              )}
              {servico.horario && (
                <Text style={[styles.servicoDetalhe, { color: theme.colors.text }]}>
                  🕐 {servico.horario}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>

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
                <View style={[styles.modalHeader, { backgroundColor: servicoSelecionado.cor }]}>
                  <Text style={styles.modalIcone}>{servicoSelecionado.icone}</Text>
                  <View style={styles.modalHeaderText}>
                    <Text style={styles.modalTitulo}>{servicoSelecionado.nome}</Text>
                    <Text style={styles.modalSubtitulo}>{servicoSelecionado.subtitulo}</Text>
                  </View>
                  <TouchableOpacity onPress={fecharModal} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalBody}>
                  <Text style={[styles.modalDescricao, { color: theme.colors.text }]}>
                    {servicoSelecionado.descricao}
                  </Text>

                  {servicoSelecionado.endereco && (
                    <View style={styles.modalSection}>
                      <Text style={[styles.modalSectionTitle, { color: servicoSelecionado.cor }]}>
                        📍 Endereço
                      </Text>
                      <Text style={[styles.modalSectionText, { color: theme.colors.text }]}>
                        {servicoSelecionado.endereco}
                      </Text>
                    </View>
                  )}

                  {servicoSelecionado.telefone && (
                    <View style={styles.modalSection}>
                      <Text style={[styles.modalSectionTitle, { color: servicoSelecionado.cor }]}>
                        📞 Telefone
                      </Text>
                      <Text style={[styles.modalSectionText, { color: theme.colors.text }]}>
                        {servicoSelecionado.telefone}
                      </Text>
                    </View>
                  )}

                  {servicoSelecionado.horario && (
                    <View style={styles.modalSection}>
                      <Text style={[styles.modalSectionTitle, { color: servicoSelecionado.cor }]}>
                        🕐 Horário de Funcionamento
                      </Text>
                      <Text style={[styles.modalSectionText, { color: theme.colors.text }]}>
                        {servicoSelecionado.horario}
                      </Text>
                    </View>
                  )}

                  {servicoSelecionado.responsavel && (
                    <View style={styles.modalSection}>
                      <Text style={[styles.modalSectionTitle, { color: servicoSelecionado.cor }]}>
                        👤 Responsável
                      </Text>
                      <Text style={[styles.modalSectionText, { color: theme.colors.text }]}>
                        {servicoSelecionado.responsavel}
                      </Text>
                    </View>
                  )}

                  {servicoSelecionado.servicos && (
                    <View style={styles.modalSection}>
                      <Text style={[styles.modalSectionTitle, { color: servicoSelecionado.cor }]}>
                        🔧 Serviços Oferecidos
                      </Text>
                      {servicoSelecionado.servicos.map((servico, index) => (
                        <Text key={index} style={[styles.modalListItem, { color: theme.colors.text }]}>
                          • {servico}
                        </Text>
                      ))}
                    </View>
                  )}

                  {servicoSelecionado.comoAcessar && (
                    <View style={styles.modalSection}>
                      <Text style={[styles.modalSectionTitle, { color: servicoSelecionado.cor }]}>
                        ℹ️ Como Acessar
                      </Text>
                      <Text style={[styles.modalSectionText, { color: theme.colors.text }]}>
                        {servicoSelecionado.comoAcessar}
                      </Text>
                    </View>
                  )}
                </ScrollView>

                <View style={styles.modalActions}>
                  {servicoSelecionado.telefone && (
                    <>
                      <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: '#27AE60' }]}
                        onPress={() => fazerLigacao(servicoSelecionado.telefone!)}
                      >
                        <Ionicons name="call" size={20} color="#FFFFFF" />
                        <Text style={styles.actionButtonText}>Ligar</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: '#25D366' }]}
                        onPress={() => abrirWhatsApp(servicoSelecionado.telefone!, servicoSelecionado.nome)}
                      >
                        <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
                        <Text style={styles.actionButtonText}>WhatsApp</Text>
                      </TouchableOpacity>
                    </>
                  )}

                  {servicoSelecionado.url && (
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: servicoSelecionado.cor }]}
                      onPress={() => abrirSite(servicoSelecionado.url!)}
                    >
                      <Ionicons name="globe" size={20} color="#FFFFFF" />
                      <Text style={styles.actionButtonText}>Site</Text>
                    </TouchableOpacity>
                  )}
                </View>
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
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  servicoCard: {
    borderRadius: 15,
    marginBottom: 15,
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
  servicoInfo: {
    flex: 1,
  },
  servicoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  servicoSubtitulo: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  servicoContent: {
    padding: 15,
  },
  servicoDetalhe: {
    fontSize: 14,
    marginBottom: 5,
    opacity: 0.8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 20,
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
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  modalSubtitulo: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  closeButton: {
    padding: 8,
  },
  modalBody: {
    padding: 20,
    maxHeight: 400,
  },
  modalDescricao: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'justify',
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSectionText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
  modalListItem: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 5,
    paddingLeft: 10,
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default ServicosPublicosScreen;

