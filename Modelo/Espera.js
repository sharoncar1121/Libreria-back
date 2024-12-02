const { DataTypes } = require ('sequelize');
const sequelize =require('../db/connection');

const Espera = sequelize.define('Alquiler', {

    Id_espera: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Fecha_espera: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Id_libro:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
  {
    tableName: 'Espera',
    timestamps: false
  }
);

module.exports = Espera;
