import express, { Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import emailService from '../services/emailService';

const router = express.Router();

// Configuração do multer
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
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas'));
    }
  }
});

// 🪑 RESERVA
router.post('/reserva', upload.single('fotoMovel'), async (req: Request, res: Response) => {
  try {
    console.log('📧 [RESERVA] Dados recebidos:', req.body);
    
    const { nome, telefone, telefoneContato, endereco, diasEspera, aptoDoacao } = req.body;

    if (!nome || !telefone || !endereco || !diasEspera || !aptoDoacao) {
      res.status(400).json({
        success: false,
        message: 'Campos obrigatórios não preenchidos'
      });
      return;
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
      console.log('✅ [RESERVA] Email enviado');
      res.json({
        success: true,
        message: 'Formulário enviado com sucesso!'
      });
    } else {
      console.log('❌ [RESERVA] Falha no email');
      res.status(500).json({
        success: false,
        message: 'Erro ao enviar email'
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

// 📞 CONTATO
router.post('/contato', async (req: Request, res: Response) => {
  try {
    console.log('📞 [CONTATO] Dados recebidos:', req.body);
    
    const { nome, telefone, email, mensagem, assunto } = req.body;

    if (!nome || !telefone || !mensagem || !assunto) {
      res.status(400).json({
        success: false,
        message: 'Campos obrigatórios não preenchidos'
      });
      return;
    }

    // Gerenciar contador
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const dataPath = path.join(dataDir, 'contatos.json');
    let contadores: Record<string, number> = {};
    
    if (fs.existsSync(dataPath)) {
      try {
        contadores = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      } catch (e) {
        contadores = {};
      }
    }

    contadores[assunto] = (contadores[assunto] || 0) + 1;
    fs.writeFileSync(dataPath, JSON.stringify(contadores, null, 2));

    // Enviar email
    const emailEnviado = await emailService.enviarFormularioContato({
      nome,
      telefone,
      email: email || undefined,
      mensagem,
      assunto,
      totalAssunto: contadores[assunto]
    });

    if (emailEnviado) {
      console.log('✅ [CONTATO] Email enviado');
      res.json({
        success: true,
        message: 'Mensagem enviada com sucesso!'
      });
    } else {
      console.log('❌ [CONTATO] Falha no email');
      res.status(500).json({
        success: false,
        message: 'Erro ao enviar mensagem'
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

// 🤝 ASSOCIAÇÃO
router.post('/associacao', async (req: Request, res: Response) => {
  try {
    console.log('🤝 [ASSOCIACAO] Dados recebidos:', req.body);
    
    const {
      nomeCompleto, cpf, rg, dataNascimento, telefone, email,
      enderecoCompleto, profissao, motivoAssociacao, comoConheceu
    } = req.body;

    if (!nomeCompleto || !cpf || !rg || !dataNascimento || !telefone || !email) {
      res.status(400).json({
        success: false,
        message: 'Campos obrigatórios não preenchidos'
      });
      return;
    }

    const emailEnviado = await emailService.enviarFormularioAssociacao({
      nomeCompleto, cpf, rg, dataNascimento, telefone, email,
      enderecoCompleto, profissao, motivoAssociacao, comoConheceu
    });

    if (emailEnviado) {
      console.log('✅ [ASSOCIACAO] Email enviado');
      res.json({
        success: true,
        message: 'Formulário enviado com sucesso!'
      });
    } else {
      console.log('❌ [ASSOCIACAO] Falha no email');
      res.status(500).json({
        success: false,
        message: 'Erro ao enviar email'
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
