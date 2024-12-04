'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doi_Tuong_Uu_Tien extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Doi_Tuong_Uu_Tien.init({
        ten: DataTypes.STRING,
        mo_ta: DataTypes.STRING,
        muc_do: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Doi_Tuong_Uu_Tien',
    });
    return Doi_Tuong_Uu_Tien;
};