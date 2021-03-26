const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
router.get('/', withAuth, async (req, res) => {
    try { 
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'description',
                'createdDate'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'text', 'post_id', 'user_id', 'createdDate'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });
            const posts = postData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        } catch {
            res.status(500).json(err);
        };
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try { 
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'description',
                'createdDate'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'text', 'post_id', 'user_id', 'createdDate'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });
            if (!postData) {
                res
                .status(400)
                .json({ message: 'No post with this ID' });
            return;
            }
            const post = postData.get({ plain: true });
            res.render('edit', { post, loggedIn: true });
    } catch {
        res.status(400).json(err);
    }
        
})
router.get('/new-post', (req, res) => {
    res.render('new-post');
});



module.exports = router;