const router = require('express').Router();
const { User, Post } = require('../../models');

router.post('/:id', async (req, res) => {
  try {
    // TODO: Add a comment describing the functionality of this expression
    const postData = await User.findOne({
       where: { 
         id: req.params.id 
        },
      attributes: ['id', 'name', 'content', 'date_created'],
    include: [
      { model: User, attributes: ['name']},
    ] });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // TODO: Add a comment describing the functionality of this expression
    const validPassword = await userData.checkPassword(req.body.password);

    if (!postData) {
      res
        .status(400)
        .json({ message: 'No post with this ID' });
      return;
    }

    res.status(200).json(postData);

  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post at that id' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
