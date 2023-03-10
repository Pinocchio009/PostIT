const postSchema = require('../Models/postModels');
const comments = require('../Models/commentModel')
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