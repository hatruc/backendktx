'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Nguoi_Giam_Ho extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Nguoi_Giam_Ho.belongsTo(models.Sinh_Vien)
        }
    };
    Nguoi_Giam_Ho.init({
        ho_ten: DataTypes.STRING,
        gioi_tinh: DataTypes.STRING,
        dan_toc: DataTypes.STRING,
        tuoi: DataTypes.STRING,
        nghe_nghiep: DataTypes.STRING,
        dia_chi: DataTypes.STRING,
        sdt: DataTypes.STRING,
        sv_id: DataTypes.INTEGER,
        quan_he_voi_sv: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Nguoi_Giam_Ho',
    });
    return Nguoi_Giam_Ho;
};