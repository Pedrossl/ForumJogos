import { DataTypes } from 'sequelize';

import { sequelize } from '../databases/conecta.js';
import { Jogos } from './Jogos.js';
import { Usuario } from './Usuario.js';

export const Nota = sequelize.define('nota', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nota: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
    validate: {
        min: 0,
        min: 5
        
    }
  },
    
});

Nota.belongsTo(Jogos, {
    foreignKey: 'jogo_id',
    allowNull: false
},
) 
Jogos.hasMany(Nota, { foreignKey: 'jogo_id'});

Nota.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    allowNull: false
})



