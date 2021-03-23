const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const seedPosts = require('./postData')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(seedPosts);

  process.exit(0);
};

seedDatabase();
