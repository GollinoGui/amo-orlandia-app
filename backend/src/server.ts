import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

// Configurar variáveis de ambiente
dotenv.config();

// 🔍 DEBUG - Verificar se .env está sendo lido
console.log('🔍 DEBUG - Variáveis de ambiente:');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***configurada***' : '❌ NÃO ENCONTRADA');

// Importar rotas
import emailRoutes from './routes/emailRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// ... resto do código igual


// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8081',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rotas
app.use('/api/email', emailRoutes);

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AMO Orlândia Backend funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Middleware de erro global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro:', err);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📧 Email configurado: ${process.env.EMAIL_USER}`);
  console.log(`🌐 CORS habilitado para: ${process.env.CORS_ORIGIN}`);
});

export default app;
