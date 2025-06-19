import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import apiService from '../services/apiService';

interface FormularioAssociacaoData {
  nomeCompleto: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  enderecoCompleto: string;
  profissao: string;
  motivoAssociacao: string;
  comoConheceu: string;
}

export function AssocieSeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const [formData, setFormData] = useState<FormularioAssociacaoData>({
    nomeCompleto: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    enderecoCompleto: '',
    profissao: '',
    motivoAssociacao: '',
    comoConheceu: ''
  });

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [enviando, setEnviando] = useState(false);

  // OPÇÕES DOS SELECTS
  const motivosAssociacao = [
    "Quero contribuir para melhorar minha cidade",
    "Desejo participar de projetos",
    "Interesse em questões ambientais",
    "Quero fazer parte da comunidade ativa",
    "Busco oportunidades de voluntariado",
    "Outro motivo"
  ];

  const formasConhecimento = [
    "Redes sociais (Instagram/Facebook)",
    "Indicação de amigos/familiares",
    "Eventos da AMO",
    "Site/aplicativo da AMO",
    "Mídia local (jornal/rádio)",
    "Outro"
  ];

  const patrocinadores = [
    'MORLAN - Juntos por uma Orlândia sustentável',
    'UNIMED - Cuidando do meio ambiente',
    'INTELLI - Por uma cidade mais limpa'
  ];

  // ✅ FUNÇÕES DE VALIDAÇÃO
  const validarNome = (nome: string) => {
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
    return regex.test(nome) && nome.trim().length >= 5;
  };

  const formatarTelefone = (telefone: string) => {
    const numeros = telefone.replace(/\D/g, '');
    if (numeros.length <= 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const validarTelefone = (telefone: string) => {
    const numeros = telefone.replace(/\D/g, '');
    return numeros.length === 10 || numeros.length === 11;
  };

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const formatarData = (data: string) => {
    const numeros = data.replace(/\D/g, '');
    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 4) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
    return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)}`;
  };

  const validarData = (data: string) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(data)) return false;
    
    const [, dia, mes, ano] = data.match(regex)!;
    const dataObj = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataObj.getFullYear();
    
    return idade >= 16 && idade <= 120;
  };

  const contarDigitosTelefone = (telefone: string) => {
    return telefone.replace(/\D/g, '').length;
  };

  // ✅ HANDLERS DE INPUT
  const handleNomeChange = (texto: string) => {
    const textoLimpo = texto.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    setFormData({...formData, nomeCompleto: textoLimpo});
    limparMensagens();
  };

  const handleTelefoneChange = (texto: string) => {
    const telefoneFormatado = formatarTelefone(texto);
    setFormData({...formData, telefone: telefoneFormatado});
    limparMensagens();
  };

  const handleEmailChange = (texto: string) => {
    setFormData({...formData, email: texto.toLowerCase().trim()});
    limparMensagens();
  };

  const handleDataChange = (texto: string) => {
    const dataFormatada = formatarData(texto);
    setFormData({...formData, dataNascimento: dataFormatada});
    limparMensagens();
  };

  const limparMensagens = () => {
    setErro('');
    setSucesso('');
  };

  // 🚀 SISTEMA DE NOTIFICAÇÃO UNIVERSAL
  const mostrarSucesso = (mensagem: string) => {
    if (Platform.OS === 'web') {
      setSucesso(mensagem);
      setTimeout(() => setSucesso(''), 5000);
    } else {
      Alert.alert('🎉 Sucesso!', mensagem, [
        { text: '✅ OK', onPress: () => limparFormulario() }
      ]);
    }
  };

    const mostrarErro = (mensagem: string) => {
    if (Platform.OS === 'web') {
      setErro(mensagem);
    } else {
      Alert.alert('❌ Erro', mensagem);
    }
  };

  // 📧 FUNÇÃO DE ENVIO
  const handleSubmit = async () => {
    limparMensagens();
    setEnviando(true);
    
    try {
      console.log('=== [ASSOCIACAO] INICIANDO VALIDAÇÕES ===');

      // Validações
      if (!formData.nomeCompleto.trim()) {
        mostrarErro('Por favor, preencha seu nome completo.');
        return;
      }

      if (!validarNome(formData.nomeCompleto)) {
        mostrarErro('Nome deve conter apenas letras e ter pelo menos 5 caracteres.');
        return;
      }

      if (!formData.dataNascimento.trim()) {
        mostrarErro('Por favor, preencha sua data de nascimento.');
        return;
      }

      if (!validarData(formData.dataNascimento)) {
        mostrarErro('Data de nascimento inválida. Use o formato DD/MM/AAAA e idade entre 16 e 120 anos.');
        return;
      }

      if (!formData.telefone.trim()) {
        mostrarErro('Por favor, preencha seu telefone.');
        return;
      }

      if (!validarTelefone(formData.telefone)) {
        mostrarErro('Telefone deve ter 10 ou 11 dígitos.');
        return;
      }

      if (!formData.email.trim()) {
        mostrarErro('Por favor, preencha seu email.');
        return;
      }

      if (!validarEmail(formData.email)) {
        mostrarErro('Email inválido.');
        return;
      }

      if (!formData.enderecoCompleto.trim()) {
        mostrarErro('Por favor, preencha seu endereço completo.');
        return;
      }

      if (formData.enderecoCompleto.trim().length < 15) {
        mostrarErro('Endereço deve ter pelo menos 15 caracteres com detalhes.');
        return;
      }

      if (!formData.profissao.trim()) {
        mostrarErro('Por favor, preencha sua profissão.');
        return;
      }

      if (!formData.motivoAssociacao) {
        mostrarErro('Por favor, selecione o motivo da associação.');
        return;
      }

      if (!formData.comoConheceu) {
        mostrarErro('Por favor, informe como conheceu a AMO.');
        return;
      }

      console.log('=== [ASSOCIACAO] DADOS VALIDADOS ===');
      console.log('📤 [ASSOCIACAO] Enviando:', formData);

      // 🧪 TESTE DE CONEXÃO PRIMEIRO
      console.log('🧪 [ASSOCIACAO] Testando conexão...');
      const conexaoOk = await apiService.testarConexao();
      
      if (!conexaoOk) {
        mostrarErro('Sem conexão com o servidor. Verifique sua internet.');
        return;
      }

      console.log('✅ [ASSOCIACAO] Conexão OK, enviando formulário...');

      // Enviar formulário
      const resultado = await apiService.enviarFormularioAssociacao(formData);

      console.log('📧 [ASSOCIACAO] Resultado:', resultado);

      if (resultado.success) {
        const patrocinadorAleatorio = patrocinadores[Math.floor(Math.random() * patrocinadores.length)];
        const mensagemSucesso = `Sua solicitação de associação foi enviada com sucesso!\n\nEm breve entraremos em contato para finalizar o processo.\n\n Cortesia da:\n${patrocinadorAleatorio}`;
        mostrarSucesso(mensagemSucesso);

        if (Platform.OS === 'web') {
          setTimeout(() => {
            limparFormulario();
          }, 5000);
        }
      } else {
        mostrarErro(resultado.message);
      }

    } catch (error) {
      console.error('❌ [ASSOCIACAO] Erro:', error);
      mostrarErro('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  const limparFormulario = () => {
    setFormData({
      nomeCompleto: '',
      dataNascimento: '',
      telefone: '',
      email: '',
      enderecoCompleto: '',
      profissao: '',
      motivoAssociacao: '',
      comoConheceu: ''
    });
    limparMensagens();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* STATUS BAR */}
      <StatusBar 
        barStyle={theme.isDark ? "light-content" : "light-content"}
        backgroundColor="#9EBF26"
      />
      
      {/* HEADER RESPONSIVO */}
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
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>🤝 Associe-se à AMO</Text>
        
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        {/* HEADER CARD */}
        <View style={[styles.headerCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.title, { color: '#9EBF26' }]}>Associe-se à AMO Orlândia</Text>
          <Text style={[styles.description, { color: theme.colors.text }]}>
            Faça parte da nossa comunidade e ajude a construir uma Orlândia melhor para todos. 
            Preencha o formulário abaixo para se tornar um associado.
          </Text>
        </View>

        {/* BENEFÍCIOS DA ASSOCIAÇÃO */}
        <View style={[styles.beneficiosCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.beneficiosTitle, { color: '#39BF24' }]}> Benefícios da Associação</Text>
          
          <View style={styles.beneficiosList}>
            <View style={styles.beneficioItem}>
              <Text style={styles.beneficioIcon}>🗳️</Text>
              <Text style={[styles.beneficioTexto, { color: theme.colors.text }]}>
                Direito a voto nas assembleias e decisões da AMO
              </Text>
            </View>
            
            
            <View style={styles.beneficioItem}>
              <Text style={styles.beneficioIcon}>🤝</Text>
              <Text style={[styles.beneficioTexto, { color: theme.colors.text }]}>
                Networking com outros moradores, a fim de encontrar ou propor soluções diversas nos bairros.
              </Text>
            </View>
            
            <View style={styles.beneficioItem}>
              <Text style={styles.beneficioIcon}>📋</Text>
              <Text style={[styles.beneficioTexto, { color: theme.colors.text }]}>
                Acesso a informações exclusivas sobre a cidade
              </Text>
            </View>
            
            <View style={styles.beneficioItem}>
              <Text style={styles.beneficioIcon}>🌱</Text>
              <Text style={[styles.beneficioTexto, { color: theme.colors.text }]}>
                Oportunidades de voluntariado em diversos projetos
              </Text>
            </View>
          </View>
        </View>

        {/* FORMULÁRIO */}
        <View style={[styles.formCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.formTitle, { color: '#9EBF26' }]}>📝 Formulário de Associação</Text>

          {/* 🔧 SISTEMA DE MENSAGENS */}
          {erro ? (
            <View style={[styles.messageContainer, styles.errorContainer]}>
              <Text style={styles.errorMessageText}>❌ {erro}</Text>
            </View>
          ) : null}

          {sucesso ? (
            <View style={[styles.messageContainer, styles.successContainer]}>
              <Text style={styles.successMessageText}>✅ {sucesso}</Text>
            </View>
          ) : null}

          <View style={styles.form}>
            {/* Nome Completo */}
            <Text style={[styles.label, { color: theme.colors.text }]}>Nome Completo: *</Text>
            <TextInput
              style={[styles.input, { borderColor: '#9EBF26', color: theme.colors.text }]}
              value={formData.nomeCompleto}
              onChangeText={handleNomeChange}
              placeholder="Digite seu nome completo"
              placeholderTextColor={theme.colors.text + '80'}
              maxLength={100}
              editable={!enviando}
            />
            {formData.nomeCompleto.length > 0 && !validarNome(formData.nomeCompleto) && (
              <Text style={styles.fieldErrorText}>Nome deve conter apenas letras e ter pelo menos 5 caracteres</Text>
            )}

            {/* Data de Nascimento */}
            <Text style={[styles.label, { color: theme.colors.text }]}>Data de Nascimento: *</Text>
            <TextInput
              style={[styles.input, { borderColor: '#9EBF26', color: theme.colors.text }]}
              value={formData.dataNascimento}
              onChangeText={handleDataChange}
              placeholder="DD/MM/AAAA"
              placeholderTextColor={theme.colors.text + '80'}
              keyboardType="numeric"
              maxLength={10}
              editable={!enviando}
            />
            {formData.dataNascimento.length > 0 && !validarData(formData.dataNascimento) && (
              <Text style={styles.fieldErrorText}>Data inválida ou idade fora do permitido (16-120 anos)</Text>
            )}

            {/* Telefone */}
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Telefone: * ({contarDigitosTelefone(formData.telefone)}/11)
            </Text>
            <TextInput
              style={[styles.input, { borderColor: '#9EBF26', color: theme.colors.text }]}
              value={formData.telefone}
              onChangeText={handleTelefoneChange}
              placeholder="(16) 99999-9999"
              placeholderTextColor={theme.colors.text + '80'}
              keyboardType="phone-pad"
              maxLength={15}
              editable={!enviando}
            />
            {formData.telefone.length > 0 && !validarTelefone(formData.telefone) && (
              <Text style={styles.fieldErrorText}>Telefone deve ter 10 ou 11 dígitos</Text>
            )}

            {/* Email */}
            <Text style={[styles.label, { color: theme.colors.text }]}>Email: *</Text>
            <TextInput
              style={[styles.input, { borderColor: '#9EBF26', color: theme.colors.text }]}
              value={formData.email}
              onChangeText={handleEmailChange}
              placeholder="seu@email.com"
              placeholderTextColor={theme.colors.text + '80'}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!enviando}
            />
            {formData.email.length > 0 && !validarEmail(formData.email) && (
              <Text style={styles.fieldErrorText}>Email inválido</Text>
            )}

            {/* Endereço Completo */}
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Endereço Completo: * ({formData.enderecoCompleto.length}/300)
            </Text>
            <TextInput
              style={[styles.textArea, { borderColor: '#9EBF26', color: theme.colors.text }]}
              value={formData.enderecoCompleto}
              onChangeText={(texto) => {
                setFormData({...formData, enderecoCompleto: texto});
                limparMensagens();
              }}
              placeholder="Rua, número, bairro, CEP e pontos de referência (mínimo 15 caracteres)"
              placeholderTextColor={theme.colors.text + '80'}
              multiline
              numberOfLines={3}
              maxLength={300}
              editable={!enviando}
            />
            {formData.enderecoCompleto.length > 0 && formData.enderecoCompleto.length < 15 && (
              <Text style={styles.fieldErrorText}>Endereço deve ter pelo menos 15 caracteres</Text>
            )}

            {/* Profissão */}
            <Text style={[styles.label, { color: theme.colors.text }]}>Profissão: *</Text>
            <TextInput
              style={[styles.input, { borderColor: '#9EBF26', color: theme.colors.text }]}
              value={formData.profissao}
              onChangeText={(texto) => {
                setFormData({...formData, profissao: texto});
                limparMensagens();
              }}
              placeholder="Digite sua profissão"
              placeholderTextColor={theme.colors.text + '80'}
              maxLength={50}
              editable={!enviando}
            />

            {/* Motivo da Associação */}
            <Text style={[styles.label, { color: theme.colors.text }]}>Motivo da Associação: *</Text>
            {Platform.OS === 'web' ? (
              <select
                value={formData.motivoAssociacao}
                onChange={e => setFormData({ ...formData, motivoAssociacao: e.target.value })}
                disabled={enviando}
                style={{
                  marginBottom: 15,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  width: '100%',
                  borderColor: '#9EBF26',
                  borderWidth: 1,
                  color: theme.colors.text,
                  backgroundColor: theme.colors.card,
                }}
              >
                                <option value="">Selecione o motivo</option>
                {motivosAssociacao.map(motivo => (
                  <option key={motivo} value={motivo}>{motivo}</option>
                ))}
              </select>
            ) : (
              <Picker
                selectedValue={formData.motivoAssociacao || ""}
                onValueChange={(itemValue: string) => setFormData({ ...formData, motivoAssociacao: itemValue || "" })}
                enabled={!enviando}
                style={{
                  marginBottom: 15,
                  backgroundColor: theme.colors.card,
                  borderRadius: 8,
                  color: theme.colors.text,
                }}
                itemStyle={{
                  color: theme.colors.text,
                }}
              >
                <Picker.Item label="Selecione o motivo" value="" />
                {motivosAssociacao.map(motivo => (
                  <Picker.Item key={motivo} label={motivo} value={motivo} />
                ))}
              </Picker>
            )}

            {/* Como Conheceu a AMO */}
            <Text style={[styles.label, { color: theme.colors.text }]}>Como conheceu a AMO Orlândia? *</Text>
            {Platform.OS === 'web' ? (
              <select
                value={formData.comoConheceu}
                onChange={e => setFormData({ ...formData, comoConheceu: e.target.value })}
                disabled={enviando}
                style={{
                  marginBottom: 15,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  width: '100%',
                  borderColor: '#9EBF26',
                  borderWidth: 1,
                  color: theme.colors.text,
                  backgroundColor: theme.colors.card,
                }}
              >
                <option value="">Selecione uma opção</option>
                {formasConhecimento.map(forma => (
                  <option key={forma} value={forma}>{forma}</option>
                ))}
              </select>
            ) : (
              <Picker
                selectedValue={formData.comoConheceu || ""}
                onValueChange={(itemValue: string) => setFormData({ ...formData, comoConheceu: itemValue || "" })}
                enabled={!enviando}
                style={{
                  marginBottom: 15,
                  backgroundColor: theme.colors.card,
                  borderRadius: 8,
                  color: theme.colors.text,
                }}
                itemStyle={{
                  color: theme.colors.text,
                }}
              >
                <Picker.Item label="Selecione uma opção" value="" />
                {formasConhecimento.map(forma => (
                  <Picker.Item key={forma} label={forma} value={forma} />
                ))}
              </Picker>
            )}

            {/* Botão de envio */}
            <TouchableOpacity
              style={[
                styles.submitButton, 
                { 
                  backgroundColor: enviando ? '#ccc' : '#9EBF26',
                  opacity: enviando ? 0.7 : 1
                }
              ]}
              onPress={handleSubmit}
              activeOpacity={0.7}
              disabled={enviando}
            >
              <Text style={styles.submitButtonText}>
                {enviando ? 'Enviando... ⏳' : 'Enviar Solicitação 🤝'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* INFORMAÇÕES IMPORTANTES */}
        <View style={[styles.infoCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.infoTitle, { color: '#F2C335' }]}>ℹ️ Informações Importantes</Text>
          
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📋</Text>
              <Text style={[styles.infoText, { color: theme.colors.text }]}>
                Após o envio, analisaremos sua solicitação em até 5 dias úteis
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📞</Text>
              <Text style={[styles.infoText, { color: theme.colors.text }]}>
                Entraremos em contato pelo telefone/e-mail informado para confirmar os dados
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📧</Text>
              <Text style={[styles.infoText, { color: theme.colors.text }]}>
                Você receberá um email de confirmação se sua associação for aprovada
              </Text>
            </View>
          </View>
        </View>

        {/* DÚVIDAS */}
        <View style={[styles.duvidasCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.duvidasTitle, { color: '#39BF24' }]}>❓ Dúvidas Frequentes</Text>
          
          <View style={styles.duvidasList}>
            <View style={styles.duvidasItem}>
              <Text style={[styles.pergunta, { color: theme.colors.text }]}>
                Q: A associação tem algum custo?
              </Text>
              <Text style={[styles.resposta, { color: theme.colors.text }]}>
                R: R$ 35,00 por mês para ajudar na manutenção da SEDE (Aluguel - agua - energia - Secretaria/o)
              </Text>
            </View>
            
            <View style={styles.duvidasItem}>
              <Text style={[styles.pergunta, { color: theme.colors.text }]}>
                Q: Quais são as obrigações de um associado?
              </Text>
              <Text style={[styles.resposta, { color: theme.colors.text }]}>
                R: Não há obrigações. A participação em atividades é voluntária, porém a AMO sugere participar sempre das reuniões e assembleias quando possível
              </Text>
            </View>
            
            <View style={styles.duvidasItem}>
              <Text style={[styles.pergunta, { color: theme.colors.text }]}>
                Q: Posso cancelar minha associação?
              </Text>
              <Text style={[styles.resposta, { color: theme.colors.text }]}>
                R: Sim, você pode cancelar a qualquer momento entrando em contato conosco.
              </Text>
            </View>

            <View style={styles.duvidasItem}>
              <Text style={[styles.pergunta, { color: theme.colors.text }]}>
                Q: Quais são os deveres de um associado?
              </Text>
              <Text style={[styles.resposta, { color: theme.colors.text }]}>
                R: Não usar imagem da AMO para beneficio próprio, não usar a associação para fins políticos ou participar dos poderes legislativo e executivo.
              </Text>
            </View>
            
          </View>
        </View>

        {/* CONTATO */}
        <View style={[styles.contatoCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.contatoTitle, { color: '#F2C335' }]}>📞 Ainda tem dúvidas?</Text>
          <Text style={[styles.contatoText, { color: theme.colors.text }]}>
            Entre em contato conosco através dos nossos canais oficiais:
          </Text>
          
          <TouchableOpacity 
            style={[styles.contatoButton, { backgroundColor: '#25D366' }]}
            onPress={() => {
              // Abrir WhatsApp
              const numero = '55 16 99998-2105';
              const mensagem = 'Olá! Tenho dúvidas sobre a associação à AMO Orlândia.';
              const url = `whatsapp://send?phone=${numero}&text=${encodeURIComponent(mensagem)}`;
              
              try {
                Linking.openURL(url);
              } catch (error) {
                console.error('Erro ao abrir WhatsApp:', error);
              }
            }}
          >
            <Text style={styles.contatoButtonText}>💬 WhatsApp: (16) 99998-2105</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.contatoButton, { backgroundColor: '#F2C335' }]}
            onPress={() => router.push('/contato' as any)}
          >
            <Text style={styles.contatoButtonText}>📝 Formulário de Contato</Text>
          </TouchableOpacity>
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
  // BENEFÍCIOS CARD
  beneficiosCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  beneficiosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  beneficiosList: {
    gap: 12,
  },
  beneficioItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  beneficioIcon: {
    fontSize: 18,
    marginRight: 12,
    marginTop: 2,
  },
  beneficioTexto: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  // FORM CARD
  formCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  // MENSAGENS
  messageContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
  },
  successContainer: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4caf50',
  },
  errorMessageText: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  successMessageText: {
    color: '#2e7d32',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  // FORM STYLES
  form: {
    gap: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fieldErrorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  // INFO CARD
  infoCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
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
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  // DÚVIDAS CARD
  duvidasCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  duvidasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  duvidasList: {
    gap: 15,
  },
  duvidasItem: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
    pergunta: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resposta: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  // CONTATO CARD
  contatoCard: {
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
  contatoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  contatoText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  contatoButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  contatoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AssocieSeScreen;

