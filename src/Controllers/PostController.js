const postSchema = require('../Models/postModels');


exports.createPost = async(req, res) => {
   // Validate user input
  const { error } = postSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create new post-it
  const postIt = new postSchema({
    title: req.body.title,
    content: req.body.content,
    author: req.user._id,
  });
  await postIt.save();

  res.send(postIt);
}
