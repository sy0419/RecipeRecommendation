'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 'Recipe' 테이블을 생성
    await queryInterface.createTable('Recipe', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    // 'Ingredient' 테이블을 생성
    await queryInterface.createTable('Ingredient', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    // 'RecipeIngredient' 테이블을 생성 (다대다 관계 연결 테이블)
    await queryInterface.createTable('RecipeIngredient', {
      recipeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Recipe', // 참조할 테이블 이름
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      ingredientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Ingredient', // 참조할 테이블 이름
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // 테이블을 삭제하는 명령
    await queryInterface.dropTable('RecipeIngredient');
    await queryInterface.dropTable('Ingredient');
    await queryInterface.dropTable('Recipe');
  },
};