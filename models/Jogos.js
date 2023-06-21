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
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    nota: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        validate: {
            min: 0,
            min: 5
            
        }
      },
    numeroVotos: {
          type: DataTypes.INTEGER(1),
    },
    preco: {
        type: DataTypes.DECIMAL(9,2),
        allowNull: false
    },
    notaTotal: {
        type: DataTypes.DECIMAL(9,2),
        allowNull: true

        },
    avaliacao: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },

})

/*Jogos.beforeUpdate(jogos => {
    if(this.numeroVotos >= 5){
        if(this.notaTotal < 2){
            this.avaliacao = "Ruim"}
        else if(this.notaTotal <= 2 &&){
    }

  }})*/