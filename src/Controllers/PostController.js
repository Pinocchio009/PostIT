const postSchema = require('../Models/postModels');
const Comment = require('../Models/commentModel')
const {commentSchema, postItSchema} =require('../validation')

//create a post
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
//get all posts
exports.getPost = async (req, res) => {
  try {
    const postIts = await postSchema.find({ deleted: false })
    .sort('-createdAt')
    .populate('author', '-password')
    .populate({ path: 'comments', populate: { path: 'author', select: '-password' } });
  res.status(200).send(postIts);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
  
}
//get single posts
 exports.getSinglePosts = async(req,res) => {
  try {
    const post = await postSchema.findOne({ _id: req.params.id, deleted: false
    }).populate('author', '-password')
    if(!post){
      return res.status(404).json({
        message: 'post not found'
      })
    }
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
 }
//user can update already posted stuff
exports.updatePost = async(req, res) => {
try {
    // Validate user input
    const { error } = postSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    // Find post-it and check if author
    const postIt = await postSchema.findOne({ _id: req.params.id, author: req.user._id });
    if (!postIt) return res.status(404).send('Post-it not found.');
  
    // Update post-it
    postIt.title = req.body.title;
    postIt.content = req.body.content;
    await postIt.save();
  
    res.send(postIt);
} catch (error) {
  res.status(500).json({
    message: 'server error'
  })
}
}

exports.deletePost = async(req,res) => {
  try {
    // Find post-it and check if author
  const postIt = await postSchema.findOne({ _id: req.params.id, author: req.user._id });
  if (!postIt) return res.status(404).send('Post-it not found.');

  // Soft delete post-it and its replies
  postIt.deleted = true;
  await postIt.save();
  await Comment.updateMany({ _id: { $in: postIt.comments } }, { deleted: true });

  res.send(postIt);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}