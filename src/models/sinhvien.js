'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sinh_Vien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sinh_Vien.hasMany(models.Nguoi_Giam_Ho)
      Sinh_Vien.hasMany(models.Don_Dang_Ky, {
        foreignKey: 'mssv', // cot trong bang Don_Dang_Ky
        sourceKey: 'mssv'   // cot trong bang Sinh_Vien
      })
      Sinh_Vien.belongsTo(models.Phong, {
        foreignKey: 'phong_id',
        targetKey: 'id'
      })
    }
  };
  Sinh_Vien.init({
    mssv: DataTypes.STRING,
    ho_ten: DataTypes.STRING,
    gioi_tinh: DataTypes.STRING,
    dan_toc: DataTypes.STRING,
    ngay_sinh: DataTypes.STRING,
    cccd: DataTypes.STRING,
    uu_tien_id: DataTypes.INTEGER,
    ho_khau_tt: DataTypes.STRING,
    truong: DataTypes.STRING,
    khoa_vien: DataTypes.STRING,
    ma_nganh: DataTypes.STRING,
    khoa: DataTypes.STRING,
    lop: DataTypes.STRING,
    phong_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sinh_Vien',
  });
  return Sinh_Vien;
};