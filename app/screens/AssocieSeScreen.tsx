import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import apiService from '../services/apiService';

export function AssocieSeScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = '#9EBF26';
  const cardColor = useThemeColor({}, 'card');

  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cpf: '',
    rg: '',
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

  // 🆕 VALIDAÇÃO REAL DE CPF
  const validarCPF = (cpf: string): boolean => {
    const numeros = cpf.replace(/\D/g, '');
    
    if (numeros.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(numeros)) return false;
    
    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(numeros[i]) * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;
    
    if (parseInt(numeros[9]) !== digito1) return false;
    
    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(numeros[i]) * (11 - i);
    }
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;
    
    return parseInt(numeros[10]) === digito2;
  };

  // 🆕 VALIDAÇÃO REAL DE RG (formato SP)
  const validarRG = (rg: string): boolean => {
    const numeros = rg.replace(/\D/g, '');
    
    if (numeros.length < 8 || numeros.length > 9) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(numeros)) return false;
    
    // Para RG de 9 dígitos (SP), validamos o dígito verificador
    if (numeros.length === 9) {
      const digitos = numeros.substring(0, 8);
      let soma = 0;
      
      for (let i = 0; i < 8; i++) {
        soma += parseInt(digitos[i]) * (i + 2);
      }
      
      const resto = soma % 11;
      const digitoVerificador = resto < 2 ? 0 : 11 - resto;
      const digitoInformado = parseInt(numeros[8]);
      
      // Se o dígito calculado for 10, o RG é inválido no padrão SP
      if (digitoVerificador === 10) return false;
      
      return digitoVerificador === digitoInformado;
    }
    
    // Para RG de 8 dígitos, apenas verifica se não são todos iguais
    return true;
  };

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

  // Formatações (mantém as mesmas)
  const formatarRG = (rg: string) => {
    const numeros = rg.replace(/\D/g, '');
    if (numeros.length <= 8) {
      return numeros.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
    } else {
      return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    }
  };

  const formatarCPF = (cpf: string) => {
    const numeros = cpf.replace(/\D/g, '');
    return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
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
  const contarDigitosCPF = (cpf: string) => cpf.replace(/\D/g, '').length;
  const contarDigitosRG = (rg: string) => rg.replace(/\D/g, '').length;
  const contarDigitosTelefone = (telefone: string) => telefone.replace(/\D/g, '').length;

  // 🆕 Estados para mostrar erros específicos
  const [errosCampos, setErrosCampos] = useState({
    cpf: '',
    rg: '',
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

  const handleCPFChange = (texto: string) => {
    const cpfFormatado = formatarCPF(texto);
    if (cpfFormatado.length <= 14) {
      setFormData({...formData, cpf: cpfFormatado});
      setErro('');
      
      // 🆕 Validação em tempo real do CPF
      if (cpfFormatado.replace(/\D/g, '').length === 11) {
        if (validarCPF(cpfFormatado)) {
          setErrosCampos({...errosCampos, cpf: ''});
        } else {
          setErrosCampos({...errosCampos, cpf: 'CPF inválido'});
        }
      } else {
        setErrosCampos({...errosCampos, cpf: ''});
      }
    }
  };

  const handleRGChange = (texto: string) => {
    const rgFormatado = formatarRG(texto);
    if (rgFormatado.length <= 12) {
      setFormData({...formData, rg: rgFormatado});
      setErro('');
      
      // 🆕 Validação em tempo real do RG
      const numeros = rgFormatado.replace(/\D/g, '');
      if (numeros.length >= 8) {
        if (validarRG(rgFormatado)) {
          setErrosCampos({...errosCampos, rg: ''});
        } else {
          setErrosCampos({...errosCampos, rg: 'RG inválido'});
        }
      } else {
        setErrosCampos({...errosCampos, rg: ''});
      }
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
    setErro('');
    setEnviando(true);

    try {
      console.log('🔍 [ASSOCIACAO] Iniciando validações...');

      // Validações básicas
      if (!formData.nomeCompleto.trim()) {
        setErro('Por favor, preencha seu nome completo.');
        setEnviando(false);
        return;
      }

      if (!validarNome(formData.nomeCompleto)) {
        setErro('Nome deve conter apenas letras e ter pelo menos 3 caracteres.');
        setEnviando(false);
        return;
      }

      if (!formData.cpf.trim()) {
        setErro('Por favor, preencha seu CPF.');
        setEnviando(false);
        return;
      }

      // 🆕 Validação real do CPF
      if (!validarCPF(formData.cpf)) {
        setErro('CPF inválido. Verifique os números digitados.');
        setEnviando(false);
        return;
      }

      if (!formData.rg.trim()) {
        setErro('Por favor, preencha seu RG.');
        setEnviando(false);
        return;
      }

      // 🆕 Validação real do RG
      if (!validarRG(formData.rg)) {
        setErro('RG inválido. Verifique os números digitados.');
        setEnviando(false);
        return;
      }

      if (!formData.dataNascimento.trim()) {
        setErro('Por favor, preencha sua data de nascimento.');
        setEnviando(false);
        return;
      }

      // 🆕 Validação real da data
      const validacaoData = validarDataNascimento(formData.dataNascimento);
      if (!validacaoData.valida) {
        setErro(`Data de nascimento: ${validacaoData.erro}`);
        setEnviando(false);
        return;
      }

            if (!formData.telefone.trim()) {
        setErro('Por favor, preencha seu telefone.');
        setEnviando(false);
        return;
      }

      if (!validarTelefone(formData.telefone)) {
        setErro('Telefone deve ter 10 ou 11 dígitos.');
        setEnviando(false);
        return;
      }

      if (!formData.email.trim()) {
        setErro('Por favor, preencha seu email.');
        setEnviando(false);
        return;
      }

      if (!validarEmail(formData.email)) {
        setErro('Email deve ter um formato válido.');
        setEnviando(false);
        return;
      }

      if (!formData.enderecoCompleto.trim()) {
        setErro('Por favor, preencha seu endereço completo.');
        setEnviando(false);
        return;
      }

      if (formData.enderecoCompleto.trim().length < 10) {
        setErro('Endereço deve ter pelo menos 10 caracteres.');
        setEnviando(false);
        return;
      }

      if (!formData.profissao.trim()) {
        setErro('Por favor, preencha sua profissão.');
        setEnviando(false);
        return;
      }

      if (!formData.motivoAssociacao.trim()) {
        setErro('Por favor, conte-nos por que quer se associar.');
        setEnviando(false);
        return;
      }

      if (formData.motivoAssociacao.trim().length < 20) {
        setErro('Por favor, descreva melhor o motivo (mínimo 20 caracteres).');
        setEnviando(false);
        return;
      }

      if (!formData.comoConheceu.trim()) {
        setErro('Por favor, conte-nos como conheceu a AMO.');
        setEnviando(false);
        return;
      }

      console.log('✅ [ASSOCIACAO] Validações OK, enviando...');

      // Teste de conexão primeiro
      const conexaoOk = await apiService.testarConexao();
      if (!conexaoOk) {
        setErro('❌ Sem conexão com o servidor. Verifique sua internet.');
        setEnviando(false);
        return;
      }

      // Enviar para o backend
      const resultado = await apiService.enviarFormularioAssociacao(formData);

      if (resultado.success) {
        const patrocinadorAleatorio = patrocinadores[Math.floor(Math.random() * patrocinadores.length)];
                
                const mensagemSucesso = `Seu formulário foi enviado com sucesso!\n\n💝 Cortesia da:\n${patrocinadorAleatorio}`;
                
                mostrarSucesso(mensagemSucesso);
                
                // Se for web, limpar formulário após delay
                if (Platform.OS === 'web') {
                  setTimeout(() => {
                    limparFormulario();
                  }, 5000);
                }
                
              } else {
                mostrarErro(resultado.message);
              }


    } catch (error) {
      console.error('❌ [ASSOCIACAO] Erro ao enviar formulário:', error);
      setErro('❌ Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  const limparFormulario = () => {
    setFormData({
      nomeCompleto: '',
      cpf: '',
      rg: '',
      dataNascimento: '',
      telefone: '',
      email: '',
      enderecoCompleto: '',
      profissao: '',
      motivoAssociacao: '',
      comoConheceu: ''
    });
    setErro('');
    setErrosCampos({ cpf: '', rg: '', data: '' });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.title, { color: primaryColor }]}>🤝 Associe-se à AMO</Text>
        
        <Text style={[styles.description, { color: textColor }]}>
          Faça parte da AMO Orlândia! Preencha o formulário abaixo para se tornar um associado e contribuir para o desenvolvimento da nossa cidade.
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

          <Text style={[styles.label, { color: textColor }]}>
            CPF: * ({contarDigitosCPF(formData.cpf)}/11)
          </Text>
          <TextInput
            style={[
              styles.input, 
              { 
                borderColor: errosCampos.cpf ? '#E74C3C' : primaryColor, 
                color: textColor 
              }
            ]}
            value={formData.cpf}
            onChangeText={handleCPFChange}
            placeholder="000.000.000-00"
            placeholderTextColor={textColor + '80'}
            keyboardType="numeric"
            maxLength={14}
            editable={!enviando}
          />
          {errosCampos.cpf ? (
            <Text style={styles.errorText}>{errosCampos.cpf}</Text>
          ) : formData.cpf.length > 0 && contarDigitosCPF(formData.cpf) < 11 && (
            <Text style={styles.infoText}>CPF deve ter 11 dígitos</Text>
          )}

          <Text style={[styles.label, { color: textColor }]}>
            RG: * ({contarDigitosRG(formData.rg)}/9)
          </Text>
          <TextInput
            style={[
              styles.input, 
              { 
                borderColor: errosCampos.rg ? '#E74C3C' : primaryColor, 
                color: textColor 
              }
            ]}
            value={formData.rg}
            onChangeText={handleRGChange}
            placeholder="00.000.000-0"
            placeholderTextColor={textColor + '80'}
            keyboardType="numeric"
            maxLength={12}
            editable={!enviando}
          />
          {errosCampos.rg ? (
            <Text style={styles.errorText}>{errosCampos.rg}</Text>
          ) : formData.rg.length > 0 && contarDigitosRG(formData.rg) < 8 && (
            <Text style={styles.infoText}>RG deve ter entre 8 e 9 dígitos</Text>
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
              {enviando ? 'Enviando... ⏳' : 'Enviar Solicitação 🤝'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.infoBox, { backgroundColor: primaryColor + '15', borderColor: primaryColor }]}>
          <Text style={[styles.infoTitle, { color: primaryColor }]}>ℹ️ Informações Importantes</Text>
          <Text style={[styles.infoText, { color: textColor }]}>
            • Após o envio, nossa equipe analisará sua solicitação{'\n'}
            • Entraremos em contato em até 5 dias úteis{'\n'}
            • Todos os dados são confidenciais e protegidos{'\n'}
            • A associação é gratuita para moradores de Orlândia{'\n'}
            • CPF, RG e data são validados automaticamente
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