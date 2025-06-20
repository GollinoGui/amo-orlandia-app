const { onRequest } = require('firebase-functions/v2/https');
const emailService = require('./emailService');

// 🔧 CORS simples e direto
const setCorsHeaders = (res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
};

// 🏥 HEALTH CHECK
exports.health = onRequest((req, res) => {
  setCorsHeaders(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  res.json({ message: 'API ativa', timestamp: new Date().toISOString() });
});

// 🪑 FORMULÁRIO DE RESERVA
exports.enviarFormularioReserva = onRequest(async (req, res) => {
  setCorsHeaders(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    console.log('🪑 [RESERVA] Iniciando processamento...');
    console.log('📥 [RESERVA] Body recebido:', req.body);
    
    const { nome, telefone, telefoneContato, endereco, diasEspera, aptoDoacao } = req.body;
    
    // Validação
    if (!nome || !telefone || !endereco || !diasEspera || !aptoDoacao) {
      console.error('❌ [RESERVA] Campos obrigatórios faltando');
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios não preenchidos'
      });
    }
    
    // Preparar dados
    const emailData = {
      nome,
      telefone,
      telefoneContato: telefoneContato || null,
      endereco,
      diasEspera,
      aptoDoacao
    };
    
    console.log('📧 [RESERVA] Enviando email...');
    const sucesso = await emailService.enviarFormularioReserva(emailData);
    
    if (sucesso) {
      console.log('✅ [RESERVA] Email enviado com sucesso');
      return res.json({
        success: true,
        message: 'Formulário de reserva enviado com sucesso!'
      });
    } else {
      console.error('❌ [RESERVA] Falha no envio do email');
      return res.status(500).json({
        success: false,
        message: 'Erro ao enviar formulário. Tente novamente.'
      });
    }
    
  } catch (error) {
    console.error('❌ [RESERVA] Erro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// 📞 FORMULÁRIO DE CONTATO
exports.enviarFormularioContato = onRequest(async (req, res) => {
  setCorsHeaders(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    console.log('📞 [CONTATO] Iniciando processamento...');
    console.log('📥 [CONTATO] Body recebido:', req.body);
    
    const { nome, telefone, email, mensagem, assunto } = req.body;
    
    // Validação
    if (!nome || !telefone || !mensagem) {
      console.error('❌ [CONTATO] Campos obrigatórios faltando');
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios: nome, telefone e mensagem'
      });
    }
    
    // Preparar dados
    const emailData = {
      nome,
      telefone,
      email: email || null,
      mensagem,
      assunto: assunto || 'Contato Geral'
    };
    
    console.log('📧 [CONTATO] Enviando email...');
    const sucesso = await emailService.enviarFormularioContato(emailData);
    
    if (sucesso) {
      console.log('✅ [CONTATO] Email enviado com sucesso');
      return res.json({
        success: true,
        message: 'Mensagem enviada com sucesso!'
      });
    } else {
      console.error('❌ [CONTATO] Falha no envio do email');
      return res.status(500).json({
        success: false,
        message: 'Erro ao enviar mensagem. Tente novamente.'
      });
    }
    
  } catch (error) {
    console.error('❌ [CONTATO] Erro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// 🤝 FORMULÁRIO DE ASSOCIAÇÃO
exports.enviarFormularioAssociacao = onRequest(async (req, res) => {
  setCorsHeaders(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    console.log('🤝 [ASSOCIACAO] Iniciando processamento...');
    console.log('📥 [ASSOCIACAO] Body recebido:', req.body);
    
    const {
      nomeCompleto,
      dataNascimento,
      telefone,
      email,
      enderecoCompleto,
      profissao,
      motivoAssociacao,
      comoConheceu
    } = req.body;
    
    // Validação
    if (!nomeCompleto || !dataNascimento || !telefone || !email || 
        !enderecoCompleto || !profissao || !motivoAssociacao || !comoConheceu) {
      console.error('❌ [ASSOCIACAO] Campos obrigatórios faltando');
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }
    
    // Preparar dados
    const emailData = {
      nomeCompleto,
      dataNascimento,
      telefone,
      email,
      enderecoCompleto,
      profissao,
      motivoAssociacao,
      comoConheceu
    };
    
    console.log('📧 [ASSOCIACAO] Enviando email...');
    const sucesso = await emailService.enviarFormularioAssociacao(emailData);
    
    if (sucesso) {
      console.log('✅ [ASSOCIACAO] Email enviado com sucesso');
      return res.json({
        success: true,
        message: 'Formulário de associação enviado com sucesso!'
      });
    } else {
      console.error('❌ [ASSOCIACAO] Falha no envio do email');
      return res.status(500).json({
        success: false,
        message: 'Erro ao enviar formulário. Tente novamente.'
      });
    }
    
  } catch (error) {
    console.error('❌ [ASSOCIACAO] Erro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// 🚨 FORMULÁRIO DE DENÚNCIA (Multipart/Form-Data)
const Busboy = require('busboy');
const os = require('os');
const path = require('path');
const fs = require('fs');

exports.enviarFormularioDenuncia = onRequest(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('🚨 [DENUNCIA] Iniciando...');
    const {
      tipo,
      descricao,
      endereco,
      nomeCompleto,
      telefone,
      email,
      coordenadas
    } = req.body;

    // Validação
    if (!tipo || !descricao || !endereco || !nomeCompleto || !telefone || !email) {
      console.error('❌ [DENUNCIA] Campos obrigatórios faltando');
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios não preenchidos'
      });
    }

    // Preparar dados para email
    const emailData = {
      tipo,
      descricao,
      endereco,
      nomeCompleto,
      telefone,
      email,
      coordenadas,
      fotos: [] // sem imagens por enquanto
    };

    console.log('📧 [DENUNCIA] Enviando email...');
    const sucesso = await emailService.enviarFormularioDenuncia(emailData);

    if (sucesso) {
      console.log('✅ [DENUNCIA] Email enviado com sucesso');
      return res.json({
        success: true,
        message: 'Denúncia enviada com sucesso!'
      });
    } else {
      console.error('❌ [DENUNCIA] Falha no envio do email');
      return res.status(500).json({
        success: false,
        message: 'Erro ao enviar denúncia. Tente novamente.'
      });
    }

  } catch (error) {
    console.error('❌ [DENUNCIA] Erro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});