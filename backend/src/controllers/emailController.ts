import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import emailService from '../services/emailService';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

class EmailController {
  // Enviar formulário de política de reserva
  async enviarFormularioReserva(req: MulterRequest, res: Response) {
    try {
      console.log('📝 Recebendo formulário de reserva...');
      console.log('Body:', req.body);
      console.log('File:', req.file);

      const { nome, telefone, telefoneContato, endereco, diasEspera, aptoDoacao } = req.body;

      // Validações básicas
      if (!nome || !telefone || !endereco || !diasEspera || !aptoDoacao) {
        res.status(400).json({
          success: false,
          message: 'Campos obrigatórios não preenchidos'
        });
        return;
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
        res.json({
          success: true,
          message: 'Formulário enviado com sucesso!'
        });
      } else {
        console.log('❌ Falha ao enviar email de reserva');
        res.status(500).json({
          success: false,
          message: 'Erro ao enviar formulário. Tente novamente.'
        });
      }

    } catch (error) {
      console.error('❌ Erro no controller de reserva:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

   enviarFormularioContato = async (req: Request, res: Response): Promise<void> => {
    console.log('🔥 Controller de contato chamado');
    try {
      console.log('📞 Recebendo formulário de contato...');
      console.log('Body:', req.body);

      const { nome, telefone, email, mensagem, assunto } = req.body;

      // Validações básicas
      if (!nome || !telefone || !mensagem) {
        res.status(400).json({
          success: false,
          message: 'Campos obrigatórios não preenchidos (nome, telefone, mensagem)'
        });
        return;
      }

      // Criar diretório se não existir
      const dataDir = path.join(__dirname, '../data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Salvar contato no arquivo
      const dataPath = path.join(dataDir, 'contatos.json');
      let contadores: Record<string, number> = {};
      
      if (fs.existsSync(dataPath)) {
        try {
          const fileContent = fs.readFileSync(dataPath, 'utf-8');
          contadores = JSON.parse(fileContent);
        } catch (parseError) {
          console.log('⚠️ Erro ao ler arquivo de contatos, criando novo');
          contadores = {};
        }
      }

      // Usar assunto padrão se não fornecido
      const assuntoFinal = assunto || 'Contato Geral';
      
      // Atualiza o contador do assunto
      contadores[assuntoFinal] = (contadores[assuntoFinal] || 0) + 1;
      
      try {
        fs.writeFileSync(dataPath, JSON.stringify(contadores, null, 2));
      } catch (writeError) {
        console.error('❌ Erro ao salvar contador:', writeError);
      }

      // Prepara dados do email
      const emailData = {
        nome,
        telefone,
        email: email || undefined,
        mensagem,
        assunto: assuntoFinal,
        totalAssunto: contadores[assuntoFinal]
      };

      console.log('📧 Enviando email de contato com dados:', emailData);

      // ✅ CORREÇÃO PRINCIPAL - Chama a função CORRETA!
      const emailEnviado = await emailService.enviarFormularioContato(emailData);

      if (emailEnviado) {
        console.log('✅ Email de contato enviado com sucesso');
        res.json({
          success: true,
          message: 'Mensagem enviada com sucesso!'
        });
      } else {
        console.log('❌ Falha ao enviar email de contato');
        res.status(500).json({
          success: false,
          message: 'Erro ao enviar mensagem. Tente novamente.'
        });
      }

    } catch (error) {
      console.error('❌ Erro no controller de contato:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  // Testar conexão de email
  async testarConexao(req: Request, res: Response) {
    try {
      console.log('🔍 Testando conexão de email...');
      
      const conexaoOk = await emailService.verificarConexao();
      
      if (conexaoOk) {
        res.json({
          success: true,
          message: 'Conexão com servidor de email OK!'
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Falha na conexão com servidor de email'
        });
      }
    } catch (error) {
      console.error('❌ Erro ao testar conexão:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao testar conexão'
      });
    }
  }
}

const emailController = new EmailController();
export default emailController;