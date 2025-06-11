import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import os from 'os';
import path from 'path';

// 🔧 CARREGAR .env ANTES DE TUDO
const envPath = path.join(__dirname, '../.env');
console.log('🔍 [ENV] Tentando carregar .env de:', envPath);

const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error('❌ [ENV] Erro ao carregar .env:', result.error);
  console.log('🔍 [ENV] Tentando carregar .env do diretório atual...');
  dotenv.config(); // Fallback
} else {
  console.log('✅ [ENV] Arquivo .env carregado com sucesso!');
}

// 🔍 DIAGNÓSTICO - Verificar variáveis
console.log('🔍 [DEBUG] Verificando variáveis de ambiente:');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ CONFIGURADO' : '❌ NÃO ENCONTRADO');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ CONFIGURADO' : '❌ NÃO ENCONTRADO');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST || '❌ NÃO ENCONTRADO');
console.log('EMAIL_PORT:', process.env.EMAIL_PORT || '❌ NÃO ENCONTRADO');
console.log('EMAIL_FROM:', process.env.EMAIL_FROM || '❌ NÃO ENCONTRADO');
console.log('EMAIL_TO:', process.env.EMAIL_TO || '❌ NÃO ENCONTRADO');

// Importar rotas e serviços DEPOIS de carregar o .env
import emailRoutes from './routes/emailRoutes';
import emailService from './services/emailService';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// 🌐 CORS CONFIGURADO PARA ACESSO REMOTO
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rotas
app.use('/api/email', emailRoutes);

// Rota de teste básica
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AMO Orlândia Backend funcionando!',
    timestamp: new Date().toISOString(),
    env: {
      emailConfigured: !!process.env.EMAIL_USER,
      port: PORT,
      nodeEnv: process.env.NODE_ENV
    }
  });
});

// 🧪 ROTA DE TESTE DE EMAIL
app.get('/api/test-email', async (req, res) => {
  try {
    console.log('🧪 [TEST] Testando conexão de email...');
    
    const conexaoOk = await emailService.verificarConexao();
    
    if (conexaoOk) {
      res.json({
        success: true,
        message: 'Conexão de email OK!',
        config: {
          user: process.env.EMAIL_USER,
          from: process.env.EMAIL_FROM,
          to: process.env.EMAIL_TO
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Falha na conexão de email'
      });
    }
  } catch (error) {
    console.error('❌ [TEST] Erro no teste de email:', error);
    res.status(500).json({
      success: false,
      message: 'Erro no teste de email',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// 🧪 ROTA PARA ENVIAR EMAIL DE TESTE
app.get('/api/send-test-email', async (req, res) => {
  try {
    console.log('🧪 [TEST] Tentando enviar email de teste...');
    
    const emailEnviado = await emailService.enviarEmailTeste();
    
    if (emailEnviado) {
      res.json({
        success: true,
        message: 'Email de teste enviado com sucesso! Verifique sua caixa de entrada.'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Falha ao enviar email de teste'
      });
    }
  } catch (error) {
    console.error('❌ [TEST] Erro ao enviar email de teste:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar email de teste',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// 🔧 ROTA PARA LISTAR TODAS AS ROTAS
app.get('/api/routes', (req, res) => {
  const routes: string[] = [];
  
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      routes.push(`${Object.keys(middleware.route.methods)[0].toUpperCase()} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler: any) => {
        if (handler.route) {
          routes.push(`${Object.keys(handler.route.methods)[0].toUpperCase()} /api/email${handler.route.path}`);
        }
      });
    }
  });
  
  res.json({
    message: 'Rotas disponíveis:',
    routes: routes
  });
});

// Middleware de erro global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ [ERROR] Erro global:', err);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 🌐 FUNÇÃO PARA OBTER IP LOCAL
function getLocalIP(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// Iniciar servidor
app.listen(PORT, '0.0.0.0', async () => {
  const localIP = getLocalIP();
  
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Acesso local: http://localhost:${PORT}`);
  console.log(`🌐 Acesso remoto: http://${localIP}:${PORT}`);
  console.log(`📧 Email configurado: ${process.env.EMAIL_USER}`);
  
  // Listar rotas disponíveis
  console.log('📋 Rotas disponíveis:');
  console.log(`   GET  http://${localIP}:${PORT}/api/health`);
  console.log(`   GET  http://${localIP}:${PORT}/api/test-email`);
  console.log(`   GET  http://${localIP}:${PORT}/api/send-test-email`);
  console.log(`   GET  http://${localIP}:${PORT}/api/routes`);
  console.log(`   POST http://${localIP}:${PORT}/api/email/reserva`);
  console.log(`   POST http://${localIP}:${PORT}/api/email/contato`);
  
  // Testar email na inicialização
  console.log('🧪 Testando conexão de email...');
  try {
    const emailOk = await emailService.verificarConexao();
    if (emailOk) {
      console.log('✅ Email configurado corretamente!');
    } else {
      console.log('❌ Problema na configuração de email!');
    }
  } catch (error) {
    console.log('❌ Erro ao testar email:', error);
  }
});

export default app;
