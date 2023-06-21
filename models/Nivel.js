import { DataTypes } from 'sequelize';

import { sequelize } from '../databases/conecta.js';

// tabela usuario

export const Nivel = sequelize.define('nivel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(40),
    allowNull: false
  }
},
  {
    tableName: 'niveis',
    timestamps: false
    
}
);

