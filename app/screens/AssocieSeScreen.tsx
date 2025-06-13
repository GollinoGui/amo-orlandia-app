import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import apiService from '../services/apiService';

export function AssocieSeScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = '#9EBF26';
  const cardColor = useThemeColor({}, 'card');

  const limparMensagens = () => {
  setErro('');
  setSucesso('');
};
  const [formData, setFormData] = useState({
    nomeCompleto: '',
  dataNascimento: '',
  telefone: '',
  email: '',
  enderecoCompleto: '',
  profissao: '',
  motivoAssociacao: '',
  comoConheceu: ''
  });
    const patrocinadores = [
        'MORLAN - Juntos por uma Orlândia sustentável',
        'UNIMED - Cuidando do meio ambiente',
        'INTELLI - Por uma cidade mais limpa'
      ];

      const mostrarSucesso = (mensagem: string) => {
          if (Platform.OS === 'web') {
            // WEB: Usar estado para mostrar banner
            setSucesso(mensagem);
            setTimeout(() => setSucesso(''), 5000);
          } else {
            // MOBILE: Usar Alert
            Alert.alert('🎉 Sucesso!', mensagem, [
              { text: '✅ OK', onPress: () => limparFormulario() }
            ]);
          }
        };
        const mostrarErro = (mensagem: string) => {
            if (Platform.OS === 'web') {
              // WEB: Usar estado para mostrar banner
              setErro(mensagem);
            } else {
              // MOBILE: Usar Alert
              Alert.alert('❌ Erro', mensagem);
            }
          };
        
      const [erro, setErro] = useState('');
      const [sucesso, setSucesso] = useState('');
      const [enviando, setEnviando] = useState(false);

  

  // 🆕 VALIDAÇÃO REAL DE DATA DE NASCIMENTO
  const validarDataNascimento = (data: string): { valida: boolean; erro?: string } => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = data.match(regex);
    
    if (!match) {
      return { valida: false, erro: 'Formato inválido. Use DD/MM/AAAA' };
    }
    
    const dia = parseInt(match[1]);
    const mes = parseInt(match[2]);
    const ano = parseInt(match[3]);
    
    // Verifica se os valores são válidos
    if (mes < 1 || mes > 12) {
      return { valida: false, erro: 'Mês deve estar entre 01 e 12' };
    }
    
    if (dia < 1 || dia > 31) {
      return { valida: false, erro: 'Dia deve estar entre 01 e 31' };
    }
    
    // Verifica dias por mês
    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    // Verifica ano bissexto
    const ehBissexto = (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
    if (ehBissexto) diasPorMes[1] = 29;
    
    if (dia > diasPorMes[mes - 1]) {
      return { valida: false, erro: `${mes === 2 ? 'Fevereiro' : 'Este mês'} não tem ${dia} dias` };
    }
    
    // Verifica se a data não é no futuro
    const dataInformada = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    
    if (dataInformada > hoje) {
      return { valida: false, erro: 'Data não pode ser no futuro' };
    }
    
    // Verifica idade mínima (16 anos) e máxima (120 anos)
    const idade = hoje.getFullYear() - ano;
    
    if (idade < 16) {
      return { valida: false, erro: 'Idade mínima: 16 anos' };
    }
    
    if (idade > 120) {
      return { valida: false, erro: 'Idade máxima: 120 anos' };
    }
    
    return { valida: true };
  };
  

  const formatarTelefone = (telefone: string) => {
    const numeros = telefone.replace(/\D/g, '');
    if (numeros.length <= 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const formatarData = (data: string) => {
    const numeros = data.replace(/\D/g, '');
    return numeros.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
  };

  // Outras validações
  const validarNome = (nome: string) => {
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
    return regex.test(nome) && nome.trim().length >= 3;
  };

  const validarTelefone = (telefone: string) => {
    const numeros = telefone.replace(/\D/g, '');
    return numeros.length === 10 || numeros.length === 11;
  };

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Contadores
  
  const contarDigitosTelefone = (telefone: string) => telefone.replace(/\D/g, '').length;

  // 🆕 Estados para mostrar erros específicos
  const [errosCampos, setErrosCampos] = useState({
    data: ''
  });

  // Handlers
  const handleNomeChange = (texto: string) => {
    const textoLimpo = texto.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    if (textoLimpo.length <= 100) {
      setFormData({...formData, nomeCompleto: textoLimpo});
      setErro('');
    }
  };

  

  const handleTelefoneChange = (texto: string) => {
    const telefoneFormatado = formatarTelefone(texto);
    if (telefoneFormatado.length <= 15) {
      setFormData({...formData, telefone: telefoneFormatado});
      setErro('');
    }
  };

  const handleDataChange = (texto: string) => {
    const dataFormatada = formatarData(texto);
    if (dataFormatada.length <= 10) {
      setFormData({...formData, dataNascimento: dataFormatada});
      setErro('');
      
      // 🆕 Validação em tempo real da data
      if (dataFormatada.length === 10) {
        const validacao = validarDataNascimento(dataFormatada);
        if (validacao.valida) {
          setErrosCampos({...errosCampos, data: ''});
        } else {
          setErrosCampos({...errosCampos, data: validacao.erro || 'Data inválida'});
        }
      } else {
        setErrosCampos({...errosCampos, data: ''});
      }
    }
  };

  const handleEmailChange = (texto: string) => {
    if (texto.length <= 100) {
      setFormData({...formData, email: texto.toLowerCase()});
      setErro('');
    }
  };

  const handleProfissaoChange = (texto: string) => {
    if (texto.length <= 50) {
      setFormData({...formData, profissao: texto});
      setErro('');
    }
  };

  const handleSubmit = async () => {
    console.log('🚀 [FRONTEND] === INÍCIO ENVIO ===');
  console.log('🚀 [FRONTEND] Dados do formulário:', JSON.stringify(formData, null, 2));
  console.log('🚀 [FRONTEND] Campos preenchidos:');
  console.log('🚀 [FRONTEND] - nomeCompleto:', formData.nomeCompleto ? '✅ OK' : '❌ VAZIO');
  console.log('🚀 [FRONTEND] - dataNascimento:', formData.dataNascimento ? '✅ OK' : '❌ VAZIO');
  console.log('🚀 [FRONTEND] - telefone:', formData.telefone ? '✅ OK' : '❌ VAZIO');
  console.log('🚀 [FRONTEND] - email:', formData.email ? '✅ OK' : '❌ VAZIO');
  console.log('🚀 [FRONTEND] ===== DEBUG FRONTEND =====');
  console.log('🚀 [FRONTEND] FormData completo:', formData);
  console.log('🚀 [FRONTEND] Campos individuais:');
  console.log('  - nomeCompleto:', formData.nomeCompleto);
  console.log('  - dataNascimento:', formData.dataNascimento);
  console.log('  - telefone:', formData.telefone);
  console.log('  - email:', formData.email);
  console.log('  - enderecoCompleto:', formData.enderecoCompleto);
  console.log('  - profissao:', formData.profissao);
  console.log('  - motivoAssociacao:', formData.motivoAssociacao);
  console.log('  - comoConheceu:', formData.comoConheceu);
  
 
  limparMensagens();
  setEnviando(true);
  
  try {
    // Validações
    if (!formData.nomeCompleto.trim()) {
      mostrarErro('Por favor, preencha seu nome completo.');
      return;
    }

    if (!validarNome(formData.nomeCompleto)) {
      mostrarErro('Nome deve conter apenas letras e ter pelo menos 3 caracteres.');
      return;
    }

    if (!formData.dataNascimento.trim()) {
      mostrarErro('Por favor, preencha sua data de nascimento.');
      return;
    }

    if (formData.dataNascimento.length !== 10) {
      mostrarErro('Data de nascimento deve estar no formato DD/MM/AAAA.');
      return;
    }

    const validacaoData = validarDataNascimento(formData.dataNascimento);
    if (!validacaoData.valida) {
      mostrarErro(validacaoData.erro || 'Data de nascimento inválida.');
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
      mostrarErro('Email deve ter um formato válido.');
      return;
    }

    if (!formData.enderecoCompleto.trim()) {
      mostrarErro('Por favor, preencha seu endereço completo.');
      return;
    }

    if (formData.enderecoCompleto.length < 10) {
      mostrarErro('Endereço deve ter pelo menos 10 caracteres.');
      return;
    }

    if (!formData.profissao.trim()) {
      mostrarErro('Por favor, preencha sua profissão.');
      return;
    }

    if (!formData.motivoAssociacao.trim()) {
      mostrarErro('Por favor, descreva por que quer se associar.');
      return;
    }

    if (formData.motivoAssociacao.length < 20) {
      mostrarErro('Descreva melhor o motivo (mínimo 20 caracteres).');
      return;
    }

    if (!formData.comoConheceu.trim()) {
      mostrarErro('Por favor, descreva como conheceu a AMO.');
      return;
    }

    // ✅ DADOS PARA ENVIO
    const dadosEnvio = {
      nomeCompleto: formData.nomeCompleto,
      dataNascimento: formData.dataNascimento,
      telefone: formData.telefone,
      email: formData.email,
      enderecoCompleto: formData.enderecoCompleto,
      profissao: formData.profissao,
      motivoAssociacao: formData.motivoAssociacao,
      comoConheceu: formData.comoConheceu
    };

    console.log('🚀 [FRONTEND] Dados para envio:', dadosEnvio);
    console.log('🚀 [FRONTEND] JSON stringify:', JSON.stringify(dadosEnvio, null, 2));
    console.log('🚀 [FRONTEND] ===== DADOS SENDO ENVIADOS =====');
console.log('🚀 [FRONTEND] FormData original:', formData);
console.log('🚀 [FRONTEND] Dados para envio:', {
  nomeCompleto: formData.nomeCompleto,
  dataNascimento: formData.dataNascimento,
  telefone: formData.telefone,
  email: formData.email,
  enderecoCompleto: formData.enderecoCompleto,
  profissao: formData.profissao,
  motivoAssociacao: formData.motivoAssociacao,
  comoConheceu: formData.comoConheceu
});
console.log('🚀 [FRONTEND] JSON que será enviado:', JSON.stringify({
  nomeCompleto: formData.nomeCompleto,
  dataNascimento: formData.dataNascimento,
  telefone: formData.telefone,
  email: formData.email,
  enderecoCompleto: formData.enderecoCompleto,
  profissao: formData.profissao,
  motivoAssociacao: formData.motivoAssociacao,
  comoConheceu: formData.comoConheceu
}, null, 2));

    const resultado = await apiService.enviarFormularioAssociacao(dadosEnvio);
    
    console.log('🚀 [FRONTEND] Resultado:', resultado);

    if (resultado.success) {
      const patrocinadorAleatorio = patrocinadores[Math.floor(Math.random() * patrocinadores.length)];
      const mensagemSucesso = `Sua solicitação de associação foi enviada com sucesso!\n\nEm breve entraremos em contato.\n\n💝 Cortesia da:\n${patrocinadorAleatorio}`;
      mostrarSucesso(mensagemSucesso);
    } else {
      mostrarErro(resultado.message);
    }

  } catch (error) {
    console.error('❌ [FRONTEND] Erro:', error);
    mostrarErro('Erro de conexão. Verifique sua internet e tente novamente.');
  } finally {
    setEnviando(false);
    console.log('🚀 [FRONTEND] ===== FIM DEBUG FRONTEND =====');
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
    setErro('');
    setErrosCampos({ data: '' });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.title, { color: primaryColor }]}>🤝 Associe-se à AMO</Text>
        
        <Text style={[styles.description, { color: textColor }]}>
          Faça parte da AMO Orlândia! {'\n'}Preencha o formulário abaixo para enviar sua proposta de associação e contribuir com o desenvolvimento da nossa cidade.
        </Text>

        {sucesso ? (
          <View style={[styles.messageContainer, styles.successContainer]}>
            <Text style={styles.successMessageText}>{sucesso}</Text>
          </View>
        ) : null}


        {/* Mensagem de erro geral */}
        {erro ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{erro}</Text>
          </View>
        ) : null}

        <View style={styles.form}>
          <Text style={[styles.label, { color: textColor }]}>
            Nome Completo: * ({formData.nomeCompleto.length}/100)
          </Text>
          <TextInput
            style={[styles.input, { borderColor: primaryColor, color: textColor }]}
            value={formData.nomeCompleto}
            onChangeText={handleNomeChange}
            placeholder="Digite seu nome completo"
            placeholderTextColor={textColor + '80'}
            maxLength={100}
            editable={!enviando}
          />
          {formData.nomeCompleto.length > 0 && !validarNome(formData.nomeCompleto) && (
            <Text style={styles.errorText}>Nome deve conter apenas letras</Text>
          )}
          <Text style={[styles.label, { color: textColor }]}>Data de Nascimento: *</Text>
          <TextInput
            style={[
              styles.input, 
              { 
                borderColor: errosCampos.data ? '#E74C3C' : primaryColor, 
                color: textColor 
              }
            ]}
            value={formData.dataNascimento}
            onChangeText={handleDataChange}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={textColor + '80'}
            keyboardType="numeric"
            maxLength={10}
            editable={!enviando}
          />
          {errosCampos.data ? (
            <Text style={styles.errorText}>{errosCampos.data}</Text>
          ) : formData.dataNascimento.length > 0 && formData.dataNascimento.length < 10 && (
            <Text style={styles.infoText}>Use o formato DD/MM/AAAA</Text>
          )}

          <Text style={[styles.label, { color: textColor }]}>
            Telefone: * ({contarDigitosTelefone(formData.telefone)}/11)
          </Text>
          <TextInput
            style={[styles.input, { borderColor: primaryColor, color: textColor }]}
            value={formData.telefone}
            onChangeText={handleTelefoneChange}
            placeholder="(16) 99999-9999"
            placeholderTextColor={textColor + '80'}
            keyboardType="phone-pad"
            maxLength={15}
            editable={!enviando}
          />
          {formData.telefone.length > 0 && !validarTelefone(formData.telefone) && (
            <Text style={styles.errorText}>Telefone deve ter 10 ou 11 dígitos</Text>
          )}

          <Text style={[styles.label, { color: textColor }]}>
            Email: * ({formData.email.length}/100)
          </Text>
          <TextInput
            style={[styles.input, { borderColor: primaryColor, color: textColor }]}
            value={formData.email}
            onChangeText={handleEmailChange}
            placeholder="seu@email.com"
            placeholderTextColor={textColor + '80'}
            keyboardType="email-address"
            autoCapitalize="none"
            maxLength={100}
            editable={!enviando}
          />
          {formData.email.length > 0 && !validarEmail(formData.email) && (
            <Text style={styles.errorText}>Email deve ter um formato válido</Text>
          )}

          <Text style={[styles.label, { color: textColor }]}>
            Endereço Completo: * ({formData.enderecoCompleto.length}/200)
          </Text>
          <TextInput
            style={[styles.textArea, { borderColor: primaryColor, color: textColor }]}
            value={formData.enderecoCompleto}
            onChangeText={(text) => {
              if (text.length <= 200) {
                setFormData({...formData, enderecoCompleto: text});
                setErro('');
              }
            }}
            placeholder="Rua, número, bairro, cidade, CEP"
            placeholderTextColor={textColor + '80'}
            multiline
            numberOfLines={3}
            maxLength={200}
            editable={!enviando}
          />
          {formData.enderecoCompleto.length > 0 && formData.enderecoCompleto.length < 10 && (
            <Text style={styles.errorText}>Endereço deve ter pelo menos 10 caracteres</Text>
          )}

          <Text style={[styles.label, { color: textColor }]}>
            Profissão: * ({formData.profissao.length}/50)
          </Text>
          <TextInput
            style={[styles.input, { borderColor: primaryColor, color: textColor }]}
            value={formData.profissao}
            onChangeText={handleProfissaoChange}
            placeholder="Sua profissão atual"
            placeholderTextColor={textColor + '80'}
            maxLength={50}
            editable={!enviando}
          />

          <Text style={[styles.label, { color: textColor }]}>
            Por que você quer se associar à AMO? * ({formData.motivoAssociacao.length}/300)
          </Text>
          <TextInput
            style={[styles.textArea, { borderColor: primaryColor, color: textColor }]}
            value={formData.motivoAssociacao}
            onChangeText={(text) => {
              if (text.length <= 300) {
                setFormData({...formData, motivoAssociacao: text});
                setErro('');
              }
            }}
            placeholder="Conte-nos seus motivos para se associar (mínimo 20 caracteres)"
            placeholderTextColor={textColor + '80'}
            multiline
            numberOfLines={4}
            maxLength={300}
            editable={!enviando}
          />
          {formData.motivoAssociacao.length > 0 && formData.motivoAssociacao.length < 20 && (
            <Text style={styles.errorText}>Descreva melhor o motivo (mínimo 20 caracteres)</Text>
          )}

          <Text style={[styles.label, { color: textColor }]}>
            Como você conheceu a AMO? * ({formData.comoConheceu.length}/200)
          </Text>
          <TextInput
            style={[styles.textArea, { borderColor: primaryColor, color: textColor }]}
            value={formData.comoConheceu}
            onChangeText={(text) => {
              if (text.length <= 200) {
                setFormData({...formData, comoConheceu: text});
                setErro('');
              }
            }}
            placeholder="Redes sociais, amigos, eventos, etc."
            placeholderTextColor={textColor + '80'}
            multiline
            numberOfLines={3}
            maxLength={200}
            editable={!enviando}
          />

          <TouchableOpacity
            style={[
              styles.submitButton, 
              { 
                backgroundColor: enviando ? '#ccc' : primaryColor,
                opacity: enviando ? 0.7 : 1
              }
            ]}
            onPress={handleSubmit}
            activeOpacity={0.7}
            disabled={enviando}
          >
            <Text style={styles.submitButtonText}>
              {enviando ? 'Enviando... ' : 'Enviar Solicitação 🤝'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.infoBox, { backgroundColor: primaryColor + '15', borderColor: primaryColor }]}>
          <Text style={[styles.infoTitle, { color: primaryColor }]}>ℹ️ Informações Importantes</Text>
          <Text style={[styles.infoText, { color: textColor }]}>
            • Todos os dados são confidenciais e protegidos{'\n'}
            • A AMO é apartidária, então não é permitida a filiação de pessoas ligadas a partidos políticos.{'\n'}
            • Para se associar é necessário ser morador ou trabalhar em Orlandia.{'\n'}
            • O conselho de Ética da AMO tomará a decisão das filiações solicitadas.{'\n'}
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
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
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
  messageText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    color: '#721c24',
  },
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
  errorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
    fontWeight: '500',
  },
  infoText: {
    color: '#3498DB',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  infoBox: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginTop: 25,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});


export default AssocieSeScreen;