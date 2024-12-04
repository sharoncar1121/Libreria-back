const { DataTypes } = require ('sequelize');
const sequelize =require('../db/connection');

const Alquiler = sequelize.define('Alquiler', {

    Id_alquiler: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Fecha_alquiler: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Fecha_entrega: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Cargo: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Id_libro:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Fecha_entrego: {
        type: DataTypes.DATE,
        allowNull: true
    }
  
},

  {
    tableName: 'Alquiler',
    timestamps: false
  }
);

module.exports = Alquiler;
