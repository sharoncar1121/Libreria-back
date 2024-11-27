const { DataTypes } = require ('sequelize');
const sequelize =require('../db/connection');

const Libros = sequelize.define('Libros', {

    Id_libro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Estado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Imagen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ISBN: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Genero: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Autor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Espera: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    Fecha_modifica_estado: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Fecha_entrega: {
        type: DataTypes.DATE,
        allowNull: true
    }

},

  {
    tableName: 'Libros',
    timestamps: false
  }
);

module.exports = Libros;
