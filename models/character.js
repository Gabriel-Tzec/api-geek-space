// Importa Sequelize
const { Sequelize, DataTypes } = require('sequelize');

// Importa la configuración de la conexión a la base de datos
const sequelize = require('../connect');

// Define el modelo Character
const Character = sequelize.define('Character', {
    kind: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    image: {
        type: DataTypes.STRING
    },
    species: {
        type: DataTypes.STRING
    },
    isFavorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    // Opciones adicionales del modelo
    timestamps: false // Para evitar que Sequelize agregue automáticamente campos de createdAt y updatedAt
});

// Exporta el modelo Character
module.exports = Character;