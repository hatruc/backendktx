'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Nhan_Vien extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Nhan_Vien.hasMany(models.Don_Dang_Ky)
        }
    };
    Nhan_Vien.init({
        ho_ten: DataTypes.STRING,
        gioi_tinh: DataTypes.STRING,
        dan_toc: DataTypes.STRING,
        ngay_sinh: DataTypes.STRING,
        sdt: DataTypes.STRING,
        cccd: DataTypes.STRING,
        dia_chi: DataTypes.STRING,
        role: DataTypes.STRING,
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Nhan_Vien',
    });
    return Nhan_Vien;
};