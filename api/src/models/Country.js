const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        //validate:{is:/[:A-Z:]{3}/i}
        },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    flag:{type: DataTypes.STRING,
        allowNull: false,},
    continent:{type: DataTypes.STRING,
        allowNull: false,},
    subregion:{type: DataTypes.STRING},
    capital:{type: DataTypes.STRING,
    allowNull: false,},
    area:{ type: DataTypes.INTEGER,},
    population:{type: DataTypes.INTEGER,},
  },
  {
    timestamps: false
         
});
};
