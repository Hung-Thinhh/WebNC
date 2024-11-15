'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sanpham extends Model {
    
    static associate(models) {
        Sanpham.belongsTo(models.Nhom,{foreignKey: 'id_nhom'})
    }
  }
  Sanpham.init({
    ten: DataTypes.STRING,
    gia: DataTypes.STRING,
    hinhanh: DataTypes.STRING,
    id_nhom: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Sanpham',
  });
  return Sanpham;
};