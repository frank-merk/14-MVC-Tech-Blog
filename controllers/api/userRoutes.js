const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
  const userData = await User.findAll({
    attributes: { exclude: '[password]' }
})
  res.json(userData);
} catch {
  res.status(500).json(err);
}
})

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: {exclude: '[password]' },
      where: {
        id: req.params.id
      },

      
      
        include: [{
          model: Post,
          attributes: [
            'id',
            'title',
            'description',
            'createdDate'
          ],
          include: [{
            model: Comment,
            attributes: [
              'id',
              'text',
              'post_id'
            ],
            include: [{
              model: Post,
              attributes: [
                'title'
              ]
            }]
              
    
            }],
        }],
     
    })
    if (!userData) {
      res
        .status(400)
        .json({ message: 'No user with this ID' });
      return;
    }

    res.json(userData);

  } catch (err) {
    res.status(400).json(err);
  }
})

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    // TODO: Add a comment describing the functionality of this expression
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // TODO: Add a comment describing the functionality of this expression
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // TODO: Add a comment describing the functionality of this method
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // TODO: Add a comment describing the functionality of this method
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
