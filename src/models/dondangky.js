'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Don_Dang_Ky extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Don_Dang_Ky.belongsTo(models.Sinh_Vien, {
                foreignKey: 'mssv', // cot trong bang Don_Dang_Ky
                targetKey: 'mssv'   // cot trong bang Sinh_Vien
            })
        }
    };
    Don_Dang_Ky.init({
        mssv: DataTypes.STRING,
        adm_id: DataTypes.INTEGER,
        loai_hinh: DataTypes.STRING,
        phong: DataTypes.STRING,
        hinh_thuc_thanh_toan: DataTypes.STRING,
        trang_thai: DataTypes.STRING,
        ghi_chu: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Don_Dang_Ky',
    });
    return Don_Dang_Ky;
};