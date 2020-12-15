'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hollywood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Hollywood.init({
    title: DataTypes.STRING,
    year: DataTypes.NUMBER,
    format: DataTypes.STRING,
    actors: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hollywood',
  });
  return Hollywood;
};