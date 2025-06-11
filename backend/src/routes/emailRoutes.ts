import { Router } from 'express';
import emailController from '../controllers/emailController';
import upload from '../middleware/uploadMiddleware';

const router = Router();

// Rota para enviar formulário de política de reserva (com upload de foto)
router.post('/reserva', upload.single('fotoMovel'), emailController.enviarFormularioReserva);

// Rota para enviar formulário de contato
router.post('/contato', emailController.enviarFormularioContato);

// Rota para testar conexão de email
router.get('/test', emailController.testarConexao);

// 🧪 NOVA ROTA - Teste de envio de email
router.get('/test-send', async (req, res) => {
  try {
    const emailService = require('../services/emailService').default;
    
    const testData = {
      nome: 'Teste AMO',
      telefone: '(16) 99999-9999',
      email: 'teste@teste.com',
      mensagem: 'Este é um teste de envio de email do backend AMO Orlândia!'
    };

    const enviado = await emailService.enviarFormularioContato(testData);
    
    if (enviado) {
      res.json({ success: true, message: 'Email de teste enviado com sucesso!' });
    } else {
      res.json({ success: false, message: 'Falha ao enviar email de teste' });
    }
  } catch (error) {
    console.error('Erro no teste de email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro no teste de envio de email'
    });
  }
});

export default router;
