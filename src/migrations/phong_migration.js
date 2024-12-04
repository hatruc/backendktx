'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Phong', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            toa: {
                type: Sequelize.STRING
            },
            ten_phong: {
                type: Sequelize.STRING
            },
            toi_da: {
                type: Sequelize.INTEGER
            },
            da_thue: {
                type: Sequelize.INTEGER
            },
            loai_phong: {
                type: Sequelize.STRING
            },
            gia: {
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
        await queryInterface.dropTable('Phong');
    }
};