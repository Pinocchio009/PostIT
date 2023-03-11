const postSchema = require('../Models/postModels');
const Comment = require('../Models/commentModel')

exports.createComment = async(req, res) => {
    try {
        const post = await postSchema.findOne({ _id: req.params.id, deleted: false})
        if(!post) {
            return res.status(404).json({
                message: 'post not found'
            });
        }
        const comment = new Comment({
            content: req.body.content,
            author: req.user._id,
            postId: req.body.postid
        });
        await comment.save()
        return res.json(comment)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
//get a single comment for a post
exports.getComment = async(req,res) => {
try {
    const comment = await Comment.findOne({ _id: req.params.id, postId: req.params.postId, deleted: false });
    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }
    return res.json(comment);
} catch (error) {
    res.status(500).json({
        message: error.message
    })
}
}
// Get all comments for a post
exports.getAllComments = async(req,res) =>{
    try {
        const comments = await Comment.find({ postId: req.params.postId, deleted: false }).sort({ createdAt: 'desc' });
    return res.json(comments);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateComments = async(req,res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id, postId: req.params.postId, deleted: false });
        if (!comment) {
          return res.status(404).json({
            message: 'Comment not found'
          });
        }
        if (comment.author !== req.user._id ) {
          return res.status(401).json({
            message: 'Not authorized to update this comment'
          });
        }
        comment.content = req.body.content;
        await comment.save();
        return res.json(comment);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteComment = async(req,res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id, postId: req.params.postId, deleted: false });
        if (!comment) {
          return res.status(404).json({
            message: 'Comment not found'
          });
        }
        if (comment.author !== req.user._id) {
          return res.status(401).json({
            message: "not authorized to delete this comment"
          })
        }
        // Delete the comment
    comment.deleted = true;
    await comment.save();

    res.status(200).json({
      message: 'Comment deleted successfully',
    });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}