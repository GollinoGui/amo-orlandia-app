const { onRequest } = require('firebase-functions/v2/https');
const cors = require('cors')({
  origin: '*',  // isso permite tudo
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
});

const emailService = require('./emailService');
const Busboy = require('busboy');;
const os = require('os');
const path = require('path');
const fs = require('fs');
// Middleware para CORS
const corsHandler = (req, res, handler) => {
  return cors(req, res, () => handler(req, res));
};
exports.health = onRequest((req, res) => {
  return corsHandler(req, res, () => {
    res.json({ message: 'API ativa' });
  });
});

// 🪑 ENVIAR FORMULÁRIO DE RESERVA
exports.enviarFormularioReserva = onRequest(async (req, res) => {
  return corsHandler(req, res, async (req, res) => {
    try {
      console.log('📝 Recebendo formulário de reserva...');
      console.log('Body:', req.body);
      console.log('File:', req.file);

      const { nome, telefone, telefoneContato, endereco, diasEspera, aptoDoacao } = req.body;

      // Validações básicas
      if (!nome || !telefone || !endereco || !diasEspera || !aptoDoacao) {
        return res.status(400).json({
          success: false,
          message: 'Campos obrigatórios não preenchidos'
        });
      }

      // Preparar dados do email
      const emailData = {
        nome,
        telefone,
        telefoneContato: telefoneContato || undefined,
        endereco,
        diasEspera,
        aptoDoacao,
        fotoMovel: req.file ? req.file.path : undefined
      };

      // Enviar email
      const emailEnviado = await emailService.enviarFormularioReserva(emailData);

      if (emailEnviado) {
        console.log('✅ Email de reserva enviado com sucesso');
        return res.json({
          success: true,
          message: 'Formulário enviado com sucesso!'
        });
      } else {
        console.log('❌ Falha ao enviar email de reserva');
        return res.status(500).json({
          success: false,
          message: 'Erro ao enviar formulário. Tente novamente.'
        });
      }

    } catch (error) {
      console.error('❌ Erro no controller de reserva:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  });
});

// 📞 ENVIAR FORMULÁRIO DE CONTATO
exports.enviarFormularioContato = onRequest(async (req, res) => {
  return corsHandler(req, res, async (req, res) => {
    console.log('🔥 Controller de contato chamado');
    try {
      console.log('📞 Recebendo formulário de contato...');
      console.log('Body:', req.body);

      const { nome, telefone, email, mensagem, assunto } = req.body;

      // Validações básicas
      if (!nome || !telefone || !mensagem) {
        return res.status(400).json({
          success: false,
          message: 'Campos obrigatórios não preenchidos (nome, telefone, mensagem)'
        });
      }

      // Usar assunto padrão se não fornecido
      const assuntoFinal = assunto || 'Contato Geral';
      
      // Contador simples (no Firebase Functions usaremos Firestore depois se precisar)
      const totalAssunto = 1; // Por enquanto fixo

      // Prepara dados do email
      const emailData = {
        nome,
        telefone,
        email: email || undefined,
        mensagem,
        assunto: assuntoFinal,
        totalAssunto
      };

      console.log('📧 Enviando email de contato com dados:', emailData);

      const emailEnviado = await emailService.enviarFormularioContato(emailData);

      if (emailEnviado) {
        console.log('✅ Email de contato enviado com sucesso');
        return res.json({
          success: true,
          message: 'Mensagem enviada com sucesso!'
        });
      } else {
        console.log('❌ Falha ao enviar email de contato');
        return res.status(500).json({
          success: false,
          message: 'Erro ao enviar mensagem. Tente novamente.'
        });
      }

    } catch (error) {
      console.error('❌ Erro no controller de contato:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  });
});

// 🤝 ENVIAR FORMULÁRIO DE ASSOCIAÇÃO
exports.enviarFormularioAssociacao = onRequest(async (req, res) => {
  return corsHandler(req, res, async (req, res) => {
    console.log('📩 [BACKEND] Recebendo formulário de associação...');
    try {
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

      if (
        !nomeCompleto ||
        !dataNascimento ||
        !telefone ||
        !email ||
        !enderecoCompleto ||
        !profissao ||
        !motivoAssociacao ||
        !comoConheceu
      ) {
        return res.status(400).json({
          success: false,
          message: 'Campos obrigatórios não preenchidos'
        });
      }

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

      console.log('📤 [BACKEND] Enviando email com dados:', emailData);

      const emailEnviado = await emailService.enviarFormularioAssociacao(emailData);

      if (emailEnviado) {
        console.log('✅ [BACKEND] Email de associação enviado com sucesso');
        return res.json({
          success: true,
          message: 'Formulário de associação enviado com sucesso!'
        });
      } else {
        console.error('❌ [BACKEND] Falha ao enviar email de associação');
        return res.status(500).json({
          success: false,
          message: 'Erro ao enviar formulário. Tente novamente.'
        });
      }
    } catch (error) {
      console.error('❌ [BACKEND] Erro no envio de associação:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  });
});



// Substitua a função enviarFormularioDenuncia por esta versão corrigida:

exports.enviarFormularioDenuncia = onRequest((req, res) => {
  return corsHandler(req, res, async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    console.log('🚨 [FIREBASE] Recebendo denúncia...');
    console.log('🚨 [FIREBASE] Headers:', req.headers);

    const busboy = new Busboy({ headers: req.headers });
    const fields = {};
    const files = [];

    // ✅ PROCESSAR CAMPOS
    busboy.on('field', (name, value) => {
      console.log(`📝 [FIREBASE] Campo recebido: ${name} = ${value}`);
      fields[name] = value;
    });

    // ✅ PROCESSAR ARQUIVOS
    busboy.on('file', (name, file, filename, encoding, mimetype) => {
      console.log(`📸 [FIREBASE] Arquivo recebido: ${filename} (${mimetype})`);
      
      const saveTo = path.join(os.tmpdir(), `${Date.now()}-${filename}`);
      const writeStream = fs.createWriteStream(saveTo);
      
      file.pipe(writeStream);
      
      files.push({
        fieldname: name,
        filepath: saveTo,
        filename,
        mimetype
      });
    });

    // ✅ PROCESSAR QUANDO TERMINAR
    busboy.on('finish', async () => {
      try {
        console.log('✅ [FIREBASE] Busboy processamento concluído');
        console.log('📝 [FIREBASE] Campos recebidos:', Object.keys(fields));
        console.log('📸 [FIREBASE] Arquivos recebidos:', files.length);

        const {
          tipo,
          descricao,
          endereco,
          nomeCompleto,
          telefone,
          email,
          latitude,
          longitude
        } = fields;

        // ✅ VALIDAÇÕES DETALHADAS
        const camposObrigatorios = { tipo, descricao, endereco, nomeCompleto, telefone, email };
        const camposFaltando = Object.entries(camposObrigatorios)
          .filter(([key, value]) => !value || value.trim() === '')
          .map(([key]) => key);

        if (camposFaltando.length > 0) {
          console.error('❌ [FIREBASE] Campos obrigatórios faltando:', camposFaltando);
          return res.status(400).json({
            success: false,
            message: `Campos obrigatórios não preenchidos: ${camposFaltando.join(', ')}`
          });
        }

        // ✅ PREPARAR COORDENADAS
        let coordenadas = undefined;
        if (latitude && longitude) {
          coordenadas = {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
          };
        }

        // ✅ PREPARAR CAMINHOS DAS FOTOS
        const fotos = files.map(f => f.filepath);

        // ✅ DADOS PARA O EMAIL SERVICE
        const emailData = {
          tipo,
          descricao,
          endereco,
          nomeCompleto,
          telefone,
          email,
          coordenadas,
          fotos
        };

        console.log('📧 [FIREBASE] Enviando para emailService:', {
          ...emailData,
          fotos: `${fotos.length} fotos`
        });

        // ✅ ENVIAR EMAIL
        const enviado = await emailService.enviarFormularioDenuncia(emailData);

        if (enviado) {
          console.log('✅ [FIREBASE] Email enviado com sucesso');
          
          // ✅ LIMPAR ARQUIVOS TEMPORÁRIOS
          files.forEach(file => {
            try {
              fs.unlinkSync(file.filepath);
            } catch (e) {
              console.warn('⚠️ [FIREBASE] Erro ao limpar arquivo:', e);
            }
          });

          return res.status(200).json({ 
            success: true, 
            message: 'Denúncia enviada com sucesso!' 
          });
        } else {
          console.error('❌ [FIREBASE] Falha ao enviar email');
          return res.status(500).json({ 
            success: false, 
            message: 'Erro ao enviar email de denúncia' 
          });
        }
      } catch (error) {
        console.error('❌ [FIREBASE] Erro ao processar denúncia:', error);
        return res.status(500).json({ 
          success: false, 
          message: 'Erro interno do servidor' 
        });
      }
    });

    // ✅ TRATAR ERROS DO BUSBOY
    busboy.on('error', (error) => {
      console.error('❌ [FIREBASE] Erro no Busboy:', error);
      return res.status(400).json({ 
        success: false, 
        message: 'Erro ao processar dados do formulário' 
      });
    });

    // ✅ INICIAR PROCESSAMENTO
    req.pipe(busboy);
  });
});

