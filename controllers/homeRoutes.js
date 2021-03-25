const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// TODO: Add a comment describing the functionality of the withAuth middleware
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User,
                  attributes: ["name"] }],
    });

    console.log(postData[0].user);

    const posts = postData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

router.get('/posts/:id', async (req, res) => {

  try {
    // TODO: Add a comment describing the functionality of this expression
    const postData = await Post.findOne({
       where: { 
         id: req.params.id 
        },
      attributes: ['id', 'title', 'description', 'createdDate'],
    include: [
      { model: User, attributes: ['name']},
    ] });

    if (!postData) {
      res
        .status(400)
        .json({ message: 'No post with this ID' });
      return;
    }
    const post = postData.get({ plain: true });
    res.render('post-with-id', { post, loggedIn: req.session.loggedIn })

  } catch (err) {
    res.status(500).json(err);
  }
});
  




module.exports = router;
