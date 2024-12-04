'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Nguoi_Giam_Ho', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ho_ten: {
                type: Sequelize.STRING
            },
            gioi_tinh: {
                type: Sequelize.STRING
            },
            dan_toc: {
                type: Sequelize.STRING
            },
            tuoi: {
                type: Sequelize.STRING
            },
            nghe_nghiep: {
                type: Sequelize.STRING
            },
            dia_chi: {
                type: Sequelize.STRING
            },
            sdt: {
                type: Sequelize.STRING
            },
            sv_id: {
                type: Sequelize.INTEGER
            },
            quan_he_voi_sv: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Nguoi_Giam_Ho');
    }
};