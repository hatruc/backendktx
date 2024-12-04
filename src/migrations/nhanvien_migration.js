'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Nhan_Vien', {
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
            ngay_sinh: {
                type: Sequelize.STRING
            },
            sdt: {
                type: Sequelize.STRING
            },
            cccd: {
                type: Sequelize.STRING
            },
            dia_chi: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
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
        await queryInterface.dropTable('Nhan_Vien');
    }
};