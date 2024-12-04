'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Don_Dang_Ky', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            mssv: {
                type: Sequelize.STRING
            },
            adm_id: {
                type: Sequelize.INTEGER
            },
            loai_hinh: {
                type: Sequelize.STRING
            },
            phong: {
                type: Sequelize.STRING
            },
            hinh_thuc_thanh_toan: {
                type: Sequelize.STRING
            },
            trang_thai: {
                type: Sequelize.STRING
            },
            ghi_chu: {
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
        await queryInterface.dropTable('Don_Dang_Ky');
    }
};