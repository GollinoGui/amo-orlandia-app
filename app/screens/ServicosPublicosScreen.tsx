import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

export default function ServicosPublicosScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  
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
      comoAcessar: 'Compareça à farmácia com receita médica válida, documento de identidade e cartão SUS. O atendimento é gratuito para munícipes de Orlândia. Horário estendido até às 21h para maior comodidade da população.'
    },
    {
      id: 10,
      nome: 'Secretaria de Infraestrutura Urbana',
      subtitulo: 'Infraestrutura e Obras Públicas',
      icone: '🏗️',
      cor: '#72BF24',
      endereco: 'Informações disponíveis na Prefeitura Municipal',
      telefone: 'Informações: Prefeitura Municipal',
      horario: 'Segunda a Sexta-feira das 08:00 às 17:00',
      responsavel: 'Leonardo Donizeti Alvez (Responsável)',
      descricao: 'A Secretaria Municipal de Infraestrutura Urbana é responsável pela manutenção, conservação e desenvolvimento da infraestrutura urbana de Orlândia, garantindo a qualidade dos serviços públicos essenciais.',
      servicos: [
        'Manutenção de vias públicas e calçamento',
                'Limpeza urbana e coleta de lixo',
        'Manutenção de praças e jardins públicos',
        'Obras de infraestrutura urbana',
        'Serviços de iluminação pública',
        'Conservação de equipamentos urbanos',
        'Atendimento a solicitações de reparos'
      ],
      comoAcessar: 'Entre em contato com a Prefeitura Municipal para solicitar serviços de infraestrutura, reportar problemas urbanos ou obter informações sobre obras públicas. Atendimento gratuito para munícipes.'
    },
    {
      id: 11,
      nome: 'Secretaria de Meio Ambiente',
      subtitulo: 'Proteção e Preservação Ambiental',
      icone: '🌱',
      cor: '#9EBF26',
      endereco: 'Avenida do Café, 1.040, Centro',
      telefone: '(16) 3820-8063',
      horario: 'Segunda a Sexta-feira das 08:00 às 17:00',
      responsavel: 'João Alfredo Freitas Pires de Campos (Responsável)',
      descricao: 'A Secretaria Municipal de Meio Ambiente desenvolve políticas de proteção ambiental, educação ecológica e sustentabilidade, promovendo a preservação dos recursos naturais de Orlândia.',
      servicos: [
        'Licenciamento ambiental municipal',
        'Fiscalização ambiental',
        'Programas de educação ambiental',
        'Gestão de áreas verdes municipais',
        'Controle de poluição e ruído',
        'Projetos de sustentabilidade',
        'Atendimento a denúncias ambientais'
      ],
      comoAcessar: 'Entre em contato pelo telefone, e-mail (meioambiente@orlandia.sp.gov.br) ou compareça ao endereço para questões ambientais, licenças, denúncias ou participação em programas de educação ambiental.'
    },
    {
      id: 12,
      nome: 'Secretaria de Saúde',
      subtitulo: 'Saúde Pública Municipal',
      icone: '🏥',
      cor: '#F2C335',
      endereco: 'Avenida 3, nº 130, Centro',
      telefone: '(16) 3820-8207',
      horario: 'Segunda a Sexta-feira das 08:00 às 17:00',
      responsavel: 'Diego Roberto Meloni (Secretário)',
      descricao: 'A Secretaria Municipal de Saúde é responsável por coordenar e executar as políticas de saúde pública no município, garantindo o acesso universal aos serviços de saúde e promovendo o bem-estar da população.',
      servicos: [
        'Coordenação das Unidades Básicas de Saúde (UBS)',
        'Programas de vacinação',
        'Atendimento médico e odontológico',
        'Programas de prevenção e promoção da saúde',
        'Controle de endemias e epidemias',
        'Saúde da família e comunitária',
        'Regulação de consultas e exames especializados'
      ],
      comoAcessar: 'Procure a Unidade Básica de Saúde mais próxima da sua residência ou entre em contato com a secretaria para informações sobre serviços, agendamentos e programas de saúde. Leve documento de identidade e cartão SUS.'
    },
    {
      id: 13,
      nome: 'Vigilância Sanitária',
      subtitulo: 'Controle e Fiscalização Sanitária',
      icone: '🔍',
      cor: '#39BF24',
      endereco: 'Rua 9, 726 – Centro',
      telefone: '(16) 3820-8225',
      horario: 'Das 07:00h às 17:00h (Fechado para almoço das 12:00h às 14:00h)',
      descricao: 'A Vigilância Sanitária é a parcela do poder de polícia do Estado destinada à proteção e promoção da saúde, que tem como principal finalidade impedir que a saúde humana seja exposta a riscos ou combater as causas dos efeitos nocivos gerados por distorções sanitárias na produção e circulação de bens, ou na prestação de serviços de interesse à saúde.\n\nTrata-se de um conjunto de ações capaz de eliminar, diminuir ou prevenir riscos à saúde e de intervir nos problemas sanitários decorrentes do meio ambiente, da produção e circulação de bens e da prestação de serviços de interesse da saúde.\n\nA Vigilância Sanitária Municipal está vinculada à Secretaria Municipal de Saúde, GVS VIII Franca, CVS São Paulo, ANVISA e Ministério da Saúde.',
      servicos: [
        'Controle de bens de consumo relacionados à saúde',
        'Fiscalização de estabelecimentos comerciais',
        'Controle de prestação de serviços de saúde',
        'Inspeção sanitária em restaurantes e lanchonetes',
        'Fiscalização de farmácias e drogarias',
        'Controle sanitário de eventos e festivais',
        'Atendimento a denúncias sanitárias',
        'Licenciamento sanitário de estabelecimentos'
      ],
      comoAcessar: 'Entre em contato pelo telefone (16) 3820-8225 ou compareça ao endereço para denúncias, solicitações de fiscalização, licenciamento sanitário ou orientações sobre normas sanitárias. Atendimento destinado à sociedade em geral.'
    },
    {
      id: 14,
      nome: 'Rede Protetiva Orlândia',
      subtitulo: 'Blog oficial da Rede Protetiva',
      icone: '🌐',
      cor: '#E74C3C',
      isExternalLink: true,
      url: 'https://redeprotetivaorlandia.blogspot.com/',
      descricao: 'Acesse o blog oficial da Rede Protetiva de Orlândia para informações atualizadas sobre serviços, projetos e ações da rede de proteção social do município.'
    }
  ];

  const abrirModal = (servico: Servico) => {
    if (servico.isExternalLink && servico.url) {
      Linking.openURL(servico.url);
      return;
    }
    
    setServicoSelecionado(servico);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setServicoSelecionado(null);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView style={styles.scrollView}>
        <Text style={[styles.title, { color: textColor }]}>🏥 Serviços Públicos</Text>
        <Text style={[styles.subtitle, { color: textColor }]}>
          Encontre informações sobre os serviços públicos disponíveis em Orlândia
        </Text>

        <View style={styles.servicesGrid}>
          {servicos.map((servico) => (
            <TouchableOpacity
              key={servico.id}
              style={[
                styles.serviceCard,
                { 
                  backgroundColor: servico.cor + '15',
                  borderLeftColor: servico.cor,
                }
              ]}
              onPress={() => abrirModal(servico)}
              activeOpacity={0.8}
            >
              <View style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: servico.cor + '25' }]}>
                  <Text style={styles.serviceIcon}>{servico.icone}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.serviceName, { color: textColor }]}>
                    {servico.nome}
                  </Text>
                  <Text style={[styles.serviceSubtitle, { color: textColor }]}>
                    {servico.subtitulo}
                  </Text>
                  {servico.isExternalLink && (
                    <Text style={[styles.externalLinkIndicator, { color: servico.cor }]}>
                      🌐 Link externo
                    </Text>
                  )}
                </View>
                <View style={[styles.arrow, { borderLeftColor: servico.cor }]} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modal de detalhes */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: cardColor }]}>
            <ScrollView style={styles.modalScrollView}>
              {servicoSelecionado && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalIcon}>{servicoSelecionado.icone}</Text>
                    <Text style={[styles.modalTitle, { color: textColor }]}>
                      {servicoSelecionado.nome}
                    </Text>
                    <Text style={[styles.modalSubtitle, { color: textColor }]}>
                      {servicoSelecionado.subtitulo}
                    </Text>
                  </View>

                  <View style={styles.modalBody}>
                    {servicoSelecionado.endereco && (
                      <View style={styles.infoItem}>
                        <Text style={styles.infoIcon}>📍</Text>
                        <Text style={[styles.infoText, { color: textColor }]}>
                          {servicoSelecionado.endereco}
                        </Text>
                      </View>
                    )}

                    {servicoSelecionado.telefone && (
                      <View style={styles.infoItem}>
                        <Text style={styles.infoIcon}>📱</Text>
                        <Text style={[styles.infoText, { color: textColor }]}>
                          {servicoSelecionado.telefone}
                        </Text>
                      </View>
                    )}

                    {servicoSelecionado.horario && (
                      <View style={styles.infoItem}>
                        <Text style={styles.infoIcon}>🕐</Text>
                        <Text style={[styles.infoText, { color: textColor }]}>
                          {servicoSelecionado.horario}
                        </Text>
                      </View>
                    )}

                    {servicoSelecionado.responsavel && (
                      <View style={styles.infoItem}>
                        <Text style={styles.infoIcon}>👤</Text>
                        <Text style={[styles.infoText, { color: textColor }]}>
                          {servicoSelecionado.responsavel}
                        </Text>
                      </View>
                    )}

                    <View style={styles.descriptionSection}>
                      <Text style={[styles.sectionTitle, { color: servicoSelecionado.cor }]}>
                        📋 Descrição
                      </Text>
                      <Text style={[styles.descriptionText, { color: textColor }]}>
                        {servicoSelecionado.descricao}
                      </Text>
                    </View>

                    {servicoSelecionado.servicos && servicoSelecionado.servicos.length > 0 && (
                      <View style={styles.servicesSection}>
                        <Text style={[styles.sectionTitle, { color: servicoSelecionado.cor }]}>
                          🔧 Serviços Oferecidos
                        </Text>
                        {servicoSelecionado.servicos.map((servico, index) => (
                          <Text key={index} style={[styles.serviceItem, { color: textColor }]}>
                            • {servico}
                          </Text>
                        ))}
                      </View>
                    )}

                    {servicoSelecionado.comoAcessar && (
                      <View style={styles.accessSection}>
                        <Text style={[styles.sectionTitle, { color: servicoSelecionado.cor }]}>
                          🚪 Como Acessar
                        </Text>
                        <Text style={[styles.accessText, { color: textColor }]}>
                          {servicoSelecionado.comoAcessar}
                        </Text>
                      </View>
                    )}
                  </View>
                </>
              )}
            </ScrollView>

            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: servicoSelecionado?.cor || '#39BF24' }]}
              onPress={fecharModal}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
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
  scrollView: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    opacity: 0.8,
  },
  servicesGrid: {
    gap: 15,
  },
  serviceCard: {
    borderRadius: 15,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  serviceIcon: {
    fontSize: 22,
  },
  textContainer: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceSubtitle: {
    fontSize: 13,
    opacity: 0.7,
  },
  externalLinkIndicator: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  // Modal styles
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
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalScrollView: {
    maxHeight: '85%',
  },
  modalHeader: {
    alignItems: 'center',
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  modalBody: {
    padding: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 12,
    marginTop: 2,
    width: 20,
  },
  infoText: {
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  descriptionSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'justify',
  },
  servicesSection: {
    marginBottom: 20,
  },
  serviceItem: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
    paddingLeft: 10,
  },
  accessSection: {
    marginBottom: 10,
  },
  accessText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'justify',
  },
  closeButton: {
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

