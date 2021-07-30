'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, { DataTypes, fn }) => {
  class Post extends Model {
    static associate ({ User, Comment }) {
      Post.belongsTo(User, { foreignKey: 'userId' });
    }
  }

  Post.init({
    title: DataTypes.STRING(100),
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: fn('now')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: fn('now')
    }
  }, {
    sequelize,
    modelName: 'Post'
  });

  return Post;
};
