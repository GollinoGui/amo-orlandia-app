import express from 'express';
import multer from 'multer';
import path from 'path';
import emailService from '../services/emailService';

const router = express.Router();

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'foto-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas'));
    }
  }
});

// Rota para formulário de reserva (com upload de foto)
router.post('/reserva', upload.single('fotoMovel'), async (req, res) => {
  try {
    console.log('📧 [RESERVA] Recebendo formulário de reserva...');
    console.log('📋 [RESERVA] Dados:', req.body);
    console.log('📸 [RESERVA] Arquivo:', req.file);

    const { nome, telefone, telefoneContato, endereco, diasEspera, aptoDoacao } = req.body;

    if (!nome || !telefone || !endereco || !diasEspera || !aptoDoacao) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos obrigatórios devem ser preenchidos'
      });
    }

    const emailEnviado = await emailService.enviarFormularioReserva({
      nome,
      telefone,
      telefoneContato,
      endereco,
      diasEspera,
      aptoDoacao,
      fotoMovel: req.file ? req.file.path : undefined
    });

    if (emailEnviado) {
      console.log('✅ [RESERVA] Email enviado com sucesso!');
      res.json({
        success: true,
        message: 'Formulário de reserva enviado com sucesso!'
      });
    } else {
      console.log('❌ [RESERVA] Falha ao enviar email');
      res.status(500).json({
        success: false,
        message: 'Erro ao enviar email. Tente novamente.'
      });
    }

  } catch (error) {
    console.error('❌ [RESERVA] Erro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Rota para formulário de contato
router.post('/contato', async (req, res) => {
  try {
    console.log('📧 [CONTATO] Recebendo formulário de contato...');
    console.log('📋 [CONTATO] Dados:', req.body);

    const { nome, telefone, email, mensagem } = req.body;

    if (!nome || !telefone || !mensagem) {
      return res.status(400).json({
        success: false,
        message: 'Nome, telefone e mensagem são obrigatórios'
      });
    }

    const emailEnviado = await emailService.enviarFormularioContato({
      nome,
      telefone,
      email,
      mensagem
    });

    if (emailEnviado) {
      console.log('✅ [CONTATO] Email enviado com sucesso!');
      res.json({
        success: true,
        message: 'Mensagem de contato enviada com sucesso!'
      });
    } else {
      console.log('❌ [CONTATO] Falha ao enviar email');
      res.status(500).json({
        success: false,
        message: 'Erro ao enviar email. Tente novamente.'
      });
    }

  } catch (error) {
    console.error('❌ [CONTATO] Erro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// 🆕 Rota para formulário de associação
router.post('/associacao', async (req, res) => {
  try {
    console.log('📧 [ASSOCIACAO] Recebendo formulário de associação...');
    console.log('📋 [ASSOCIACAO] Dados:', req.body);

    const {
      nomeCompleto,
      cpf,
      rg,
      dataNascimento,
      telefone,
      email,
      enderecoCompleto,
      profissao,
      motivoAssociacao,
      comoConheceu
    } = req.body;

    // Validações básicas
    if (!nomeCompleto || !cpf || !rg || !dataNascimento || !telefone || !email) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos obrigatórios devem ser preenchidos'
      });
    }

    // Enviar email
    const emailEnviado = await emailService.enviarFormularioAssociacao({
      nomeCompleto,
      cpf,
      rg,
      dataNascimento,
      telefone,
      email,
      enderecoCompleto,
      profissao,
      motivoAssociacao,
      comoConheceu
    });

    if (emailEnviado) {
      console.log('✅ [ASSOCIACAO] Email enviado com sucesso!');
      res.json({
        success: true,
        message: 'Formulário de associação enviado com sucesso!'
      });
    } else {
      console.log('❌ [ASSOCIACAO] Falha ao enviar email');
      res.status(500).json({
        success: false,
        message: 'Erro ao enviar email. Tente novamente.'
      });
    }

  } catch (error) {
    console.error('❌ [ASSOCIACAO] Erro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;
