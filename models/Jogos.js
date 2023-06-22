import { DataTypes } from 'sequelize';

import { sequelize } from '../databases/conecta.js';
import { Usuario } from './Usuario.js';

export const Jogos = sequelize.define('jogos', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  nome: {
      type: DataTypes.STRING(40),
      allowNull: false,
  },
  genero: {
      type: DataTypes.STRING(40),
      allowNull: false
  },
  numeroVotos: {
      type: DataTypes.INTEGER(1),
      defaultValue: 0
  },
  preco: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false,
      defaultValue: 0,
  },
  notaTotal: {
      type: DataTypes.DECIMAL(9,2),
      defaultValue: 0,
  },
  avaFinal: {
      type: DataTypes.STRING(40),
      defaultValue: "Sem avaliação suficiente"
  }
});



//Jogos.belongsTo(Usuario, { foreignKey: 'usuario_id' })
//Usuario.hasMany(Jogos, { foreignKey: 'usuario_id' })


Jogos.beforeUpdate(jogo => {
    if (jogo.numeroVotos >= 5) {
      if (jogo.notaTotal < 2) {
        jogo.avaFinal = "Ruim";
      } else if (jogo.notaTotal <= 2 && jogo.notaTotal > 4) {
        jogo.avaFinal = "Regular";
      } else if (jogo.notaTotal <= 4 && jogo.notaTotal > 5) {
        jogo.avaFinal = "Bom";
      } else if (jogo.notaTotal <= 5) {
        jogo.avaFinal = "Ótimo";
      }
    }
  });