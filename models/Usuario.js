import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'

import { sequelize } from '../databases/conecta.js';
import { Nivel } from './Nivel.js';

// tabela usuario

export const Usuario = sequelize.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  user: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  nivel: {
    type: DataTypes.INTEGER(1),
    allowNull: false
  },  
  tentativasLogin: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  // Definir os campos visíveis/invisíveis
  defaultScope: {
    attributes: { exclude: ['tentativaLogin'] }
  },
},
{
  paranoid: true
},
  {
    timestamps: false
});

Usuario.beforeCreate(usuario => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(usuario.senha, salt)
  usuario.senha = hash  
});

Nivel.hasMany(Usuario, { foreignKey: 'nivel', sourceKey: 'id' });
