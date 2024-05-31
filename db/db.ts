import { Sequelize, Model } from 'sequelize';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

// Inicializar Sequelize
export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE!,
  process.env.MYSQL_USER!,
  process.env.MYSQL_PASSWORD!,
  { dialect: 'mysql' }
);

export const loadModels = async (): Promise<void> => {
  const modelsDir = path.join(__dirname, '../models'); // Ajusta la ruta de acuerdo a tu estructura de carpetas
  const modelFiles = fs.readdirSync(modelsDir).filter(file => file.endsWith('.ts'));

  for (const file of modelFiles) {
    const modelPath = path.join(modelsDir, file);
    const { default: model } = await import(modelPath);

    try {
      if (model && model.prototype instanceof Model) {
        model.initModel(); // Llama al método initModel si está definido en el modelo
      } else {
        console.warn(`El archivo ${file} no exporta un modelo válido.`);
      }
    } catch (error) {
      console.error(`Error al inicializar el modelo ${file}:`, error);
    }
  }
};

// Sincronización de modelos con la base de datos
sequelize.sync({ force: false })
  .then(() => {
    console.log('Modelos sincronizados correctamente con la base de datos.');

    // Verifica si la conexión a la base de datos se ha establecido correctamente
    sequelize.authenticate()
      .then(() => {
        console.log('Sequelize conectado a la base de datos.');
      })
      .catch((error: Error) => {
        console.error('Error al conectar Sequelize a la base de datos:', error);
      });
  })
  .catch((error: Error) => {
    console.error('Error al sincronizar modelos:', error);
  });