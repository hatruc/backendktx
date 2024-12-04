'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Phong extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Phong.hasMany(models.Sinh_Vien, {
                foreignKey: 'phong_id',
                sourceKey: 'id'
            })
        }
    };
    Phong.init({
        toa: DataTypes.STRING,
        ten_phong: DataTypes.STRING,
        toi_da: DataTypes.INTEGER,
        da_thue: DataTypes.INTEGER,
        loai_phong: DataTypes.STRING,
        gia: DataTypes.STRING,
        ghi_chu: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Phong',
    });
    return Phong;
};