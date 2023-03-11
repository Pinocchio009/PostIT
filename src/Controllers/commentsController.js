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