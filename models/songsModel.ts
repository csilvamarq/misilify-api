
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/db';
import User from './userModel';


export default class Song extends Model {
  declare id: number;
  declare title: string;
  declare artist: string;
  declare duration: number;
  declare userId: number; // Definimos userId en el model
  // Método para inicializar el modelo
    static initModel () {
      
      Song.init({
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        autor: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        duracion: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        fecha_lanzamiento:{
          type : DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        portada: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        reproducciones: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        likes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        archivo_mp3: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        dislikes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        genero: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        usuario_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User, // Modelo de usuario
            key: 'id',   // Campo de referencia en el modelo de usuario
          },
        },
      },   {
        sequelize,
        modelName: 'Canciones',
        timestamps: false
      }
    );
  }
}
Song.initModel()