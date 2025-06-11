import express from 'express';
import upload from '../middleware/uploadMiddleware';
import emailService from '../services/emailService';

const router = express.Router();

// Rota para formulário de reserva COM upload de imagem
router.post('/reserva', upload.single('fotoMovel'), async (req, res) => {
  try {
    console.log('📧 [ROUTE] Recebendo formulário de reserva...');
    console.log('📄 [ROUTE] Dados:', req.body);
    console.log('📸 [ROUTE] Arquivo:', req.file ? req.file.filename : 'Nenhum');

    const { nome, telefone, telefoneContato, endereco, diasEspera, aptoDoacao } = req.body;

    // Validações básicas
    if (!nome || !telefone || !endereco || !diasEspera || !aptoDoacao) {
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios não preenchidos'
      });
    }

    // Dados para o email
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
      res.json({
        success: true,
        message: 'Formulário enviado com sucesso!'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Erro ao enviar email'
      });
    }

  } catch (error) {
    console.error('❌ [ROUTE] Erro na rota de reserva:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Rota para formulário de contato (sem upload)
router.post('/contato', async (req, res) => {
  try {
    console.log('📧 [ROUTE] Recebendo formulário de contato...');
    console.log('📄 [ROUTE] Dados:', req.body);

    const { nome, telefone, email, mensagem } = req.body;

    // Validações básicas
    if (!nome || !telefone || !mensagem) {
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios não preenchidos'
      });
    }

    // Dados para o email
    const emailData = {
      nome,
      telefone,
      email: email || undefined,
      mensagem
    };

    // Enviar email
    const emailEnviado = await emailService.enviarFormularioContato(emailData);

    if (emailEnviado) {
      res.json({
        success: true,
        message: 'Mensagem enviada com sucesso!'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Erro ao enviar email'
      });
    }

  } catch (error) {
    console.error('❌ [ROUTE] Erro na rota de contato:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;
