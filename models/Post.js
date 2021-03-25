const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {

}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },

        createdDate: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn('now'),
            allowNull: false
        },

        updatedDate: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn('now'),
            allowNull: false
        },
        
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;