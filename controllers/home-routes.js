const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
 router.get('/', (req, res) => {
    Post.findAll({
      attributes: [
        'id',
        'title',
        "post_text",
        'created_at'      
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
   })
      .then(dbPostData => {
       const posts = dbPostData.map(post => post.get({ plain: true }));
//         // pass a single post object into the homepage template
          //res.status(202).json(posts);
        res.render('homepage', { 
          posts,
          loggedIn: req.session.loggedIn 
      });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  
  router.get('/comments/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'post_text',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at'
          ],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No Post found with this id' });
        return;
      }
      //serialize the data
      const post = dbPostData.get({ plain: true });
  
      //pass data to the template
      res.render('single-post', {
        post, 
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
 });
  
  module.exports = router;