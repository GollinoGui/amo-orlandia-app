import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import os from 'os';
import path from 'path';

// 🔧 CARREGAR .env
const envPath = path.join(__dirname, '../.env');
console.log('🔍 [ENV] Carregando .env de:', envPath);

const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error('❌ [ENV] Erro ao carregar .env:', result.error);
  dotenv.config(); // Fallback
} else {
  console.log('✅ [ENV] Arquivo .env carregado!');
}

// Importar após carregar .env
import emailRoutes from './routes/emailRoutes';
import emailService from './services/emailService';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// 🌐 CORS MAIS PERMISSIVO
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200
}));

// 🔧 MIDDLEWARE PARA LOGS
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('📋 [HEADERS]:', req.headers);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('📦 [BODY]:', req.body);
  }
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 🔧 ROTAS
app.use('/api/email', emailRoutes);

// 🧪 ROTA DE SAÚDE MELHORADA
app.get('/api/health', (req, res) => {
  console.log('🏥 [HEALTH] Verificação de saúde solicitada');
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
    console.log('🧪 [TEST] Testando email...');
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
    console.error('❌ [TEST] Erro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro no teste de email',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// 🔧 MIDDLEWARE DE ERRO GLOBAL
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ [ERROR] Erro global:', err);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 🌐 FUNÇÃO PARA OBTER IP
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

// 🚀 INICIAR SERVIDOR
app.listen(PORT, '0.0.0.0', async () => {
  const localIP = getLocalIP();
  
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Acesso local: http://localhost:${PORT}`);
  console.log(`🌐 Acesso remoto: http://${localIP}:${PORT}`);
  console.log(`📧 Email: ${process.env.EMAIL_USER}`);
  
  // Listar rotas
  console.log('📋 Rotas disponíveis:');
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   POST http://localhost:${PORT}/api/email/reserva`);
  console.log(`   POST http://localhost:${PORT}/api/email/contato`);
  console.log(`   POST http://localhost:${PORT}/api/email/associacao`);
  
  // Testar email
  try {
    const emailOk = await emailService.verificarConexao();
    console.log(emailOk ? '✅ Email OK!' : '❌ Email com problema!');
  } catch (error) {
    console.log('❌ Erro ao testar email:', error);
  }
});

export default app;
