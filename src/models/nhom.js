'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nhom extends Model {
    
    static associate(models) {
      Nhom.hasMany(models.Sanpham,{foreignKey: 'id_nhom'})
    }
  }
  Nhom.init({
    ten: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Nhom',
  });
  return Nhom;
};