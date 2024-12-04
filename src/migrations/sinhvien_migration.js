'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sinh_Vien', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mssv: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
      cccd: {
        type: Sequelize.STRING
      },
      uu_tien_id: {
        type: Sequelize.INTEGER
      },
      ho_khau_tt: {
        type: Sequelize.STRING
      },
      truong: {
        type: Sequelize.STRING
      },
      khoa_vien: {
        type: Sequelize.STRING
      },
      ma_nganh: {
        type: Sequelize.STRING
      },
      khoa: {
        type: Sequelize.STRING
      },
      lop: {
        type: Sequelize.STRING
      },
      phong_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Sinh_Vien');
  }
};