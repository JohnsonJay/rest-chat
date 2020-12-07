const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
        {
          _id: '1',
          title: 'First Post',
          content: 'This is the first post!',
          imageUrl: 'images/chopped-kiwi-in-a-bowl-on-a-table.jpg',
          creator: {
            name: 'John'
          },
          createdAt: new Date()
        }
    ]
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed, provided data is incorrect.',
      errors: errors.array()
    });
  }
  const { title, content } = req.body;
  const post = new Post({
    title,
    content,
    imageUrl: 'images/chopped-kiwi-in-a-bowl-on-a-table.jpg',
    creator: {
      name: 'John'
    }
  });
  post.save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: 'Post created successfully!',
          post: result
        });
      })
      .catch(error => {
        console.error(error);
      });
};
