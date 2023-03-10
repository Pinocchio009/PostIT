const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deleted: { type: Boolean, default: false },
  }, { timestamps: true });

  const Comment = mongoose.model('Comment', commentSchema);

  module.exports  = Comment;
  