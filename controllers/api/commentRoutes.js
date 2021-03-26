const router = require('express').Router();
const { Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');



router.get('/', async (req, res) => {
  try {
  const commentData = await Comment.findAll({})
  res.json(commentData);
} catch (err) {
  res.status(500).json(err);
}
})



router.get('/:id', async (req, res) => {
  try {
    // TODO: Add a comment describing the functionality of this expression
    const commentData = await Comment.findOne({
       where: { 
         id: req.params.id 
        },
     });

    if (!commentData) {
      res
        .status(400)
        .json({ message: 'No comment with this ID' });
      return;
    }

    res.json(commentData);

  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  try {
    if(req.session) {
    const newComment = await Comment.create({
     text: req.body.text,
     post_id: req.body.post_id,
     user_id: req.session.user_id
    });
    res.status(200).json(newComment);
}

    
  } catch (err) {
    res.status(400).json(err);
  }
});



router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment at that id' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
