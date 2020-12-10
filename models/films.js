'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Films extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Films.init({
    name: DataTypes.STRING,
    year: DataTypes.INTEGER,
    format: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Films',
  });
  return Films;
};