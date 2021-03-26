const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData');
const seedPosts = require('./postData')
const seedComments = require('./commentData')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(seedPosts);

  await Comment.bulkCreate(seedComments);

  process.exit(0);
};

seedDatabase();
