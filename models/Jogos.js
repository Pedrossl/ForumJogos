import { DataTypes } from 'sequelize';

import { sequelize } from '../databases/conecta.js';

export const Jogos = sequelize.define('jogos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true
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
        allowNull: false
    },
    notaTotal: {
        type: DataTypes.DECIMAL(9,2),
        defaultValue: 0

        },
    avaFinal: {
        type: DataTypes.STRING(40),
        defaultValue: "Sem avaliação Suficientes"
    },

})

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