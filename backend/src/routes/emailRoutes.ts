import express from 'express';
import emailService from '../services/emailService';

const router = express.Router();

// Rota para formulário de reserva
router.post('/reserva', async (req, res) => {
  try {
    console.log('🔍 [DEBUG] Rota /reserva chamada');
    console.log('🔍 [DEBUG] Headers:', req.headers);
    console.log('🔍 [DEBUG] Body recebido:', req.body);
    
    const { nome, telefone, telefoneContato, endereco, diasEspera, aptoDoacao, fotoMovel } = req.body;
    
    // Validações básicas
    if (!nome || !telefone || !endereco || !diasEspera || !aptoDoacao) {
      console.log('❌ [DEBUG] Validação falhou:', { nome: !!nome, telefone: !!telefone, endereco: !!endereco, diasEspera: !!diasEspera, aptoDoacao: !!aptoDoacao });
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios não preenchidos'
      });
    }
    
    console.log('✅ [DEBUG] Validações passaram, tentando enviar email...');
    
    // Enviar email
    const emailEnviado = await emailService.enviarFormularioReserva({
      nome,
      telefone,
      telefoneContato,
      endereco,
      diasEspera,
      aptoDoacao,
      fotoMovel
    });
    
    console.log('🔍 [DEBUG] Resultado do email:', emailEnviado);
    
    if (emailEnviado) {
      console.log('✅ [DEBUG] Email enviado com sucesso');
      res.json({
        success: true,
        message: 'Formulário enviado com sucesso!'
      });
    } else {
      console.log('❌ [DEBUG] Falha ao enviar email');
      res.status(500).json({
        success: false,
        message: 'Erro ao enviar email. Tente novamente.'
      });
    }
    
  } catch (error) {
    console.error('❌ [DEBUG] Erro na rota:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Rota para formulário de contato
router.post('/contato', async (req, res) => {
  try {
    console.log('🔍 [DEBUG] Rota /contato chamada');
    console.log('🔍 [DEBUG] Body recebido:', req.body);
    
    const { nome, telefone, email, mensagem } = req.body;
    
    // Validações básicas
    if (!nome || !telefone || !mensagem) {
      console.log('❌ [DEBUG] Validação contato falhou:', { nome: !!nome, telefone: !!telefone, mensagem: !!mensagem });
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios não preenchidos'
      });
    }
    
    console.log('✅ [DEBUG] Validações contato passaram, tentando enviar email...');
    
    // Enviar email
    const emailEnviado = await emailService.enviarFormularioContato({
      nome,
      telefone,
      email,
      mensagem
    });
    
    console.log('🔍 [DEBUG] Resultado do email contato:', emailEnviado);
    
    if (emailEnviado) {
      console.log('✅ [DEBUG] Email contato enviado com sucesso');
      res.json({
        success: true,
        message: 'Mensagem enviada com sucesso!'
      });
    } else {
      console.log('❌ [DEBUG] Falha ao enviar email contato');
      res.status(500).json({
        success: false,
        message: 'Erro ao enviar email. Tente novamente.'
      });
    }
    
  } catch (error) {
    console.error('❌ [DEBUG] Erro na rota contato:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;
