 
const express = require('express');
const router = express.Router();
let Post = require('./../models/Post');

router.get('/', (req, res, next) => {
  Post.find().exec((err, posts) => {
      res.render('index', { posts: posts });
  });

});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;