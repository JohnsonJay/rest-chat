const { validationResult } = require('express-validator');

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

  // Create post in db
  res.status(201).json({
    message: 'Post created successfully!',
    post: {
      _id: new Date().toISOString(),
      title,
      content,
      creator: {
        name: 'John'
      },
      createdAt: new Date()
    }
  });
};
