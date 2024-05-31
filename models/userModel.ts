import { Sequelize, Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/db';

export default class User extends Model {
  declare id: number;
  declare nombre: string;
  declare apellido: string;
  declare email: string;
  declare password: string;

  static InitModel() {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        nombre: {
          type: new DataTypes.STRING(128),
          allowNull: true,
        },
        apellido: {
          type: new DataTypes.STRING(128),
          allowNull: true,
        },
        email: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        password: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
      },
      {
        sequelize: sequelize, // passing the `sequelize` instance is required
        modelName: 'Usuarios',
        timestamps: false
      },
    );
  }
}
User.InitModel()