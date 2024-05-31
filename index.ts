import express, { Request, Response } from "express";
import router from './routes/routes';
import { loadModels } from "./db/db";
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors())
// Middleware para manejar JSON
app.use(express.json({ limit: '10mb' }));

// Rutas
app.use('/api/v1/', router);

// Middleware para manejar errores 404
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// Middleware para manejar errores
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send('500 - Internal Server Error');
});

// Iniciar el servidor
async function startServer() {
  try {
    await loadModels();
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al cargar modelos:', error);
  }
}

startServer();